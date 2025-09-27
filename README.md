# 背单词网页项目

本项目提供一个在浏览器中运行的背单词练习页面，包含考研英语与 GRE 词库、形近词辨析、释义选择、拼写等多种训练环节，并根据艾宾浩斯遗忘曲线安排复习计划。

## 词库 CSV 文件

- `data/wordpacks.json` 指定要加载的词库名称及其 CSV 路径，默认包含“考研词汇”和“GRE词汇”两项，可按需新增或调整。
- `data/kaoyan_words.csv` 提供了带中文释义、音标、例句和形近词示例的考研词条，可直接在原文件中继续增补或替换。
- 每个 CSV 文件（如 `data/kaoyan_words.csv`、`data/gre_words.csv`）应包含至少以下表头：`Word,Definition,Phonetic,Example,ExampleCN`，如需自定义形近词可追加 `Confusion1,Confusion1Definition` 等列；保存时请使用 UTF-8 编码。
- 重新保存 CSV 后刷新网页即可读取最新词库内容；若浏览器直接以 `file://` 协议打开网页会因安全限制无法加载外部 CSV，建议通过 `python3 -m http.server 8000` 等方式本地启动静态服务器后访问。

## 本地预览

```bash
python3 -m http.server 8000
```

然后在浏览器访问 <http://localhost:8000>。

## 导出功能

- 页面支持导出“今日学习记录”和“完整词库”两种 Excel 报表，方便继续整理或备份学习成果。

## 自定义与部署

- 可根据需要扩展样式 (`styles.css`) 或交互逻辑 (`script.js`)。
- 将项目部署到任意静态网页托管平台（如 GitHub Pages、Vercel、Netlify 等）即可在线使用。
