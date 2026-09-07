const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE||'playwright');
const assert=(ok,message)=>{if(!ok)throw Error(message)};
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:width===1440?1000:844});
    for(const route of ['/','/zh/','/zh/cv/']){
      await page.goto('http://127.0.0.1:8765'+route);
      await page.waitForTimeout(1300);
      const result=await page.evaluate(()=>{
        const pointList=el=>el.getAttribute('d').match(/-?[\d.]+/g).reduce((out,n,i)=>{if(i%2===0)out.push([Number(n)]);else out.at(-1).push(Number(n));return out},[]);
        const spin=[...document.querySelectorAll('.spin-glyph[d]')].find(el=>el.getBoundingClientRect().top>100&&el.getBoundingClientRect().bottom<innerHeight);
        const p=pointList(spin),len=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
        const base=len(p[1],p[2]),height=len(p[0],[(p[1][0]+p[2][0])/2,(p[1][1]+p[2][1])/2]);
        const trail=[...document.querySelectorAll('.particle-trail[d]')].find(el=>el.getAttribute('d').length>30&&el.getBoundingClientRect().top>100&&el.getBoundingClientRect().bottom<innerHeight);
        const t=pointList(trail),half=t.length/2,widths=t.slice(0,half).map((a,i)=>len(a,t[t.length-1-i]));
        const group=trail.parentElement,dot=group.querySelector('.particle-dot');
        return {vertices:p.length,aspect:height/base,equalSides:Math.abs(len(p[0],p[1])-len(p[0],p[2]))<.03,
          spinChildren:spin.parentElement.children.length,stroke:spin.getAttribute('stroke'),
          tailStart:widths[0],tailEnd:widths.at(-1),taper:widths.every((w,i)=>!i||w>=widths[i-1]-.025),
          fade:[...group.querySelectorAll('stop')].map(el=>Number(el.getAttribute('stop-opacity'))),
          trailColors:[...group.querySelectorAll('stop')].map(el=>el.getAttribute('stop-color')),
          primary:getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
          dotFill:dot.getAttribute('fill'),dotStroke:dot.getAttribute('stroke'),overflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert(result.vertices===3&&result.equalSides&&result.aspect>6.5,'Spin is not a narrow isosceles triangle');
      assert(result.spinChildren===1&&result.stroke==='none','Old spin shaft or ring remains');
      assert(result.tailStart<.03&&Math.abs(result.tailEnd-4.7)<.04&&result.taper,'Tail does not taper continuously');
      assert(result.fade[0]===0&&result.fade.at(-1)>.5,'Tail fade missing');
      assert(result.dotFill===result.primary&&result.dotStroke==='none','Particle does not use a solid theme fill');
      assert(result.trailColors.every(color=>color===result.primary),'Trail does not match the theme');
      assert(!result.overflow,'Layout overflow');
      console.log(width,route,result);
      await page.screenshot({path:`local-preview/particle-style-${width}-${route.replaceAll('/','_')}.png`});
    }
  }
  assert(!errors.length,errors.join('\n'));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
