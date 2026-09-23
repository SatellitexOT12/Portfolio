/* Dev-only assertions for the finish round. Run: node .impeccable/verify.mjs */
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

async function applyTheme(theme) {
  await settle(400); // let viewport emulation commit — setItem right after setViewport can be dropped
  await page.evaluate((t) => localStorage.setItem('theme', t), theme);
  const got = await page.evaluate(() => localStorage.getItem('theme'));
  if (got !== theme) {
    await settle(300);
    await page.evaluate((t) => localStorage.setItem('theme', t), theme);
  }
  await page.reload({ waitUntil: 'load' });
  await settle(2600);
}

async function probe() {
  return page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const ghost = [...document.querySelectorAll('a')].find((a) => a.getAttribute('href') === '#projects');
    const active = q('nav ul button[aria-current="true"]');
    const grid = [...document.querySelectorAll('#projects > div')].find(
      (d) => getComputedStyle(d).display === 'grid',
    );
    const h1 = q('h1');
    const loader = [...document.querySelectorAll('div[aria-hidden="true"]')].some((d) => d.textContent.includes('Loading portal'));
    return {
      menuToggleDisplay: q('nav button[aria-expanded]') ? getComputedStyle(q('nav button[aria-expanded]')).display : 'MISSING',
      railDisplay: q('nav[aria-label="Sections"]') ? getComputedStyle(q('nav[aria-label="Sections"]')).display : 'MISSING',
      readoutDisplay: q('aside') ? getComputedStyle(q('aside')).display : 'MISSING',
      ghostButton: ghost ? ghost.textContent.trim() : 'MISSING',
      activeNavColor: active ? getComputedStyle(active).color : 'MISSING',
      activeNavLabel: active ? active.textContent.trim() : 'MISSING',
      gridCols: grid ? getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length : 'MISSING',
      canvasPosition: q('canvas') ? getComputedStyle(q('canvas')).position : 'MISSING',
      h1Font: h1 ? getComputedStyle(h1).fontFamily : 'MISSING',
      h1Size: h1 ? getComputedStyle(h1).fontSize : 'MISSING',
      loaderStillMounted: loader,
      theme: document.documentElement.dataset.theme,
      docHeight: document.documentElement.scrollHeight,
    };
  });
}

// 1440 light: layout + state assertions + crisp hero shot
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'load' });
await settle(2600);
await applyTheme('light');

const light = await probe();
console.log('LIGHT@1440', JSON.stringify(light, null, 2));
await page.screenshot({ path: `${OUT}\\hero-desktop.png` });

// cursor signature: ring + field warp under the pointer
await page.mouse.move(720, 420, { steps: 8 });
await settle(400);
await page.screenshot({ path: `${OUT}\\hero-cursor.png` });

// dark crisp hero
await applyTheme('dark');
const dark = await probe();
console.log('DARK@1440 activeNavColor =', dark.activeNavColor, '| cols =', dark.gridCols);
await page.screenshot({ path: `${OUT}\\hero-dark.png` });

// 390 layout probe
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await applyTheme('light');
const mobile = await probe();
console.log('LIGHT@390', JSON.stringify(mobile, null, 2));

await browser.close();
console.log('DONE');
