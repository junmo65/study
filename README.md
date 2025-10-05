# Orpea Vocab Coach – Local Minimal

This is a zero-dependency single page application for spaced vocabulary study.

## Usage

1. Download the folder and double-click `index.html` to open it in Edge (or any modern browser). The app runs entirely offline via the `file://` protocol.
2. Use the navigation links at the top to import vocabulary cards, review them, and manage your collection.

## Features

- CSV/TSV importer with preview, automatic delimiter detection, column mapping, and duplicate resolution.
- Spaced repetition scheduling with SM-2 (default) or Leitner boxes.
- Multiple practice modes: Recognition, Recall, Collocation (choice and fill), Cloze.
- Keyboard-friendly learning workspace with grading shortcuts (1-5, space to flip/submit, C to switch mode, F to flag, `/` to focus input).
- Dashboard analytics including today’s workload, success rate, 7-day due chart, and difficult tags.
- Backup and restore via JSON export/import, plus review history CSV export.
- Pure text assets: no build, no bundler, no external fonts or scripts.

## Files

- `index.html` – main entry point with navigation and hash router mount.
- `style.css` – light theme styling and print-specific rules.
- `app.js` – bootstraps storage, routing, and page rendering.
- `csv.js` – lightweight CSV/TSV parser.
- `storage.js` – localStorage persistence helpers and backup utilities.
- `sm2.js` – implementation of the SM-2 algorithm with tweaks.
- `leitner.js` – Leitner box scheduling logic.
- `scheduler.js` – session queue builder and review logging.
- `levenshtein.js` – edit distance function for forgiving input checking.
- `components.js` – question component factory functions.
- `pages.js` – page-level renderers for dashboard, learn, import, cards, settings, backup, and print views.
- `util.js` – common utilities for time formatting, DOM helpers, and routing.

Everything is written using native ES modules and localStorage; data never leaves the browser.
