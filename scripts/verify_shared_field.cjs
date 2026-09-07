const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const fs=require('node:fs');
const assert=(ok,message)=>{if(!ok)throw Error(message)};
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(String(error)));
  const pages=JSON.parse(fs.readFileSync('site_src/generated-files.json','utf8'));
  const routes=['/publications/','/talks/','/cv/','/teaching/',
    '/publication/boosting-thermalization-many-body-systems/',
    '/'+pages.find(p=>p.startsWith('talks/')&&p!=='talks/index.html').replace('index.html',''),
    '/'+pages.find(p=>p.startsWith('teaching/')&&p!=='teaching/index.html').replace('index.html',''),'/404.html'];
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:width===1440?1000:844});
    for(const prefix of ['', '/zh'])for(const route of routes){
      await page.goto('http://127.0.0.1:8765'+prefix+route);
      await page.waitForFunction(()=>document.querySelector('[data-kind="spin"][data-theta]'));
      const before=await page.evaluate(()=>[...document.querySelectorAll('[data-kind="spin"][data-theta]')].map(el=>el.dataset.theta).join(','));
      await page.waitForFunction(previous=>[...document.querySelectorAll('[data-kind="spin"][data-theta]')].map(el=>el.dataset.theta).join(',')!==previous,before,{timeout:5000});
      assert(await page.locator('.motion-toggle').isVisible(),'Missing pause control');
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow');
      assert(await page.evaluate(()=>document.body.classList.contains('physics-fixed')
        ? Number(getComputedStyle(document.querySelector('.hero-motion')).opacity)<=.35
        : Number(document.querySelector('#mesh-depth').getAttribute('y2'))<document.querySelector('main').getBoundingClientRect().top+scrollY),'Background is not in faint mode');
      if(prefix==='/zh'&&['/publications/','/cv/','/publication/boosting-thermalization-many-body-systems/'].includes(route))
        await page.screenshot({path:`local-preview/shared-field-${width}-${route.split('/')[1]}.png`});
    }
  }
  await page.goto('http://127.0.0.1:8765/zh/publications/');
  await page.getByRole('searchbox').fill('不存在的文章');
  await page.locator('.empty-state').waitFor({state:'visible'});
  await page.getByRole('searchbox').fill('');
  assert(await page.locator('[data-result]:visible').count()===19,'Search no longer works with field');
  await page.locator('.motion-toggle').click();
  const paused=await page.locator('.quantum-motion').innerHTML();
  await page.waitForTimeout(250);
  assert(paused===await page.locator('.quantum-motion').innerHTML(),'Pause failed on archive');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:8765/zh/cv/');
  const reduced=await page.locator('.quantum-motion').innerHTML();
  await page.waitForTimeout(250);
  assert(reduced===await page.locator('.quantum-motion').innerHTML(),'Reduced motion ignored on CV');
  assert(!errors.length,errors.join('\n'));
  console.log(JSON.stringify({checks:routes.length*2*2,routes,languages:['en','zh'],widths:[1440,390],javascriptErrors:errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
