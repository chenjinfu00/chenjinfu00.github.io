const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const {execFileSync}=require('node:child_process');
const fs=require('node:fs');
const assert=require('node:assert/strict');

const baseline=process.argv.includes('--baseline');
const base=process.env.PREVIEW_URL||'http://127.0.0.1:8765';
fs.mkdirSync('local-preview',{recursive:true});

(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const results=[];
  try {
    for(const mobile of [false,true]) {
      const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},isMobile:mobile,hasTouch:mobile});
      const page=await context.newPage(),errors=[];
      page.on('pageerror',e=>errors.push(String(e)));
      if(baseline)for(const file of ['geometry-field.js','style.css']) {
        const body=execFileSync('git',['show',`HEAD:assets/site/${file}`],{encoding:'utf8'});
        await page.route(`**/assets/site/${file}`,route=>route.fulfill({body,contentType:file.endsWith('.js')?'application/javascript':'text/css'}));
      }
      await page.goto(base+'/zh/');
      await page.waitForFunction(()=>document.documentElement.dataset.languageLayout==='ready'&&document.querySelector('[data-theta]'));
      await page.waitForTimeout(600);
      // Keep the same mesh and particle identities across native page scrolling.
      await page.locator('.motion-toggle').click();
      await page.evaluate(()=>{
        window.fieldBefore={
          mesh:document.querySelector('.field-mesh').innerHTML,
          particles:[...document.querySelectorAll('[data-kind]')],
          geometry:[...document.querySelectorAll('.quantum-motion,.classical-motion')].map(el=>el.innerHTML),
          viewport:document.querySelector('.hero-motion').getBoundingClientRect().y,
          scroll:scrollY
        };
      });
      for(const y of [300,850,1400,2400,3500,650,0]) {
        await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
        await page.waitForTimeout(60);
        const state=await page.evaluate(()=>{
          const svg=document.querySelector('.hero-motion');
          return {
            meshStable:svg.querySelector('.field-mesh').innerHTML===fieldBefore.mesh,
            geometryStable:[...document.querySelectorAll('.quantum-motion,.classical-motion')].every((el,i)=>el.innerHTML===fieldBefore.geometry[i]),
            retained:fieldBefore.particles.every(el=>el.isConnected),
            movement:svg.getBoundingClientRect().y-fieldBefore.viewport+scrollY-fieldBefore.scroll,
            fixed:svg.getBoundingClientRect().y===fieldBefore.viewport,
            overflow:document.documentElement.scrollWidth>innerWidth
          };
        });
        if(!baseline) {
          assert(state.meshStable&&state.geometryStable&&state.retained,'Scroll rewrote or replaced the frozen scene');
          assert(Math.abs(state.movement)<1,'Background is not natively anchored');
          assert(!state.overflow,'Horizontal overflow');
        }
      }
      await page.locator('.motion-toggle').click();
      const perf=await page.evaluate(async()=>{
        const gaps=[],tasks=[];
        let meshWrites=0;
        const mutations=new MutationObserver(records=>meshWrites+=records.length);
        mutations.observe(document.querySelector('.field-mesh'),{subtree:true,attributes:true,childList:true});
        const observer=new PerformanceObserver(list=>tasks.push(...list.getEntries().map(e=>e.duration)));
        observer.observe({type:'longtask'});
        let previous=performance.now();
        for(let i=0;i<150;i++) {
          await new Promise(requestAnimationFrame);
          const now=performance.now();gaps.push(now-previous);previous=now;
          scrollTo({top:Math.sin(i/149*Math.PI)*3200,behavior:'instant'});
        }
        await new Promise(requestAnimationFrame);
        mutations.disconnect();observer.disconnect();
        gaps.sort((a,b)=>a-b);
        return {p95:gaps[Math.floor(gaps.length*.95)],max:gaps.at(-1),longTasks:tasks.length,meshWrites};
      });
      if(!baseline)assert.equal(perf.meshWrites,0,'Mesh changed during animation scroll');
      const theta=await page.locator('.quantum-motion').innerHTML();
      await page.waitForTimeout(180);
      assert.notEqual(await page.locator('.quantum-motion').innerHTML(),theta,'Animation stopped');
      const particleCount=await page.locator('[data-kind]').count();
      await page.locator('.language-switch').click();
      await page.waitForURL(base+'/');
      assert.equal(await page.locator('[data-kind]').count(),particleCount,'Language changed particle identities');
      assert(await page.locator('.field-toggle').isVisible());
      await page.screenshot({path:`local-preview/scroll-${baseline?'before':'after'}-${mobile?'mobile':'desktop'}-home.png`});
      await page.evaluate(()=>scrollTo({top:850,behavior:'instant'}));
      await page.waitForTimeout(180);
      await page.screenshot({path:`local-preview/scroll-${baseline?'before':'after'}-${mobile?'mobile':'desktop'}-research.png`});
      if(mobile&&!baseline) {
        const cdp=await context.newCDPSession(page);
        const scrollBefore=await page.evaluate(()=>scrollY);
        const meshBefore=await page.locator('.field-mesh').innerHTML();
        await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:620}]});
        for(let y=600;y>=240;y-=20) {
          await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y}]});
          await page.waitForTimeout(16);
        }
        await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
        await page.waitForTimeout(300);
        assert(await page.evaluate(()=>scrollY)>scrollBefore+100,'Touch scrolling was blocked');
        assert.equal(await page.locator('.field-mesh').innerHTML(),meshBefore,'Touch scrolling rebuilt the mesh');
        await cdp.detach();
      }
      assert.deepEqual(errors,[]);
      results.push({baseline,mobile,perf});
      console.log(JSON.stringify(results.at(-1)));
      await context.close();
    }
    fs.writeFileSync(`local-preview/scroll-${baseline?'before':'after'}.json`,JSON.stringify(results,null,2));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
