const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const assert=require('node:assert/strict');
const phase=process.argv[2]||'after';
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    for(const [width,height] of [[1440,1000],[1920,1080],[1024,768],[390,844],[320,740]]){
      const context=await browser.newContext({viewport:{width,height},hasTouch:width<541,isMobile:width<541,reducedMotion:'reduce'});
      const page=await context.newPage(),errors=[];
      page.on('pageerror',e=>errors.push(String(e)));
      for(const route of ['/','/zh/']){
        await page.goto('http://127.0.0.1:8765'+route);
        await page.waitForTimeout(250);
        const layout=await page.evaluate(()=>{
          const box=selector=>document.querySelector(selector).getBoundingClientRect().toJSON();
          return {overflow:document.documentElement.scrollWidth>innerWidth,
            title:box('.hero h1'),links:box('.hero-links'),bottom:box('.hero-bottom'),
            research:box('#research'),hero:box('.hero'),italic:getComputedStyle(document.querySelector('.hero h1')).fontStyle,
            missing:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length};
        });
        assert(!layout.overflow&&layout.missing===0,'Overflow or missing image');
        assert(layout.links.bottom<layout.bottom.top,'Hero controls overlap footer');
        assert(layout.title.right<=width&&layout.italic==='normal','Name clipped or italic');
        assert(layout.research.top<height,'Next section is not visible');
        await page.screenshot({path:`local-preview/art-${phase}-${width}-${route==='/'?'en':'zh'}.png`});
        await page.evaluate(()=>scrollTo({top:document.querySelector('#research').offsetTop-80,behavior:'instant'}));
        await page.waitForTimeout(150);
        if(width===1440||width===390)await page.screenshot({path:`local-preview/art-${phase}-research-${width}-${route==='/'?'en':'zh'}.png`});
        assert.deepEqual(errors,[]);
        console.log('PASS',phase,width,route);
      }
      await context.close();
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
