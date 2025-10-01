const pdfjsLib = window['pdfjsLib'];
const fileInput = document.getElementById('file-input');
const pdfCanvas = document.getElementById('pdf-canvas');
const pdfCtx = pdfCanvas.getContext('2d');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const brightnessValue = document.getElementById('brightness-value');
const contrastValue = document.getElementById('contrast-value');
const sharpenInput = document.getElementById('sharpen');
const resetEnhanceBtn = document.getElementById('reset-enhance');
const runOcrBtn = document.getElementById('run-ocr');
const ocrStatus = document.getElementById('ocr-status');
const ocrResult = document.getElementById('ocr-result');
const tocStatus = document.getElementById('toc-status');
const tocList = document.getElementById('toc-list');
const downloadTocBtn = document.getElementById('download-toc');
const PDFLib = window['PDFLib'];

const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');

let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let currentImageData = null;
let selectedPdfFile = null;
let pdfFileUrl = null;
let tocEntries = [];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.worker.min.js';

const renderScale = window.devicePixelRatio > 1 ? 2 : 1.5;

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  resetUI();

  if (pdfFileUrl) {
    URL.revokeObjectURL(pdfFileUrl);
    pdfFileUrl = null;
  }

  selectedPdfFile = file;
  pdfFileUrl = URL.createObjectURL(file);
  const isLargeFile = file.size >= 150 * 1024 * 1024;
  ocrStatus.textContent = isLargeFile
    ? '大型 PDF 加载中，文件较大会稍慢，请耐心等待...'
    : '加载 PDF 中...';

  try {
    pdfDoc = await pdfjsLib
      .getDocument({
        url: pdfFileUrl,
        disableStream: false,
        disableAutoFetch: false
      })
      .promise;
    totalPages = pdfDoc.numPages;
    currentPage = 1;
    await renderPage(currentPage);
    updatePageControls();
    ocrStatus.textContent = '已加载，调整参数后可开始 OCR。';
    runOcrBtn.disabled = false;
    await generateToc();
  } catch (error) {
    console.error(error);
    ocrStatus.textContent = '加载 PDF 失败，请重试。';
    tocStatus.textContent = '目录生成失败。';
    if (pdfFileUrl) {
      URL.revokeObjectURL(pdfFileUrl);
      pdfFileUrl = null;
    }
    selectedPdfFile = null;
  }
});

prevPageBtn.addEventListener('click', async () => {
  if (!pdfDoc || currentPage <= 1) return;
  currentPage -= 1;
  await renderPage(currentPage);
  updatePageControls();
});

nextPageBtn.addEventListener('click', async () => {
  if (!pdfDoc || currentPage >= totalPages) return;
  currentPage += 1;
  await renderPage(currentPage);
  updatePageControls();
});

[brightnessInput, contrastInput].forEach((input) => {
  input.addEventListener('input', () => {
    brightnessValue.textContent = brightnessInput.value;
    contrastValue.textContent = contrastInput.value;
    applyEnhancements();
  });
});

sharpenInput.addEventListener('change', () => {
  applyEnhancements();
});

resetEnhanceBtn.addEventListener('click', () => {
  brightnessInput.value = '0';
  contrastInput.value = '0';
  sharpenInput.checked = false;
  brightnessValue.textContent = '0';
  contrastValue.textContent = '0';
  applyEnhancements();
});

runOcrBtn.addEventListener('click', async () => {
  if (!currentImageData) return;
  runOcrBtn.disabled = true;
  ocrStatus.textContent = 'OCR 识别中，请稍候...';
  ocrResult.textContent = '';

  try {
    const canvasForOcr = document.createElement('canvas');
    canvasForOcr.width = pdfCanvas.width;
    canvasForOcr.height = pdfCanvas.height;
    const ctx = canvasForOcr.getContext('2d');
    ctx.putImageData(currentImageData, 0, 0);

    const dataUrl = canvasForOcr.toDataURL('image/png');
    const result = await Tesseract.recognize(dataUrl, 'chi_sim+eng', {
      logger: ({ status, progress }) => {
        if (status === 'recognizing text') {
          ocrStatus.textContent = `识别中 ${(progress * 100).toFixed(0)}%`;
        }
      }
    });

    ocrStatus.textContent = '识别完成。';
    ocrResult.textContent = result.data.text.trim() || '未识别到文本内容。';
  } catch (error) {
    console.error(error);
    ocrStatus.textContent = '识别失败，请重试。';
  } finally {
    runOcrBtn.disabled = false;
  }
});

async function renderPage(pageNumber) {
  if (!pdfDoc) return;
  ocrStatus.textContent = `渲染第 ${pageNumber} 页...`;

  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: renderScale });

  offscreenCanvas.width = viewport.width;
  offscreenCanvas.height = viewport.height;
  pdfCanvas.width = viewport.width;
  pdfCanvas.height = viewport.height;

  const renderContext = {
    canvasContext: offscreenCtx,
    viewport
  };

  await page.render(renderContext).promise;
  brightnessValue.textContent = brightnessInput.value;
  contrastValue.textContent = contrastInput.value;
  applyEnhancements();
  ocrStatus.textContent = '页面渲染完成，可根据需要调整参数。';
}

function applyEnhancements() {
  if (!offscreenCanvas.width || !offscreenCanvas.height) return;

  const width = offscreenCanvas.width;
  const height = offscreenCanvas.height;
  const originalData = offscreenCtx.getImageData(0, 0, width, height);
  let processedData = new Uint8ClampedArray(originalData.data);

  const brightness = Number(brightnessInput.value) * 2.55;
  const contrastInputValue = Number(contrastInput.value) * 2.55;
  const contrastFactor = (259 * (contrastInputValue + 255)) / (255 * (259 - contrastInputValue));

  for (let i = 0; i < processedData.length; i += 4) {
    processedData[i] = clamp(contrastFactor * (processedData[i] - 128) + 128 + brightness);
    processedData[i + 1] = clamp(contrastFactor * (processedData[i + 1] - 128) + 128 + brightness);
    processedData[i + 2] = clamp(contrastFactor * (processedData[i + 2] - 128) + 128 + brightness);
    // Alpha channel remains the same.
  }

  if (sharpenInput.checked) {
    processedData = applySharpen(processedData, width, height);
  }

  const imageData = new ImageData(processedData, width, height);
  pdfCtx.putImageData(imageData, 0, 0);
  currentImageData = imageData;
}

function applySharpen(data, width, height) {
  const kernel = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ];

  const source = new Uint8ClampedArray(data);
  const output = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let kernelIndex = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
          const weight = kernel[kernelIndex++];
          r += source[pixelIndex] * weight;
          g += source[pixelIndex + 1] * weight;
          b += source[pixelIndex + 2] * weight;
          a += source[pixelIndex + 3] * weight;
        }
      }

      const index = (y * width + x) * 4;
      output[index] = clamp(r);
      output[index + 1] = clamp(g);
      output[index + 2] = clamp(b);
      output[index + 3] = clamp(a);
    }
  }

  return output;
}

function clamp(value) {
  return Math.max(0, Math.min(255, value));
}

function updatePageControls() {
  pageInfo.textContent = pdfDoc ? `第 ${currentPage} / ${totalPages} 页` : '未加载';
  prevPageBtn.disabled = !pdfDoc || currentPage <= 1;
  nextPageBtn.disabled = !pdfDoc || currentPage >= totalPages;
  runOcrBtn.disabled = !pdfDoc;
}

function resetUI() {
  pdfDoc = null;
  currentPage = 1;
  totalPages = 0;
  pdfCanvas.width = 0;
  pdfCanvas.height = 0;
  pdfCtx.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
  currentImageData = null;
  ocrResult.textContent = '';
  runOcrBtn.disabled = true;
  ocrStatus.textContent = '等待上传 PDF...';
  tocStatus.textContent = '等待上传 PDF...';
  tocList.innerHTML = '';
  downloadTocBtn.disabled = true;
  downloadTocBtn.textContent = '下载含目录 PDF';
  selectedPdfFile = null;
  if (pdfFileUrl) {
    URL.revokeObjectURL(pdfFileUrl);
    pdfFileUrl = null;
  }
  tocEntries = [];
  updatePageControls();
}

async function generateToc() {
  if (!pdfDoc) return;

  if (selectedPdfFile && selectedPdfFile.size >= 150 * 1024 * 1024) {
    tocStatus.textContent = '大型 PDF 目录分析中，处理时间会更长…';
  } else {
    tocStatus.textContent = '分析目录中...';
  }
  tocList.innerHTML = '';
  tocEntries = [];

  const headingThreshold = 16;
  const seen = new Set();
  const fallbackEntries = [];

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    try {
      const page = await pdfDoc.getPage(pageNumber);
      const textContent = await page.getTextContent();

      let lastEntryText = '';
      let largestCandidate = null;

      for (const item of textContent.items) {
        const text = item.str.trim();
        if (!text || text.length < 3 || /^[\d\W]+$/.test(text)) {
          continue;
        }

        const fontSize = Math.sqrt(
          (item.transform?.[0] || 0) ** 2 + (item.transform?.[1] || 0) ** 2
        );

        if (!largestCandidate || fontSize > largestCandidate.fontSize) {
          largestCandidate = { title: text, page: pageNumber, fontSize };
        }

        if (fontSize < headingThreshold) {
          continue;
        }

        if (text === lastEntryText) {
          continue;
        }

        const key = `${pageNumber}-${text}`;
        if (seen.has(key)) {
          continue;
        }

        seen.add(key);
        lastEntryText = text;
        tocEntries.push({ title: text, page: pageNumber, fontSize });
      }

      if (largestCandidate) {
        fallbackEntries.push(largestCandidate);
      }
    } catch (error) {
      console.error('读取页面失败', error);
    }
  }

  if (!tocEntries.length && fallbackEntries.length) {
    tocEntries = fallbackEntries;
  }

  if (!tocEntries.length) {
    tocStatus.textContent = '未检测到明显的标题，无法生成目录。';
    downloadTocBtn.disabled = true;
    return;
  }

  tocEntries.sort((a, b) => {
    if (a.page === b.page) {
      return b.fontSize - a.fontSize;
    }
    return a.page - b.page;
  });

  const fragment = document.createDocumentFragment();
  tocEntries.forEach(({ title, page }) => {
    const li = document.createElement('li');
    const truncatedTitle = title.length > 80 ? `${title.slice(0, 77)}…` : title;
    li.textContent = `${truncatedTitle} …… 第 ${page} 页`;
    fragment.appendChild(li);
  });

  tocList.appendChild(fragment);
  tocStatus.textContent = `已生成 ${tocEntries.length} 条目录项，可下载带目录的 PDF。`;
  downloadTocBtn.disabled = false;
}

downloadTocBtn.addEventListener('click', async () => {
  if (!PDFLib) {
    tocStatus.textContent = 'PDF 生成库未正确加载，无法导出目录。';
    return;
  }

  if (!selectedPdfFile || !tocEntries.length) return;

  downloadTocBtn.disabled = true;
  downloadTocBtn.textContent = '生成中...';

  try {
    const originalPdfBytes = await selectedPdfFile.arrayBuffer();
    const pdfDocWithToc = await PDFLib.PDFDocument.load(originalPdfBytes);
    const pages = pdfDocWithToc.getPages();
    if (!pages.length) {
      throw new Error('PDF 中没有可用页面');
    }

    const [firstPageWidth, firstPageHeight] = [
      pages[0].getWidth(),
      pages[0].getHeight()
    ];

    let tocPage = pdfDocWithToc.insertPage(0, [firstPageWidth, firstPageHeight]);
    const font = await pdfDocWithToc.embedFont(PDFLib.StandardFonts.Helvetica);

    const fontSizeTitle = 24;
    const fontSizeItem = 14;
    const marginX = 50;
    let currentY = firstPageHeight - 80;

    const drawHeader = (page, text) => {
      page.drawText(text, {
        x: marginX,
        y: currentY,
        size: fontSizeTitle,
        font,
        color: PDFLib.rgb(0.1, 0.2, 0.5)
      });
    };

    drawHeader(tocPage, '目录');
    currentY -= 40;

    tocEntries.forEach(({ title, page }, index) => {
      if (currentY < 80) {
        tocPage = pdfDocWithToc.addPage([firstPageWidth, firstPageHeight]);
        currentY = firstPageHeight - 80;
        drawHeader(tocPage, '目录（续）');
        currentY -= 40;
      }

      const safeTitle = title.length > 90 ? `${title.slice(0, 87)}…` : title;
      const text = `${index + 1}. ${safeTitle}`;
      const pageText = `第 ${page} 页`;

      tocPage.drawText(text, {
        x: marginX,
        y: currentY,
        size: fontSizeItem,
        font,
        color: PDFLib.rgb(0.16, 0.18, 0.25)
      });

      tocPage.drawText(pageText, {
        x: firstPageWidth - marginX - font.widthOfTextAtSize(pageText, fontSizeItem),
        y: currentY,
        size: fontSizeItem,
        font,
        color: PDFLib.rgb(0.35, 0.37, 0.4)
      });

      currentY -= 24;
    });

    const pdfBytes = await pdfDocWithToc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'with-toc.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('生成目录 PDF 失败', error);
    tocStatus.textContent = '生成目录 PDF 失败，请重试。';
  } finally {
    downloadTocBtn.textContent = '下载含目录 PDF';
    downloadTocBtn.disabled = !tocEntries.length;
  }
});
