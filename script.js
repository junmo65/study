const DEFAULT_WORD_PACKS = {
  "考研词汇": [
    {
      word: "ameliorate",
      definition: "v. 改善；使好转",
      phonetic: "əˈmiːliəreɪt",
      example: "A well-structured review plan can ameliorate exam anxiety.",
      exampleCN: "结构良好的复习计划可以缓解考试焦虑。",
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
      exampleCN: "她把每次模考的笔记都整理得一丝不苟。",
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
      exampleCN: "跳过复习会让遗忘问题更加严重。",
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
      exampleCN: "务实的学习者会把闪卡与写作训练结合起来。",
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
      exampleCN: "老师把关键语法点讲解得清清楚楚。",
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
      exampleCN: "移动应用让随时随地的学习成为可能。",
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
      exampleCN: "最终的笔记里只保留最相关的例子。",
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
      exampleCN: "定期休息能缓解复习时的疲劳。",
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
      exampleCN: "临近的考试日期激励她更加努力学习。",
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
      exampleCN: "每天复习能巩固长期记忆。",
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
      exampleCN: "委员会投票废除了那条过时的规定。",
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
      exampleCN: "谈判者面对一个毫不妥协的对手。",
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
      exampleCN: "政策明令禁止使用非正式来源。",
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
      exampleCN: "坚持练习能免去临时抱佛脚的需要。",
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
      exampleCN: "短暂的记忆如果不复习很快就会消失。",
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
      exampleCN: "喧闹的批评者要求一份更好的课程大纲。",
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
      exampleCN: "顽固的习惯难以突然改变。",
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
      exampleCN: "她清晰的讲解让这条理论豁然开朗。",
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
      exampleCN: "持之以恒的努力最终会在词汇学习上得到回报。",
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
      exampleCN: "教授对抄袭行为进行了严厉的斥责。",
      confusions: [
        { word: "extol", definition: "v. 赞美；颂扬" },
        { word: "castrate", definition: "v. 阉割；阉除" },
        { word: "investigate", definition: "v. 调查；研究" }
      ]
    }
  ]
};


const CSV_PACK_MANIFEST_PATH = "data/wordpacks.json";
const DEFAULT_CSV_PACKS = [
  { name: "考研词汇", path: "data/kaoyan_words.csv" },
  { name: "GRE词汇", path: "data/gre_words.csv" }
];

const XLSX_MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const XLSX_REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const PACKAGE_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships";
const CORE_PROPS_NS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
const EXT_PROPS_NS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
const V_TYPES_NS = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes";

function base64ToArrayBuffer(base64) {
  const cleaned = base64.replace(/\s+/g, "");
  let binary;
  if (typeof atob === "function") {
    binary = atob(cleaned);
  } else if (typeof Buffer !== "undefined") {
    binary = Buffer.from(cleaned, "base64").toString("binary");
  } else {
    throw new Error("当前环境不支持 Base64 解码。");
  }
  const length = binary.length;
  const bytes = new Uint8Array(length);
  for (let index = 0; index < length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}

function readUint16LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint32LE(bytes, offset) {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  ) >>> 0;
}

function findEndOfCentralDirectory(bytes) {
  const minOffset = Math.max(0, bytes.length - 0xffff - 22);
  for (let offset = bytes.length - 22; offset >= minOffset; offset -= 1) {
    if (readUint32LE(bytes, offset) === 0x06054b50) {
      return offset;
    }
  }
  throw new Error("未找到 ZIP 中央目录结尾记录");
}

async function inflateRaw(bytes) {
  if (typeof DecompressionStream === "function") {
    const stream = new DecompressionStream("deflate-raw");
    const input = new Blob([bytes]).stream();
    const decompressed = input.pipeThrough(stream);
    const buffer = await new Response(decompressed).arrayBuffer();
    return new Uint8Array(buffer);
  }

  const fallback = inflateRawFallback(bytes);
  if (fallback) {
    return fallback;
  }

  throw new Error("当前环境缺少解压 deflate 的能力，请使用现代浏览器或保存为无压缩格式");
}

function inflateRawFallback(bytes) {
  try {
    const pure = inflateRawPureJS(bytes);
    if (pure) {
      return pure;
    }
    if (typeof pako !== "undefined" && typeof pako.inflateRaw === "function") {
      const result = pako.inflateRaw(bytes, { to: "uint8array" });
      return result instanceof Uint8Array ? result : new Uint8Array(result);
    }
    if (typeof window !== "undefined" && window.pako?.inflateRaw) {
      const result = window.pako.inflateRaw(bytes, { to: "uint8array" });
      return result instanceof Uint8Array ? result : new Uint8Array(result);
    }
    if (typeof require === "function") {
      try {
        const zlib = require("zlib");
        if (zlib?.inflateRawSync) {
          const buffer = typeof Buffer !== "undefined" ? Buffer.from(bytes) : bytes;
          const result = zlib.inflateRawSync(buffer);
          return result instanceof Uint8Array ? result : new Uint8Array(result);
        }
      } catch (error) {
        console.warn("Node zlib 解压失败", error);
      }
    }
  } catch (error) {
    console.warn("外部 pako 解压失败", error);
  }
  return null;
}

function inflateRawPureJS(bytes) {
  try {
    const input = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    let position = 0;
    let bitBuffer = 0;
    let bitLength = 0;

    const LENGTH_BASE = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
      67, 83, 99, 115, 131, 163, 195, 227, 258
    ];
    const LENGTH_EXTRA = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0
    ];
    const DIST_BASE = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
      769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577
    ];
    const DIST_EXTRA = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13
    ];

    const outputInitialSize = Math.max(1024, input.length * 2);
    let output = new Uint8Array(outputInitialSize);
    let outPos = 0;

    function ensureBits(count) {
      while (bitLength < count) {
        if (position >= input.length) {
          throw new Error("deflate 数据意外结束");
        }
        bitBuffer |= input[position] << bitLength;
        position += 1;
        bitLength += 8;
      }
    }

    function readBits(count) {
      if (count === 0) return 0;
      ensureBits(count);
      const mask = (1 << count) - 1;
      const value = bitBuffer & mask;
      bitBuffer >>>= count;
      bitLength -= count;
      return value;
    }

    function alignToByte() {
      bitBuffer = 0;
      bitLength = 0;
    }

    function ensureOutputCapacity(additional) {
      if (outPos + additional <= output.length) {
        return;
      }
      let newLength = output.length * 2;
      while (outPos + additional > newLength) {
        newLength *= 2;
      }
      const next = new Uint8Array(newLength);
      next.set(output.subarray(0, outPos));
      output = next;
    }

    function writeByte(value) {
      ensureOutputCapacity(1);
      output[outPos] = value;
      outPos += 1;
    }

    function copyFromDistance(distance, length) {
      if (distance < 1 || distance > outPos) {
        throw new Error("deflate 距离码非法");
      }
      ensureOutputCapacity(length);
      let sourceIndex = outPos - distance;
      for (let i = 0; i < length; i += 1) {
        output[outPos] = output[sourceIndex];
        outPos += 1;
        sourceIndex += 1;
        if (sourceIndex >= outPos) {
          sourceIndex = outPos - distance;
        }
      }
    }

    function buildHuffmanTable(lengths) {
      let maxBits = 0;
      for (let i = 0; i < lengths.length; i += 1) {
        if (lengths[i] > maxBits) {
          maxBits = lengths[i];
        }
      }
      if (maxBits === 0) {
        throw new Error("Huffman 表为空");
      }
      const size = 1 << maxBits;
      const table = new Int32Array(size);
      table.fill(-1);
      const codeCount = new Uint16Array(maxBits + 1);
      for (let i = 0; i < lengths.length; i += 1) {
        const length = lengths[i];
        if (length) {
          codeCount[length] += 1;
        }
      }
      const nextCode = new Uint16Array(maxBits + 1);
      let code = 0;
      for (let bits = 1; bits <= maxBits; bits += 1) {
        code = (code + codeCount[bits - 1]) << 1;
        nextCode[bits] = code;
      }

      function reverse(value, width) {
        let reversed = 0;
        for (let i = 0; i < width; i += 1) {
          reversed = (reversed << 1) | (value & 1);
          value >>>= 1;
        }
        return reversed;
      }

      for (let symbol = 0; symbol < lengths.length; symbol += 1) {
        const bitLengthForSymbol = lengths[symbol];
        if (!bitLengthForSymbol) continue;
        const canonical = nextCode[bitLengthForSymbol];
        nextCode[bitLengthForSymbol] += 1;
        const reversed = reverse(canonical, bitLengthForSymbol);
        const fill = 1 << (maxBits - bitLengthForSymbol);
        const entry = (symbol << 4) | bitLengthForSymbol;
        for (let i = 0; i < fill; i += 1) {
          table[reversed | (i << bitLengthForSymbol)] = entry;
        }
      }

      const mask = (1 << maxBits) - 1;
      return { table, maxBits, mask };
    }

    function decodeSymbol(table) {
      ensureBits(table.maxBits);
      const entry = table.table[bitBuffer & table.mask];
      if (entry < 0) {
        throw new Error("无效的 Huffman 码");
      }
      const bitLen = entry & 15;
      const symbol = entry >>> 4;
      if (bitLen === 0) {
        throw new Error("Huffman 长度为 0");
      }
      bitBuffer >>>= bitLen;
      bitLength -= bitLen;
      return symbol;
    }

    function buildFixedLiteralTable() {
      const lengths = new Uint8Array(288);
      for (let i = 0; i <= 143; i += 1) lengths[i] = 8;
      for (let i = 144; i <= 255; i += 1) lengths[i] = 9;
      for (let i = 256; i <= 279; i += 1) lengths[i] = 7;
      for (let i = 280; i <= 287; i += 1) lengths[i] = 8;
      return buildHuffmanTable(lengths);
    }

    function buildFixedDistanceTable() {
      const lengths = new Uint8Array(32);
      lengths.fill(5);
      return buildHuffmanTable(lengths);
    }

    const fixedLiteralTable = buildFixedLiteralTable();
    const fixedDistanceTable = buildFixedDistanceTable();

    let finalBlock = false;
    while (!finalBlock) {
      finalBlock = readBits(1) === 1;
      const blockType = readBits(2);

      if (blockType === 0) {
        alignToByte();
        if (position + 4 > input.length) {
          throw new Error("储存块长度头部越界");
        }
        const len = input[position] | (input[position + 1] << 8);
        const nlen = input[position + 2] | (input[position + 3] << 8);
        position += 4;
        if ((len ^ 0xffff) !== nlen) {
          throw new Error("储存块校验失败");
        }
        if (position + len > input.length) {
          throw new Error("储存块长度越界");
        }
        ensureOutputCapacity(len);
        output.set(input.subarray(position, position + len), outPos);
        outPos += len;
        position += len;
        continue;
      }

      let literalTable;
      let distanceTable;

      if (blockType === 1) {
        literalTable = fixedLiteralTable;
        distanceTable = fixedDistanceTable;
      } else if (blockType === 2) {
        const hlit = readBits(5) + 257;
        const hdist = readBits(5) + 1;
        const hclen = readBits(4) + 4;

        const codeLengthOrder = [
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
        ];
        const codeLengths = new Uint8Array(19);
        for (let i = 0; i < hclen; i += 1) {
          codeLengths[codeLengthOrder[i]] = readBits(3);
        }
        const codeLengthTable = buildHuffmanTable(codeLengths);
        const totalCodes = hlit + hdist;
        const lengths = new Uint8Array(totalCodes);
        for (let index = 0; index < totalCodes; ) {
          const symbol = decodeSymbol(codeLengthTable);
          if (symbol <= 15) {
            lengths[index] = symbol;
            index += 1;
          } else if (symbol === 16) {
            if (index === 0) {
              throw new Error("Huffman 长度重复码位置非法");
            }
            const repeat = 3 + readBits(2);
            const previous = lengths[index - 1];
            for (let r = 0; r < repeat; r += 1) {
              lengths[index] = previous;
              index += 1;
            }
          } else if (symbol === 17) {
            const repeat = 3 + readBits(3);
            for (let r = 0; r < repeat; r += 1) {
              lengths[index] = 0;
              index += 1;
            }
          } else if (symbol === 18) {
            const repeat = 11 + readBits(7);
            for (let r = 0; r < repeat; r += 1) {
              lengths[index] = 0;
              index += 1;
            }
          } else {
            throw new Error("未知的 Huffman 长度符号");
          }
        }
        const literalLengths = lengths.slice(0, hlit);
        const distanceLengths = lengths.slice(hlit);
        literalTable = buildHuffmanTable(literalLengths);
        distanceTable = buildHuffmanTable(distanceLengths);
      } else {
        throw new Error("不支持的 deflate 块类型");
      }

      while (true) {
        const symbol = decodeSymbol(literalTable);
        if (symbol === 256) {
          break;
        }
        if (symbol < 256) {
          writeByte(symbol);
          continue;
        }
        const lengthIndex = symbol - 257;
        if (lengthIndex < 0 || lengthIndex >= LENGTH_BASE.length) {
          throw new Error("长度码越界");
        }
        let length = LENGTH_BASE[lengthIndex];
        const extraBits = LENGTH_EXTRA[lengthIndex];
        if (extraBits) {
          length += readBits(extraBits);
        }
        const distanceSymbol = decodeSymbol(distanceTable);
        if (distanceSymbol < 0 || distanceSymbol >= DIST_BASE.length) {
          throw new Error("距离码越界");
        }
        let distance = DIST_BASE[distanceSymbol];
        const distanceExtra = DIST_EXTRA[distanceSymbol];
        if (distanceExtra) {
          distance += readBits(distanceExtra);
        }
        copyFromDistance(distance, length);
      }
    }

    return output.subarray(0, outPos);
  } catch (error) {
    console.warn("纯 JS deflate 解压失败", error);
    return null;
  }
}

async function unzipEntries(buffer) {
  const bytes = new Uint8Array(buffer);
  const files = new Map();
  const decoder = new TextDecoder("utf-8");

  const eocdOffset = findEndOfCentralDirectory(bytes);
  const directoryOffset = readUint32LE(bytes, eocdOffset + 16);
  const totalEntries = readUint16LE(bytes, eocdOffset + 10);

  if (directoryOffset >= bytes.length) {
    throw new Error("ZIP 目录偏移超出文件范围");
  }

  let offset = directoryOffset;
  for (let index = 0; index < totalEntries; index += 1) {
    const signature = readUint32LE(bytes, offset);
    if (signature !== 0x02014b50) {
      break;
    }

    const compression = readUint16LE(bytes, offset + 10);
    const compressedSize = readUint32LE(bytes, offset + 20);
    const fileNameLength = readUint16LE(bytes, offset + 28);
    const extraLength = readUint16LE(bytes, offset + 30);
    const commentLength = readUint16LE(bytes, offset + 32);
    const localHeaderOffset = readUint32LE(bytes, offset + 42);

    const nameStart = offset + 46;
    const nameEnd = nameStart + fileNameLength;
    const fileName = decoder.decode(bytes.slice(nameStart, nameEnd));

    offset = nameEnd + extraLength + commentLength;

    const localHeaderSignature = readUint32LE(bytes, localHeaderOffset);
    if (localHeaderSignature !== 0x04034b50) {
      continue;
    }

    const localNameLength = readUint16LE(bytes, localHeaderOffset + 26);
    const localExtraLength = readUint16LE(bytes, localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const dataEnd = dataStart + compressedSize;
    if (dataEnd > bytes.length) {
      console.warn(`ZIP 条目 ${fileName} 数据越界，已跳过`);
      continue;
    }
    const compressedBytes = bytes.slice(dataStart, dataEnd);

    let dataBytes = compressedBytes;
    if (compression === 8) {
      dataBytes = await inflateRaw(compressedBytes);
    } else if (compression !== 0) {
      console.warn(`跳过不支持的压缩格式：${compression} (${fileName})`);
      continue;
    }

    files.set(fileName, dataBytes);
  }

  return files;
}

async function parseWorkbookFromArrayBuffer(buffer) {
  const files = await unzipEntries(buffer);
  const decoder = new TextDecoder("utf-8");
  const workbookBytes = files.get("xl/workbook.xml");
  if (!workbookBytes) {
    throw new Error("缺少 workbook.xml");
  }
  const workbookDoc = parseXml(decoder.decode(workbookBytes));
  const sheetNodes = Array.from(workbookDoc.getElementsByTagNameNS(XLSX_MAIN_NS, "sheet"));
  if (!sheetNodes.length) {
    return {};
  }
  const relsBytes = files.get("xl/_rels/workbook.xml.rels");
  const relsDoc = relsBytes ? parseXml(decoder.decode(relsBytes)) : null;
  const relationships = new Map();
  if (relsDoc) {
    Array.from(relsDoc.getElementsByTagNameNS(PACKAGE_REL_NS, "Relationship")).forEach((node) => {
      const id = node.getAttribute("Id");
      const target = node.getAttribute("Target");
      if (id && target) {
        relationships.set(id, target);
      }
    });
  }
  const sharedStrings = parseSharedStringsXml(files.get("xl/sharedStrings.xml"));
  const packs = {};
  sheetNodes.forEach((sheet, index) => {
    const relId = sheet.getAttributeNS(XLSX_REL_NS, "id") || sheet.getAttribute("r:id");
    const sheetName = (sheet.getAttribute("name") || `Sheet${index + 1}`).trim();
    if (!relId) return;
    const target = relationships.get(relId);
    if (!target) return;
    const path = target.startsWith("/") ? target.slice(1) : `xl/${target}`;
    const sheetBytes = files.get(path);
    if (!sheetBytes) return;
    const rows = parseSheetRowsXml(sheetBytes, sharedStrings);
    if (rows.length) {
      packs[sheetName] = rows;
    }
  });
  return packs;
}

function parseSharedStringsXml(bytes) {
  if (!bytes) return [];
  const decoder = new TextDecoder("utf-8");
  const doc = parseXml(decoder.decode(bytes));
  const items = Array.from(doc.getElementsByTagNameNS(XLSX_MAIN_NS, "si"));
  return items.map((item) => {
    const texts = Array.from(item.getElementsByTagNameNS(XLSX_MAIN_NS, "t"));
    return texts.map((node) => node.textContent ?? "").join("");
  });
}

function parseSheetRowsXml(bytes, sharedStrings) {
  const decoder = new TextDecoder("utf-8");
  const doc = parseXml(decoder.decode(bytes));
  const rowNodes = Array.from(doc.getElementsByTagNameNS(XLSX_MAIN_NS, "row"));
  if (!rowNodes.length) return [];
  const rows = rowNodes.map((row) => {
    const cells = Array.from(row.getElementsByTagNameNS(XLSX_MAIN_NS, "c"));
    const result = [];
    cells.forEach((cell) => {
      const ref = cell.getAttribute("r") || "";
      const valueNode = cell.getElementsByTagNameNS(XLSX_MAIN_NS, "v")[0];
      const type = cell.getAttribute("t");
      const index = valueNode ? Number(valueNode.textContent ?? "0") : 0;
      const value = type === "s" ? sharedStrings[index] ?? "" : valueNode?.textContent ?? "";
      const columnIndex = columnIndexFromRef(ref);
      result[columnIndex] = value;
    });
    return result;
  });
  if (!rows.length) return [];
  const headers = rows[0].map((item) => (item || "").trim());
  const dataRows = rows.slice(1);
  return dataRows
    .map((cells) => {
      const entry = {};
      headers.forEach((header, index) => {
        if (!header) return;
        entry[header] = cells[index] ?? "";
      });
      return entry;
    })
    .filter((entry) => Object.values(entry).some((value) => `${value}`.trim() !== ""));
}

function columnIndexFromRef(ref) {
  if (!ref) return 0;
  const match = ref.match(/[A-Z]+/i);
  if (!match) return 0;
  const letters = match[0].toUpperCase();
  let index = 0;
  for (let i = 0; i < letters.length; i += 1) {
    index *= 26;
    index += letters.charCodeAt(i) - 64;
  }
  return Math.max(index - 1, 0);
}

function parseXml(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) {
    throw new Error("XML 解析失败");
  }
  return doc;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let crc = i;
    for (let j = 0; j < 8; j += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
    table[i] = crc >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    const byte = bytes[i];
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (~crc) >>> 0;
}

function escapeXml(value) {
  return `${value}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function columnLetter(index) {
  let n = index;
  let result = "";
  do {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return result;
}

function buildSheetXml(rows, getSharedIndex) {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<worksheet xmlns="${XLSX_MAIN_NS}" xmlns:r="${XLSX_REL_NS}">`,
    "  <sheetData>"
  ];
  rows.forEach((row, rowIndex) => {
    const rowNumber = rowIndex + 1;
    lines.push(`    <row r=\"${rowNumber}\">`);
    row.forEach((value, columnIndex) => {
      const ref = `${columnLetter(columnIndex)}${rowNumber}`;
      const sharedIndex = getSharedIndex(value ?? "");
      lines.push(`      <c r=\"${ref}\" t=\"s\"><v>${sharedIndex}</v></c>`);
    });
    lines.push("    </row>");
  });
  lines.push("  </sheetData>", "</worksheet>");
  return lines.join("\n");
}

function buildSharedStringsXml(strings) {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<sst xmlns="${XLSX_MAIN_NS}" count="${strings.length}" uniqueCount="${strings.length}">`
  ];
  strings.forEach((value) => {
    lines.push(`  <si><t xml:space=\"preserve\">${escapeXml(value)}</t></si>`);
  });
  lines.push("</sst>");
  return lines.join("\n");
}

function sanitizeSheetName(name, index) {
  const fallback = `Sheet${index + 1}`;
  if (!name) return fallback;
  return name.replace(/[\\\/?*\[\]:]/g, "").slice(0, 31) || fallback;
}

function buildWorkbookXml(sheetNames) {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<workbook xmlns="${XLSX_MAIN_NS}" xmlns:r="${XLSX_REL_NS}">`,
    "  <fileVersion appName=\"xl\"/>",
    "  <workbookPr date1904=\"0\"/>",
    "  <bookViews>",
    "    <workbookView activeTab=\"0\"/>",
    "  </bookViews>",
    "  <sheets>"
  ];
  sheetNames.forEach((name, index) => {
    lines.push(`    <sheet name=\"${escapeXml(name)}\" sheetId=\"${index + 1}\" r:id=\"rId${index + 1}\"/>`);
  });
  lines.push("  </sheets>", "</workbook>");
  return lines.join("\n");
}

function buildWorkbookRelsXml(sheetCount) {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<Relationships xmlns="${PACKAGE_REL_NS}">`
  ];
  for (let i = 0; i < sheetCount; i += 1) {
    lines.push(
      `  <Relationship Id=\"rId${i + 1}\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet${i + 1}.xml\"/>`
    );
  }
  lines.push(
    `  <Relationship Id=\"rId${sheetCount + 1}\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/>`,
    `  <Relationship Id=\"rId${sheetCount + 2}\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings\" Target=\"sharedStrings.xml\"/>`,
    "</Relationships>"
  );
  return lines.join("\n");
}

function buildRootRelsXml() {
  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<Relationships xmlns="${PACKAGE_REL_NS}">`,
    "  <Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/>",
    "  <Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>",
    "  <Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>",
    "</Relationships>"
  ].join("\n");
}

function buildContentTypesXml(sheetCount) {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
    '  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
    '  <Default Extension="xml" ContentType="application/xml"/>',
    '  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
  ];
  for (let i = 0; i < sheetCount; i += 1) {
    lines.push(
      `  <Override PartName=\"/xl/worksheets/sheet${i + 1}.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>`
    );
  }
  lines.push(
    '  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    '  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>',
    '  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
    '  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
    '</Types>'
  );
  return lines.join("\n");
}

function buildCorePropsXml(timestamp) {
  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<cp:coreProperties xmlns:cp="${CORE_PROPS_NS}" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">`,
    "  <dc:creator>记忆冲刺</dc:creator>",
    "  <cp:lastModifiedBy>记忆冲刺</cp:lastModifiedBy>",
    `  <dcterms:created xsi:type=\"dcterms:W3CDTF\">${timestamp}</dcterms:created>`,
    `  <dcterms:modified xsi:type=\"dcterms:W3CDTF\">${timestamp}</dcterms:modified>`,
    "</cp:coreProperties>"
  ].join("\n");
}

function buildAppPropsXml(sheetNames) {
  const count = sheetNames.length;
  const titles = sheetNames.map((name) => `      <vt:lpstr>${escapeXml(name)}</vt:lpstr>`).join("\n");
  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
    `<Properties xmlns="${EXT_PROPS_NS}" xmlns:vt="${V_TYPES_NS}">`,
    "  <Application>Study App</Application>",
    "  <DocSecurity>0</DocSecurity>",
    "  <ScaleCrop>false</ScaleCrop>",
    "  <HeadingPairs>",
    "    <vt:vector size=\"2\" baseType=\"variant\">",
    "      <vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant>",
    `      <vt:variant><vt:i4>${count}</vt:i4></vt:variant>`,
    "    </vt:vector>",
    "  </HeadingPairs>",
    "  <TitlesOfParts>",
    `    <vt:vector size=\"${count}\" baseType=\"lpstr\">`,
    titles,
    "    </vt:vector>",
    "  </TitlesOfParts>",
    "  <Company></Company>",
    "  <LinksUpToDate>false</LinksUpToDate>",
    "  <SharedDoc>false</SharedDoc>",
    "  <HyperlinksChanged>false</HyperlinksChanged>",
    "  <AppVersion>16.0300</AppVersion>",
    "</Properties>"
  ].join("\n");
}

function createZipFromFiles(files) {
  let offset = 0;
  const chunks = [];
  const directoryRecords = [];

  files.forEach((file) => {
    const nameBytes = new TextEncoder().encode(file.name);
    const dataBytes = typeof file.data === "string" ? new TextEncoder().encode(file.data) : file.data;
    const crc = crc32(dataBytes);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(localHeader.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, dataBytes.length, true);
    view.setUint32(22, dataBytes.length, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    chunks.push(localHeader, dataBytes);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, 0, true);
    centralView.setUint16(14, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, dataBytes.length, true);
    centralView.setUint32(24, dataBytes.length, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);

    directoryRecords.push(centralHeader);

    offset += localHeader.length + dataBytes.length;
  });

  let directorySize = 0;
  directoryRecords.forEach((record) => {
    directorySize += record.length;
    chunks.push(record);
  });

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, directorySize, true);
  endView.setUint32(16, offset, true);
  endView.setUint16(20, 0, true);

  chunks.push(endRecord);

  let totalLength = 0;
  chunks.forEach((chunk) => {
    totalLength += chunk.length;
  });

  const output = new Uint8Array(totalLength);
  let position = 0;
  chunks.forEach((chunk) => {
    output.set(chunk, position);
    position += chunk.length;
  });

  return output;
}

function buildWorkbookArchive(sheets) {
  const sharedStrings = [];
  const sharedIndex = new Map();

  function getSharedIndex(value) {
    const key = `${value ?? ""}`;
    if (!sharedIndex.has(key)) {
      sharedIndex.set(key, sharedStrings.length);
      sharedStrings.push(key);
    }
    return sharedIndex.get(key);
  }

  const timestamp = new Date().toISOString();
  const sheetNames = sheets.map((sheet, index) => sanitizeSheetName(sheet.name, index));
  const sheetXmls = sheets.map((sheet) => buildSheetXml(sheet.rows, getSharedIndex));
  const files = [];

  files.push({ name: "[Content_Types].xml", data: buildContentTypesXml(sheets.length) });
  files.push({ name: "_rels/.rels", data: buildRootRelsXml() });
  files.push({ name: "docProps/core.xml", data: buildCorePropsXml(timestamp) });
  files.push({ name: "docProps/app.xml", data: buildAppPropsXml(sheetNames) });
  files.push({ name: "xl/workbook.xml", data: buildWorkbookXml(sheetNames) });
  files.push({ name: "xl/_rels/workbook.xml.rels", data: buildWorkbookRelsXml(sheets.length) });
  files.push({ name: "xl/styles.xml", data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<styleSheet xmlns="${XLSX_MAIN_NS}">\n  <fonts count="1">\n    <font>\n      <sz val="11"/>\n      <color theme="1"/>\n      <name val="Calibri"/>\n      <family val="2"/>\n    </font>\n  </fonts>\n  <fills count="2">\n    <fill><patternFill patternType="none"/></fill>\n    <fill><patternFill patternType="gray125"/></fill>\n  </fills>\n  <borders count="1">\n    <border><left/><right/><top/><bottom/><diagonal/></border>\n  </borders>\n  <cellStyleXfs count="1">\n    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>\n  </cellStyleXfs>\n  <cellXfs count="1">\n    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>\n  </cellXfs>\n  <cellStyles count="1">\n    <cellStyle name="Normal" xfId="0" builtinId="0"/>\n  </cellStyles>\n</styleSheet>` });
  files.push({ name: "xl/sharedStrings.xml", data: buildSharedStringsXml(sharedStrings) });

  sheetXmls.forEach((xml, index) => {
    files.push({ name: `xl/worksheets/sheet${index + 1}.xml`, data: xml });
  });

  return createZipFromFiles(files);
}

function buildWorkbookBlob(sheets) {
  const archive = buildWorkbookArchive(sheets);
  return new Blob([archive], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
}

function cloneDefaultWordPacks() {
  return JSON.parse(JSON.stringify(DEFAULT_WORD_PACKS));
}

function parseCsv(text) {
  if (!text || typeof text !== "string") {
    return [];
  }
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === "\r") {
      continue;
    }
    if (char === "\n" && !insideQuotes) {
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }
    if (char === '"') {
      const next = text[index + 1];
      if (insideQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }
    if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }
    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) => `${header ?? ""}`.trim().replace(/^\ufeff/, ""));
  const objects = [];
  for (let i = 1; i < rows.length; i += 1) {
    const cells = rows[i];
    if (!cells || cells.every((cell) => !cell || `${cell}`.trim() === "")) {
      continue;
    }
    const entry = {};
    headers.forEach((header, columnIndex) => {
      if (!header) return;
      entry[header] = `${cells[columnIndex] ?? ""}`.trim();
    });
    objects.push(entry);
  }
  return objects;
}

function pickValue(source, keys) {
  if (!source) return "";
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && `${value}`.trim() !== "") {
      return `${value}`.trim();
    }
  }
  return "";
}

function mapRowToEntry(row) {
  const confusionSlots = [
    {
      wordKeys: ["confusion1", "Confusion1", "形近词1", "近义词1"],
      definitionKeys: ["confusion1Definition", "Confusion1Definition", "形近词释义1", "近义词释义1"]
    },
    {
      wordKeys: ["confusion2", "Confusion2", "形近词2", "近义词2"],
      definitionKeys: ["confusion2Definition", "Confusion2Definition", "形近词释义2", "近义词释义2"]
    },
    {
      wordKeys: ["confusion3", "Confusion3", "形近词3", "近义词3"],
      definitionKeys: ["confusion3Definition", "Confusion3Definition", "形近词释义3", "近义词释义3"]
    }
  ];

  const confusions = confusionSlots
    .map(({ wordKeys, definitionKeys }) => ({
      word: pickValue(row, wordKeys),
      definition: pickValue(row, definitionKeys)
    }))
    .filter((item) => item.word && item.definition);

  return {
    word: pickValue(row, ["word", "Word", "英文", "单词"]),
    definition: pickValue(row, ["definition", "Definition", "释义", "中文释义"]),
    phonetic: pickValue(row, ["phonetic", "Phonetic", "音标"]),
    example: pickValue(row, ["example", "Example", "例句"]),
    exampleCN: pickValue(row, ["exampleCN", "ExampleCN", "例句释义", "例句中文"]),
    confusions
  };
}

function normalizeWordEntry(raw) {
  const entry = {
    word: pickValue(raw, ["word"]),
    definition: pickValue(raw, ["definition"]),
    phonetic: pickValue(raw, ["phonetic"]),
    example: pickValue(raw, ["example"]),
    exampleCN: pickValue(raw, ["exampleCN", "exampleCn", "example_cn"])
  };
  if (Array.isArray(raw.confusions)) {
    entry.confusions = raw.confusions
      .map((item) => ({ word: pickValue(item, ["word"]), definition: pickValue(item, ["definition"]) }))
      .filter((item) => item.word && item.definition);
  } else {
    entry.confusions = [];
  }
  return entry;
}

function computeWordSimilarity(a, b) {
  if (!a || !b) return -Infinity;
  const wordA = `${a}`.toLowerCase();
  const wordB = `${b}`.toLowerCase();
  if (wordA === wordB) return -Infinity;
  let prefix = 0;
  const limit = Math.min(wordA.length, wordB.length);
  while (prefix < limit && wordA[prefix] === wordB[prefix]) {
    prefix += 1;
  }
  const setA = new Set(wordA.split(""));
  let overlap = 0;
  setA.forEach((char) => {
    if (wordB.includes(char)) {
      overlap += 1;
    }
  });
  const lengthPenalty = Math.abs(wordA.length - wordB.length);
  return prefix * 3 + overlap - lengthPenalty;
}

function ensureConfusionsForPack(entries) {
  entries.forEach((entry, index) => {
    const baseList = Array.isArray(entry.confusions) ? [...entry.confusions] : [];
    const cleaned = baseList.filter((item) => item.word && item.definition);
    const usedWords = new Set(cleaned.map((item) => item.word.toLowerCase()));
    const needed = Math.max(0, 3 - cleaned.length);
    if (needed <= 0) {
      entry.confusions = cleaned.slice(0, 3);
      return;
    }
    const candidates = entries
      .filter((candidate, candidateIndex) => candidateIndex !== index)
      .map((candidate) => ({
        word: candidate.word,
        definition: candidate.definition,
        score: computeWordSimilarity(entry.word, candidate.word)
      }))
      .sort((a, b) => b.score - a.score);
    const additions = [];
    for (const candidate of candidates) {
      if (!candidate.word || !candidate.definition) continue;
      const key = candidate.word.toLowerCase();
      if (usedWords.has(key)) continue;
      usedWords.add(key);
      additions.push({ word: candidate.word, definition: candidate.definition });
      if (additions.length >= needed) break;
    }
    entry.confusions = [...cleaned, ...additions].slice(0, 3);
  });
}

function enrichWordPackMap(map) {
  const result = {};
  if (!map || typeof map !== "object") {
    return result;
  }
  Object.entries(map).forEach(([name, words]) => {
    const normalized = Array.isArray(words)
      ? words
          .map((item) => normalizeWordEntry(item))
          .filter((item) => item.word && item.definition)
      : [];
    if (!normalized.length) return;
    ensureConfusionsForPack(normalized);
    result[name] = normalized;
  });
  return result;
}

const PRACTICE_STAGES = [
  {
    id: "context",
    pill: "语境选词",
    title: "句中填空锁定单词",
    description: "先阅读例句完成填空，随后会显示中文释义帮助理解。"
  },
  {
    id: "confusion",
    pill: "形近辨析",
    title: "形近词辨析",
    description: "从 4 个形近词里选出真正契合语境的那个，拉开语义差距。"
  },
  {
    id: "meaning",
    pill: "选择释义",
    title: "中文释义匹配",
    description: "结合记忆与语境，在 4 个释义中选出最贴合的中文含义。"
  },
  {
    id: "definitionChoice",
    pill: "释义选词",
    title: "根据释义认词",
    description: "只给中文释义不露出单词，从多个选项里反向锁定正确答案。"
  },
  {
    id: "spellingChoice",
    pill: "拼写辨形",
    title: "拼写形态辨别",
    description: "在 4 个拼写形态中挑出正确写法，预热最终默写。"
  },
  {
    id: "spelling",
    pill: "完整拼写",
    title: "闭眼默写冲刺",
    description: "根据释义默写单词，完成从识记到输出的闭环。"
  }
];

const REVIEW_INTERVALS = [
  { label: "立即巩固", minutes: 0 },
  { label: "5 分钟后", minutes: 5 },
  { label: "30 分钟后", minutes: 30 },
  { label: "12 小时后", minutes: 12 * 60 },
  { label: "1 天后", minutes: 24 * 60 },
  { label: "2 天后", minutes: 2 * 24 * 60 },
  { label: "4 天后", minutes: 4 * 24 * 60 },
  { label: "7 天后", minutes: 7 * 24 * 60 },
  { label: "15 天后", minutes: 15 * 24 * 60 }
];

const STORAGE_KEYS = {
  progress: "ebb_vocab_progress_v1",
  records: "ebb_vocab_records_v1"
};

const MS_PER_MINUTE = 60 * 1000;

const DEFAULT_DAILY_TARGET = 10;
const MIN_DAILY_TARGET = 1;
const MAX_DAILY_TARGET = 200;

const BUILT_IN_WORD_PACKS = enrichWordPackMap(cloneDefaultWordPacks());

const state = {
  wordPacks: BUILT_IN_WORD_PACKS,
  packName: "",
  packWords: [],
  batchIndex: 0,
  batchCount: 0,
  sessionWords: [],
  queue: [],
  previewQueue: [],
  previewRequested: new Set(),
  current: null,
  locked: false,
  prompt: null,
  mistakes: new Map(),
  dailyRecords: [],
  progress: new Map(),
  supportsStorage: false,
  spellingHintTimeout: null,
  revealTimeout: null,
  dailyTarget: DEFAULT_DAILY_TARGET
};

const elements = {};

document.addEventListener("DOMContentLoaded", async () => {
  cacheElements();
  bindEvents();
  initializeDailyTarget();
  state.supportsStorage = detectStorageSupport();
  loadPersistentProgress();
  loadDailyRecords();
  await loadWordPacksFromCsv();
  initPackOptions();
  updateReviewPlan();
});

function cacheElements() {
  elements.practiceCard = document.getElementById("practice-card");
  elements.packSelect = document.getElementById("word-pack");
  elements.dailyTarget = document.getElementById("daily-target");
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
  elements.reviewHint = document.getElementById("review-hint");
  elements.contextArea = document.getElementById("context-area");
  elements.contextSentence = document.getElementById("context-sentence");
  elements.contextTranslation = document.getElementById("context-translation");
  elements.contextChoices = document.getElementById("context-choice-area");
  elements.shapeArea = document.getElementById("shape-area");
  elements.meaningArea = document.getElementById("meaning-area");
  elements.definitionChoiceArea = document.getElementById("definition-choice-area");
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
  elements.reviewList = document.getElementById("review-list");
  elements.exportToday = document.getElementById("export-today");
  elements.exportLibrary = document.getElementById("export-library");
}

function bindEvents() {
  if (elements.dailyTarget) {
    const applyDailyTarget = () => {
      const parsed = parseInt(elements.dailyTarget.value, 10);
      setDailyTarget(Number.isNaN(parsed) ? DEFAULT_DAILY_TARGET : parsed);
    };
    elements.dailyTarget.addEventListener("change", applyDailyTarget);
    elements.dailyTarget.addEventListener("blur", applyDailyTarget);
  }

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
  elements.reviewList.addEventListener("click", handleReviewListClick);
  elements.wordList.addEventListener("click", handleWordListClick);
}

function initializeDailyTarget() {
  const inputValue = elements.dailyTarget ? parseInt(elements.dailyTarget.value, 10) : NaN;
  const initial = Number.isNaN(inputValue) ? DEFAULT_DAILY_TARGET : inputValue;
  setDailyTarget(initial, { shouldRestart: false });
}

function clampDailyTarget(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return DEFAULT_DAILY_TARGET;
  }
  const integer = Math.floor(value);
  if (!Number.isFinite(integer)) {
    return DEFAULT_DAILY_TARGET;
  }
  return Math.min(MAX_DAILY_TARGET, Math.max(MIN_DAILY_TARGET, integer));
}

function setDailyTarget(value, options = {}) {
  const { shouldRestart = true } = options;
  const target = clampDailyTarget(value);
  const previous = state.dailyTarget;
  state.dailyTarget = target;
  if (elements.dailyTarget) {
    elements.dailyTarget.value = target;
  }
  if (shouldRestart && state.packName && target !== previous) {
    preparePack(state.packName);
  }
}

function getBatchSize() {
  return clampDailyTarget(state.dailyTarget ?? DEFAULT_DAILY_TARGET);
}

async function loadWordPacksFromCsv() {
  if (typeof window === "undefined") {
    return;
  }

  const canFetch = window.location?.protocol !== "file:";
  const fallbackPacks = enrichWordPackMap(cloneDefaultWordPacks());
  if (!canFetch) {
    showFeedback("浏览器以 file:// 打开时无法读取外部 CSV，将使用内置示例词库。", "info");
    state.wordPacks = fallbackPacks;
    return;
  }

  let manifest = DEFAULT_CSV_PACKS;
  let manifestLoaded = false;

  try {
    const response = await fetch(CSV_PACK_MANIFEST_PATH, { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length) {
        manifest = data
          .map((item) => ({
            name: `${item?.name ?? ""}`.trim(),
            path: `${item?.path ?? ""}`.trim()
          }))
          .filter((item) => item.name && item.path);
        manifestLoaded = manifest.length > 0;
      }
    } else {
      console.warn(`读取词库清单失败：${response.status}`);
    }
  } catch (error) {
    console.warn("解析词库清单时发生异常，改用默认配置。", error);
  }

  if (!manifest.length) {
    console.warn("词库清单为空，继续使用内置示例词库。");
    showFeedback("未在 CSV 清单中找到有效配置，将沿用内置示例词库。", "warning");
    state.wordPacks = fallbackPacks;
    return;
  }

  const packs = {};
  let loadedCount = 0;

  await Promise.all(
    manifest.map(async (item) => {
      try {
        const response = await fetch(item.path, { cache: "no-store" });
        if (!response.ok) {
          console.warn(`读取词库 ${item.name} 失败：${response.status}`);
          return;
        }
        const text = await response.text();
        const rows = parseCsv(text);
        const entries = rows
          .map((row) => mapRowToEntry(row))
          .filter((entry) => entry.word && entry.definition);
        if (entries.length) {
          packs[item.name] = entries;
          loadedCount += 1;
        } else {
          console.warn(`词库 ${item.name} 中没有有效单词行。`);
        }
      } catch (error) {
        console.warn(`解析词库 ${item.name} 时发生异常。`, error);
      }
    })
  );

  const enriched = enrichWordPackMap(packs);
  if (Object.keys(enriched).length) {
    state.wordPacks = enriched;
    const feedback = manifestLoaded
      ? "已根据 CSV 清单载入最新词库数据。"
      : "已读取默认 CSV 词库，欢迎在 data 目录中更新。";
    showFeedback(feedback, "success");
  } else {
    const message =
      loadedCount > 0
        ? "CSV 文件未提供有效内容，继续使用内置示例词库。"
        : "未能加载任何 CSV 词库，已回退至内置示例数据。";
    showFeedback(message, "warning");
    state.wordPacks = fallbackPacks;
  }
}

function initPackOptions() {
  if (!elements.packSelect) return;
  elements.packSelect.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const packNames = Object.keys(state.wordPacks);
  if (!packNames.length) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "暂无可用词库";
    fragment.appendChild(placeholder);
    elements.packSelect.appendChild(fragment);
    showFeedback("尚未配置任何词库，请检查 CSV 清单或数据文件。", "warning");
    return;
  }
  packNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    fragment.appendChild(option);
  });
  elements.packSelect.appendChild(fragment);
  const firstPack = packNames[0];
  elements.packSelect.value = firstPack;
  preparePack(firstPack);
}

function preparePack(name) {
  state.packName = name;
  const rawWords = state.wordPacks[name] ?? [];
  state.packWords = rawWords.map((item, index) => ({
    ...item,
    id: `${name}-${index}`
  }));
  const batchSize = getBatchSize();
  state.batchCount = Math.max(1, Math.ceil(state.packWords.length / batchSize));
  startBatch(0);
  updateReviewPlan();
}

function startBatch(batchIndex) {
  const batchSize = getBatchSize();
  const maxIndex = Math.max(state.batchCount - 1, 0);
  const nextIndex = Math.min(Math.max(batchIndex, 0), maxIndex);
  state.batchIndex = nextIndex;
  state.mistakes.clear();
  state.previewQueue = [];
  if (!(state.previewRequested instanceof Set)) {
    state.previewRequested = new Set();
  } else {
    state.previewRequested.clear();
  }
  const start = nextIndex * batchSize;
  const slice = state.packWords.slice(start, start + batchSize);
  const now = Date.now();
  state.sessionWords = slice.map((item, index) => {
    const progressKey = buildProgressKey(item.word, state.packName);
    const progressEntry = state.progress.get(progressKey);
    const nextReview = progressEntry?.nextReview ?? null;
    const scheduleIndex = progressEntry?.scheduleIndex ?? 0;
    const due = !progressEntry || !nextReview || nextReview <= now;
    return {
      id: `${item.id}-${batchIndex}-${index}`,
      word: item.word,
      definition: item.definition,
      phonetic: item.phonetic ?? "",
      example: item.example ?? "",
      exampleCN: item.exampleCN ?? "",
      confusions: Array.isArray(item.confusions) ? [...item.confusions] : [],
      stage: due ? 0 : PRACTICE_STAGES.length,
      mistakes: 0,
      nextReview,
      scheduleIndex,
      progressKey,
      mode: progressEntry ? "review" : "new"
    };
  });
  state.queue = state.sessionWords.filter((word) => word.stage < PRACTICE_STAGES.length);
  shuffleArray(state.queue);
  state.current = takeNextWord();
  state.locked = false;
  state.prompt = null;
  updateBatchHeader();
  renderCurrent();
  updateWordList();
  updateMistakeList();
  updateBatchButtons();
}

function takeNextWord() {
  if (state.previewQueue.length) {
    return state.previewQueue.shift();
  }
  return state.queue.shift() ?? null;
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

  resetSpellingCard();

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
    if (elements.reviewHint) {
      elements.reviewHint.textContent = total
        ? "暂无到期的复习任务，记得按照计划回顾已掌握的词。"
        : "";
    }
    return;
  }

  const stage = PRACTICE_STAGES[current.stage];
  elements.stagePill.textContent = stage.pill;
  elements.stageTitle.textContent = stage.title;
  elements.stageDescription.textContent = stage.description;
  const hideHero = stage.id === "definitionChoice";
  if (elements.practiceCard) {
    elements.practiceCard.classList.toggle("hero-obscured", hideHero);
  }
  if (hideHero) {
    elements.wordText.textContent = "？？？";
    elements.phoneticText.textContent = "";
  } else {
    elements.wordText.textContent = current.word;
    elements.phoneticText.textContent = current.phonetic || "";
  }
  elements.feedback.textContent = "";
  elements.wordCounter.textContent = `第 ${Math.min(finished + 1, total)} / ${total} 词`;

  renderStageTracker(current.stage);
  renderReviewHint(current);

  state.prompt = null;
  hideAllStageAreas();

  switch (stage.id) {
    case "context":
      renderContextStage(current);
      break;
    case "confusion":
      renderConfusionStage(current);
      break;
    case "meaning":
      renderMeaningStage(current);
      break;
    case "definitionChoice":
      renderDefinitionChoiceStage(current);
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
  elements.skip.disabled = state.queue.length === 0 && state.previewQueue.length === 0;
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

function renderReviewHint(word) {
  if (!elements.reviewHint) return;
  if (word.preview) {
    elements.reviewHint.textContent = "提前复习 · 不影响复习节奏。";
    return;
  }
  const key = word.progressKey || buildProgressKey(word.word, state.packName);
  const entry = state.progress.get(key);
  if (!entry) {
    elements.reviewHint.textContent = "首次学习，将根据遗忘曲线安排复习。";
    return;
  }
  const stageLabel = formatReviewStage(entry.scheduleIndex);
  if (!entry.nextReview) {
    elements.reviewHint.textContent = `${stageLabel} · 已加入复习队列`;
    return;
  }
  const now = Date.now();
  if (entry.nextReview <= now) {
    elements.reviewHint.textContent = `${stageLabel} · 复习时间已到，完成后进入下一轮。`;
  } else {
    elements.reviewHint.textContent = `${stageLabel} · 下次复习 ${formatRelativeTime(entry.nextReview)}。`;
  }
}

function hideAllStageAreas() {
  clearRevealTimeout();
  if (elements.contextArea) {
    elements.contextArea.hidden = true;
  }
  if (elements.contextChoices) {
    elements.contextChoices.hidden = true;
    elements.contextChoices.classList.remove("reveal");
    elements.contextChoices.innerHTML = "";
  }
  if (elements.contextSentence) {
    elements.contextSentence.innerHTML = "";
  }
  if (elements.contextTranslation) {
    elements.contextTranslation.textContent = "";
    elements.contextTranslation.hidden = true;
  }
  elements.shapeArea.hidden = true;
  elements.meaningArea.hidden = true;
  if (elements.definitionChoiceArea) {
    elements.definitionChoiceArea.hidden = true;
    elements.definitionChoiceArea.innerHTML = "";
  }
  elements.spellingChoiceArea.hidden = true;
  elements.spellingArea.hidden = true;
  elements.revealArea.hidden = true;
  elements.shapeArea.innerHTML = "";
  elements.meaningArea.innerHTML = "";
  elements.spellingChoiceArea.innerHTML = "";
  elements.revealList.innerHTML = "";
}

function renderContextStage(word) {
  if (!elements.contextArea || !elements.contextChoices || !elements.contextSentence) {
    return;
  }
  elements.contextArea.hidden = false;
  elements.contextChoices.hidden = false;
  elements.contextChoices.classList.remove("reveal");
  if (elements.contextTranslation) {
    elements.contextTranslation.hidden = true;
    elements.contextTranslation.textContent = "";
  }
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}`;
  const sentenceHtml = buildContextSentence(word);
  elements.contextSentence.innerHTML = sentenceHtml;
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
      highlightCorrectButtons(elements.contextChoices);
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("语境选词正确！稍后展示释义。", "success");
      } else {
        button.classList.add("wrong");
        recordMistake(word, "context", option.word);
        showFeedback("这个语境更适合别的词，再巩固一次。", "danger");
      }
      setTimeout(() => {
        revealContextOptions(word, options);
      }, 240);
      scheduleStageTransition(option.correct, 3000);
    });
    fragment.appendChild(button);
  });
  elements.contextChoices.innerHTML = "";
  elements.contextChoices.appendChild(fragment);
}

function renderConfusionStage(word) {
  if (!elements.shapeArea) return;
  elements.shapeArea.hidden = false;
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}`;
  elements.shapeArea.innerHTML = "";
  const options = buildShapeOptions(word);
  const revealEntries = options.map((item) => ({
    word: item.word,
    definition: item.definition,
    correct: item.correct
  }));
  word.lastConfusionReveal = revealEntries.map((entry) => ({ ...entry }));
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
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("辨析正确！继续巩固。", "success");
      } else {
        button.classList.add("wrong");
        recordMistake(word, "confusion", option.word);
        showFeedback("这个形近词和目标词很接近，再试一次。", "danger");
      }
      showRevealPanel(revealEntries);
      scheduleStageTransition(option.correct);
    });
    fragment.appendChild(button);
  });
  elements.shapeArea.appendChild(fragment);
}

function renderMeaningStage(word) {
  elements.meaningArea.hidden = false;
  elements.meaningArea.innerHTML = "";
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
        showConfusionSummary(word);
        scheduleStageTransition(true, 3200);
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

function renderDefinitionChoiceStage(word) {
  if (!elements.definitionChoiceArea) return;
  elements.definitionChoiceArea.hidden = false;
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}<br><span class="definition-inline">释义：${word.definition}</span>`;
  const options = buildDefinitionChoiceOptions(word);
  const fragment = document.createDocumentFragment();
  elements.definitionChoiceArea.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.text;
    button.dataset.correct = option.correct ? "true" : "false";
    button.addEventListener("click", () => {
      if (state.locked) return;
      state.locked = true;
      highlightCorrectButtons(elements.definitionChoiceArea);
      if (option.correct) {
        button.classList.add("correct");
        showFeedback("释义反向识词正确！", "success");
        scheduleStageTransition(true);
      } else {
        button.classList.add("wrong");
        recordMistake(word, "definitionChoice", option.text);
        showFeedback("还没完全锁定单词，再重复一次。", "danger");
        scheduleStageTransition(false);
      }
    });
    fragment.appendChild(button);
  });
  elements.definitionChoiceArea.appendChild(fragment);
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

function scheduleStageTransition(correct, delay = 720) {
  setTimeout(() => {
    if (correct) {
      advanceCurrentStage();
    } else {
      recycleCurrentWord();
    }
  }, Math.max(delay, 200));
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
    answer: word.word.toLowerCase(),
    attempts: 0,
    hintLevel: 0,
    autoReveal: false
  };
  setSpellingHintLevel(0);
  elements.stageDescription.innerHTML = `${PRACTICE_STAGES[word.stage].description}<br><span class="definition-inline">释义：${word.definition}</span>`;
  showRevealPanel([]);
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
    clearSpellingHintTimeout();
    setSpellingHintLevel(-1);
    hideSpellingReveal();
    showFeedback("太棒了！本词已完成所有练习。", "success");
    setTimeout(() => advanceCurrentStage(), 640);
  } else {
    recordMistake(state.current, "spelling", input);
    const attempts = (state.prompt.attempts || 0) + 1;
    state.prompt.attempts = attempts;

    if (attempts === 1) {
      setSpellingHintLevel(1);
      showFeedback("留意音标提示，再试一次。", "warning");
      state.locked = false;
      elements.spellInput.value = "";
      focusSpellInput();
      return;
    }

    if (attempts === 2) {
      setSpellingHintLevel(2);
      showFeedback(`完整拼写：${state.current.word}。记住后我们再默写。`, "info");
      clearSpellingHintTimeout();
      state.prompt.autoReveal = true;
      showRevealPanel([
        { word: state.current.word, definition: state.current.definition, correct: true },
        ...collectWordDistractors(state.current, 2)
      ]);
      state.spellingHintTimeout = setTimeout(() => {
        if (state.prompt && state.prompt.stage === "spelling") {
          setSpellingHintLevel(1);
          if (state.prompt.autoReveal) {
            hideSpellingReveal();
          }
          showFeedback("现在根据音标再拼写一次吧！", "info");
          focusSpellInput();
        }
      }, 1500);
      state.locked = false;
      elements.spellInput.value = "";
      focusSpellInput();
      return;
    }

    clearSpellingHintTimeout();
    hideSpellingReveal();
    showFeedback(`正确拼写是 ${state.current.word}，稍后我们再巩固。`, "danger");
    setTimeout(() => recycleCurrentWord(), 720);
  }
}

function focusSpellInput() {
  try {
    elements.spellInput.focus({ preventScroll: true });
  } catch (error) {
    elements.spellInput.focus();
  }
}

function advanceCurrentStage() {
  if (!state.current) return;
  state.current.stage += 1;
  if (state.current.stage >= PRACTICE_STAGES.length) {
    if (state.current.preview) {
      if (state.previewRequested instanceof Set && state.current.previewSourceId) {
        state.previewRequested.delete(state.current.previewSourceId);
      }
      state.current = takeNextWord();
    } else {
      state.current.stage = PRACTICE_STAGES.length;
      state.current.completedAt = Date.now();
      recordCompletion(state.current);
      state.current = takeNextWord();
    }
  }
  state.locked = false;
  renderCurrent();
}

function recycleCurrentWord() {
  if (!state.current) return;
  setSpellingHintLevel(-1);
  if (state.current.preview) {
    state.current.stage = 0;
    state.previewQueue.unshift(state.current);
  } else {
    state.queue.push(state.current);
  }
  state.current = takeNextWord();
  state.locked = false;
  renderCurrent();
  updateMistakeList();
}

function skipCurrentWord() {
  if (!state.current) return;
  const hasAlternative = state.queue.length > 0 || state.previewQueue.length > 0;
  if (!hasAlternative) {
    return;
  }
  if (state.current.preview) {
    state.previewQueue.push(state.current);
    if (state.queue.length > 0) {
      state.current = state.queue.shift();
    } else {
      state.current = state.previewQueue.shift() ?? null;
    }
  } else {
    state.queue.push(state.current);
    state.current = takeNextWord();
    renderCurrent();
    return;
  }
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

function revealContextOptions(word, options) {
  if (!elements.contextChoices) return;
  showContextTranslation(word);
  const fragment = document.createDocumentFragment();
  options.forEach((option) => {
    const item = document.createElement("div");
    item.className = "reveal-item";
    if (option.correct) {
      item.classList.add("correct");
    }
    const wordSpan = document.createElement("strong");
    wordSpan.textContent = option.word;
    const definitionSpan = document.createElement("span");
    definitionSpan.textContent = option.definition || "（暂无释义）";
    item.appendChild(wordSpan);
    item.appendChild(definitionSpan);
    fragment.appendChild(item);
  });
  elements.contextChoices.classList.add("reveal");
  elements.contextChoices.innerHTML = "";
  elements.contextChoices.appendChild(fragment);
}

function buildContextSentence(word) {
  const example = `${word.example || ""}`.trim();
  const rawWord = `${word.word || ""}`.trim();
  const blankLength = Math.max(4, Math.min(18, rawWord.length || 4));
  const blank = `<span class="blank" aria-hidden="true" style="--blank-chars:${blankLength}">${"&nbsp;".repeat(blankLength)}</span>`;
  if (example) {
    if (rawWord) {
      const pattern = new RegExp(`\\b${escapeRegExp(rawWord)}\\b`, "i");
      const match = pattern.exec(example);
      if (match) {
        const before = escapeHtml(example.slice(0, match.index));
        const after = escapeHtml(example.slice(match.index + match[0].length));
        return `${before}${blank}${after}`;
      }
    }
    return `${escapeHtml(example)} ${blank}`;
  }
  const definition = (word.definition || "").replace(/<[^>]+>/g, "");
  return `根据释义填空：${escapeHtml(definition)} ${blank}`;
}

function showContextTranslation(word) {
  if (!elements.contextTranslation) return;
  const translation = `${word.exampleCN || ""}`.trim();
  if (translation) {
    elements.contextTranslation.textContent = translation;
    elements.contextTranslation.hidden = false;
    return;
  }
  const fallback = `${word.definition || ""}`.trim();
  if (fallback) {
    elements.contextTranslation.textContent = `释义：${fallback}`;
    elements.contextTranslation.hidden = false;
    return;
  }
  elements.contextTranslation.textContent = "";
  elements.contextTranslation.hidden = true;
}

function escapeRegExp(value) {
  return `${value || ""}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return `${text || ""}`.replace(/[&<>"']/g, (char) => map[char] || char);
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

function buildDefinitionChoiceOptions(word) {
  const distractors = collectWordDistractors(word, 3);
  const options = [
    { text: word.word, correct: true },
    ...distractors.map((item) => ({ text: item.word, correct: false }))
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

function clearRevealTimeout() {
  if (state.revealTimeout) {
    clearTimeout(state.revealTimeout);
    state.revealTimeout = null;
  }
}

function showRevealPanel(entries) {
  if (!entries || !entries.length) {
    clearRevealTimeout();
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

function showConfusionSummary(word, duration = 3000) {
  if (!word) return;
  const entriesSource = Array.isArray(word.lastConfusionReveal) && word.lastConfusionReveal.length
    ? word.lastConfusionReveal
    : [
        { word: word.word, definition: word.definition, correct: true },
        ...collectWordDistractors(word, 3).map((item) => ({
          word: item.word,
          definition: item.definition,
          correct: false
        }))
      ];
  if (!entriesSource.length) {
    showRevealPanel([]);
    return;
  }
  const entries = entriesSource.map((item) => ({
    word: item.word,
    definition: item.definition,
    correct:
      item.correct || (item.word && word.word && item.word.toLowerCase() === word.word.toLowerCase())
  }));
  showRevealPanel(entries);
  clearRevealTimeout();
  if (duration > 0) {
    state.revealTimeout = setTimeout(() => {
      if (state.current === word) {
        showRevealPanel([]);
      }
    }, duration);
  }
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

function resetSpellingCard() {
  clearSpellingHintTimeout();
  if (!elements.practiceCard) return;
  elements.practiceCard.classList.remove(
    "spelling-mode",
    "hide-word",
    "show-phonetic",
    "reveal-word",
    "hero-obscured"
  );
  if (state.prompt && state.prompt.stage === "spelling") {
    hideSpellingReveal();
  }
}

function setSpellingHintLevel(level) {
  if (!elements.practiceCard) return;
  if (level < 0) {
    elements.practiceCard.classList.remove("spelling-mode", "hide-word", "show-phonetic", "reveal-word");
    if (state.prompt && state.prompt.stage === "spelling") {
      state.prompt.hintLevel = 0;
    }
    return;
  }
  if (!state.current || !state.prompt || state.prompt.stage !== "spelling") {
    return;
  }

  elements.practiceCard.classList.add("spelling-mode");
  if (typeof level === "number" && level >= 0) {
    state.prompt.hintLevel = level;
  }
  const hintLevel = state.prompt.hintLevel ?? 0;
  const appliedLevel = level >= 0 ? level : hintLevel;
  elements.practiceCard.classList.toggle("hide-word", appliedLevel <= 1);
  elements.practiceCard.classList.toggle("show-phonetic", appliedLevel >= 1);
  elements.practiceCard.classList.toggle("reveal-word", appliedLevel >= 2);
}

function clearSpellingHintTimeout() {
  if (state.spellingHintTimeout) {
    clearTimeout(state.spellingHintTimeout);
    state.spellingHintTimeout = null;
  }
}

function hideSpellingReveal() {
  if (state.prompt && state.prompt.stage === "spelling") {
    state.prompt.autoReveal = false;
    showRevealPanel([]);
  }
}

function showDefinitionHint() {
  if (!state.current) return;
  if (state.prompt && state.prompt.stage === "spelling") {
    state.prompt.autoReveal = false;
  }
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
  const now = Date.now();
  state.sessionWords.forEach((item) => {
    const li = document.createElement("li");
    li.className = "word-item";
    const main = document.createElement("div");
    main.className = "word-main";
    const name = document.createElement("span");
    name.className = "word-name";
    name.textContent = item.word;
    const status = document.createElement("span");
    status.className = "status";
    const isActive =
      (state.current && item.id === state.current.id) ||
      (state.current && state.current.preview && state.current.previewSourceId === item.id);
    if (isActive) {
      status.textContent = `第 ${item.stage + 1} 关`;
      status.classList.add("active");
    } else if (item.stage >= PRACTICE_STAGES.length) {
      if (item.nextReview && item.nextReview > now) {
        status.textContent = formatRelativeTimeShort(item.nextReview);
        status.classList.add("scheduled");
      } else {
        status.textContent = "复习完成";
        status.classList.add("mastered");
      }
    } else if (item.mode === "review") {
      status.textContent = "待复习";
      status.classList.add("review");
    } else if (item.mistakes > 0) {
      status.textContent = `复习 ${item.mistakes}`;
      status.classList.add("retry");
    } else {
      status.textContent = "待学习";
      status.classList.add("pending");
    }
    main.appendChild(name);
    main.appendChild(status);
    li.appendChild(main);

    const previewButton = document.createElement("button");
    previewButton.type = "button";
    previewButton.className = "preview-button";
    previewButton.dataset.action = "preview";
    previewButton.dataset.id = item.id;
    const previewActive =
      state.current && state.current.preview && state.current.previewSourceId === item.id;
    if (previewActive) {
      previewButton.textContent = "提前练习中";
      previewButton.disabled = true;
    } else if (state.previewRequested instanceof Set && state.previewRequested.has(item.id)) {
      previewButton.textContent = "待提前复习";
      previewButton.disabled = true;
    } else {
      previewButton.textContent = "提前复习";
    }
    li.appendChild(previewButton);
    fragment.appendChild(li);
  });
  elements.wordList.appendChild(fragment);
  updateBatchHeader();
}

function handleWordListClick(event) {
  const button = event.target.closest("button.preview-button");
  if (!button || button.disabled) {
    return;
  }
  const wordId = button.dataset.id;
  if (!wordId) {
    return;
  }
  queuePreviewWord(wordId);
}

function queuePreviewWord(wordId) {
  if (!wordId) return;
  const source = state.sessionWords.find((item) => item.id === wordId);
  if (!source) {
    showFeedback("该单词暂不在本组队列中，无法提前复习。", "warning");
    return;
  }
  if (!(state.previewRequested instanceof Set)) {
    state.previewRequested = new Set();
  }
  if (state.previewRequested.has(wordId)) {
    showFeedback("已在提前复习列表中，稍后会自动出现。", "info");
    return;
  }
  const previewEntry = {
    id: `preview-${wordId}-${Date.now()}`,
    word: source.word,
    definition: source.definition,
    phonetic: source.phonetic || "",
    example: source.example || "",
    exampleCN: source.exampleCN || "",
    confusions: Array.isArray(source.confusions) ? [...source.confusions] : [],
    stage: 0,
    mistakes: 0,
    preview: true,
    previewSourceId: wordId,
    progressKey: source.progressKey || buildProgressKey(source.word, state.packName)
  };
  state.previewQueue.push(previewEntry);
  state.previewRequested.add(wordId);
  showFeedback(`已加入提前复习：${source.word}`, "success");
  if (!state.current) {
    state.current = takeNextWord();
    renderCurrent();
  }
  updateWordList();
}

function recordMistake(word, stageId, detail) {
  const key = word.word;
  const entry = state.mistakes.get(key) || {
    word: word.word,
    definition: word.definition,
    phonetic: word.phonetic || "",
    example: word.example || "",
    exampleCN: word.exampleCN || "",
    count: 0,
    lastStage: stageId,
    lastAnswer: detail
  };
  entry.phonetic = word.phonetic || "";
  entry.example = word.example || "";
  entry.exampleCN = word.exampleCN || "";
  entry.count += 1;
  entry.lastStage = stageId;
  entry.lastAnswer = detail;
  state.mistakes.set(key, entry);
  word.mistakes += 1;
  updateMistakeList();
  updateWordList();
  if (!word.preview) {
    applyProgressPenalty(word);
  }
  updateReviewPlan();
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
      li.className = "word-item mistake-entry";
      const head = document.createElement("div");
      head.className = "mistake-head";
      const term = document.createElement("div");
      term.className = "mistake-term";
      const name = document.createElement("strong");
      name.textContent = item.word;
      term.appendChild(name);
      if (item.phonetic) {
        const phonetic = document.createElement("span");
        phonetic.className = "mistake-phonetic";
        phonetic.textContent = item.phonetic;
        term.appendChild(phonetic);
      }
      head.appendChild(term);
      const detail = document.createElement("span");
      detail.className = "status retry";
      const stageName = PRACTICE_STAGES.find((stage) => stage.id === item.lastStage)?.pill || "错题";
      detail.textContent = `${stageName} ×${item.count}`;
      head.appendChild(detail);
      li.appendChild(head);

      const definition = document.createElement("p");
      definition.className = "mistake-definition";
      definition.textContent = item.definition || "（暂无释义）";
      li.appendChild(definition);

      if (item.example) {
        const example = document.createElement("p");
        example.className = "mistake-example";
        example.textContent = item.example;
        li.appendChild(example);
      }
      if (item.exampleCN) {
        const exampleCN = document.createElement("p");
        exampleCN.className = "mistake-example-cn";
        exampleCN.textContent = item.exampleCN;
        li.appendChild(exampleCN);
      }
      if (item.lastAnswer) {
        const note = document.createElement("p");
        note.className = "mistake-note";
        note.textContent = `最近回答：${item.lastAnswer}`;
        li.appendChild(note);
      }
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
  if (word.preview) {
    return;
  }
  const now = new Date();
  const entry = {
    word: word.word,
    definition: word.definition,
    phonetic: word.phonetic || "",
    example: word.example || "",
    exampleCN: word.exampleCN || "",
    pack: state.packName,
    mistakes: word.mistakes,
    completedAt: now.getTime(),
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
  persistDailyRecords();
  updateWordProgress(word, now);
  updateReviewPlan();
}

function exportTodayExcel() {
  const todayKey = formatDateKey(new Date());
  const records = state.dailyRecords.filter((item) => item.dateKey === todayKey);
  if (!records.length) {
    showFeedback("今日尚未完成任何单词，先练习一组吧！", "warning");
    return;
  }
  const header = ["序号", "单词", "音标", "中文释义", "例句", "例句释义", "所属词库", "错误次数", "完成时间"];
  const rows = [header];
  records.forEach((item, index) => {
    rows.push([
      index + 1,
      item.word,
      item.phonetic || "",
      item.definition,
      item.example || "",
      item.exampleCN || "",
      item.pack,
      item.mistakes,
      formatDateTime(item.completedAt)
    ]);
  });
  const blob = buildWorkbookBlob([
    {
      name: "今日学习",
      rows
    }
  ]);
  const filename = `今日单词_${todayKey}.xlsx`;
  triggerDownload(blob, filename);
  showFeedback(`已导出 ${records.length} 个单词的学习记录。`, "success");
}

function exportLibraryExcel() {
  const entries = Object.entries(state.wordPacks);
  if (!entries.length) {
    showFeedback("暂无词库可导出，请先加载 CSV 数据。", "warning");
    return;
  }
  const sheets = entries
    .map(([name, words]) => {
      if (!Array.isArray(words) || !words.length) {
        return null;
      }
      const header = [
        "序号",
        "单词",
        "音标",
        "中文释义",
        "例句",
        "例句释义",
        "形近词1",
        "释义1",
        "形近词2",
        "释义2",
        "形近词3",
        "释义3"
      ];
      const rows = [header];
      words.forEach((item, index) => {
        rows.push([
          index + 1,
          item.word,
          item.phonetic || "",
          item.definition,
          item.example || "",
          item.exampleCN || "",
          item.confusions?.[0]?.word || "",
          item.confusions?.[0]?.definition || "",
          item.confusions?.[1]?.word || "",
          item.confusions?.[1]?.definition || "",
          item.confusions?.[2]?.word || "",
          item.confusions?.[2]?.definition || ""
        ]);
      });
      return { name, rows };
    })
    .filter(Boolean);
  if (!sheets.length) {
    showFeedback("词库暂无可导出的条目。", "warning");
    return;
  }
  const filename = `词库总览_${formatDateKey(new Date())}.xlsx`;
  const blob = buildWorkbookBlob(sheets);
  triggerDownload(blob, filename);
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

function detectStorageSupport() {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return false;
    }
    const testKey = "ebb_storage_test";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function loadPersistentProgress() {
  state.progress = new Map();
  if (!state.supportsStorage) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.progress);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    parsed.forEach((entry) => {
      if (!entry || !entry.word || !entry.pack) return;
      const key = buildProgressKey(entry.word, entry.pack);
      state.progress.set(key, {
        word: entry.word,
        pack: entry.pack,
        scheduleIndex: entry.scheduleIndex ?? 0,
        nextReview: entry.nextReview ?? null,
        completedCount: entry.completedCount ?? 0,
        lastCompletedAt: entry.lastCompletedAt ?? null,
        mistakes: entry.mistakes ?? 0
      });
    });
  } catch (error) {
    console.warn("无法加载复习进度", error);
    state.progress = new Map();
  }
}

function persistProgress() {
  if (!state.supportsStorage) return;
  try {
    const payload = Array.from(state.progress.values()).map((entry) => ({
      word: entry.word,
      pack: entry.pack,
      scheduleIndex: entry.scheduleIndex ?? 0,
      nextReview: entry.nextReview ?? null,
      completedCount: entry.completedCount ?? 0,
      lastCompletedAt: entry.lastCompletedAt ?? null,
      mistakes: entry.mistakes ?? 0
    }));
    window.localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(payload));
  } catch (error) {
    console.warn("无法保存复习进度", error);
  }
}

function loadDailyRecords() {
  state.dailyRecords = [];
  if (!state.supportsStorage) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.records);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      state.dailyRecords = parsed
        .filter(Boolean)
        .map((item) => ({
          ...item,
          example: item.example || "",
          exampleCN: item.exampleCN || item.exampleCn || ""
        }));
    }
  } catch (error) {
    console.warn("无法加载学习记录", error);
    state.dailyRecords = [];
  }
}

function persistDailyRecords() {
  if (!state.supportsStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(state.dailyRecords));
  } catch (error) {
    console.warn("无法保存学习记录", error);
  }
}

function updateWordProgress(word, completedAt) {
  const key = word.progressKey || buildProgressKey(word.word, state.packName);
  if (!key) return;
  const timestamp = completedAt instanceof Date ? completedAt.getTime() : new Date(completedAt).getTime();
  const existing = state.progress.get(key) || {
    word: word.word,
    pack: state.packName,
    scheduleIndex: 0,
    nextReview: null,
    completedCount: 0,
    lastCompletedAt: null,
    mistakes: 0
  };
  const nextIndex = Math.min(existing.scheduleIndex + 1, REVIEW_INTERVALS.length - 1);
  existing.scheduleIndex = nextIndex;
  existing.completedCount = (existing.completedCount || 0) + 1;
  existing.lastCompletedAt = timestamp;
  existing.mistakes = word.mistakes;
  const interval = REVIEW_INTERVALS[nextIndex] ?? REVIEW_INTERVALS[REVIEW_INTERVALS.length - 1];
  const minutes = interval?.minutes ?? 5;
  existing.nextReview = timestamp + minutes * MS_PER_MINUTE;
  state.progress.set(key, existing);
  word.progressKey = key;
  word.nextReview = existing.nextReview;
  word.scheduleIndex = existing.scheduleIndex;
  persistProgress();
  updateWordList();
}

function applyProgressPenalty(word) {
  const key = word.progressKey || buildProgressKey(word.word, state.packName);
  if (!key) return;
  const entry = state.progress.get(key);
  if (!entry) return;
  entry.scheduleIndex = Math.max(1, entry.scheduleIndex - 1);
  const interval = REVIEW_INTERVALS[entry.scheduleIndex] ?? REVIEW_INTERVALS[1];
  const minutes = interval?.minutes ?? 5;
  entry.nextReview = Date.now() + minutes * MS_PER_MINUTE;
  entry.mistakes = (entry.mistakes || 0) + 1;
  state.progress.set(key, entry);
  word.progressKey = key;
  word.nextReview = entry.nextReview;
  word.scheduleIndex = entry.scheduleIndex;
  persistProgress();
}

function buildProgressKey(word, pack) {
  if (!word || !pack) return "";
  return `${pack}__${word.toLowerCase()}`;
}

function formatReviewStage(index) {
  if (!Number.isFinite(index) || index <= 0) {
    return "初记忆阶段";
  }
  const safeIndex = Math.min(Math.max(1, Math.floor(index)), REVIEW_INTERVALS.length - 1);
  const label = REVIEW_INTERVALS[safeIndex]?.label?.replace("后", "复习") ?? "间隔复习";
  return `第 ${safeIndex} 轮 · ${label}`;
}

function formatRelativeTime(timestamp) {
  if (!Number.isFinite(timestamp)) return "即将";
  const diff = Number(timestamp) - Date.now();
  if (diff <= 0) return "已到期";
  const minutes = Math.round(diff / MS_PER_MINUTE);
  if (minutes < 60) {
    return `约 ${Math.max(1, minutes)} 分钟后`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `约 ${Math.max(1, hours)} 小时后`;
  }
  const days = Math.round(hours / 24);
  return `约 ${Math.max(1, days)} 天后`;
}

function formatRelativeTimeShort(timestamp) {
  if (!Number.isFinite(timestamp)) return "待复习";
  const diff = Number(timestamp) - Date.now();
  if (diff <= 0) return "待复习";
  const minutes = Math.round(diff / MS_PER_MINUTE);
  if (minutes < 60) {
    return `${Math.max(1, minutes)} 分钟`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${Math.max(1, hours)} 小时`;
  }
  const days = Math.round(hours / 24);
  return `${Math.max(1, days)} 天`;
}

function updateReviewPlan() {
  if (!elements.reviewList) return;
  elements.reviewList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const entries = Array.from(state.progress.values());
  if (!entries.length) {
    const empty = document.createElement("li");
    empty.className = "review-item";
    empty.textContent = "完成一轮学习后，这里会按照艾宾浩斯曲线提醒复习。";
    fragment.appendChild(empty);
    elements.reviewList.appendChild(fragment);
    return;
  }
  const now = Date.now();
  const due = entries.filter((entry) => !entry.nextReview || entry.nextReview <= now);
  const upcoming = entries.filter((entry) => entry.nextReview && entry.nextReview > now);
  upcoming.sort((a, b) => (a.nextReview ?? 0) - (b.nextReview ?? 0));
  due.sort((a, b) => (a.nextReview ?? 0) - (b.nextReview ?? 0));
  const merged = [...due, ...upcoming].slice(0, 8);
  merged.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "review-item";
    if (!entry.nextReview || entry.nextReview <= now) {
      item.classList.add("due");
    }
    const top = document.createElement("div");
    top.className = "review-top";
    const wordLabel = document.createElement("strong");
    wordLabel.textContent = entry.word;
    const packLabel = document.createElement("span");
    packLabel.className = "review-pack";
    packLabel.textContent = entry.pack;
    top.appendChild(wordLabel);
    top.appendChild(packLabel);
    item.appendChild(top);

    const stage = document.createElement("span");
    stage.className = "review-stage";
    stage.textContent = formatReviewStage(entry.scheduleIndex);
    item.appendChild(stage);

    const footer = document.createElement("footer");
    const timeLabel = document.createElement("span");
    timeLabel.textContent = entry.nextReview && entry.nextReview > now ? formatRelativeTime(entry.nextReview) : "已到期";
    footer.appendChild(timeLabel);
    const mistakeLabel = document.createElement("span");
    const mistakeCount = entry.mistakes ?? 0;
    mistakeLabel.textContent = mistakeCount ? `错题 ${mistakeCount}` : "状态良好";
    footer.appendChild(mistakeLabel);
    item.appendChild(footer);

    if (!entry.nextReview || entry.nextReview <= now) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.word = entry.word;
      button.dataset.pack = entry.pack;
      button.textContent = entry.pack === state.packName ? "加入当前组" : "切换并复习";
      item.appendChild(button);
    }

    fragment.appendChild(item);
  });
  elements.reviewList.appendChild(fragment);
}

function handleReviewListClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (!target.dataset || !target.dataset.word) return;
  const { word, pack } = target.dataset;
  if (!word || !pack) return;
  if (pack !== state.packName) {
    elements.packSelect.value = pack;
    preparePack(pack);
    setTimeout(() => {
      injectWordFromReview(word, pack);
    }, 50);
  } else {
    injectWordFromReview(word, pack);
  }
}

function injectWordFromReview(word, pack) {
  if (!word) return;
  const key = buildProgressKey(word, pack);
  let sessionWord = state.sessionWords.find((item) => item.word === word);
  if (!sessionWord) {
    const base = state.packWords.find((item) => item.word === word);
    if (!base) {
      showFeedback("未在当前词库找到该单词。", "warning");
      return;
    }
    sessionWord = {
      id: `${base.id}-review-${Date.now()}`,
      word: base.word,
      definition: base.definition,
      phonetic: base.phonetic ?? "",
      example: base.example ?? "",
      exampleCN: base.exampleCN ?? "",
      confusions: Array.isArray(base.confusions) ? [...base.confusions] : [],
      stage: 0,
      mistakes: 0,
      nextReview: Date.now(),
      scheduleIndex: state.progress.get(key)?.scheduleIndex ?? 1,
      progressKey: key,
      mode: "review"
    };
    state.sessionWords.push(sessionWord);
  } else {
    sessionWord.stage = 0;
    sessionWord.mistakes = 0;
    sessionWord.mode = "review";
  }
  const existingIndex = state.queue.findIndex((item) => item.id === sessionWord.id);
  if (existingIndex >= 0) {
    state.queue.splice(existingIndex, 1);
  }
  state.queue.unshift(sessionWord);
  state.current = state.queue.shift() ?? sessionWord;
  state.locked = false;
  renderCurrent();
  updateWordList();
  showFeedback(`已加入 ${word} 的复习。`, "success");
}
