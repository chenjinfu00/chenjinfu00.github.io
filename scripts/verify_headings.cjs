const {chromium} = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
    const page = await browser.newPage({reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({width, height: 900});
      for (const prefix of ['', '/zh']) {
        for (const route of ['/', '/cv/', '/talks/', '/publications/', '/teaching/']) {
          await page.goto('http://127.0.0.1:8765' + prefix + route);
          const result = await page.evaluate(() => {
            const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,.hero-statement')];
            const editorial = headings.filter(el => !el.closest('.paper-row,.event-row,.timeline,.course-row,.work-group'));
            return {
              italic: headings.flatMap(el => [el, ...el.querySelectorAll('*')]).filter(el => getComputedStyle(el).fontStyle !== 'normal').map(el => el.textContent),
              punctuation: editorial.filter(el => /[。，、：；！？,.!?;:&]/.test(el.textContent)).map(el => el.textContent),
              overflow: document.documentElement.scrollWidth > innerWidth,
              title: document.querySelector('h1').textContent,
              text: document.body.innerText,
            };
          });
          assert.deepEqual(result.italic, [], 'Italic heading: ' + prefix + route);
          assert.deepEqual(result.punctuation, [], 'Heading punctuation: ' + prefix + route);
          assert(!result.overflow, 'Overflow: ' + width + ' ' + prefix + route);
          assert(!result.text.includes('Ideas into') && !result.text.includes('让想法成为'));
          assert(!result.text.includes('Sharing ideas across') && !result.text.includes('分享量子物理与统计物理中的问题'));
          if (route === '/cv/' && prefix) {
            assert.equal(result.title, '在物理中探索更多可能');
            assert(result.text.includes('随机热力学与有限时间热力学'));
          }
          if (route === '/' && prefix) assert(result.text.includes('热力学与生成式人工智能'));
          if (route === '/cv/' || route === '/') {
            await page.screenshot({path: 'local-preview/headings-' + width + '-' + (prefix ? 'zh' : 'en') + '-' + (route === '/' ? 'home' : 'cv') + '.png'});
          }
          console.log(width, prefix + route, 'OK');
        }
      }
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
