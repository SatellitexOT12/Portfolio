/* Isolate the setItem -> reload theme flow. Run: node .impeccable/theme-probe.mjs */
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:4173/Portfolio/';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
const settle = (ms) => new Promise((r) => setTimeout(r, ms));
const read = () =>
  page.evaluate(() => ({
    stored: localStorage.getItem('theme'),
    dt: document.documentElement.dataset.theme,
    osDark: matchMedia('(prefers-color-scheme: dark)').matches,
  }));

await page.goto(URL, { waitUntil: 'load' });
await settle(2500);
console.log('fresh mount          ', await read());

await page.evaluate(() => localStorage.setItem('theme', 'dark'));
console.log('after setItem dark   ', await read());
await page.reload({ waitUntil: 'load' });
await settle(2500);
console.log('after reload (dark)  ', await read());

await page.evaluate(() => localStorage.setItem('theme', 'light'));
console.log('after setItem light  ', await read());
await page.reload({ waitUntil: 'load' });
await settle(2500);
console.log('after reload (light) ', await read());

// now mimic the capture/verify mobile step: viewport change to 390/isMobile BEFORE setItem
await page.evaluate(() => localStorage.setItem('theme', 'dark'));
await page.reload({ waitUntil: 'load' });
await settle(2500);
console.log('dark again           ', await read());
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.evaluate(() => localStorage.setItem('theme', 'light'));
console.log('post-viewport setItem', await read());
await page.reload({ waitUntil: 'load' });
await settle(2500);
console.log('post-viewport reload ', await read());

await browser.close();
console.log('DONE');
