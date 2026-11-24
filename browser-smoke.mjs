import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json'
};
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
  catch { res.writeHead(400).end(); return; }
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const target = path.resolve(root, relative);
  if (!target.startsWith(root + path.sep) && target !== path.join(root, 'index.html')) {
    res.writeHead(403).end(); return;
  }
  fs.readFile(target, (error, data) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' });
    res.end(data);
  });
});

let browser;
try {
  await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
  browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader'] });
  const profiles = [
    { name: 'desktop', viewport: { width: 1365, height: 900 }, isMobile: false, hasTouch: false, dpr: 1 },
    { name: 'iPhone-sized Chromium emulation', viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, dpr: 2 },
    { name: 'Android-sized Chrome emulation', viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, dpr: 2.625 },
    { name: 'tablet', viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true, dpr: 2 }
  ];

  for (const profile of profiles) {
    const context = await browser.newContext({
      viewport: profile.viewport, isMobile: profile.isMobile,
      hasTouch: profile.hasTouch, deviceScaleFactor: profile.dpr
    });
    const page = await context.newPage();
    const pageErrors = [];
    const consoleErrors = [];
    const moduleResponses = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('response', response => {
      if (response.url().includes('/js/secret-world.js') || response.url().includes('/content/site-config.js')) {
        moduleResponses.push({ url: response.url(), status: response.status() });
      }
    });
    const localFailures = [];
    let contentConfigLoaded = false;
    page.on('response', response => {
      if (response.url().endsWith('/content/site-config.js') && response.ok()) contentConfigLoaded = true;
    });
    page.on('requestfailed', request => {
      if (request.url().startsWith('http://127.0.0.1:4173/')) localFailures.push(request.url());
    });

    const response = await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200, profile.name + ': homepage should return HTTP 200');
    await page.locator('#music-room').waitFor({ state: 'attached' });
    await page.locator('#story').waitFor({ state: 'attached' });
    await page.locator('#quest-mount').waitFor({ state: 'attached' });

    // The entire experience must stay behind the birthday PIN gate.
    const pinLock = page.locator('#pin-lock');
    await pinLock.waitFor({ state: 'visible' });
    assert.equal(await page.locator('#main-content').evaluate(el => el.inert), true,
      profile.name + ': site content should be inert before PIN unlock');
    const mascot = page.locator('#pin-mascot');
    assert.equal(await mascot.getAttribute('data-mood'), 'idle',
      profile.name + ': Bubu & Dudu should start with a calm expression');
    await pinLock.locator('[data-pin-digit="1"]').click();
    assert.equal(await mascot.getAttribute('data-mood'), 'thinking',
      profile.name + ': mascot should think while PIN digits are entered');
    await pinLock.locator('[data-pin-action="clear"]').click();
    assert.equal(await mascot.getAttribute('data-mood'), 'idle',
      profile.name + ': clearing PIN should reset the mascot to idle');
    for (const digit of '11111111') await pinLock.locator('[data-pin-digit="' + digit + '"]').click();
    await page.waitForFunction(() => /Oopsie/.test(document.querySelector('#pin-lock-status')?.textContent || ''));
    assert.equal(await mascot.getAttribute('data-mood'), 'sad',
      profile.name + ': first incorrect PIN should make the mascot sad');
    await page.waitForFunction(() => !document.querySelector('#pin-lock .pin-key')?.disabled);
    for (const digit of '11111111') await pinLock.locator('[data-pin-digit="' + digit + '"]').click();
    await page.waitForFunction(() => /crying/.test(document.querySelector('#pin-lock-status')?.textContent || ''));
    assert.equal(await mascot.getAttribute('data-mood'), 'crying',
      profile.name + ': repeated incorrect PIN should make the mascot cry');
    await page.waitForFunction(() => !document.querySelector('#pin-lock .pin-key')?.disabled);
    for (const digit of '20062008') await pinLock.locator('[data-pin-digit="' + digit + '"]').click();
    await page.waitForFunction(() => document.querySelector('#pin-mascot')?.getAttribute('data-mood') === 'happy');
    await pinLock.waitFor({ state: 'hidden' });
    assert.equal(await page.locator('#main-content').evaluate(el => el.inert), false,
      profile.name + ': site content should become interactive after correct PIN');

    // The first-visit cinematic intro intentionally blocks background controls.
    // Dismiss it through its real user-facing action before testing the page UI.
    const intro = page.locator('#intro');
    if (await intro.isVisible()) {
      const skip = page.locator('#skip-intro');
      await skip.waitFor({ state: 'visible' });
      await skip.click();
      await intro.waitFor({ state: 'hidden' });
    }

    // Secret World: seven OT7 stars, bilingual Open-When letters and virtual hug.
    const secretWorld = page.locator('#nishi-secret-world');
    try {
      await secretWorld.waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      const state = await page.evaluate(() => ({
        readyState: document.readyState,
        pinUnlocked: document.body.classList.contains('nishi-pin-unlocked'),
        pinLockPresent: !!document.querySelector('#pin-lock'),
        finalLetterPresent: !!document.querySelector('#final-letter'),
        finalLetterSection: document.querySelector('#final-letter')?.closest('section')?.id || null,
        secretWorldPresent: !!document.querySelector('#nishi-secret-world'),
        configPresent: !!window.__nishiSecretWorldConfig
      }));
      throw new Error(profile.name + ': Secret World failed to initialise. DOM=' +
        JSON.stringify(state) + '; pageErrors=' + JSON.stringify(pageErrors) +
        '; consoleErrors=' + JSON.stringify(consoleErrors) +
        '; moduleResponses=' + JSON.stringify(moduleResponses));
    }
    assert.equal(await secretWorld.locator('.nishi-star-card').count(), 7,
      profile.name + ': all seven OT7 treasure stars should be present');
    await secretWorld.locator('[data-star-id="rm"]').click();
    assert.match(await secretWorld.locator('#nishi-star-count').textContent(), /1 of 7/);
    assert.ok((await secretWorld.locator('.nishi-star-reveal').textContent()).includes('Keep dreaming boldly'),
      profile.name + ': collected star should reveal its wish');
    await secretWorld.locator('[data-letter-id="sad"]').click();
    assert.equal(await secretWorld.locator('#nishi-letter-reveal').isVisible(), true,
      profile.name + ': Open-When letter should reveal its message');
    assert.ok((await secretWorld.locator('#nishi-letter-reveal').textContent()).includes('cloudy day'));
    await secretWorld.locator('.nishi-hug-button').click();
    assert.ok((await secretWorld.locator('.nishi-hug-status').textContent()).includes('Hug delivered'),
      profile.name + ': virtual hug should provide feedback');
    await secretWorld.locator('#nishi-magic-wish').fill('A little wish');
    await secretWorld.locator('.nishi-magic-open').click();
    assert.ok((await secretWorld.locator('.nishi-magic-status').textContent()).includes('you deserve patience'),
      profile.name + ': Magic Shop should reveal its comfort message');
    await secretWorld.locator('.nishi-photocard-pull').click();
    const pulledCard = secretWorld.locator('.nishi-photocard');
    await pulledCard.waitFor({ state: 'visible' });
    const pulledMember = (await pulledCard.locator('.nishi-photocard-member').textContent()).trim();
    assert.ok(['RM', 'Jin', 'SUGA', 'j-hope', 'Jimin', 'V', 'Jung Kook'].includes(pulledMember),
      profile.name + ': photocard should feature exactly one OT7 member');

    // Allow either a real first WebGL frame or the explicit CSS fallback timeout.
    await page.waitForTimeout(2300);

    const layout = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      title: document.title,
      lang: document.documentElement.lang,
      canvas: !!document.querySelector('#scene-canvas'),
      canvasState: (() => { const c = document.querySelector('#scene-canvas'); return !!c && (c.classList.contains('is-live') || document.body.classList.contains('no-webgl')); })(),
      mainSections: ['music-room', 'story', 'quest-mount'].every(id => !!document.getElementById(id))
    }));
    assert.ok(layout.title.includes('Nishi'), profile.name + ': title missing');
    assert.ok(contentConfigLoaded, profile.name + ': central editable content config did not load');
    assert.ok(layout.mainSections, profile.name + ': core sections missing');
    assert.ok(layout.canvas && layout.canvasState, profile.name + ': 3D canvas is neither rendering nor explicitly using CSS fallback');
    assert.ok(layout.scrollWidth <= layout.width + 2,
      profile.name + ': horizontal overflow (' + layout.scrollWidth + ' > ' + layout.width + ')');

    const premium = await page.evaluate(() => {
      const hero = document.querySelector('#home');
      const copy = document.querySelector('.premium-hero-copy');
      const visual = document.querySelector('.premium-hero-visual');
      const art = document.querySelector('.premium-castle-art');
      if (!hero || !copy || !visual || !art) return { present: false };
      const a = copy.getBoundingClientRect();
      const b = visual.getBoundingClientRect();
      return {
        present: true,
        heading: !!hero.querySelector('h1') && !!hero.querySelector('h1').textContent.trim(),
        imageLoaded: art.complete && art.naturalWidth > 0,
        copyVisible: a.width > 0 && a.height > 0,
        visualVisible: b.width > 0 && b.height > 0,
        desktopColumns: window.innerWidth <= 900 || b.left >= a.right - 8,
        mobileStack: window.innerWidth > 900 || b.top >= a.bottom - 8
      };
    });
    assert.ok(premium.present, profile.name + ': premium hero markup missing');
    assert.ok(premium.heading, profile.name + ': hero heading missing');
    assert.ok(premium.imageLoaded, profile.name + ': castle artwork failed to load');
    assert.ok(premium.copyVisible && premium.visualVisible, profile.name + ': hero content is not visible');
    assert.ok(premium.desktopColumns, profile.name + ': desktop hero columns overlap');
    assert.ok(premium.mobileStack, profile.name + ': mobile hero columns do not stack');

    const menu = page.locator('#nav-toggle');
    const mobileMenu = await menu.isVisible();
    if (mobileMenu) {
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true', profile.name + ': mobile menu did not open');
    }

    // On narrow viewports the language control lives inside the collapsible menu.
    const initialLang = await page.locator('html').getAttribute('lang');
    await page.locator('#lang-toggle').click();
    const translatedLang = await page.locator('html').getAttribute('lang');
    assert.ok(['en', 'bn'].includes(translatedLang), profile.name + ': invalid language state');
    assert.notEqual(translatedLang, initialLang, profile.name + ': language toggle did not switch language');

    if (mobileMenu) {
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'false', profile.name + ': mobile menu did not close');
    }
    assert.equal(pageErrors.length, 0, profile.name + ': uncaught browser errors: ' + pageErrors.join('; '));
    assert.equal(localFailures.length, 0, profile.name + ': failed local assets: ' + localFailures.join(', '));

    console.log('PASS ' + profile.name + ': layout, visible 3D/CSS fallback, core content, nav, language, no runtime errors');
    await context.close();
  }
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
