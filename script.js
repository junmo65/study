const WORD_PACKS = {
  "考研词汇": [
    {
      word: "ameliorate",
      definition: "v. 改善；使好转",
      phonetic: "əˈmiːliəreɪt",
      example: "A well-structured review plan can ameliorate exam anxiety.",
      confusions: [
        { word: "deteriorate", definition: "v. 恶化；退化" },
        { word: "alleviate", definition: "v. 缓解；减轻" },
        { word: "mitigate", definition: "v. 缓和；减轻" }
      ]
    },
    {
      word: "meticulous",
      definition: "adj. 一丝不苟的；严谨的",
      phonetic: "məˈtɪkjələs",
      example: "She kept meticulous notes of every practice test.",
      confusions: [
        { word: "fastidious", definition: "adj. 挑剔的；极其注意细节的" },
        { word: "scrupulous", definition: "adj. 严谨认真的；一丝不苟的" },
        { word: "methodical", definition: "adj. 有条理的；井井有条的" }
      ]
    },
    {
      word: "exacerbate",
      definition: "v. 使恶化；使加剧",
      phonetic: "ɪɡˈzæsəbeɪt",
      example: "Skipping reviews will exacerbate the forgetting problem.",
      confusions: [
        { word: "exasperate", definition: "v. 激怒；使恼怒" },
        { word: "aggravate", definition: "v. 使加重；加剧" },
        { word: "excavate", definition: "v. 挖掘；开凿" }
      ]
    },
    {
      word: "pragmatic",
      definition: "adj. 务实的；讲求实际的",
      phonetic: "præɡˈmætɪk",
      example: "A pragmatic learner blends flashcards with writing practice.",
      confusions: [
        { word: "dogmatic", definition: "adj. 教条的；武断的" },
        { word: "programmatic", definition: "adj. 程序化的；规划性的" },
        { word: "practicable", definition: "adj. 可行的；能实行的" }
      ]
    },
    {
      word: "delineate",
      definition: "v. 描述；勾画轮廓",
      phonetic: "dɪˈlɪnieɪt",
      example: "The teacher delineated the key grammar points in detail.",
      confusions: [
        { word: "eliminate", definition: "v. 消除；淘汰" },
        { word: "deliberate", definition: "v. 深思熟虑；adj. 故意的" },
        { word: "alienate", definition: "v. 疏远；离间" }
      ]
    },
    {
      word: "ubiquitous",
      definition: "adj. 无处不在的；普遍存在的",
      phonetic: "juːˈbɪkwɪtəs",
      example: "Mobile apps make ubiquitous learning possible.",
      confusions: [
        { word: "unique", definition: "adj. 独一无二的" },
        { word: "oblivious", definition: "adj. 遗忘的；未察觉的" },
        { word: "ambiguous", definition: "adj. 模棱两可的；含糊的" }
      ]
    },
    {
      word: "pertinent",
      definition: "adj. 相关的；中肯的",
      phonetic: "ˈpɜːrtɪnənt",
      example: "Only pertinent examples are kept in the final notes.",
      confusions: [
        { word: "impertinent", definition: "adj. 无礼的；不相关的" },
        { word: "penitent", definition: "adj. 忏悔的；悔过的" },
        { word: "perturb", definition: "v. 使不安；扰乱" }
      ]
    },
    {
      word: "alleviate",
      definition: "v. 缓解；减轻",
      phonetic: "əˈliːvieɪt",
      example: "Regular breaks can alleviate fatigue during revision.",
      confusions: [
        { word: "aggravate", definition: "v. 加重；恶化" },
        { word: "elevate", definition: "v. 提升；举起" },
        { word: "levitate", definition: "v. 升空；悬浮" }
      ]
    },
    {
      word: "galvanize",
      definition: "v. 激励；通电镀锌",
      phonetic: "ˈɡælvənaɪz",
      example: "The looming exam date galvanized her to study harder.",
      confusions: [
        { word: "paralyze", definition: "v. 使瘫痪；使麻痹" },
        { word: "vulcanize", definition: "v. 硫化；硫化处理" },
        { word: "aggrandize", definition: "v. 扩张；夸大" }
      ]
    },
    {
      word: "consolidate",
      definition: "v. 巩固；合并",
      phonetic: "kənˈsɑːlɪdeɪt",
      example: "Daily review consolidates long-term memory.",
      confusions: [
        { word: "liquidate", definition: "v. 清算；变现" },
        { word: "insulate", definition: "v. 使隔离；绝缘" },
        { word: "consulate", definition: "n. 领事馆" }
      ]
    }
  ],
  "GRE词汇": [
    {
      word: "abrogate",
      definition: "v. 废除；撤销",
      phonetic: "ˈæbrəɡeɪt",
      example: "The committee voted to abrogate the outdated rule.",
      confusions: [
        { word: "arrogate", definition: "v. 冒称拥有；霸占" },
        { word: "abdicate", definition: "v. 退位；放弃权力" },
        { word: "aggregate", definition: "v. 聚合；总计" }
      ]
    },
    {
      word: "intransigent",
      definition: "adj. 不妥协的；固执的",
      phonetic: "ɪnˈtrænsɪdʒənt",
      example: "The negotiator faced an intransigent opponent.",
      confusions: [
        { word: "insurgent", definition: "n. 叛乱者；起义者" },
        { word: "stringent", definition: "adj. 严格的；紧缩的" },
        { word: "transient", definition: "adj. 短暂的；转瞬即逝的" }
      ]
    },
    {
      word: "proscribe",
      definition: "v. 禁止；取缔",
      phonetic: "proʊˈskraɪb",
      example: "The policy proscribed the use of informal sources.",
      confusions: [
        { word: "prescribe", definition: "v. 开药方；规定" },
        { word: "subscribe", definition: "v. 订阅；赞同" },
        { word: "describe", definition: "v. 描述；形容" }
      ]
    },
    {
      word: "obviate",
      definition: "v. 排除；使无必要",
      phonetic: "ˈɑːbvieɪt",
      example: "Consistent practice obviates last-minute cramming.",
      confusions: [
        { word: "deviate", definition: "v. 偏离；背离" },
        { word: "obligate", definition: "v. 强迫；使负义务" },
        { word: "oblate", definition: "adj. 扁圆的；球形扁平的" }
      ]
    },
    {
      word: "ephemeral",
      definition: "adj. 短暂的；转瞬即逝的",
      phonetic: "ɪˈfemərəl",
      example: "Ephemeral memory fades quickly without review.",
      confusions: [
        { word: "eternal", definition: "adj. 永恒的" },
        { word: "ethereal", definition: "adj. 飘渺的；超凡的" },
        { word: "empirical", definition: "adj. 经验主义的；以经验为依据的" }
      ]
    },
    {
      word: "vociferous",
      definition: "adj. 喧哗的；大声疾呼的",
      phonetic: "voʊˈsɪfərəs",
      example: "Vociferous critics demanded a better syllabus.",
      confusions: [
        { word: "voracious", definition: "adj. 贪吃的；求知欲强的" },
        { word: "ferocious", definition: "adj. 凶猛的；残暴的" },
        { word: "loquacious", definition: "adj. 健谈的；话多的" }
      ]
    },
    {
      word: "recalcitrant",
      definition: "adj. 桀骜不驯的；顽抗的",
      phonetic: "rɪˈkælsɪtrənt",
      example: "A recalcitrant habit resists sudden change.",
      confusions: [
        { word: "reticent", definition: "adj. 寡言少语的；不愿透露的" },
        { word: "recalibrate", definition: "v. 重新校准；重新调整" },
        { word: "recreant", definition: "adj. 懦弱的；背信弃义的" }
      ]
    },
    {
      word: "pellucid",
      definition: "adj. 清澈的；清晰易懂的",
      phonetic: "pəˈluːsɪd",
      example: "Her pellucid explanation clarified the theory.",
      confusions: [
        { word: "recondite", definition: "adj. 深奥的；难懂的" },
        { word: "translucent", definition: "adj. 半透明的" },
        { word: "pelagic", definition: "adj. 海洋的；远洋的" }
      ]
    },
    {
      word: "sedulous",
      definition: "adj. 勤奋的；刻苦的",
      phonetic: "ˈsedʒələs",
      example: "Sedulous effort eventually pays off in vocabulary building.",
      confusions: [
        { word: "seditious", definition: "adj. 煽动性的；闹革命的" },
        { word: "sedentary", definition: "adj. 久坐不动的" },
        { word: "seductive", definition: "adj. 诱惑的；迷人的" }
      ]
    },
    {
      word: "castigate",
      definition: "v. 严厉批评；惩罚",
      phonetic: "ˈkæstɪɡeɪt",
      example: "The professor castigated plagiarism harshly.",
      confusions: [
        { word: "extol", definition: "v. 赞美；颂扬" },
        { word: "castrate", definition: "v. 阉割；阉除" },
        { word: "investigate", definition: "v. 调查；研究" }
      ]
    }
  ]
};

const PRACTICE_STAGES = [
  {
    id: "shape",
    pill: "形近辨析",
    title: "形近词快速辨析",
    description: "先在 4 个形近词里锁定本词，不提前显示中文释义，考验英文敏感度。"
  },
  {
    id: "meaning",
    pill: "释义选择",
    title: "释义精准匹配",
    description: "结合上下文，在 4 个释义中选出最贴合的中文含义。"
  },
  {
    id: "spellingChoice",
    pill: "拼写选择",
    title: "拼写形态辨别",
    description: "从 4 个拼写形态中挑出正确写法，巩固字母顺序。"
  },
  {
    id: "spelling",
    pill: "拼写回忆",
    title: "完整拼写",
    description: "根据释义默写单词，完成从识记到输出的闭环。"
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
  mistakes: new Map(),
  dailyRecords: []
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
  elements.shapeArea = document.getElementById("shape-area");
  elements.meaningArea = document.getElementById("meaning-area");
  elements.spellingChoiceArea = document.getElementById("spelling-choice-area");
  elements.spellingArea = document.getElementById("spelling-area");
  elements.spellInput = document.getElementById("spell-input");
  elements.spellSubmit = document.getElementById("spell-submit");
  elements.feedback = document.getElementById("feedback");
  elements.revealArea = document.getElementById("reveal-area");
  elements.revealList = document.getElementById("reveal-list");
  elements.replay = document.getElementById("replay-word");
  elements.skip = document.getElementById("skip-word");
  elements.wordList = document.getElementById("word-list");
  elements.mistakeList = document.getElementById("mistake-list");
  elements.exportToday = document.getElementById("export-today");
  elements.exportLibrary = document.getElementById("export-library");
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

  elements.spellSubmit.addEventListener("click", () => handleSpellingSubmit());
  elements.spellInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSpellingSubmit();
    }
  });

  elements.replay.addEventListener("click", showDefinitionHint);
  elements.skip.addEventListener("click", skipCurrentWord);
  elements.exportToday.addEventListener("click", exportTodayExcel);
  elements.exportLibrary.addEventListener("click", exportLibraryExcel);
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
    hideAllStageAreas();
    elements.stagePill.textContent = "全部完成";
    elements.stageTracker.innerHTML = "";
    elements.wordText.textContent = total ? "本组已通关" : "暂无单词";
    elements.phoneticText.textContent = "";
    elements.stageTitle.textContent = total ? "干得漂亮！" : "请先添加词库";
    elements.stageDescription.textContent = total
      ? "可以切换下一组或重新开始巩固错词。"
      : "选择包含单词的词库开始训练。";
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

  state.prompt = null;
  hideAllStageAreas();

  switch (stage.id) {
    case "shape":
      renderShapeStage(current);
      break;
    case "meaning":
      renderMeaningStage(current);
      break;
    case "spellingChoice":
      renderSpellingChoiceStage(current);
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

function hideAllStageAreas() {
  elements.shapeArea.hidden = true;
  elements.meaningArea.hidden = true;
  elements.spellingChoiceArea.hidden = true;
  elements.spellingArea.hidden = true;
  elements.revealArea.hidden = true;
  elements.shapeArea.innerHTML = "";
  elements.meaningArea.innerHTML = "";
  elements.spellingChoiceArea.innerHTML = "";
  elements.revealList.innerHTML = "";
}

function renderShapeStage(word) {
  elements.shapeArea.hidden = false;
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}`;
  const options = buildShapeOptions(word);
  const fragment = document.createDocumentFragment();
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.word;
    button.dataset.correct = option.correct ? "true" : "false";
    button.addEventListener("click", () => {
      if (state.locked) return;
      state.locked = true;
      highlightCorrectButtons(elements.shapeArea);
      showRevealPanel(options);
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("辨析准确！来看释义。", "success");
        scheduleStageTransition(true);
      } else {
        button.classList.add("wrong");
        recordMistake(word, "shape", option.word);
        showFeedback("再对照一下形近词，稍后继续巩固。", "danger");
        scheduleStageTransition(false);
      }
    });
    fragment.appendChild(button);
  });
  elements.shapeArea.appendChild(fragment);
}

function renderMeaningStage(word) {
  elements.meaningArea.hidden = false;
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}`;
  const options = buildMeaningOptions(word);
  const fragment = document.createDocumentFragment();
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.text;
    button.dataset.correct = option.correct ? "true" : "false";
    button.addEventListener("click", () => {
      if (state.locked) return;
      state.locked = true;
      highlightCorrectButtons(elements.meaningArea);
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("释义匹配成功，继续加油！", "success");
        scheduleStageTransition(true);
      } else {
        button.classList.add("wrong");
        recordMistake(word, "meaning", option.text);
        showFeedback("释义没对上，我们再练一次。", "danger");
        scheduleStageTransition(false);
      }
    });
    fragment.appendChild(button);
  });
  elements.meaningArea.appendChild(fragment);
}

function renderSpellingChoiceStage(word) {
  elements.spellingChoiceArea.hidden = false;
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}`;
  const options = buildSpellingChoiceOptions(word);
  const fragment = document.createDocumentFragment();
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.text;
    button.dataset.correct = option.correct ? "true" : "false";
    button.addEventListener("click", () => {
      if (state.locked) return;
      state.locked = true;
      highlightCorrectButtons(elements.spellingChoiceArea);
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("拼写形态辨识正确！", "success");
        scheduleStageTransition(true);
      } else {
        button.classList.add("wrong");
        recordMistake(word, "spellingChoice", option.text);
        showFeedback("正确拼写不是这个，稍后我们再来。", "danger");
        scheduleStageTransition(false);
      }
    });
    fragment.appendChild(button);
  });
  elements.spellingChoiceArea.appendChild(fragment);
}

function scheduleStageTransition(correct) {
  setTimeout(() => {
    if (correct) {
      advanceCurrentStage();
    } else {
      recycleCurrentWord();
    }
  }, 720);
}

function renderSpellingStage(word) {
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
  showRevealPanel([
    { word: word.word, definition: word.definition, correct: true },
    ...collectWordDistractors(word, 2)
  ]);
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
    recordCompletion(state.current);
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

function buildShapeOptions(word) {
  const distractors = collectWordDistractors(word, 3);
  const options = [
    { word: word.word, definition: word.definition, correct: true },
    ...distractors.map((item) => ({
      word: item.word,
      definition: item.definition || "（暂无释义）",
      correct: false
    }))
  ];
  shuffleArray(options);
  return options;
}

function buildMeaningOptions(word) {
  const distractors = collectMeaningDistractors(word, 3);
  const options = [
    { text: word.definition, correct: true },
    ...distractors.map((definition) => ({ text: definition, correct: false }))
  ];
  shuffleArray(options);
  return options;
}

function buildSpellingChoiceOptions(word) {
  const base = (word.word || "").trim().toLowerCase();
  const variants = new Set([base]);
  let guard = 0;
  while (variants.size < 4 && guard < 48) {
    const candidate = createWordVariant(base);
    if (candidate && !variants.has(candidate)) {
      variants.add(candidate);
    }
    guard += 1;
  }
  const array = Array.from(variants).map((variant) => ({
    text: variant,
    correct: variant === base
  }));
  shuffleArray(array);
  return array;
}

function createWordVariant(base) {
  const letters = base.split("");
  if (letters.length <= 2) {
    return `${base}${base.slice(-1)}`;
  }
  const operations = ["swap", "replace", "drop", "insert"];
  const op = operations[Math.floor(Math.random() * operations.length)];
  switch (op) {
    case "swap": {
      const index = Math.floor(Math.random() * (letters.length - 1));
      const clone = [...letters];
      [clone[index], clone[index + 1]] = [clone[index + 1], clone[index]];
      const result = clone.join("");
      if (result !== base) return result;
      break;
    }
    case "replace": {
      const index = Math.floor(Math.random() * letters.length);
      const clone = [...letters];
      const replacement = getRandomLetter(clone[index]);
      clone[index] = replacement;
      const result = clone.join("");
      if (result !== base) return result;
      break;
    }
    case "drop": {
      if (letters.length <= 3) break;
      const index = Math.floor(Math.random() * letters.length);
      const clone = letters.filter((_, idx) => idx !== index);
      const result = clone.join("");
      if (result !== base && result.length) return result;
      break;
    }
    case "insert": {
      const index = Math.floor(Math.random() * (letters.length + 1));
      const clone = [...letters];
      clone.splice(index, 0, getRandomLetter());
      const result = clone.join("");
      if (result !== base) return result;
      break;
    }
    default:
      break;
  }
  return `${base}${getRandomLetter()}`;
}

function getRandomLetter(exclude) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  if (exclude) {
    let guard = 0;
    while (letter === exclude && guard < 26) {
      letter = alphabet[Math.floor(Math.random() * alphabet.length)];
      guard += 1;
    }
  }
  return letter;
}

function highlightCorrectButtons(container) {
  container.querySelectorAll(".choice-button").forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}

function showRevealPanel(entries) {
  if (!entries || !entries.length) {
    elements.revealArea.hidden = true;
    elements.revealList.innerHTML = "";
    return;
  }
  const fragment = document.createDocumentFragment();
  entries.forEach((entry) => {
    const li = document.createElement("li");
    if (entry.correct) {
      li.classList.add("correct");
    }
    const wordSpan = document.createElement("strong");
    wordSpan.textContent = entry.word;
    const definitionSpan = document.createElement("span");
    definitionSpan.textContent = entry.definition || "（暂无释义）";
    li.appendChild(wordSpan);
    li.appendChild(definitionSpan);
    fragment.appendChild(li);
  });
  elements.revealList.innerHTML = "";
  elements.revealList.appendChild(fragment);
  elements.revealArea.hidden = false;
}

function collectWordDistractors(word, desired) {
  const results = [];
  const used = new Set([word.word?.toLowerCase()]);
  if (Array.isArray(word.confusions)) {
    const pool = [...word.confusions];
    shuffleArray(pool);
    pool.forEach((item) => {
      const key = item.word?.toLowerCase();
      if (key && !used.has(key) && results.length < desired) {
        results.push({ word: item.word, definition: item.definition });
        used.add(key);
      }
    });
  }
  if (results.length < desired) {
    const poolSource = Array.isArray(state.packWords) ? state.packWords : [];
    const pool = poolSource
      .filter((item) => item.word.toLowerCase() !== word.word.toLowerCase())
      .map((item) => ({ word: item.word, definition: item.definition }));
    shuffleArray(pool);
    pool.forEach((item) => {
      const key = item.word?.toLowerCase();
      if (key && !used.has(key) && results.length < desired) {
        results.push({ word: item.word, definition: item.definition });
        used.add(key);
      }
    });
  }
  return results.slice(0, desired);
}

function collectMeaningDistractors(word, desired) {
  const results = [];
  const used = new Set([word.definition]);
  if (Array.isArray(word.confusions)) {
    const pool = [...word.confusions];
    shuffleArray(pool);
    pool.forEach((item) => {
      if (item.definition && !used.has(item.definition) && results.length < desired) {
        results.push(item.definition);
        used.add(item.definition);
      }
    });
  }
  if (results.length < desired) {
    const poolSource = Array.isArray(state.packWords) ? state.packWords : [];
    const pool = poolSource
      .filter((item) => item.word !== word.word)
      .flatMap((item) => [item.definition, ...(item.confusions || []).map((conf) => conf.definition)])
      .filter(Boolean);
    shuffleArray(pool);
    pool.forEach((definition) => {
      if (!used.has(definition) && results.length < desired) {
        results.push(definition);
        used.add(definition);
      }
    });
  }
  return results.slice(0, desired);
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
  const entries = [
    { word: state.current.word, definition: state.current.definition, correct: true },
    ...collectWordDistractors(state.current, 3)
  ];
  showRevealPanel(entries);
  showFeedback("已展示当前单词与形近词释义对照。", "info");
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

function recordCompletion(word) {
  const now = new Date();
  const entry = {
    word: word.word,
    definition: word.definition,
    phonetic: word.phonetic || "",
    pack: state.packName,
    mistakes: word.mistakes,
    completedAt: now,
    dateKey: formatDateKey(now)
  };
  const existingIndex = state.dailyRecords.findIndex(
    (item) => item.word === entry.word && item.dateKey === entry.dateKey && item.pack === entry.pack
  );
  if (existingIndex >= 0) {
    state.dailyRecords[existingIndex] = entry;
  } else {
    state.dailyRecords.push(entry);
  }
}

function exportTodayExcel() {
  if (typeof XLSX === "undefined") {
    showFeedback("未能加载 Excel 库，请稍后重试。", "danger");
    return;
  }
  const todayKey = formatDateKey(new Date());
  const records = state.dailyRecords.filter((item) => item.dateKey === todayKey);
  if (!records.length) {
    showFeedback("今日尚未完成任何单词，先练习一组吧！", "warning");
    return;
  }
  const rows = records.map((item, index) => ({
    序号: index + 1,
    单词: item.word,
    音标: item.phonetic,
    中文释义: item.definition,
    所属词库: item.pack,
    错误次数: item.mistakes,
    完成时间: formatDateTime(item.completedAt)
  }));
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, "今日学习");
  const filename = `今日单词_${todayKey}.xlsx`;
  XLSX.writeFile(workbook, filename);
  showFeedback(`已导出 ${records.length} 个单词的学习记录。`, "success");
}

function exportLibraryExcel() {
  if (typeof XLSX === "undefined") {
    showFeedback("未能加载 Excel 库，请稍后重试。", "danger");
    return;
  }
  const workbook = XLSX.utils.book_new();
  Object.entries(WORD_PACKS).forEach(([name, words]) => {
    const rows = words.map((item, index) => ({
      序号: index + 1,
      单词: item.word,
      音标: item.phonetic || "",
      中文释义: item.definition,
      例句: item.example || "",
      形近词1: item.confusions?.[0]?.word || "",
      释义1: item.confusions?.[0]?.definition || "",
      形近词2: item.confusions?.[1]?.word || "",
      释义2: item.confusions?.[1]?.definition || "",
      形近词3: item.confusions?.[2]?.word || "",
      释义3: item.confusions?.[2]?.definition || ""
    }));
    const sheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, sheet, name.slice(0, 28));
  });
  const filename = `词库总览_${formatDateKey(new Date())}.xlsx`;
  XLSX.writeFile(workbook, filename);
  showFeedback("词库 Excel 已准备好，快去查收～", "success");
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
  const actual = date instanceof Date ? date : new Date(date);
  const hours = `${actual.getHours()}`.padStart(2, "0");
  const minutes = `${actual.getMinutes()}`.padStart(2, "0");
  return `${formatDateKey(actual)} ${hours}:${minutes}`;
}
