const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');

(async () => {
  const browser = await chromium.launch({headless: true, channel: 'chrome'});
  const context = await browser.newContext({permissions: ['clipboard-read', 'clipboard-write']});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  const root = 'http://127.0.0.1:8765';
  const dir = path.resolve('local-preview');
  fs.mkdirSync(dir, {recursive: true});
  function check(value, message) { if (!value) throw Error(message); }
  for (const viewport of [{width:1440,height:1000},{width:390,height:844},{width:320,height:740},{width:1920,height:1080}]) {
    await page.setViewportSize(viewport);
    for (const route of ['/', '/publications/', '/talks/', '/cv/', '/teaching/', '/publication/boosting-thermalization-many-body-systems/', '/zh/', '/zh/publications/', '/zh/talks/', '/zh/cv/', '/zh/teaching/', '/zh/publication/boosting-thermalization-many-body-systems/']) {
      const response = await page.goto(root + route);
      check(response.status() === 200, 'Page missing: ' + route);
      await page.locator('h1').waitFor();
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(image => {
          image.loading = 'eager';
          return image.decode().catch(() => {});
        }));
      });
      const layout = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        missingImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
        icons: document.querySelectorAll('svg.lucide').length
      }));
      if (layout.width > layout.viewport) console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).map(el => ({tag:el.tagName,cls:el.className,text:el.textContent.slice(0,70),right:el.getBoundingClientRect().right}))));
      check(layout.width <= layout.viewport, `${route} overflows at ${viewport.width}: ${layout.width}`);
      check(!layout.missingImages.length, 'Image missing: ' + layout.missingImages);
      check(layout.icons > 0, 'Icons did not render');
      check(await page.locator('body.physics-active').count() === 1, 'Physics background missing: ' + route);
      check(await page.locator('.hero-motion').count() === 1, 'Duplicate physics layer: ' + route);
      check(await page.locator('[data-kind="spin"][data-theta]').count() > 0, 'No visible spins: ' + route);
      check(await page.locator('[data-kind="brownian"][data-u]').count() > 0, 'No visible Brownian particles: ' + route);
      if ([1440,390].includes(viewport.width)) await page.screenshot({path:path.join(dir,`${viewport.width}-${route.replaceAll('/','_') || 'home'}.png`),fullPage:true});
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(root + '/publications/');
  check(await page.locator('[data-result]:visible').count() === 19, 'Expected all 19 works');
  await page.locator('[data-filter="finite_time_heat_engines"]').click();
  check(await page.locator('[data-result]:visible').count() === 9, 'Heat engine filter incorrect');
  await page.getByRole('searchbox').fill('Otto');
  check(await page.locator('[data-result]:visible').count() === 4, 'Search + topic incorrect');
  await page.getByRole('searchbox').fill('no-such-paper');
  check(await page.locator('.empty-state').isVisible(), 'Empty state missing');
  await page.locator('.reset-filters').click();
  check(await page.locator('[data-result]:visible').count() === 19, 'Reset incorrect');
  await page.locator('.copy-citation').first().click();
  check((await page.evaluate(() => navigator.clipboard.readText())).includes('Boosting thermalization'), 'Clipboard citation incorrect');
  await page.goto(root + '/publications/?topic=stochastic_thermodynamics&q=Chen');
  check(await page.locator('[data-result]:visible').count() === 5, 'Deep-linked filter incorrect');
  await page.locator('.language-switch').click();
  check(new URL(page.url()).pathname === '/zh/publications/', 'Chinese switch route incorrect');
  check(new URL(page.url()).searchParams.get('q') === 'Chen', 'Language switch lost search');
  check(await page.locator('[data-result]:visible').count() === 5, 'Chinese filter incorrect');
  check(await page.locator('html').getAttribute('lang') === 'zh-CN', 'Chinese language metadata missing');
  await page.locator('[data-filter="all"]').click();
  await page.getByRole('searchbox').fill('热化');
  check(await page.locator('[data-result]:visible').count() === 1, 'Chinese search incorrect');
  await page.locator('.copy-citation:visible').first().click();
  check((await page.evaluate(() => navigator.clipboard.readText())).includes('Boosting thermalization'), 'Chinese page altered formal citation');
  await page.locator('.language-switch').click();
  check(new URL(page.url()).pathname === '/publications/', 'English switch route incorrect');
  await page.goto(root + '/zh/');
  const spin = page.locator('.quantum-motion path').first();
  const initial = await spin.getAttribute('d');
  await page.waitForTimeout(450);
  check(initial !== await spin.getAttribute('d'), 'Spin is not rotating');
  const walk = page.locator('.classical-motion path').first();
  const trail = await walk.getAttribute('d');
  await page.waitForTimeout(450);
  check(trail !== await walk.getAttribute('d'), 'Random walk is not moving');
  await page.locator('.motion-toggle').click();
  const stopped = await spin.getAttribute('d');
  await page.waitForTimeout(400);
  check(stopped === await spin.getAttribute('d'), 'Pause does not stop animation');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload();
  const reduced = await spin.getAttribute('d');
  await page.waitForTimeout(400);
  check(reduced === await spin.getAttribute('d'), 'Reduced-motion preference ignored');
  check(await page.locator('.motion-toggle').getAttribute('aria-label') === '播放动画', 'Chinese motion label missing');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(root + '/talks/');
  await page.locator('[data-filter="poster"]').click();
  check(await page.locator('[data-result]:visible').count() === 3, 'Poster filter incorrect');
  await page.setViewportSize({width:390,height:844});
  await page.goto(root);
  await page.locator('.menu-toggle').click();
  check(await page.locator('#navigation').isVisible(), 'Mobile navigation missing');
  await page.keyboard.press('Escape');
  check(!await page.locator('#navigation').isVisible(), 'Escape did not close navigation');
  await page.locator('.menu-toggle').click();
  await page.locator('#navigation').getByRole('link', {name:'Selected Works'}).click();
  check(new URL(page.url()).pathname === '/publications/', 'Mobile navigation did not navigate');
  check(errors.length === 0, errors.join('\n'));
  const pages = JSON.parse(fs.readFileSync('site_src/generated-files.json','utf8'));
  for (const file of pages) {
    const response = await context.request.get(root + '/' + file);
    check(response.ok(), 'Generated page unavailable: ' + file);
  }
  console.log(JSON.stringify({pages:pages.length,viewports:[320,390,1440,1920],javascriptErrors:errors,checks:'Images, overflow, icons, all archive routes, search, filters, empty state, citation clipboard, mobile menu'},null,2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
