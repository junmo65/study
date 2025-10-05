import { hashRouter } from './util.js';
import { pages } from './pages.js';
import './storage.js';
import { rebuildSession } from './scheduler.js';

const app = document.getElementById('app');

function render(hash) {
  const key = hash.split('?')[0];
  const factory = pages[key] || pages['#/'];
  app.innerHTML = '';
  const view = factory();
  app.appendChild(view);
  app.focus();
}

rebuildSession();
hashRouter(render, '#/');
