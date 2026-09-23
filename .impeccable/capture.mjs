/* Dev-only capture for the finish round. Run: node .impeccable/capture.mjs */
import puppeteer from 'puppeteer-core';
import { mkdir, stat } from 'node:fs/promises';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:4173/Portfolio/';
const OUT = 'D:\\Portfolio\\.impeccable\\review';

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

const page = await browser.newPage();
page.setDefaultTimeout(30000);
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

// React writes localStorage on mount; set AFTER it settled, then reload.
// Retries once with a longer settle if the attribute lags (mobile emulation is slower).
async function setTheme(theme) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    await page.evaluate((t) => localStorage.setItem('theme', t), theme);
    await page.reload({ waitUntil: 'load' });
    await settle(700 + attempt * 600);
    const state = await page.evaluate(() => ({
      applied: document.documentElement.dataset.theme,
      stored: localStorage.getItem('theme'),
    }));
    if (state.applied === theme) return;
    console.log(`setTheme retry ${attempt}: wanted ${theme}`, JSON.stringify(state));
  }
  throw new Error(`theme mismatch after retries: wanted ${theme}`);
}

// Scroll through the page so loading="lazy" images enter the viewport.
async function warmLazy() {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await settle(800);
}

// The shader field is position:fixed; full-page captures only paint fixed
// elements at the top. Stretch the canvas to absolute full-document height
// so the rAF loop re-renders a genuine full-page field for the evidence.
async function stretchField() {
  await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
    }
  });
  await settle(400);
}

async function shoot(file, theme) {
  const applied = await page.evaluate(() => document.documentElement.dataset.theme);
  if (applied !== theme) throw new Error(`shoot ${file}: theme ${applied} != ${theme}`);
  await warmLazy();
  await stretchField();
  await page.screenshot({ path: `${OUT}\\${file}`, fullPage: true });
  console.log('saved', file, 'theme=', theme);
}

// 1) Desktop light
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'load' });
await settle(1200);
await setTheme('light');
await settle(2400); // loader counts out (1.1s) + fades (0.65s), entrance rises end
await shoot('desktop.png', 'light');

// 2) Desktop dark (the portal at night)
await setTheme('dark');
await settle(2400);
await shoot('dark-desktop.png', 'dark');

// 3) Mobile light (390)
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await setTheme('light');
await settle(2600);
await shoot('mobile.png', 'light');

for (const f of ['desktop.png', 'dark-desktop.png', 'mobile.png']) {
  const s = await stat(`${OUT}\\${f}`);
  console.log(f, s.size, 'bytes');
}

await browser.close();
console.log('DONE');
