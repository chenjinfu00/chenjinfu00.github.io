const fs = require('node:fs');
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const check = (ok,message) => {if(!ok)throw Error(message)};
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(String(error)));
  fs.mkdirSync('local-preview',{recursive:true});
  for(const width of [1440,1024,390,320]){
    await page.setViewportSize({width,height:width>500?1000:844});
    await page.goto('http://127.0.0.1:8765/zh/');
    await page.waitForFunction(()=>document.querySelectorAll('[data-kind]').length>20);
    await page.waitForTimeout(900);
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow');
    await page.screenshot({path:`local-preview/field-${width}-hero.png`});
    await page.evaluate(()=>scrollTo({top:1200,behavior:'instant'}));
    await page.waitForTimeout(900);
    check(await page.locator('[data-kind="spin"]:visible').count()>4,'No spins below hero');
    check(await page.locator('[data-kind="brownian"]:visible').count()>5,'No Brownian particles below hero');
    await page.screenshot({path:`local-preview/field-${width}-research.png`});
    const counts=await page.evaluate(()=>({spins:document.querySelectorAll('[data-kind="spin"]').length,brownian:document.querySelectorAll('[data-kind="brownian"]').length}));
    console.log(width,counts);
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:8765/zh/');
  await page.waitForTimeout(600);
  async function attraction(scroll){
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),scroll);
    await page.waitForTimeout(300);
    const candidate=await page.evaluate(()=>{
      const groups=[...document.querySelectorAll('[data-kind="brownian"]')];
      for(let i=0;i<groups.length;i++){
        const dot=groups[i].querySelector('circle');
        const x=Number(dot.getAttribute('cx')),y=Number(dot.getAttribute('cy'));
        if(getComputedStyle(groups[i]).display!=='none'&&x>750&&x<1250&&y>200&&y<750)return {index:i,x,y};
      }
    });
    check(candidate,'No particle available for interaction test');
    const target={x:candidate.x+55,y:candidate.y+35};
    await page.mouse.move(target.x,target.y);await page.mouse.down();
    await page.waitForTimeout(1600);
    const final=await page.evaluate(i=>{
      const el=document.querySelectorAll('[data-kind="brownian"]')[i].querySelector('circle');
      return {x:Number(el.getAttribute('cx')),y:Number(el.getAttribute('cy'))};
    },candidate.index);
    await page.mouse.up();
    const before=Math.hypot(candidate.x-target.x,candidate.y-target.y),after=Math.hypot(final.x-target.x,final.y-target.y);
    check(after<before*.8,`Pointer attraction ineffective at scroll ${scroll}: ${before} -> ${after}`);
    console.log('Attraction',scroll,{before,after});
    await page.screenshot({path:`local-preview/field-attraction-${scroll}.png`});
  }
  await attraction(0);await attraction(1350);
  const spin=await page.evaluate(()=>{
    const groups=[...document.querySelectorAll('[data-kind="spin"]')];
    for(let index=0;index<groups.length;index++){
      const g=groups[index];
      if(!g.querySelector('path').getAttribute('d'))continue;
      const numbers=g.querySelector('path').getAttribute('d').match(/-?[\d.]+/g).map(Number);
      const x=(numbers[0]+numbers[2]+numbers[4])/3,y=(numbers[1]+numbers[3]+numbers[5])/3;
      if(getComputedStyle(g).display==='none'||x<150||x>700||y<200||y>700)continue;
      const dx=numbers[0]-(numbers[2]+numbers[4])/2,dy=numbers[1]-(numbers[3]+numbers[5])/2,norm=Math.hypot(dx,dy);
      return {index,x,y,targetX:x-dy/norm*75,targetY:y+dx/norm*75,theta:g.dataset.theta,u:g.dataset.u,v:g.dataset.v};
    }
  });
  check(spin,'No spin available for field test');
  await page.mouse.move(spin.targetX,spin.targetY);await page.mouse.down();
  await page.waitForTimeout(1600);await page.mouse.up();
  const orientation=await page.evaluate(i=>{
    const g=document.querySelectorAll('[data-kind="spin"]')[i];
    return {d:g.querySelector('path').getAttribute('d'),theta:g.dataset.theta,u:g.dataset.u,v:g.dataset.v};
  },spin.index);
  const n=orientation.d.match(/-?[\d.]+/g).map(Number),dx=n[0]-(n[2]+n[4])/2,dy=n[1]-(n[3]+n[5])/2;
  const alignment=(dx*(spin.targetX-spin.x)+dy*(spin.targetY-spin.y))/(Math.hypot(dx,dy)*75);
  check(alignment>.65,'Spin did not align with the pointer field: '+alignment);
  check(spin.u===orientation.u&&spin.v===orientation.v,'Spin left its lattice site');
  check(spin.theta!==orientation.theta,'Spin did not rotate');
  console.log('Spin field alignment',alignment);
  await page.mouse.move(0,0);
  const thermal=await page.locator('[data-kind="spin"]').nth(spin.index).getAttribute('data-theta');
  await page.waitForTimeout(400);
  check(thermal!==await page.locator('[data-kind="spin"]').nth(spin.index).getAttribute('data-theta'),'Thermal spin dynamics missing');
  const invalid=await page.evaluate(()=>[...document.querySelectorAll('[data-kind]')].filter(el=>{
    if(!el.dataset.u)return false;
    const u=Number(el.dataset.u),v=Number(el.dataset.v),b=.44+.04*Math.sin(Math.PI*Math.min(v,.925));
    return !Number.isFinite(u)||!Number.isFinite(v)||(el.dataset.kind==='spin'?u>=b:u<=b);
  }).length);
  check(!invalid,'Particles crossed the conceptual boundary or became nonfinite');
  await page.locator('.motion-toggle').click();
  const snapshot=await page.locator('.quantum-motion').innerHTML();
  await page.waitForTimeout(350);
  check(snapshot===await page.locator('.quantum-motion').innerHTML(),'Pause failed below hero');
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  await page.waitForTimeout(300);
  const reduced=await page.locator('.quantum-motion').innerHTML();
  await page.waitForTimeout(350);
  check(reduced===await page.locator('.quantum-motion').innerHTML(),'Reduced motion ignored');
  check(!errors.length,errors.join('\n'));
  console.log('Field checks passed: geometry, Brownian attraction, spin rotation and fixed sites, thermal noise, phase boundary, full-page rendering, pause, reduced motion.');
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
