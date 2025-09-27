const WORD_PACKS = {
  "高频词汇": [
    { word: "abandon", definition: "v. 抛弃；放弃" },
    { word: "benevolent", definition: "adj. 仁慈的；慈善的" },
    { word: "crucial", definition: "adj. 至关重要的" },
    { word: "dazzle", definition: "v. 使眼花缭乱；使赞叹" },
    { word: "elaborate", definition: "adj. 精心制作的；v. 详尽说明" },
    { word: "fluctuate", definition: "v. 波动；起伏" },
    { word: "gratify", definition: "v. 使满足；使高兴" },
    { word: "hypothesis", definition: "n. 假设；假说" },
    { word: "intact", definition: "adj. 完好无损的" },
    { word: "jubilant", definition: "adj. 欢欣鼓舞的" }
  ],
  "雅思词汇": [
    { word: "allocate", definition: "v. 分配；拨给" },
    { word: "burgeoning", definition: "adj. 迅速发展的" },
    { word: "coherent", definition: "adj. 连贯的；条理清楚的" },
    { word: "deplete", definition: "v. 耗尽；用尽" },
    { word: "equivalent", definition: "adj. 相等的；等值的" },
    { word: "feasible", definition: "adj. 可行的" },
    { word: "gregarious", definition: "adj. 群居的；合群的" },
    { word: "hinder", definition: "v. 阻碍；妨碍" },
    { word: "imminent", definition: "adj. 即将发生的" },
    { word: "lucrative", definition: "adj. 有利可图的" }
  ],
  "六级词汇": [
    { word: "meticulous", definition: "adj. 一丝不苟的" },
    { word: "negotiate", definition: "v. 谈判；协商" },
    { word: "omit", definition: "v. 省略；遗漏" },
    { word: "plausible", definition: "adj. 貌似合理的" },
    { word: "retrospect", definition: "n. 回顾；追溯" },
    { word: "safeguard", definition: "v. 保护；捍卫" },
    { word: "tangible", definition: "adj. 可触摸的；实际的" },
    { word: "unveil", definition: "v. 揭幕；公布" },
    { word: "versatile", definition: "adj. 多才多艺的；多功能的" },
    { word: "withstand", definition: "v. 承受；经受住" }
  ]
};

const wordPackSelect = document.querySelector("#word-pack");
const shuffleBtn = document.querySelector("#shuffle");
const showDefinitionBtn = document.querySelector("#show-definition");
const markRememberedBtn = document.querySelector("#mark-remembered");
const nextWordBtn = document.querySelector("#next-word");
const wordElement = document.querySelector("#word");
const definitionElement = document.querySelector("#definition");
const progressCount = document.querySelector("#progress-count");
const totalCount = document.querySelector("#total-count");
const progressFill = document.querySelector("#progress-fill");
const wordListElement = document.querySelector("#word-list");

let currentPack = [];
let currentIndex = 0;
let rememberedSet = new Set();

function initWordPacks() {
  Object.keys(WORD_PACKS).forEach((packName, index) => {
    const option = document.createElement("option");
    option.value = packName;
    option.textContent = `${packName}（${WORD_PACKS[packName].length} 词）`;
    if (index === 0) option.selected = true;
    wordPackSelect.appendChild(option);
  });

  loadPack(wordPackSelect.value);
}

function loadPack(packName) {
  currentPack = [...WORD_PACKS[packName]];
  currentIndex = 0;
  rememberedSet = new Set();
  totalCount.textContent = currentPack.length;
  updateProgress();
  renderWordList();
  displayCurrentWord();
}

function shufflePack() {
  for (let i = currentPack.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentPack[i], currentPack[j]] = [currentPack[j], currentPack[i]];
  }
  currentIndex = 0;
  displayCurrentWord();
  renderWordList();
}

function displayCurrentWord() {
  if (!currentPack.length) {
    wordElement.textContent = "词库为空";
    definitionElement.textContent = "请选择其他词库";
    return;
  }

  const current = currentPack[currentIndex];
  wordElement.textContent = current.word;
  definitionElement.textContent = "点击“显示释义”查看";
  showDefinitionBtn.disabled = false;
}

function showDefinition() {
  const current = currentPack[currentIndex];
  definitionElement.textContent = current.definition;
  showDefinitionBtn.disabled = true;
}

function nextWord() {
  if (!currentPack.length) return;
  currentIndex = (currentIndex + 1) % currentPack.length;
  displayCurrentWord();
}

function markRemembered() {
  if (!currentPack.length) return;
  const current = currentPack[currentIndex];
  rememberedSet.add(current.word);
  updateProgress();
  renderWordList();
  nextWord();
}

function updateProgress() {
  const total = currentPack.length;
  const remembered = rememberedSet.size;
  progressCount.textContent = remembered;
  totalCount.textContent = total;
  const percent = total === 0 ? 0 : Math.round((remembered / total) * 100);
  progressFill.style.width = `${percent}%`;
  progressFill.setAttribute("aria-valuenow", percent);
}

function renderWordList() {
  wordListElement.innerHTML = "";
  currentPack.forEach(({ word, definition }) => {
    const li = document.createElement("li");
    li.className = "word-item";
    if (rememberedSet.has(word)) {
      li.classList.add("remembered");
    }

    const info = document.createElement("div");
    info.className = "info";

    const wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    info.appendChild(wordSpan);

    const definitionSpan = document.createElement("span");
    definitionSpan.textContent = definition;
    definitionSpan.className = "status";
    info.appendChild(definitionSpan);

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = rememberedSet.has(word) ? "✅ 已掌握" : "⏳ 待学习";

    li.appendChild(info);
    li.appendChild(status);
    wordListElement.appendChild(li);
  });
}

wordPackSelect.addEventListener("change", (event) => {
  loadPack(event.target.value);
});

shuffleBtn.addEventListener("click", () => {
  shufflePack();
});

showDefinitionBtn.addEventListener("click", () => {
  showDefinition();
});

nextWordBtn.addEventListener("click", () => {
  nextWord();
});

markRememberedBtn.addEventListener("click", () => {
  markRemembered();
});

initWordPacks();
