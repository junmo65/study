const csvInput = document.getElementById('csv-input');
const loadSampleButton = document.getElementById('load-sample');
const startButton = document.getElementById('start-session');
const questionCard = document.getElementById('question-card');
const questionTitle = document.getElementById('question-title');
const questionTag = document.getElementById('question-type-tag');
const questionStem = document.getElementById('question-stem');
const choiceContainer = document.getElementById('choice-container');
const spellingContainer = document.getElementById('spelling-container');
const spellingInput = document.getElementById('spelling-input');
const submitSpelling = document.getElementById('submit-spelling');
const feedbackEl = document.getElementById('feedback');
const nextButton = document.getElementById('next-question');
const memoryHints = document.getElementById('memory-hints');
const similarWordsEl = document.getElementById('similar-words');
const usageNotesEl = document.getElementById('usage-notes');
const welcomeCard = document.getElementById('welcome');
const exportButton = document.getElementById('export-progress');
const dailyTargetInput = document.getElementById('daily-target');
const questionMixSelect = document.getElementById('question-mix');
const statStudied = document.getElementById('stat-studied');
const statDue = document.getElementById('stat-due');
const statAccuracy = document.getElementById('stat-accuracy');

const STORAGE_KEY = 'vocab-progress-v1';
const SESSION_LOG_KEY = 'vocab-session-log-v1';
const INTERVALS_MINUTES = [0, 5, 30, 12 * 60, 24 * 60, 3 * 24 * 60, 7 * 24 * 60];

let vocabulary = [];
let progressMap = new Map();
let sessionQueue = [];
let currentQuestion = null;
let awaitingSecondAttempt = false;
let todayLog = [];
let correctCount = 0;
let totalCount = 0;

function normalizeKey(key) {
  return key.trim().replace(/\s+/g, ' ').toLowerCase();
}

function loadPersistedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const parsed = JSON.parse(raw);
    return new Map(parsed.map(([word, data]) => [word, data]));
  } catch (err) {
    console.warn('无法加载历史进度：', err);
    return new Map();
  }
}

function saveProgress() {
  const entries = Array.from(progressMap.entries());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadTodayLog() {
  try {
    const raw = localStorage.getItem(SESSION_LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.date === today) {
      return parsed.items ?? [];
    }
    return [];
  } catch (error) {
    console.warn('无法读取复习记录：', error);
    return [];
  }
}

function saveTodayLog() {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(
    SESSION_LOG_KEY,
    JSON.stringify({ date: today, items: todayLog })
  );
}

function resetSession() {
  sessionQueue = [];
  currentQuestion = null;
  awaitingSecondAttempt = false;
  correctCount = 0;
  totalCount = 0;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  memoryHints.classList.add('hidden');
  memoryHints.innerHTML = '';
  similarWordsEl.textContent = '答题后将展示形近词及释义。';
  usageNotesEl.textContent = '用法、记忆法会在答题后显示。';
  questionCard.classList.add('hidden');
  questionCard.setAttribute('aria-hidden', 'true');
  welcomeCard.classList.remove('hidden');
  enableExportIfNeeded();
}

function parseCsv(text) {
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => normalizeKey(header),
      complete: (results) => {
        if (results.errors && results.errors.length) {
          reject(results.errors[0]);
          return;
        }
        resolve(results.data);
      },
      error: reject,
    });
  });
}

async function handleFile(file) {
  const text = await file.text();
  const rows = await parseCsv(text);
  if (!rows.length) throw new Error('词库为空');
  const standardized = rows
    .map((row) => ({
      word: row['word']?.trim(),
      pos: row['pos']?.trim(),
      definitionEn: row['english definition']?.trim(),
      definitionZh: row['中文释义']?.trim() || row['chinese definition']?.trim(),
      collocationEn: row['collocations (en)']?.trim(),
      collocationZh: row['常用搭配(中文)']?.trim(),
      usageNotes: row['usage notes']?.trim(),
      mnemonic: row['记忆法/词根']?.trim(),
      exampleEn: row['example (en)']?.trim(),
      exampleZh: row['例句译文(中文)']?.trim(),
      ipa: row['ipa']?.trim(),
    }))
    .filter((item) => item.word && item.definitionZh);

  if (!standardized.length) {
    throw new Error('未找到有效的单词数据，确认列名是否正确。');
  }

  vocabulary = standardized;
  progressMap = loadPersistedProgress();
  todayLog = loadTodayLog();
  startButton.disabled = false;
  welcomeCard.classList.remove('hidden');
  updateStats();
  enableExportIfNeeded();
}

function createChoiceButton(option, isCorrect, onSelect) {
  const button = document.createElement('button');
  button.className = 'choice-button';
  button.type = 'button';
  button.textContent = option;
  button.addEventListener('click', () => onSelect(button, isCorrect));
  return button;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getSimilarWords(baseWord, count = 3) {
  const candidates = vocabulary
    .filter((item) => item.word !== baseWord)
    .map((item) => ({ item, distance: levenshtein(baseWord, item.word) }));
  candidates.sort((a, b) => a.distance - b.distance || a.item.word.localeCompare(b.item.word));
  return candidates.slice(0, count).map((entry) => entry.item);
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[a.length][b.length];
}

function prepareSessionQueue() {
  const now = Date.now();
  const dailyTarget = Number(dailyTargetInput.value) || 25;
  const selectedTypes = Array.from(questionMixSelect.selectedOptions).map((opt) => opt.value);
  if (!selectedTypes.length) {
    throw new Error('请至少选择一种题型。');
  }

  const dueItems = vocabulary
    .map((item) => {
      const progress = progressMap.get(item.word) || {
        stage: 0,
        nextReview: 0,
        history: [],
      };
      return {
        ...item,
        stage: progress.stage,
        nextReview: progress.nextReview,
        history: progress.history,
      };
    })
    .filter((item) => !item.nextReview || item.nextReview <= now)
    .sort((a, b) => (a.nextReview || 0) - (b.nextReview || 0));

  const unseen = vocabulary.filter((item) => !progressMap.has(item.word));
  const queue = [];
  const added = new Set();

  for (const item of dueItems) {
    if (queue.length >= dailyTarget) break;
    queue.push(item);
    added.add(item.word);
  }

  if (queue.length < dailyTarget) {
    for (const item of unseen) {
      if (queue.length >= dailyTarget) break;
      if (added.has(item.word)) continue;
      queue.push({ ...item, stage: 0, nextReview: 0, history: [] });
      added.add(item.word);
    }
  }

  if (!queue.length) {
    throw new Error('恭喜！今日没有需要复习的单词。');
  }

  sessionQueue = queue.map((item) => ({ ...item, types: selectedTypes }));
  shuffle(sessionQueue);
}

function pickQuestion(wordEntry) {
  const availableTypes = wordEntry.types;
  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  const base = { type, word: wordEntry };
  switch (type) {
    case 'en2zh':
      return buildEnToZhQuestion(base);
    case 'zh2en':
      return buildZhToEnQuestion(base);
    case 'cloze':
      return buildClozeQuestion(base);
    case 'similar':
      return buildSimilarQuestion(base);
    case 'pos':
      return buildPosQuestion(base);
    case 'spelling':
      return buildSpellingQuestion(base);
    default:
      return buildEnToZhQuestion(base);
  }
}

function buildEnToZhQuestion({ word }) {
  const pool = vocabulary.filter((item) => item.word !== word.word);
  shuffle(pool);
  const distractors = pool.slice(0, 3);
  const options = shuffle([word.definitionZh, ...distractors.map((item) => item.definitionZh)]);
  return {
    type: 'en2zh',
    title: `${word.word} (${word.pos || '词性未知'}) 的中文意思是？`,
    tag: '英文 → 中文',
    stem: word.definitionEn || `请选择 ${word.word} 的中文意思`,
    options,
    answer: word.definitionZh,
  };
}

function buildZhToEnQuestion({ word }) {
  const pool = vocabulary.filter((item) => item.word !== word.word);
  shuffle(pool);
  const distractors = pool.slice(0, 3);
  const options = shuffle([word.word, ...distractors.map((item) => item.word)]);
  return {
    type: 'zh2en',
    title: `与“${word.definitionZh}”相匹配的英文单词是？`,
    tag: '中文 → 英文',
    stem: word.definitionEn || '请选择对应的英文单词',
    options,
    answer: word.word,
  };
}

function buildClozeQuestion({ word }) {
  const sentence = word.exampleEn || `${word.word} ${word.definitionEn || ''}`;
  const blanked = sentence.replace(new RegExp(word.word, 'gi'), '_____');
  const similar = getSimilarWords(word.word, 3);
  const options = shuffle([word.word, ...similar.map((item) => item.word)]);
  return {
    type: 'cloze',
    title: '例句填空',
    tag: '例句填空',
    stem: blanked,
    options,
    answer: word.word,
  };
}

function buildSimilarQuestion({ word }) {
  const similar = getSimilarWords(word.word, 3);
  const options = shuffle([word.word, ...similar.map((item) => item.word)]);
  const questionText = `下列哪个单词与“${word.definitionZh}”含义最匹配？注意辨析形近词。`;
  return {
    type: 'similar',
    title: '形近词辨析',
    tag: '形近词',
    stem: questionText,
    options,
    answer: word.word,
  };
}

function buildPosQuestion({ word }) {
  const possiblePos = ['n.', 'v.', 'adj.', 'adv.', 'prep.', 'conj.', 'pron.', 'phr.', 'vt.', 'vi.'];
  const correct = word.pos || '未提供';
  const distractors = shuffle(possiblePos.filter((item) => item !== correct)).slice(0, 3);
  const options = shuffle([correct, ...distractors]);
  return {
    type: 'pos',
    title: `“${word.word}” 的词性是？`,
    tag: '词性判断',
    stem: word.definitionZh,
    options,
    answer: correct,
  };
}

function buildSpellingQuestion({ word }) {
  return {
    type: 'spelling',
    title: '拼写练习',
    tag: '拼写',
    stem: `${word.definitionZh} (${word.pos || ''})`,
    answer: word.word,
  };
}

function updateStats() {
  const dueCount = vocabulary.filter((item) => {
    const progress = progressMap.get(item.word);
    if (!progress) return true;
    return !progress.nextReview || progress.nextReview <= Date.now();
  }).length;

  const studiedToday = new Set(todayLog.map((entry) => entry.word));
  statStudied.textContent = studiedToday.size;
  statDue.textContent = dueCount;
  const accuracy = totalCount ? Math.round((correctCount / totalCount) * 100) : 0;
  statAccuracy.textContent = `${accuracy}%`;
}

function showQuestion(question) {
  questionCard.classList.remove('hidden');
  questionCard.setAttribute('aria-hidden', 'false');
  welcomeCard.classList.add('hidden');

  questionTitle.textContent = question.title;
  questionTag.textContent = question.tag;
  questionStem.textContent = question.stem;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  memoryHints.classList.add('hidden');
  memoryHints.innerHTML = '';
  nextButton.disabled = true;
  awaitingSecondAttempt = false;

  choiceContainer.innerHTML = '';
  spellingContainer.classList.add('hidden');

  if (question.type === 'spelling') {
    spellingContainer.classList.remove('hidden');
    spellingInput.value = '';
    spellingInput.focus();
  } else {
    question.options.forEach((option) => {
      const button = createChoiceButton(option, option === question.answer, handleChoiceSelect);
      choiceContainer.appendChild(button);
    });
  }
}

function handleChoiceSelect(button, isCorrect) {
  if (nextButton.disabled === false) return;
  totalCount += 1;
  revealChoices(button, isCorrect);
  handleResult(isCorrect);
}

function revealChoices(selectedButton, isCorrect) {
  const buttons = Array.from(choiceContainer.querySelectorAll('button'));
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === currentQuestion.answer) {
      btn.classList.add('correct');
    }
    if (btn === selectedButton && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });
}

function handleSpellingSubmit() {
  if (!currentQuestion) return;
  const input = spellingInput.value.trim();
  if (!input) return;

  const normalizedInput = input.toLowerCase();
  const normalizedAnswer = currentQuestion.answer.toLowerCase();

  if (normalizedInput === normalizedAnswer) {
    totalCount += 1;
    correctCount += 1;
    showFeedback(true, `✅ 正确！${currentQuestion.answer}`);
    nextButton.disabled = false;
    awaitingSecondAttempt = false;
    applySpacingResult(true);
    renderPostAnswerHints();
  } else if (!awaitingSecondAttempt) {
    awaitingSecondAttempt = true;
    showFeedback(false, '再试一次！提示：已展示音标和记忆法。');
    revealPhoneticHints();
  } else {
    totalCount += 1;
    showFeedback(false, `正确拼写：${currentQuestion.answer}`);
    awaitingSecondAttempt = false;
    nextButton.disabled = false;
    applySpacingResult(false);
    renderPostAnswerHints();
  }
}

function revealPhoneticHints() {
  memoryHints.classList.remove('hidden');
  memoryHints.innerHTML = '';
  const word = currentQuestion.word;
  const phonetic = word.ipa || '暂无音标信息';
  const mnemonic = word.mnemonic || '暂无记忆法/词根提示。';
  memoryHints.appendChild(createHintBlock('音标', phonetic));
  memoryHints.appendChild(createHintBlock('记忆法 / 词根', mnemonic));
}

function handleResult(isCorrect) {
  if (isCorrect) {
    correctCount += 1;
    showFeedback(true, '回答正确！');
  } else {
    showFeedback(false, `正确答案：${currentQuestion.answer}`);
  }
  applySpacingResult(isCorrect);
  renderPostAnswerHints();
  nextButton.disabled = false;
}

function showFeedback(isCorrect, message) {
  feedbackEl.textContent = message;
  feedbackEl.className = `feedback ${isCorrect ? 'success' : 'error'}`;
}

function applySpacingResult(success) {
  const word = currentQuestion.word;
  const prev = progressMap.get(word.word) || {
    stage: 0,
    nextReview: 0,
    history: [],
  };
  const now = Date.now();
  let stage = prev.stage;
  if (success) {
    stage = Math.min(stage + 1, INTERVALS_MINUTES.length - 1);
  } else {
    stage = Math.max(stage - 1, 0);
  }
  const intervalMinutes = INTERVALS_MINUTES[stage];
  const nextReview = now + intervalMinutes * 60 * 1000;
  const history = [...prev.history, { time: now, success }];
  progressMap.set(word.word, { stage, nextReview, history });
  saveProgress();

  todayLog.push({
    time: now,
    word: word.word,
    success,
    type: currentQuestion.type,
  });
  saveTodayLog();
  updateStats();
  enableExportIfNeeded();
}

function renderPostAnswerHints() {
  const word = currentQuestion.word;
  memoryHints.classList.remove('hidden');
  memoryHints.innerHTML = '';
  const mnemonic = word.mnemonic || '暂无记忆法/词根提示。';
  const usage = word.usageNotes || '暂无用法备注。';
  memoryHints.appendChild(createHintBlock('记忆法 / 词根', mnemonic));
  memoryHints.appendChild(createHintBlock('用法提示', usage));

  const similar = getSimilarWords(word.word, 3);
  if (similar.length) {
    const list = similar
      .map((item) => `${item.word}：${item.definitionZh || item.definitionEn || ''}`)
      .join('\n');
    similarWordsEl.textContent = list;
  } else {
    similarWordsEl.textContent = '暂无形近词推荐。';
  }

  const collocations = [word.collocationEn, word.collocationZh]
    .filter(Boolean)
    .join('\n');
  const usageText = [
    collocations ? `常用搭配：\n${collocations}` : '',
    word.exampleEn ? `例句：${word.exampleEn}` : '',
    word.exampleZh ? `译文：${word.exampleZh}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
  usageNotesEl.textContent = usageText || '暂无搭配或例句信息。';
}

function createHintBlock(title, content) {
  const wrapper = document.createElement('div');
  wrapper.className = 'hint-item';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const paragraph = document.createElement('p');
  paragraph.textContent = content || '暂无内容';
  wrapper.append(heading, paragraph);
  return wrapper;
}

function nextQuestion() {
  if (!sessionQueue.length) {
    endSession();
    return;
  }
  const wordEntry = sessionQueue.shift();
  const question = pickQuestion(wordEntry);
  question.word = wordEntry;
  currentQuestion = question;
  showQuestion(question);
}

function endSession() {
  questionTitle.textContent = '今日任务完成！';
  questionTag.textContent = '总结';
  questionStem.textContent = '恭喜完成今日计划，明天继续加油！';
  choiceContainer.innerHTML = '';
  spellingContainer.classList.add('hidden');
  feedbackEl.textContent = '';
  memoryHints.classList.add('hidden');
  nextButton.disabled = true;
  updateStats();
}

function exportTodayLog() {
  if (!todayLog.length) return;
  const header = [
    'Date',
    'Time',
    'Word',
    'Result',
    'Question Type',
  ];
  const rows = todayLog.map((entry) => {
    const date = new Date(entry.time);
    return [
      date.toISOString().slice(0, 10),
      date.toLocaleTimeString(),
      entry.word,
      entry.success ? 'Correct' : 'Incorrect',
      entry.type,
    ];
  });
  const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `study-log-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function enableExportIfNeeded() {
  exportButton.disabled = todayLog.length === 0;
}

csvInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    await handleFile(file);
    enableExportIfNeeded();
  } catch (error) {
    alert(error.message || '解析词库失败，请检查文件格式。');
    resetSession();
  }
});

loadSampleButton.addEventListener('click', async () => {
  try {
    const response = await fetch('data/sample_word_list.csv');
    if (!response.ok) throw new Error('无法读取示例词库。');
    const text = await response.text();
    const file = new File([text], 'sample_word_list.csv', { type: 'text/csv' });
    await handleFile(file);
    enableExportIfNeeded();
  } catch (error) {
    alert(error.message || '载入示例词库失败。');
    resetSession();
  }
});

startButton.addEventListener('click', () => {
  try {
    prepareSessionQueue();
    nextQuestion();
    exportButton.disabled = false;
  } catch (error) {
    alert(error.message);
  }
});

nextButton.addEventListener('click', () => {
  nextQuestion();
});

submitSpelling.addEventListener('click', handleSpellingSubmit);
spellingInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleSpellingSubmit();
  }
});

exportButton.addEventListener('click', () => {
  exportTodayLog();
});

resetSession();
