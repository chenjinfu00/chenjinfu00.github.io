const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage({viewport:{width:1536,height:1024}});
  await page.goto('http://127.0.0.1:8765/');
  await page.addStyleTag({content:'.site-header,.hero-inner,.motion-toggle,.site-footer,#main>.section{display:none!important}.hero{width:1536px;height:1024px}.hero-art{inset:0!important;width:1536px!important;height:1024px!important;object-position:50% 50%!important}'});
  await page.waitForTimeout(1500);
  await page.screenshot({path:'assets/site/quantum-geometry-social.png'});
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
