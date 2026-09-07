const {chromium} = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    for (const route of ['/','/zh/','/cv/','/zh/publications/']) {
      const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'dark',reducedMotion:'reduce'});
      const page = await context.newPage(), errors=[];
      page.on('pageerror',error=>errors.push(String(error)));
      await page.goto('http://127.0.0.1:8765'+route);
      await page.waitForTimeout(300);
      const snapshot = () => page.evaluate(() => {
        const svg=document.querySelector('.hero-motion');
        return {mesh:svg.querySelector('.field-mesh').outerHTML,
          spins:svg.querySelector('.quantum-motion').innerHTML,
          particles:svg.querySelector('.classical-motion').innerHTML,
          viewBox:svg.getAttribute('viewBox'),height:svg.getBoundingClientRect().height};
      });
      const before=await snapshot();
      const opacity=await page.locator('.hero-motion').evaluate(el=>el.style.opacity);
      for (const top of [350,1100,2300]) {
        await page.evaluate(top=>scrollTo({top,behavior:'instant'}),top);
        await page.waitForTimeout(100);
        assert.deepEqual(await snapshot(),before,`${route}: scrolling changed fixed geometry`);
      }
      if(route==='/'||route==='/zh/')assert(Number(await page.locator('.hero-motion').evaluate(el=>el.style.opacity))<Number(opacity),'Content did not fade background');
      for (const height of [740,900,844]) {
        await page.setViewportSize({width:390,height});
        await page.waitForTimeout(100);
        assert.deepEqual(await snapshot(),before,'Browser toolbar resized or redrew field');
      }
      const colors=await page.evaluate(()=>({
        scheme:getComputedStyle(document.documentElement).colorScheme,
        background:getComputedStyle(document.body).backgroundColor,
        dots:[...document.querySelectorAll('.particle-dot')].map(el=>getComputedStyle(el).fill),
        overflow:document.documentElement.scrollWidth>innerWidth,
        mask:getComputedStyle(document.querySelector('.hero-motion')).maskImage
      }));
      assert.equal(colors.background,'rgb(247, 248, 252)');
      assert(colors.scheme.includes('light'));
      assert(colors.dots.length>0&&colors.dots.every(color=>color==='rgb(0, 17, 88)'));
      assert.equal(colors.mask,'none');assert.equal(colors.overflow,false);
      await page.screenshot({path:`local-preview/fixed-mobile-${route.replaceAll('/','_')}-dark.png`});
      assert.deepEqual(errors,[]);
      console.log('PASS fixed geometry, toolbar stability, theme under dark OS:',route);
      await context.close();
    }
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
