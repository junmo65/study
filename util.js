export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2), value);
    } else if (key === 'className') {
      node.className = value;
    } else if (key === 'dataset') {
      Object.assign(node.dataset, value);
    } else {
      node.setAttribute(key, value);
    }
  });
  const append = (child) => {
    if (child === null || child === undefined) return;
    if (Array.isArray(child)) {
      child.forEach(append);
    } else if (child instanceof Node) {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(String(child)));
    }
  };
  append(children);
  return node;
}

export const todayISO = () => new Date().toISOString().slice(0, 10);
export const now = () => Date.now();

export const parseISODate = (iso) => (iso ? new Date(iso) : new Date());
export const toISODate = (date) => date.toISOString().slice(0, 10);

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export const formatNumber = (n, digits = 0) => Number(n || 0).toLocaleString(undefined, {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
});

export const percent = (value) => `${Math.round((value || 0) * 100)}%`;

export function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function hashRouter(callback, defaultHash = '#/') {
  const render = () => {
    const hash = window.location.hash || defaultHash;
    if (!window.location.hash) {
      window.location.hash = defaultHash;
      return;
    }
    callback(hash);
  };
  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);
  render();
}

export function formatDueRelative(dueISO) {
  if (!dueISO) return '—';
  const due = parseISODate(dueISO);
  const today = new Date();
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  if (diff < -1) return `${Math.abs(diff)} days overdue`;
  if (diff === -1) return 'overdue yesterday';
  if (diff === 0) return 'due today';
  if (diff === 1) return 'due tomorrow';
  return `due in ${diff} days`;
}

export function csvSafe(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/[,"\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export const debounce = (fn, wait = 200) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

export function weightedRandom(weights) {
  const total = weights.reduce((sum, item) => sum + item.weight, 0);
  const threshold = Math.random() * (total || 1);
  let cumulative = 0;
  for (const entry of weights) {
    cumulative += entry.weight;
    if (threshold <= cumulative) return entry.value;
  }
  return weights.length ? weights[weights.length - 1].value : null;
}

export function ensureFocusWithin(container) {
  const focusable = container.querySelector('input, textarea, button, select');
  if (focusable) focusable.focus({ preventScroll: false });
}

export const noop = () => {};
