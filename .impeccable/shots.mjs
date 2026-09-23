/* Per-section crisp shots for the finish round. Run: node .impeccable/shots.mjs */
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:4173/Portfolio/';
const OUT = 'D:\\Portfolio\\.impeccable\\review';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
page.setDefaultTimeout(30000);
const settle = (ms) => new Promise((r) => setTimeout(r, ms));

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

async function applyTheme(theme) {
  await page.evaluate((t) => localStorage.setItem('theme', t), theme);
  await page.reload({ waitUntil: 'load' });
  await settle(2600);
}

async function shootSection(id, file) {
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, id);
  await settle(1600); // scene ease + entrance
  await page.screenshot({ path: `${OUT}\\${file}` });
  const state = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    y: Math.round(window.scrollY),
  }));
  console.log(`saved ${file}`, JSON.stringify(state));
}

await page.goto(URL, { waitUntil: 'load' });
await settle(2600);
await applyTheme('light');
await shootSection('#about', 'sec-about.png');
await shootSection('#projects', 'sec-projects.png');
await shootSection('#contact', 'sec-contact.png');

await applyTheme('dark');
await shootSection('#projects', 'sec-projects-dark.png');
await shootSection('#contact', 'sec-contact-dark.png');

await browser.close();
console.log('DONE');
