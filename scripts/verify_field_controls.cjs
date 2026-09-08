const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    const page=await context.newPage(),errors=[];
    const open=async(p=page)=>{if(await p.locator('.field-controls').isHidden())await p.locator('.field-toggle').click();};
    page.on('pageerror',e=>errors.push(String(e)));
    const instrumentation=`;(()=>{const create=Matter.Engine.create,force=Matter.Body.applyForce;
      Matter.Engine.create=(...args)=>(window.testEngine=create(...args));
      Matter.Body.applyForce=(body,pos,f)=>{if(window.forceSamples&&forceSamples.length<20000)forceSamples.push((f.x*f.x+f.y*f.y)/(body.mass*body.mass));return force(body,pos,f);};})();`;
    await page.route('**/matter.min.js',route=>route.fulfill({contentType:'application/javascript',body:fs.readFileSync('assets/site/matter.min.js','utf8')+instrumentation}));
    const set=async(key,value)=>page.locator(`[data-parameter="${key}"]`).evaluate((input,v)=>{input.value=v;input.dispatchEvent(new Event('input',{bubbles:true}));},value);
    const sample=async()=>{
      await page.evaluate(()=>{window.forceSamples=[];});
      await page.waitForFunction(()=>forceSamples.length>=500);
      return page.evaluate(()=>forceSamples.reduce((a,b)=>a+b,0)/forceSamples.length);
    };
    await page.goto('http://127.0.0.1:8765/zh/#research');
    await open();
    await page.locator('.field-controls').waitFor({state:'visible'});
    assert.equal(await page.locator('.field-controls input').count(),5);
    assert.equal((await page.locator('.field-controls').textContent()).trim(),'','Control panel still has visible text content');
    await page.evaluate(()=>{window.originalParticles=[...document.querySelectorAll('[data-kind]')];});
    const baseCounts=await page.evaluate(()=>({spin:document.querySelectorAll('[data-kind="spin"]').length,brownian:document.querySelectorAll('[data-kind="brownian"]').length}));
    await set('density',2);
    assert(await page.locator('[data-density-level][data-birth="true"]').count()>0,'New particles do not begin small');
    assert(await page.evaluate(()=>[...document.querySelectorAll('[data-birth="true"]')].some(g=>g.getAnimations().some(a=>a.playState==='running'))),'Birth timeline is not running');
    await page.waitForTimeout(80);
    assert(await page.locator('[data-density-level][data-birth="true"]').count()>0,'Particle growth animation ended too early');
    const denseCounts=await page.evaluate(()=>({spin:document.querySelectorAll('[data-kind="spin"]').length,brownian:document.querySelectorAll('[data-kind="brownian"]').length,
      visibleSupplemental:[...document.querySelectorAll('[data-density-level]')].filter(g=>Number(g.dataset.densityLevel)>1&&g.style.display!=='none').length}));
    assert(denseCounts.spin>baseCounts.spin&&denseCounts.brownian>baseCounts.brownian&&denseCounts.visibleSupplemental>0,'Density does not add both particle types');
    await page.waitForTimeout(500);
    assert.equal(await page.locator('[data-birth="true"]').count(),0,'Particle growth state was not cleaned up');
    await set('density',1);
    assert(await page.locator('[data-density-level][data-death="true"]').count()>0,'Lower density does not begin a removal animation');
    assert(await page.evaluate(()=>[...document.querySelectorAll('[data-death="true"]')].some(g=>g.style.display!=='none'&&g.getAnimations().some(a=>a.playState==='running'))),'Shrinking particles disappear before their animation');
    await page.waitForTimeout(120);
    assert(await page.locator('[data-death="true"]').count()>0,'Particle removal animation ended too early');
    await page.waitForTimeout(360);
    assert.equal(await page.locator('[data-death="true"]').count(),0,'Particle removal state was not cleaned up');
    assert(await page.evaluate(()=>[...document.querySelectorAll('[data-density-level]')].filter(g=>Number(g.dataset.densityLevel)>1).every(g=>g.style.display==='none')),'Lower density does not hide supplemental particles after shrinking');
    await set('density',2);
    assert(await page.locator('[data-density-level][data-birth="true"]').count()>0,'Re-enabled particles do not grow in');
    await set('attraction',0);await set('temperature',.25);
    const cold=await sample();await set('temperature',4);const hot=await sample();
    assert(hot/cold>8&&hot/cold<25,`Temperature did not scale thermal forcing: ${hot/cold}`);
    await set('damping',2.5);
    assert(await page.evaluate(()=>testEngine.world.bodies.every(b=>Math.abs(b.frictionAir-.3)<1e-10)),'Damping not applied');
    await set('temperature',0);await set('attraction',0);await set('disorder',0);
    await page.mouse.move(1150,450);
    assert.equal(await sample(),0,'Zero temperature/attraction still exerts force');
    const disorderBefore=await page.locator('.hero-motion').evaluate(svg=>({version:Number(svg.dataset.disorderVersion),modes:svg.dataset.disorderModes}));
    await page.locator('#field-disorder').dispatchEvent('pointerdown');
    const disorderAfter=await page.locator('.hero-motion').evaluate(svg=>({version:Number(svg.dataset.disorderVersion),modes:svg.dataset.disorderModes}));
    assert(disorderAfter.version===disorderBefore.version+1&&disorderAfter.modes!==disorderBefore.modes,'A new disorder interaction does not create a new random potential');
    const meanPotential=async()=>page.evaluate(()=>{
      const modes=JSON.parse(document.querySelector('.hero-motion').dataset.disorderModes);
      const dots=[...document.querySelectorAll('[data-kind="brownian"][data-u][data-v]')].filter(el=>el.style.display!=='none');
      return dots.reduce((sum,el)=>{
        const u=Number(el.dataset.u),v=Number(el.dataset.v);
        return sum+modes.reduce((value,[ku,kv,phase,weight])=>value+weight*Math.cos(2*Math.PI*(ku*u+kv*v)+phase),0);
      },0)/dots.length;
    });
    await page.evaluate(()=>testEngine.world.bodies.forEach(body=>Matter.Body.setVelocity(body,{x:0,y:0})));
    const potentialBefore=await meanPotential();
    await set('disorder',2);
    const disorderForce=await sample();
    assert(disorderForce>0,'Potential disorder does not exert a localizing force');
    const disorderAlignment=async()=>page.evaluate(()=>{
      const modes=JSON.parse(document.querySelector('.hero-motion').dataset.disorderModes);
      const arrows=[...document.querySelectorAll('[data-kind="spin"][data-u][data-v]')].filter(el=>el.style.display!=='none');
      return arrows.reduce((sum,el)=>{
        const u=Number(el.dataset.u),v=Number(el.dataset.v),theta=Number(el.dataset.theta);
        let x=0,y=0;
        for(const [ku,kv,phase,weight] of modes){const sine=Math.sin(2*Math.PI*(ku*u+kv*v)+phase);x+=weight*ku*sine;y+=weight*kv*sine;}
        return sum+Math.cos(theta-Math.atan2(y,x));
      },0)/arrows.length;
    });
    await page.waitForTimeout(1300);
    assert(await disorderAlignment()>.45,'Potential disorder does not pin spin orientations');
    const potentialAfter=await meanPotential();
    assert(potentialAfter<potentialBefore-.025,`Potential disorder does not localize particles: ${potentialBefore} -> ${potentialAfter}`);
    await set('disorder',0);
    await set('attraction',2);await page.mouse.move(1150,450);
    assert(await sample()>0,'Attraction does not affect particles');
    const panelBox=await page.locator('.field-controls').boundingBox();
    await page.mouse.move(panelBox.x+30,panelBox.y+50);
    assert.equal(await sample(),0,'Controls attract particles while adjusting');
    await set('temperature',4);await set('damping',.2);await set('attraction',3);await set('density',2);await set('disorder',2);
    await page.mouse.move(1150,450);await page.mouse.down();
    await page.waitForTimeout(900);await page.mouse.up();
    assert(await page.evaluate(()=>testEngine.world.bodies.every(b=>Number.isFinite(b.position.x)&&Number.isFinite(b.position.y)&&Number.isFinite(b.velocity.x)&&Number.isFinite(b.velocity.y))
      &&[...document.querySelectorAll('[data-theta]')].every(el=>Number.isFinite(Number(el.dataset.theta)))),'Extreme parameters destabilize simulation');
    await set('damping',2.5);
    await open();
    await page.locator('.field-play').click();
    const stopped=await page.locator('.quantum-motion').innerHTML();
    await set('temperature',2);
    await page.waitForTimeout(150);
    assert.equal(await page.locator('.quantum-motion').innerHTML(),stopped,'Parameter change overrides pause');
    assert.equal(await page.locator('.motion-toggle').getAttribute('aria-label'),'播放动画');
    assert(await page.evaluate(()=>originalParticles.every(p=>p.isConnected)),'Changing parameters recreates particles');
    await page.locator('#field-temperature').focus();await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#field-temperature').inputValue(),'2.1');
    await page.goto('http://127.0.0.1:8765/cv/');
    assert(await page.evaluate(()=>testEngine.world.bodies.every(b=>Math.abs(b.frictionAir-.3)<1e-10)),'Settings lost on secondary page');
    assert(await page.evaluate(()=>document.querySelectorAll('[data-density-level]:not([data-density-level="1.0"])').length>0),'Density setting lost on secondary page');
    await page.goto('http://127.0.0.1:8765/#research');
    await open();
    assert.equal(await page.locator('#field-temperature').inputValue(),'2.1');
    await page.locator('.field-reset').click();
    assert.deepEqual(await page.locator('.field-controls input').evaluateAll(inputs=>inputs.map(i=>i.value)),['1','1','1','1','0']);
    await context.close();
    for(const width of [1440,1024,900,821,390,320]){
      const ctx=await browser.newContext({viewport:{width,height:width>540?1000:844},isMobile:width<541,hasTouch:width<541,reducedMotion:'reduce'});
      const p=await ctx.newPage();
      for(const route of ['/','/zh/']){
        await p.goto('http://127.0.0.1:8765'+route+'#research');
        assert(await p.locator('.field-controls').isHidden(),'Panel should start closed');
        await open(p);
        await p.locator('.field-controls').waitFor({state:'visible'});
        const layout=await p.evaluate(()=>{
          const panel=document.querySelector('.field-controls').getBoundingClientRect(),header=document.querySelector('.site-header').getBoundingClientRect(),toggle=document.querySelector('.field-toggle').getBoundingClientRect();
          const items=[...document.querySelector('.header-inner').children].map(el=>el.getBoundingClientRect()).filter(r=>r.width>0&&r.height>0).sort((a,b)=>a.left-b.left);
          const rows=[...document.querySelectorAll('.field-parameter')].map(row=>{const icon=row.querySelector('label').getBoundingClientRect(),range=row.querySelector('input').getBoundingClientRect();return Math.abs((icon.top+icon.bottom-range.top-range.bottom)/2)<2;});
          return {overflow:document.documentElement.scrollWidth>innerWidth,headerFits:items.every((r,i)=>r.left>=0&&r.right<=innerWidth&&(!i||r.left>=items[i-1].right-1)),inHeader:toggle.top>=header.top&&toggle.bottom<=header.bottom,panelFits:panel.left>=0&&panel.right<=innerWidth&&panel.top>=header.bottom&&panel.bottom<=innerHeight,compact:panel.width<=260&&panel.height<=235&&rows.every(Boolean),background:getComputedStyle(document.querySelector('.field-controls')).backgroundColor};
        });
        assert(!layout.overflow&&layout.headerFits&&layout.inHeader&&layout.panelFits&&layout.compact&&layout.background==='rgba(255, 255, 255, 0.7)',JSON.stringify(layout));
        await p.screenshot({path:`local-preview/controls-${width}-${route==='/'?'en':'zh'}.png`});
        if(width===390){
          const range=p.locator('#field-temperature'),rect=await range.boundingBox();
          await p.touchscreen.tap(rect.x+rect.width*.8,rect.y+rect.height/2);
          assert(Number(await range.inputValue())>2,'Touch range does not respond');
        }
        await p.keyboard.press('Escape');
        assert(await p.locator('.field-controls').isHidden());
        assert(await p.locator('.field-toggle').evaluate(el=>el===document.activeElement),'Escape did not restore focus');
        await open(p);
        await p.mouse.click(5,500);
        assert(await p.locator('.field-controls').isHidden(),'Outside click did not close panel');
        if(width<541){
          await open(p);await p.locator('.menu-toggle').click();
          assert(await p.locator('.field-controls').isHidden());
          await open(p);assert(!await p.locator('#navigation').isVisible(),'Menus overlap');
        }
      }
      await ctx.close();
    }
    assert.deepEqual(errors,[]);
    console.log('PASS temperature force ratio',hot/cold,'density counts',baseCounts,denseCounts,'disorder realization',disorderBefore.version,'->',disorderAfter.version,'force',disorderForce,'potential',potentialBefore,'->',potentialAfter,'damping, attraction, spin pinning, localization, animated removal, pointer isolation, pause, reset, keyboard, persistence, touch, header disclosure and 12 layouts');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
