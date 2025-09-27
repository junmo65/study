const WORD_PACKS = {
  "考研词汇": [
    {
      word: "ameliorate",
      definition: "v. 改善；使好转",
      phonetic: "əˈmiːliəreɪt",
      example: "A well-structured review plan can ameliorate exam anxiety.",
      confusions: [
        { word: "deteriorate", definition: "v. 恶化；退化" },
        { word: "alleviate", definition: "v. 缓解；减轻" }
      ]
    },
    {
      word: "meticulous",
      definition: "adj. 一丝不苟的；严谨的",
      phonetic: "məˈtɪkjələs",
      example: "She kept meticulous notes of every practice test.",
      confusions: [{ word: "fastidious", definition: "adj. 挑剔的；极其注意细节的" }]
    },
    {
      word: "exacerbate",
      definition: "v. 使恶化；使加剧",
      phonetic: "ɪɡˈzæsəbeɪt",
      example: "Skipping reviews will exacerbate the forgetting problem.",
      confusions: [{ word: "exasperate", definition: "v. 激怒；使恼怒" }]
    },
    {
      word: "pragmatic",
      definition: "adj. 务实的；讲求实际的",
      phonetic: "præɡˈmætɪk",
      example: "A pragmatic learner blends flashcards with writing practice.",
      confusions: [{ word: "dogmatic", definition: "adj. 教条的；武断的" }]
    },
    {
      word: "delineate",
      definition: "v. 描述；勾画轮廓",
      phonetic: "dɪˈlɪnieɪt",
      example: "The teacher delineated the key grammar points in detail.",
      confusions: [{ word: "eliminate", definition: "v. 消除；淘汰" }]
    },
    {
      word: "ubiquitous",
      definition: "adj. 无处不在的；普遍存在的",
      phonetic: "juːˈbɪkwɪtəs",
      example: "Mobile apps make ubiquitous learning possible.",
      confusions: [{ word: "unique", definition: "adj. 独一无二的" }]
    },
    {
      word: "pertinent",
      definition: "adj. 相关的；中肯的",
      phonetic: "ˈpɜːrtɪnənt",
      example: "Only pertinent examples are kept in the final notes.",
      confusions: [{ word: "impertinent", definition: "adj. 无礼的；不相关的" }]
    },
    {
      word: "alleviate",
      definition: "v. 缓解；减轻",
      phonetic: "əˈliːvieɪt",
      example: "Regular breaks can alleviate fatigue during revision.",
      confusions: [{ word: "aggravate", definition: "v. 加重；恶化" }]
    },
    {
      word: "galvanize",
      definition: "v. 激励；通电镀锌",
      phonetic: "ˈɡælvənaɪz",
      example: "The looming exam date galvanized her to study harder.",
      confusions: [{ word: "paralyze", definition: "v. 使瘫痪；使麻痹" }]
    },
    {
      word: "consolidate",
      definition: "v. 巩固；合并",
      phonetic: "kənˈsɑːlɪdeɪt",
      example: "Daily review consolidates long-term memory.",
      confusions: [{ word: "liquidate", definition: "v. 清算；变现" }]
    }
  ],
  "GRE词汇": [
    {
      word: "abrogate",
      definition: "v. 废除；撤销",
      phonetic: "ˈæbrəɡeɪt",
      example: "The committee voted to abrogate the outdated rule.",
      confusions: [{ word: "arrogate", definition: "v. 冒称拥有；霸占" }]
    },
    {
      word: "intransigent",
      definition: "adj. 不妥协的；固执的",
      phonetic: "ɪnˈtrænsɪdʒənt",
      example: "The negotiator faced an intransigent opponent.",
      confusions: [{ word: "insurgent", definition: "n. 叛乱者；起义者" }]
    },
    {
      word: "proscribe",
      definition: "v. 禁止；取缔",
      phonetic: "proʊˈskraɪb",
      example: "The policy proscribed the use of informal sources.",
      confusions: [{ word: "prescribe", definition: "v. 开药方；规定" }]
    },
    {
      word: "obviate",
      definition: "v. 排除；使无必要",
      phonetic: "ˈɑːbvieɪt",
      example: "Consistent practice obviates last-minute cramming.",
      confusions: [{ word: "deviate", definition: "v. 偏离；背离" }]
    },
    {
      word: "ephemeral",
      definition: "adj. 短暂的；转瞬即逝的",
      phonetic: "ɪˈfemərəl",
      example: "Ephemeral memory fades quickly without review.",
      confusions: [{ word: "eternal", definition: "adj. 永恒的" }]
    },
    {
      word: "vociferous",
      definition: "adj. 喧哗的；大声疾呼的",
      phonetic: "voʊˈsɪfərəs",
      example: "Vociferous critics demanded a better syllabus.",
      confusions: [{ word: "voracious", definition: "adj. 贪吃的；求知欲强的" }]
    },
    {
      word: "recalcitrant",
      definition: "adj. 桀骜不驯的；顽抗的",
      phonetic: "rɪˈkælsɪtrənt",
      example: "A recalcitrant habit resists sudden change.",
      confusions: [{ word: "reticent", definition: "adj. 寡言少语的；不愿透露的" }]
    },
    {
      word: "pellucid",
      definition: "adj. 清澈的；清晰易懂的",
      phonetic: "pəˈluːsɪd",
      example: "Her pellucid explanation clarified the theory.",
      confusions: [{ word: "recondite", definition: "adj. 深奥的；难懂的" }]
    },
    {
      word: "sedulous",
      definition: "adj. 勤奋的；刻苦的",
      phonetic: "ˈsedʒələs",
      example: "Sedulous effort eventually pays off in vocabulary building.",
      confusions: [{ word: "seditious", definition: "adj. 煽动性的；闹革命的" }]
    },
    {
      word: "castigate",
      definition: "v. 严厉批评；惩罚",
      phonetic: "ˈkæstɪɡeɪt",
      example: "The professor castigated plagiarism harshly.",
      confusions: [{ word: "extol", definition: "v. 赞美；颂扬" }]
    }
  ]
};

const PRACTICE_STAGES = [
  {
    id: "choice",
    pill: "形近辨析",
    title: "形近词释义选择",
    description: "从多个形近词释义中选出与本词匹配的一项，强化辨析力。"
  },
  {
    id: "judge",
    pill: "释义判断",
    title: "释义判断",
    description: "判断给出的释义是否对应当前单词，提升语义反应速度。"
  },
  {
    id: "spelling",
    pill: "拼写回忆",
    title: "拼写回忆",
    description: "根据释义拼写单词，完成从识记到输出的闭环。"
  }
];

const BATCH_SIZE = 10;

const state = {
  packName: "",
  packWords: [],
  batchIndex: 0,
  batchCount: 0,
  sessionWords: [],
  queue: [],
  current: null,
  locked: false,
  prompt: null,
  mistakes: new Map()
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  initPackOptions();
});

function cacheElements() {
  elements.packSelect = document.getElementById("word-pack");
  elements.prevBatch = document.getElementById("prev-batch");
  elements.nextBatch = document.getElementById("next-batch");
  elements.batchTitle = document.getElementById("batch-title");
  elements.batchProgress = document.getElementById("batch-progress");
  elements.wordCounter = document.getElementById("word-counter");
  elements.stagePill = document.getElementById("stage-pill");
  elements.stageTracker = document.getElementById("stage-tracker");
  elements.wordText = document.getElementById("word-text");
  elements.phoneticText = document.getElementById("phonetic-text");
  elements.stageTitle = document.getElementById("stage-title");
  elements.stageDescription = document.getElementById("stage-description");
  elements.choiceArea = document.getElementById("choice-area");
  elements.tfArea = document.getElementById("tf-area");
  elements.btnTrue = document.getElementById("btn-true");
  elements.btnFalse = document.getElementById("btn-false");
  elements.spellingArea = document.getElementById("spelling-area");
  elements.spellInput = document.getElementById("spell-input");
  elements.spellSubmit = document.getElementById("spell-submit");
  elements.feedback = document.getElementById("feedback");
  elements.replay = document.getElementById("replay-word");
  elements.skip = document.getElementById("skip-word");
  elements.wordList = document.getElementById("word-list");
  elements.mistakeList = document.getElementById("mistake-list");
}

function bindEvents() {
  elements.packSelect.addEventListener("change", () => {
    const name = elements.packSelect.value;
    preparePack(name);
  });

  elements.prevBatch.addEventListener("click", () => {
    if (state.batchIndex > 0) {
      startBatch(state.batchIndex - 1);
    }
  });

  elements.nextBatch.addEventListener("click", () => {
    if (state.batchIndex < state.batchCount - 1) {
      startBatch(state.batchIndex + 1);
    }
  });

  elements.btnTrue.addEventListener("click", () => handleJudgeAnswer(true));
  elements.btnFalse.addEventListener("click", () => handleJudgeAnswer(false));
  elements.spellSubmit.addEventListener("click", () => handleSpellingSubmit());
  elements.spellInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSpellingSubmit();
    }
  });

  elements.replay.addEventListener("click", showDefinitionHint);
  elements.skip.addEventListener("click", skipCurrentWord);
}

function initPackOptions() {
  const fragment = document.createDocumentFragment();
  Object.keys(WORD_PACKS).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    fragment.appendChild(option);
  });
  elements.packSelect.appendChild(fragment);
  const firstPack = Object.keys(WORD_PACKS)[0];
  elements.packSelect.value = firstPack;
  preparePack(firstPack);
}

function preparePack(name) {
  state.packName = name;
  const rawWords = WORD_PACKS[name] ?? [];
  state.packWords = rawWords.map((item, index) => ({
    ...item,
    id: `${name}-${index}`
  }));
  state.batchCount = Math.max(1, Math.ceil(state.packWords.length / BATCH_SIZE));
  startBatch(0);
}

function startBatch(batchIndex) {
  state.batchIndex = batchIndex;
  state.mistakes.clear();
  const start = batchIndex * BATCH_SIZE;
  const slice = state.packWords.slice(start, start + BATCH_SIZE);
  state.sessionWords = slice.map((item, index) => ({
    id: `${item.id}-${batchIndex}-${index}`,
    word: item.word,
    definition: item.definition,
    phonetic: item.phonetic ?? "",
    example: item.example ?? "",
    confusions: Array.isArray(item.confusions) ? [...item.confusions] : [],
    stage: 0,
    mistakes: 0
  }));
  state.queue = state.sessionWords.slice();
  shuffleArray(state.queue);
  state.current = state.queue.shift() ?? null;
  state.locked = false;
  state.prompt = null;
  updateBatchHeader();
  renderCurrent();
  updateWordList();
  updateMistakeList();
  updateBatchButtons();
}

function updateBatchButtons() {
  elements.prevBatch.disabled = state.batchIndex <= 0;
  elements.nextBatch.disabled = state.batchIndex >= state.batchCount - 1;
}

function updateBatchHeader() {
  const title = state.batchCount > 1 ? `第 ${state.batchIndex + 1} 组` : "本组词汇";
  elements.batchTitle.textContent = title;
  const finished = state.sessionWords.filter((word) => word.stage >= PRACTICE_STAGES.length).length;
  const total = state.sessionWords.length;
  elements.batchProgress.textContent = `${finished} / ${total} 完成`;
}

function renderCurrent() {
  const { current } = state;
  const total = state.sessionWords.length;
  const finished = state.sessionWords.filter((word) => word.stage >= PRACTICE_STAGES.length).length;

  if (!current) {
    elements.stagePill.textContent = "全部完成";
    elements.stageTracker.innerHTML = "";
    elements.wordText.textContent = total ? "本组已通关" : "暂无单词";
    elements.phoneticText.textContent = "";
    elements.stageTitle.textContent = total ? "干得漂亮！" : "请先添加词库";
    elements.stageDescription.textContent = total
      ? "可以切换下一组或重新开始巩固错词。"
      : "选择包含单词的词库开始训练。";
    elements.choiceArea.innerHTML = "";
    elements.tfArea.hidden = true;
    elements.spellingArea.hidden = true;
    elements.feedback.textContent = total
      ? "错题已加入右侧列表，随时复盘。"
      : "";
    elements.wordCounter.textContent = `${finished} / ${total}`;
    elements.skip.disabled = true;
    return;
  }

  const stage = PRACTICE_STAGES[current.stage];
  elements.stagePill.textContent = stage.pill;
  elements.stageTitle.textContent = stage.title;
  elements.stageDescription.textContent = stage.description;
  elements.wordText.textContent = current.word;
  elements.phoneticText.textContent = current.phonetic || "";
  elements.feedback.textContent = "";
  elements.wordCounter.textContent = `第 ${Math.min(finished + 1, total)} / ${total} 词`;

  renderStageTracker(current.stage);

  switch (stage.id) {
    case "choice":
      renderChoiceStage(current);
      break;
    case "judge":
      renderJudgeStage(current);
      break;
    case "spelling":
      renderSpellingStage(current);
      break;
    default:
      break;
  }

  state.locked = false;
  updateBatchHeader();
  updateWordList();
  elements.skip.disabled = state.queue.length === 0;
}

function renderStageTracker(activeIndex) {
  elements.stageTracker.innerHTML = "";
  PRACTICE_STAGES.forEach((stage, index) => {
    const dot = document.createElement("span");
    dot.className = "stage-dot";
    if (index < activeIndex) {
      dot.classList.add("completed");
    } else if (index === activeIndex) {
      dot.classList.add("active");
    }
    elements.stageTracker.appendChild(dot);
  });
}

function renderChoiceStage(word) {
  elements.choiceArea.hidden = false;
  elements.tfArea.hidden = true;
  elements.spellingArea.hidden = true;
  elements.choiceArea.innerHTML = "";
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}`;

  const options = buildChoiceOptions(word);
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.text;
    button.dataset.correct = option.correct ? "true" : "false";
    button.addEventListener("click", () => {
      if (state.locked) return;
      state.locked = true;
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("答对啦！继续下一关。", "success");
        transitionAfterChoice(true);
      } else {
        button.classList.add("wrong");
        highlightCorrectChoice();
        recordMistake(word, "choice", option.text);
        showFeedback("这不是本词释义，等会儿我们会再练一次。", "danger");
        transitionAfterChoice(false);
      }
    });
    elements.choiceArea.appendChild(button);
  });
}

function transitionAfterChoice(correct) {
  setTimeout(() => {
    if (correct) {
      advanceCurrentStage();
    } else {
      recycleCurrentWord();
    }
  }, 720);
}

function renderJudgeStage(word) {
  elements.choiceArea.hidden = true;
  elements.tfArea.hidden = false;
  elements.spellingArea.hidden = true;

  const isCorrect = Math.random() < 0.6;
  const definition = isCorrect ? word.definition : pickDistractorDefinition(word);
  state.prompt = {
    stage: "judge",
    isCorrect,
    definition
  };
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}<br><span class="definition-inline">释义：${definition}</span>`;
}

function handleJudgeAnswer(answer) {
  if (state.locked || !state.current || !state.prompt || state.prompt.stage !== "judge") {
    return;
  }
  state.locked = true;
  const correct = answer === state.prompt.isCorrect;
  if (correct) {
    showFeedback("判断准确！往更高层次迈进。", "success");
    setTimeout(() => advanceCurrentStage(), 640);
  } else {
    recordMistake(state.current, "judge", state.prompt.definition);
    showFeedback("判断有误，稍后继续巩固。", "danger");
    setTimeout(() => recycleCurrentWord(), 720);
  }
}

function renderSpellingStage(word) {
  elements.choiceArea.hidden = true;
  elements.tfArea.hidden = true;
  elements.spellingArea.hidden = false;
  elements.spellInput.value = "";
  try {
    elements.spellInput.focus({ preventScroll: true });
  } catch (error) {
    elements.spellInput.focus();
  }
  state.prompt = {
    stage: "spelling",
    answer: word.word.toLowerCase()
  };
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}<br><span class="definition-inline">释义：${word.definition}</span>`;
}

function handleSpellingSubmit() {
  if (state.locked || !state.current || !state.prompt || state.prompt.stage !== "spelling") {
    return;
  }
  const input = elements.spellInput.value.trim();
  if (!input) {
    showFeedback("先尝试拼写一下吧～", "warning");
    return;
  }
  state.locked = true;
  const answer = state.prompt.answer;
  if (input.toLowerCase() === answer) {
    showFeedback("太棒了！本词已完成所有练习。", "success");
    setTimeout(() => advanceCurrentStage(), 640);
  } else {
    recordMistake(state.current, "spelling", input);
    showFeedback(`正确拼写是 ${state.current.word}，再试一次。`, "danger");
    setTimeout(() => recycleCurrentWord(), 720);
  }
}

function advanceCurrentStage() {
  if (!state.current) return;
  state.current.stage += 1;
  if (state.current.stage >= PRACTICE_STAGES.length) {
    state.current.stage = PRACTICE_STAGES.length;
    state.current.completedAt = Date.now();
    state.current = state.queue.shift() ?? null;
  }
  state.locked = false;
  renderCurrent();
}

function recycleCurrentWord() {
  if (!state.current) return;
  state.queue.push(state.current);
  state.current = state.queue.shift() ?? null;
  state.locked = false;
  renderCurrent();
  updateMistakeList();
}

function skipCurrentWord() {
  if (!state.current || state.queue.length === 0) return;
  state.queue.push(state.current);
  state.current = state.queue.shift() ?? null;
  renderCurrent();
}

function buildChoiceOptions(word) {
  const options = [
    { text: word.definition, correct: true }
  ];
  const used = new Set([word.definition]);
  if (Array.isArray(word.confusions)) {
    word.confusions.forEach((confuse) => {
      if (!used.has(confuse.definition)) {
        options.push({ text: confuse.definition, correct: false });
        used.add(confuse.definition);
      }
    });
  }
  const pool = state.sessionWords
    .filter((item) => item.word !== word.word)
    .flatMap((item) => [item.definition, ...(item.confusions || []).map((conf) => conf.definition)])
    .filter((definition) => !used.has(definition));
  shuffleArray(pool);
  while (options.length < 4 && pool.length) {
    options.push({ text: pool.shift(), correct: false });
  }
  shuffleArray(options);
  return options;
}

function highlightCorrectChoice() {
  [...elements.choiceArea.querySelectorAll(".choice-button")].forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}

function pickDistractorDefinition(word) {
  const pool = [];
  if (Array.isArray(word.confusions)) {
    word.confusions.forEach((item) => pool.push(item.definition));
  }
  state.sessionWords.forEach((item) => {
    if (item.word !== word.word) {
      pool.push(item.definition);
      (item.confusions || []).forEach((conf) => pool.push(conf.definition));
    }
  });
  const filtered = pool.filter((definition) => definition !== word.definition);
  return filtered.length ? filtered[Math.floor(Math.random() * filtered.length)] : word.definition;
}

function showFeedback(text, type = "info") {
  elements.feedback.textContent = text;
  elements.feedback.style.color =
    type === "success"
      ? "#bbf7d0"
      : type === "danger"
      ? "#fecaca"
      : type === "warning"
      ? "#facc15"
      : "var(--text-secondary)";
}

function showDefinitionHint() {
  if (!state.current) return;
  const confusions = (state.current.confusions || [])
    .map((item) => `${item.word}: ${item.definition}`)
    .join("；");
  const hint = `释义：${state.current.definition}${confusions ? `\n形近词提示：${confusions}` : ""}`;
  showFeedback(hint, "info");
}

function updateWordList() {
  elements.wordList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  state.sessionWords.forEach((item) => {
    const li = document.createElement("li");
    li.className = "word-item";
    const name = document.createElement("span");
    name.textContent = item.word;
    const status = document.createElement("span");
    status.className = "status";
    if (item.stage >= PRACTICE_STAGES.length) {
      status.textContent = "已完成";
      status.classList.add("mastered");
    } else if (state.current && item.id === state.current.id) {
      status.textContent = `第 ${item.stage + 1} 关`;
      status.classList.add("active");
    } else if (item.mistakes > 0) {
      status.textContent = `复习 ${item.mistakes}`;
      status.classList.add("retry");
    } else {
      status.textContent = "待学习";
      status.classList.add("pending");
    }
    li.appendChild(name);
    li.appendChild(status);
    fragment.appendChild(li);
  });
  elements.wordList.appendChild(fragment);
  updateBatchHeader();
}

function recordMistake(word, stageId, detail) {
  const key = word.word;
  const entry = state.mistakes.get(key) || {
    word: word.word,
    definition: word.definition,
    count: 0,
    lastStage: stageId,
    lastAnswer: detail
  };
  entry.count += 1;
  entry.lastStage = stageId;
  entry.lastAnswer = detail;
  state.mistakes.set(key, entry);
  word.mistakes += 1;
  updateMistakeList();
  updateWordList();
}

function updateMistakeList() {
  elements.mistakeList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const items = Array.from(state.mistakes.values()).sort((a, b) => b.count - a.count);
  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "word-item";
    empty.textContent = "暂无错题，继续保持！";
    fragment.appendChild(empty);
  } else {
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "word-item";
      const name = document.createElement("span");
      name.textContent = item.word;
      const detail = document.createElement("span");
      detail.className = "status retry";
      const stageName = PRACTICE_STAGES.find((stage) => stage.id === item.lastStage)?.pill || "错题";
      detail.textContent = `${stageName} ×${item.count}`;
      li.title = `正确释义：${item.definition}${item.lastAnswer ? `\n最近回答：${item.lastAnswer}` : ""}`;
      li.appendChild(name);
      li.appendChild(detail);
      fragment.appendChild(li);
    });
  }
  elements.mistakeList.appendChild(fragment);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
