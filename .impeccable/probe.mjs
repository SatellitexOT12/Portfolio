/* Dev-only style probe: toggles via the real INV button. node .impeccable/probe.mjs */
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:4173/Portfolio/';

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
page.setDefaultTimeout(15000);
await page.setViewport({ width: 1440, height: 900 });

await page.goto(URL, { waitUntil: 'load' });
await new Promise((r) => setTimeout(r, 900));

const read = () =>
  page.evaluate(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const body = cs(document.body);
    const footer = cs(document.querySelector('footer'));
    const h1 = cs(document.querySelector('h1'));
    return {
      dataTheme: document.documentElement.dataset.theme,
      bodyBg: body.backgroundColor,
      footerBg: footer?.backgroundColor,
      footerColor: footer?.color,
      h1Font: h1?.fontFamily,
      title: document.title,
      favicon: document.querySelector('link[rel="icon"]')?.href,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      stored: localStorage.getItem('theme'),
    };
  });

const before = await read();
const btn = await page.$('nav button[aria-label^="Cambiar"]');
if (!btn) throw new Error('ThemeToggle not found');
await btn.click();
await new Promise((r) => setTimeout(r, 500));
const after = await read();

console.log('BEFORE:', JSON.stringify(before, null, 2));
console.log('AFTER INV CLICK:', JSON.stringify(after, null, 2));

const ok =
  before.dataTheme === 'light' &&
  before.bodyBg === 'rgb(255, 255, 255)' &&
  before.footerBg === 'rgb(0, 0, 0)' &&
  after.dataTheme === 'dark' &&
  after.bodyBg === 'rgb(0, 0, 0)' &&
  after.footerBg === 'rgb(255, 255, 255)' &&
  !before.overflowX &&
  !after.overflowX;
console.log(ok ? 'PROBE PASS' : 'PROBE FAIL');
await browser.close();
