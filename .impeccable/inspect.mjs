/* Dev-only targeted inspection. node .impeccable/inspect.mjs */
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL = 'http://localhost:4173/Portfolio/';
const OUT = 'D:\\Portfolio\\.impeccable\\review';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: 'load' });
await page.evaluate(() => localStorage.setItem('theme', 'light'));
await page.reload({ waitUntil: 'load' });
await new Promise((r) => setTimeout(r, 2000));

const report = await page.evaluate(() => {
  const rect = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const nav = rect('nav');
  const hero = rect('#hero');
  const plate = document.querySelector('#hero h1')?.parentElement;
  const pr = plate?.getBoundingClientRect();
  const vpCenter = window.innerWidth / 2;
  const plateCenter = pr ? pr.left + pr.width / 2 : null;

  // Black-background elements inside #about (suspected stray hover/invert)
  const blacks = [...document.querySelectorAll('#about *')]
    .filter((el) => getComputedStyle(el).backgroundColor === 'rgb(0, 0, 0)')
    .map((el) => ({
      tag: el.tagName,
      text: (el.textContent || '').slice(0, 30),
      hover: el.matches(':hover'),
      cls: el.className?.toString().slice(0, 40),
    }));

  // Thumb sizes in projects
  const thumbs = [...document.querySelectorAll('#projects img')].slice(0, 3).map((img) => {
    const r = img.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), natural: img.naturalWidth, complete: img.complete };
  });

  return {
    nav,
    hero,
    plateCenter,
    vpCenter,
    plateOffCenter: plateCenter !== null ? Math.round(plateCenter - vpCenter) : null,
    blacks,
    thumbs,
    fontsReady: document.fonts.status,
  };
});

console.log(JSON.stringify(report, null, 2));

// Above-the-fold viewport shot
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}\\top.png` }); // viewport only
console.log('saved top.png');

// About element shot
const about = await page.$('#about');
if (about) {
  await about.screenshot({ path: `${OUT}\\about.png` });
  console.log('saved about.png');
}

await browser.close();
