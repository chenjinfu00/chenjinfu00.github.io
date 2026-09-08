const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const assert=require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    for(const width of [1440,1024,390,320]) {
      const context=await browser.newContext({viewport:{width,height:width>540?1000:844},isMobile:width<541,hasTouch:width<541,reducedMotion:'reduce'});
      const page=await context.newPage();
      await page.goto('http://127.0.0.1:8765/');
      await page.waitForFunction(()=>document.documentElement.dataset.languageLayout==='ready');
      const selectors=['.wordmark','.menu-toggle','#navigation','.field-tools','.language-switch','.hero-copy','.hero h1','.hero-statement','.hero-description','.hero-links','.hero-bottom','#research','.research-grid','.works-section','.about-section','.site-footer'];
      const boxes=()=>page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>{
        const rect=document.querySelector(selector).getBoundingClientRect();
        return [selector,{x:rect.x,y:rect.y,width:rect.width,height:rect.height}];
      })),selectors);
      const english=await boxes();
      await page.locator('.language-switch').click();
      await page.waitForFunction(()=>document.documentElement.lang==='zh-CN');
      const chinese=await boxes();
      const delta=Object.fromEntries(selectors.map(selector=>[selector,Object.fromEntries(Object.keys(english[selector]).map(key=>[key,Number((chinese[selector][key]-english[selector][key]).toFixed(2))]))]));
      for(const [selector,values] of Object.entries(delta))for(const [key,value] of Object.entries(values))assert(Math.abs(value)<=.6,`${width} ${selector} ${key} shifted by ${value}px`);
      assert(await page.locator('.field-toggle').isVisible());
      console.log('PASS homepage',width);
      await context.close();
    }
    for(const width of [1440,390]) {
      const context=await browser.newContext({viewport:{width,height:width>540?1000:844},isMobile:width<541,hasTouch:width<541,reducedMotion:'reduce'});
      const page=await context.newPage();
      for(const [route,selectors] of [
        ['/publications/',['.wordmark','#navigation','.field-tools','.language-switch','.page-heading','.filter-toolbar','.archive-meta','.group-title','.paper-row','.site-footer']],
        ['/talks/',['.wordmark','#navigation','.field-tools','.language-switch','.page-heading','.filter-toolbar','.archive-meta','.event-row','.site-footer']],
        ['/cv/',['.wordmark','#navigation','.field-tools','.language-switch','.page-heading','.bio-grid','.timeline article','.course-row','.site-footer']],
        ['/teaching/',['.wordmark','#navigation','.field-tools','.language-switch','.page-heading','.course-row','.site-footer']],
        ['/publication/boosting-thermalization-many-body-systems/',['.wordmark','#navigation','.field-tools','.language-switch','.detail-page','.detail-page>h1','.detail-summary','.citation-block','.site-footer']]
      ]) {
        await page.goto('http://127.0.0.1:8765'+route);
        await page.waitForFunction(()=>document.documentElement.dataset.languageLayout==='ready');
        const measure=()=>page.evaluate(selectors=>Object.fromEntries(selectors.map(selector=>[selector,[...document.querySelectorAll(selector)].map(node=>{
          const rect=node.getBoundingClientRect();return {x:rect.x,y:rect.y,width:rect.width,height:rect.height};
        })])),selectors);
        const english=await measure();
        await page.evaluate(()=>{window.layoutParticle=document.querySelector('[data-kind]');});
        await page.locator('.language-switch').click();
        await page.waitForFunction(()=>document.documentElement.lang==='zh-CN');
        const chinese=await measure();
        for(const selector of selectors) {
          assert.equal(chinese[selector].length,english[selector].length,`${route} ${selector} count changed`);
          english[selector].forEach((box,index)=>Object.keys(box).forEach(key=>assert(Math.abs(chinese[selector][index][key]-box[key])<=.6,`${width} ${route} ${selector}[${index}] ${key} shifted`)));
        }
        assert(await page.evaluate(()=>layoutParticle?.isConnected),'Language layout check restarted the simulation');
        console.log('PASS route',width,route);
      }
      await context.close();
    }
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
