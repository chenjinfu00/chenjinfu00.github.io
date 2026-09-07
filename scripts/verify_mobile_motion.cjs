const {chromium} = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const {execFileSync} = require('node:child_process');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    const oldScript = execFileSync('git',['show','HEAD:assets/site/geometry-field.js'],{encoding:'utf8'});
    for (const baseline of [true,false]) {
      const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
      const page = await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(String(e)));
      if(baseline) await page.route('**/geometry-field.js',route=>route.fulfill({body:oldScript,contentType:'application/javascript'}));
      await page.goto('http://127.0.0.1:8765/zh/');
      await page.waitForTimeout(500);
      await page.locator('.motion-toggle').click();
      await page.waitForTimeout(100);
      await page.evaluate(() => {
        window.initialParticles=[...document.querySelectorAll('[data-kind]')];
        window.initialStates=initialParticles.map(g=>g.style.display!=='none'?{u:g.dataset.u,v:g.dataset.v,theta:g.dataset.theta}:null);
      });
      for(const height of [740,900,780,844]) {
        await page.setViewportSize({width:390,height});
        await page.waitForTimeout(100);
      }
      // Archive filtering and responsive reflow must not recreate the existing simulation.
      await page.evaluate(()=>{
        const main=document.querySelector('main');
        main.style.minHeight=(main.scrollHeight+700)+'px';
      });
      await page.waitForTimeout(150);
      const continuity=await page.evaluate(()=>({
        retained:initialParticles.every(g=>g.isConnected),
        unchanged:initialParticles.every((g,i)=>!initialStates[i]||Object.entries(initialStates[i]).every(([key,value])=>g.dataset[key]===value))
      }));
      if(!baseline)assert(continuity.retained&&continuity.unchanged,'Resize reset particles or their state');
      await page.locator('.motion-toggle').click();
      const scroll=await page.evaluate(async()=>{
        const gaps=[],tasks=[];
        const observer=new PerformanceObserver(list=>tasks.push(...list.getEntries().map(e=>e.duration)));
        observer.observe({type:'longtask'});
        let previous=performance.now();
        for(let i=0;i<90;i++){
          await new Promise(requestAnimationFrame);
          const now=performance.now();gaps.push(now-previous);previous=now;
          scrollTo({top:i*35,behavior:'instant'});
        }
        await new Promise(requestAnimationFrame);
        observer.disconnect();
        gaps.sort((a,b)=>a-b);
        return {p95:gaps[Math.floor(gaps.length*.95)],max:gaps.at(-1),longTasks:tasks.length,
          longestTask:Math.max(0,...tasks),visible:document.querySelectorAll('[data-kind]:not([style*="display: none"])').length};
      });
      console.log(baseline?'BEFORE':'AFTER',{continuity,scroll});
      if(!baseline){
        assert(scroll.visible>0,'Particles missing after scrolling');
        const before=await page.locator('.quantum-motion').innerHTML();
        await page.waitForTimeout(200);
        assert.notEqual(await page.locator('.quantum-motion').innerHTML(),before,'Animation stopped after scrolling');
        const cdp=await context.newCDPSession(page);
        const scrollBefore=await page.evaluate(()=>scrollY);
        await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:600}]});
        for(let y=580;y>=240;y-=20){
          await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y}]});
          await page.waitForTimeout(16);
        }
        await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        await page.waitForTimeout(300);
        assert(await page.evaluate(()=>scrollY)>scrollBefore+100,'Touch scrolling was blocked');
        await cdp.detach();
        await page.locator('.motion-toggle').click();
        await page.waitForTimeout(80);
        const stopped=await page.locator('.quantum-motion').innerHTML();
        await page.waitForTimeout(120);
        assert.equal(await page.locator('.quantum-motion').innerHTML(),stopped,'Pause failed');
        await page.screenshot({path:'local-preview/mobile-motion-scroll.png'});
        await page.setViewportSize({width:844,height:390});
        await page.waitForTimeout(200);
        assert(await page.evaluate(()=>initialParticles.every(g=>g.isConnected)),'Rotation replaced particles');
      }
      assert.deepEqual(errors,[]);
      await context.close();
    }
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
