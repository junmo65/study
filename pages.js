import { csvSafe, el, formatNumber, formatDueRelative, percent, todayISO, toISODate } from './util.js';
import { createQuestion } from './components.js';
import { gradeCurrent, getNext, getSession, peekCounts, rebuildSession } from './scheduler.js';
import { getCards, getPrefs, getReviews, getSrs, importJSON, replaceCards, saveAll, setPrefs, setSrsForCard, upsertCards } from './storage.js';
import { parseCSV, previewRows, missingHeaders, rowsToCards } from './csv.js';

function renderDashboard() {
  const cards = getCards();
  const srs = getSrs();
  const today = todayISO();
  const dueCards = cards.filter((card) => {
    const entry = srs[card.id];
    if (!entry) return false;
    if (!entry.dueISO) return true;
    return entry.dueISO <= today;
  });
  const newCards = cards.filter((card) => !srs[card.id]);
  const reviews = getReviews();
  const todaysReviews = reviews.filter((log) => log.tsISO?.slice(0, 10) === today);
  const correct = todaysReviews.filter((log) => log.grade >= 3);
  const trend = Array.from({ length: 7 }, (_, idx) => {
    const day = toISODate(new Date(Date.now() + idx * 24 * 60 * 60 * 1000));
    const count = cards.filter((card) => {
      const entry = srs[card.id];
      if (!entry || !entry.dueISO) return idx === 0;
      return entry.dueISO.slice(0, 10) === day;
    }).length;
    return { day, count };
  });
  const tagDifficulty = new Map();
  cards.forEach((card) => {
    const entry = srs[card.id];
    if (!entry?.lapses) return;
    (card.tags || []).forEach((tag) => {
      tagDifficulty.set(tag, (tagDifficulty.get(tag) || 0) + entry.lapses);
    });
  });
  const sortedTags = Array.from(tagDifficulty.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const overdue = cards.filter((card) => {
    const entry = srs[card.id];
    if (!entry?.dueISO) return false;
    return entry.dueISO < today;
  });
  const forgettingRate = cards.length ? overdue.length / cards.length : 0;

  return el('section', {}, [
    el('h2', {}, 'Dashboard'),
    el('div', { className: 'grid two' }, [
      metricCard('Due Today', formatNumber(dueCards.length)),
      metricCard('New Words Available', formatNumber(newCards.length)),
      metricCard('Reviewed Today', formatNumber(todaysReviews.length)),
      metricCard('Accuracy Today', percent(correct.length / Math.max(1, todaysReviews.length))),
      metricCard('Estimated Forgetting', percent(forgettingRate)),
    ]),
    el('h3', {}, '7-day Due Trend'),
    el('div', { className: 'bar-chart' }, trend.map((item) => bar(item))),
    el('h3', {}, 'Top 5 Difficult Tags'),
    sortedTags.length ? el('div', { className: 'tag-cloud' }, sortedTags.map(([tag, value]) => el('span', {}, `${tag}: ${value}`))) : el('p', {}, 'No lapse data yet.'),
    el('h3', {}, 'Recent Activity'),
    todaysReviews.length ? el('ul', {}, todaysReviews.slice(-10).map((log) => {
      const card = cards.find((c) => c.id === log.cid);
      return el('li', {}, `${log.tsISO.slice(11, 19)} · ${card?.word || ''} · grade ${log.grade} (${log.mode})`);
    })) : el('p', {}, 'Start learning to see review history.')
  ]);
}

function bar(item) {
  return el('div', { className: 'bar', style: `height:${Math.min(100, item.count * 12)}px` }, [
    el('span', {}, item.count)
  ]);
}

function metricCard(title, value) {
  return el('div', { className: 'metric' }, [
    el('div', { className: 'metric-title' }, title),
    el('div', { className: 'metric-value' }, value)
  ]);
}

function renderLearn() {
  const container = el('section', { tabindex: '0' }, [
    el('h2', {}, 'Learning Session'),
    el('div', { className: 'key-hints' }, 'Space=flip · 1-5=grade · C=change mode · F=mark difficult · /=focus input'),
    el('div', { id: 'learn-area' })
  ]);

  const renderCard = (sessionEntry) => {
    const area = container.querySelector('#learn-area');
    area.innerHTML = '';
    if (!sessionEntry) {
      area.appendChild(el('p', {}, 'All caught up! Import more cards or come back later.'));
      return;
    }
    const prefs = getPrefs();
    const component = createQuestion({ mode: sessionEntry.mode, card: sessionEntry.card, prefs });
    const wrapper = el('div', { className: 'learn-wrapper' }, [
      component.element,
      el('div', { className: 'grade-buttons' },
        [1, 2, 3, 4, 5].map((score) => el('button', {
          className: score <= 2 ? 'danger' : '',
          onClick: () => handleGrade(score)
        }, score))
      )
    ]);
    area.appendChild(wrapper);
    component.focus?.();
    currentComponent = component;
    showingAnswer = false;
  };

  let showingAnswer = false;
  let currentComponent = null;
  const updateProgress = () => {
    const counts = peekCounts();
    container.querySelector('h2').textContent = `Learning Session · ${counts.completed}/${counts.reviewTotal + counts.newTotal}`;
  };

  const nextCard = (forceRebuild = false) => {
    const sessionEntry = forceRebuild ? rebuildSession() : getSession().last || getNext();
    renderCard(sessionEntry);
    updateProgress();
  };

  const handleGrade = (grade) => {
    if (!showingAnswer && currentComponent?.evaluate) {
      const evaluation = currentComponent.evaluate();
      if (!evaluation.correct && grade >= 3) {
        grade = 2; // auto downgrade if answer wrong
      }
    }
    const next = gradeCurrent(grade);
    showingAnswer = false;
    renderCard(next);
    updateProgress();
  };

  const flip = () => {
    if (!currentComponent) return;
    currentComponent.reveal?.();
    showingAnswer = true;
  };

  const changeMode = () => {
    const sessionEntry = getSession().last;
    if (!sessionEntry) return;
    const modes = ['recognition', 'recall', 'collocation', 'cloze'];
    const idx = modes.indexOf(sessionEntry.mode);
    sessionEntry.mode = modes[(idx + 1) % modes.length];
    renderCard(sessionEntry);
  };

  container.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      if (!showingAnswer) {
        flip();
      } else {
        handleGrade(3);
      }
    } else if (/^[1-5]$/.test(event.key)) {
      handleGrade(Number(event.key));
    } else if (event.key.toLowerCase() === 'c') {
      changeMode();
    } else if (event.key.toLowerCase() === 'f') {
      const sessionEntry = getSession().last;
      if (sessionEntry) {
        setSrsForCard(sessionEntry.card.id, { weakFacet: sessionEntry.mode });
      }
    } else if (event.key === '/') {
      event.preventDefault();
      currentComponent?.focus?.();
    }
  });

  nextCard(true);
  setTimeout(() => container.focus(), 0);
  return container;
}

function renderImport() {
  const previewBox = el('div', { className: 'preview no-print' });
  const status = el('div');
  const fileInput = el('input', { type: 'file', accept: '.csv,.tsv,text/csv,text/tab-separated-values' });
  const importButton = el('button', { className: 'secondary', disabled: true }, 'Import cards');
  let parsed;

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const text = await file.text();
    parsed = parseCSV(text);
    const missing = missingHeaders(parsed.headers);
    previewBox.innerHTML = '';
    previewBox.appendChild(el('p', {}, `Detected delimiter: ${parsed.delimiter === '\t' ? 'Tab' : 'Comma'}`));
    if (missing.length) {
      previewBox.appendChild(el('p', { className: 'alert' }, `Missing columns: ${missing.join(', ')} (they will be empty)`));
    }
    const table = el('table', { className: 'table' });
    const headRow = el('tr', {}, parsed.headers.map((header) => el('th', {}, header)));
    table.appendChild(el('thead', {}, headRow));
    const body = el('tbody', {}, previewRows(parsed, 20).map((row) => {
      return el('tr', {}, parsed.headers.map((header) => el('td', {}, row[header] || '')));
    }));
    table.appendChild(body);
    previewBox.appendChild(table);
    importButton.disabled = false;
    status.textContent = `${parsed.rows.length} rows ready to import.`;
  });

  importButton.addEventListener('click', () => {
    if (!parsed) return;
    const cards = rowsToCards(parsed);
    const existing = getCards();
    const before = existing.length;
    upsertCards(cards);
    const after = getCards().length;
    status.textContent = `Imported ${cards.length} rows. Total cards: ${after} (was ${before}).`;
    importButton.disabled = true;
    rebuildSession();
  });

  return el('section', {}, [
    el('h2', {}, 'Import CSV/TSV'),
    el('p', {}, 'Select a CSV/TSV file exported from Orpea or Anki. Fields are matched automatically; duplicates update existing cards while keeping review progress.'),
    fileInput,
    importButton,
    previewBox,
    status
  ]);
}

function renderCards() {
  const cards = getCards();
  const srs = getSrs();
  const filters = {
    tag: '',
    status: 'all'
  };
  const tagSelect = el('select', {}, [
    el('option', { value: '' }, 'All tags'),
    ...Array.from(new Set(cards.flatMap((card) => card.tags || []))).map((tag) => el('option', { value: tag }, tag))
  ]);
  const statusSelect = el('select', {}, [
    el('option', { value: 'all' }, 'All statuses'),
    el('option', { value: 'new' }, 'New only'),
    el('option', { value: 'due' }, 'Due now'),
    el('option', { value: 'future' }, 'Scheduled later')
  ]);

  const list = el('table', { className: 'table' });
  list.appendChild(el('thead', {}, el('tr', {}, ['Word', 'POS', 'Definition (EN)', 'Definition (ZH)', 'Tags', 'Due'].map((name) => el('th', {}, name)))));
  const body = el('tbody');
  list.appendChild(body);

  const renderRows = () => {
    body.innerHTML = '';
    cards
      .filter((card) => {
        if (filters.tag && !(card.tags || []).includes(filters.tag)) return false;
        const entry = srs[card.id];
        if (filters.status === 'new') return !entry;
        if (filters.status === 'due') return entry && (!entry.dueISO || entry.dueISO <= todayISO());
        if (filters.status === 'future') return entry && entry.dueISO > todayISO();
        return true;
      })
      .slice(0, 300)
      .forEach((card) => {
        const entry = srs[card.id];
        const row = el('tr', {}, [
          editableCell(card, 'word'),
          editableCell(card, 'pos'),
          editableCell(card, 'def_en'),
          editableCell(card, 'def_zh'),
          editableCell(card, 'tags', (value) => value.split(/[,;\s]+/).filter(Boolean)),
          el('td', {}, entry ? formatDueRelative(entry.dueISO) : '—')
        ]);
        body.appendChild(row);
      });
  };

  tagSelect.addEventListener('change', (event) => {
    filters.tag = event.target.value;
    renderRows();
  });
  statusSelect.addEventListener('change', (event) => {
    filters.status = event.target.value;
    renderRows();
  });

  renderRows();

  return el('section', {}, [
    el('h2', {}, 'Cards'),
    el('div', { className: 'grid two' }, [
      el('label', {}, ['Tag filter', tagSelect]),
      el('label', {}, ['Status filter', statusSelect])
    ]),
    list
  ]);
}

function editableCell(card, key, transform) {
  const value = Array.isArray(card[key]) ? card[key].join('; ') : (card[key] || '');
  const input = el('textarea', { rows: 2 }, value);
  input.addEventListener('blur', () => {
    const cards = getCards();
    const target = cards.find((c) => c.id === card.id);
    if (!target) return;
    const newValue = transform ? transform(input.value) : input.value;
    target[key] = newValue;
    replaceCards(cards);
    saveAll();
  });
  return el('td', {}, input);
}

function renderSettings() {
  const prefs = getPrefs();
  const algoSelect = el('select', {}, [
    el('option', { value: 'SM2', selected: prefs.algo === 'SM2' }, 'SM-2'),
    el('option', { value: 'LEITNER', selected: prefs.algo === 'LEITNER' }, 'Leitner')
  ]);
  const dailyNewInput = el('input', { type: 'number', min: 0, value: prefs.dailyNew });
  const dailyReviewInput = el('input', { type: 'number', min: 0, value: prefs.dailyReviewCap });
  const typingStrictInput = el('input', { type: 'checkbox', checked: prefs.typingStrict });
  const clozeDensitySelect = el('select', {}, [
    el('option', { value: 'low', selected: prefs.clozeDensity === 'low' }, 'Low'),
    el('option', { value: 'mid', selected: prefs.clozeDensity === 'mid' }, 'Medium'),
    el('option', { value: 'high', selected: prefs.clozeDensity === 'high' }, 'High')
  ]);

  const savePrefsForm = () => {
    setPrefs({
      algo: algoSelect.value,
      dailyNew: Number(dailyNewInput.value),
      dailyReviewCap: Number(dailyReviewInput.value),
      typingStrict: typingStrictInput.checked,
      clozeDensity: clozeDensitySelect.value
    });
    rebuildSession();
  };

  [algoSelect, dailyNewInput, dailyReviewInput, typingStrictInput, clozeDensitySelect].forEach((input) => {
    input.addEventListener('change', savePrefsForm);
  });

  return el('section', {}, [
    el('h2', {}, 'Settings'),
    el('div', { className: 'grid two' }, [
      el('label', {}, ['Algorithm', algoSelect]),
      el('label', {}, ['Daily new words', dailyNewInput]),
      el('label', {}, ['Daily review cap', dailyReviewInput]),
      el('label', {}, ['Strict typing (disable fuzziness)', typingStrictInput]),
      el('label', {}, ['Cloze density', clozeDensitySelect])
    ]),
    el('p', {}, 'Changes are saved automatically.')
  ]);
}

function renderBackup() {
  const exportButton = el('button', {}, 'Export progress.json');
  const importFile = el('input', { type: 'file', accept: '.json,application/json' });
  const reviewsButton = el('button', { className: 'secondary' }, 'Export reviews.csv');
  const status = el('p');

  exportButton.addEventListener('click', () => {
    const data = getStateBlob();
    triggerDownload(data, 'progress.json');
  });

  reviewsButton.addEventListener('click', () => {
    const csv = reviewsToCsv();
    triggerDownload(csv, 'reviews.csv', 'text/csv');
  });

  importFile.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const text = await file.text();
    const ok = importJSON(text, 'merge');
    status.textContent = ok ? 'Progress merged successfully.' : 'Import failed.';
    rebuildSession();
  });

  return el('section', {}, [
    el('h2', {}, 'Backup & Restore'),
    el('div', { className: 'grid two' }, [
      exportButton,
      reviewsButton,
      el('label', {}, ['Import progress.json', importFile])
    ]),
    status
  ]);
}

function getStateBlob() {
  const data = JSON.stringify({
    cards: getCards(),
    srs: getSrs(),
    prefs: getPrefs(),
    reviews: getReviews()
  }, null, 2);
  return new Blob([data], { type: 'application/json' });
}

function reviewsToCsv() {
  const rows = ['cid,tsISO,grade,mode,algo,interval,dueISO'];
  getReviews().forEach((log) => {
    const values = [log.cid, log.tsISO, log.grade, log.mode, log.algo, log.interval, log.dueISO];
    rows.push(values.map((value) => csvSafe(value ?? '')).join(','));
  });
  return new Blob([rows.join('\n')], { type: 'text/csv' });
}

function triggerDownload(data, filename, type = 'application/json') {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 100);
}

function renderPrint() {
  const cards = getCards();
  const srs = getSrs();
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentHard = cards.filter((card) => {
    const entry = srs[card.id];
    if (!entry?.history) return false;
    return entry.history.some((h) => h.grade < 3 && new Date(h.tsISO).getTime() >= oneWeekAgo);
  });
  return el('section', {}, [
    el('h2', {}, 'Print – This Week’s Lapses'),
    el('p', { className: 'no-print' }, 'Use browser print (Ctrl/Cmd+P). This view only shows cards missed in the past 7 days.'),
    recentHard.length ? el('ol', {}, recentHard.map((card) => el('li', {}, [
      el('strong', {}, `${card.word}${card.pos ? ` (${card.pos})` : ''}`),
      el('p', {}, card.def_zh || card.def_en || ''),
      card.ex_en ? el('p', {}, card.ex_en) : null,
      card.ex_zh ? el('p', {}, card.ex_zh) : null,
      card.mnemonic ? el('p', {}, `Mnemonic: ${card.mnemonic}`) : null
    ]))) : el('p', {}, 'No lapses recorded this week!')
  ]);
}

export const pages = {
  '#/': renderDashboard,
  '#/learn': renderLearn,
  '#/import': renderImport,
  '#/cards': renderCards,
  '#/settings': renderSettings,
  '#/backup': renderBackup,
  '#/print': renderPrint
};
