/* Offline presentation engine. Scientific copy and provenance live in content.js. */
(() => {
  'use strict';
  const deck = window.DECK;
  if (!deck || !deck.slides?.length) { document.getElementById('stage').textContent = 'Presentation content is unavailable.'; return; }
  const params = new URLSearchParams(location.search);
  let lang = ['en','zh'].includes(params.get('lang')) ? params.get('lang') : /(?:zh|chinese)\.html$/i.test(location.pathname) ? 'zh' : 'en';
  let index = Math.max(0, Math.min(deck.slides.length - 1, Number(location.hash.slice(1) || 1) - 1));
  let notesVisible = false;
  let timerStart = null, timerElapsed = 0;
  const $ = id => document.getElementById(id);
  const L = value => typeof value === 'string' ? value : value?.[lang] ?? value?.en ?? '';
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Preserve inequality signs and alignment ampersands before HTML parsing.
  const mathSafeHTML = value => String(value).replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, formula => escape(formula));
  const tr = (en, zh) => lang === 'zh' ? zh : en;
  const minute = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2,'0')}`;
  const startAt = i => deck.slides.slice(0, i).reduce((sum, s) => sum + (s.duration || 0), 0);
  const mainCount = deck.slides.filter(s => !s.backup).length;
  const total = deck.slides.reduce((sum,s) => sum + (s.duration || 0), 0);
  let mathQueue = Promise.resolve();
  function clearMath(node) {
    if (window.MathJax?.typesetClear) window.MathJax.typesetClear([node]);
  }
  function typeset(nodes) {
    const targets = nodes.filter(Boolean);
    targets.forEach(node => {node.classList.add('tex-pending'); node.dataset.mathReady = 'false';});
    mathQueue = mathQueue.catch(() => {}).then(async () => {
      await window.MathJax.startup.promise;
      const connected = targets.filter(node => node.isConnected);
      if (connected.length) await window.MathJax.typesetPromise(connected);
      connected.forEach(node => {node.dataset.mathReady = 'true'; node.classList.remove('tex-pending');});
    }).catch(error => {
      targets.forEach(node => {node.classList.remove('tex-pending'); node.dataset.mathError = String(error.message || error);});
      console.error('Equation rendering failed:', error);
    });
    return mathQueue;
  }
  function citation(s) {
    return (s.sources || []).map(source => {
      const label = escape(L(source.label));
      return /^https?:\/\//.test(source.url || '') ? `<a href="${escape(source.url)}" target="_blank" rel="noopener">${label}</a>` : label;
    }).join('<span class="citation-separator">·</span>');
  }
  function slideHTML(s, i) {
    const hasAsset = !!s.asset;
    const wide = ['expansion.png','expansion.svg','illustration_round1.png'].includes(s.asset);
    const classes = ['slide',s.layout || 'split',hasAsset?'has-asset':'',wide?'wide':'',s.backup?'backup':''].filter(Boolean).join(' ');
    const bullets = (L(s.bullets) || []).map(text => `<li>${mathSafeHTML(text)}</li>`).join('');
    const formula = s.formula ? `<div class="formula">${mathSafeHTML(L(s.formula))}</div>` : '';
    const asset = lang === 'zh' && (window.TALK_ZH_ASSETS || []).includes(s.asset) ? s.asset.replace('.svg','.zh.svg') : s.asset;
    const body = `${hasAsset ? `<figure class="figure"><img src="assets/${escape(asset)}" alt="${escape(L(s.assetAlt) || L(s.title))}" loading="eager"></figure>` : ''}<div class="explanation">${formula}${bullets ? `<ul>${bullets}</ul>` : ''}</div>`;
    return `<article class="${classes}" data-slide="${i+1}" data-slide-id="${escape(s.id)}" style="--progress:${Math.min(i+1,mainCount)/mainCount*100}%"><div class="chapter">${escape(L(s.section) || '')}${s.backup ? ` · ${tr('BACKUP','备份页')}` : ''}</div><h1>${mathSafeHTML(L(s.title))}</h1>${s.subtitle ? `<p class="subtitle">${mathSafeHTML(L(s.subtitle))}</p>` : ''}<div class="body">${body}</div><footer class="foot"><div class="citations">${citation(s)}</div><div class="number">${s.backup ? tr('Backup','备份') : `${String(i+1).padStart(2,'0')} / ${mainCount}`}</div></footer></article>`;
  }
  function fit() {
    const width = innerWidth - (notesVisible && innerWidth > 700 ? 400 : 0);
    const height = innerHeight - 48;
    $('viewport').style.right = notesVisible && innerWidth > 700 ? '400px' : '0';
    const scale = Math.min(width / 1600, height / 900);
    $('stage').style.transform = `scale(${scale})`;
  }
  function render() {
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
    document.title = `${L(deck.title)} · ${index + 1}`;
    clearMath($('stage')); clearMath($('notes'));
    $('stage').innerHTML = slideHTML(deck.slides[index], index);
    const s = deck.slides[index];
    $('position').textContent = s.backup ? `${index + 1} / ${deck.slides.length}` : `${index+1} / ${mainCount}`;
    $('prev').disabled = index === 0; $('next').disabled = index === deck.slides.length - 1;
    $('language').textContent = lang === 'en' ? '中文' : 'English';
    $('overviewButton').textContent = tr('Overview','目录');
    $('notesButton').textContent = tr('Notes','讲稿');
    $('fullButton').textContent = tr('Full screen','全屏');
    $('noteTitle').innerHTML = mathSafeHTML(L(s.title));
    $('noteBody').textContent = L(s.notes);
    $('noteTiming').textContent = s.backup ? tr('Backup','备份') : `${minute(startAt(index))}–${minute(startAt(index)+(s.duration||0))}`;
    $('allNotes').textContent = tr('Read all speaker notes ↗','阅读完整讲稿 ↗');
    $('allNotes').href = `index.html?lang=${lang}&notes=all`;
    $('timerButton').textContent = timerStart ? tr('Pause','暂停') : tr('Start timer','开始计时');
    typeset([$('stage'), $('notes')]);
    fit();
  }
  function go(i) {
    index = Math.max(0,Math.min(deck.slides.length-1,i));
    history.replaceState(null,'',`#${index+1}`); render();
  }
  function toggleNotes() {notesVisible = !notesVisible; $('notes').hidden = !notesVisible; fit();}
  function overview() {
    clearMath($('slideList'));
    $('overviewTitle').textContent = `${tr('Talk outline','演讲目录')} · ${minute(total)}`;
    $('slideList').innerHTML = deck.slides.map((s,i) => `<button class="${i===index?'current':''}" data-index="${i}"><span class="slide-index">${s.backup ? tr('BACKUP','备份') : `${String(i+1).padStart(2,'0')} · ${minute(startAt(i))}`}</span>${mathSafeHTML(L(s.title))}</button>`).join('');
    $('overview').showModal();
    typeset([$('slideList')]);
  }
  function help() {
    $('helpTitle').textContent = tr('Presentation controls','演示操作');
    $('helpBody').innerHTML = [
      ['→ / Space',tr('Next slide','下一页')],['←',tr('Previous slide','上一页')],['Home / End',tr('First / last slide','首页／末页')],['F',tr('Full screen','全屏')],['N',tr('Speaker notes','显示讲稿')],['O',tr('Slide overview','演讲目录')],['B',tr('Blank screen','黑屏')],['P',tr('Print slides / save as PDF','打印幻灯片／另存为 PDF')],['?',tr('This help','操作说明')]
    ].map(([key,value])=>`<div><kbd>${key}</kbd>${value}</div>`).join('') + `<p>${tr('The English and Chinese editions share the same figures and slide numbers. All figures are available offline.','英文和中文版本共用图表与页码。所有图表均可离线查看。')}</p>`;
    $('help').showModal();
  }
  async function fullscreen() {try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{help();}}
  async function printSlides() {
    clearMath($('printDeck'));
    $('printDeck').innerHTML=deck.slides.map(slideHTML).join('');
    await typeset([$('printDeck')]);
    await document.fonts.ready;
    window.print();
  }
  function notesDocument() {
    document.body.classList.add('notes-document'); document.documentElement.lang=lang;
    document.title = `${L(deck.title)} · ${tr('Speaker notes','讲稿')}`;
    $('printDeck').innerHTML = `<header class="document-head"><h1>${L(deck.title)}</h1><p>${tr(`Jin-Fu Chen · ${Math.round(total/60)}-minute group meeting · ${mainCount} main slides plus technical backup`,`Jin-Fu Chen · ${Math.round(total/60)} 分钟组会 · ${mainCount} 页主讲与技术备份页`)}</p><p>${escape(L(deck.storyline) || '')}</p><a href="index.html?lang=${lang}">${tr('Open presentation','打开幻灯片')}</a><a href="index.html?lang=${lang==='en'?'zh':'en'}&notes=all">${tr('中文讲稿','English notes')}</a><a href="#" id="printNotes">${tr('Print / PDF','打印／PDF')}</a></header>` + deck.slides.map((s,i)=>`<section class="note-section"><span class="time">${s.backup?tr('BACKUP','备份'):`${String(i+1).padStart(2,'0')} · ${minute(startAt(i))}–${minute(startAt(i)+(s.duration||0))}`}</span><h2>${L(s.title)}</h2><p>${escape(L(s.notes))}</p><div class="source-list">${citation(s)}</div></section>`).join('');
    $('printNotes').addEventListener('click',async e=>{e.preventDefault();await mathQueue;await document.fonts.ready;window.print();});
    typeset([$('printDeck')]);
  }
  $('prev').onclick = () => go(index-1); $('next').onclick = () => go(index+1);
  $('language').onclick = () => {lang = lang==='en'?'zh':'en';const nextParams = new URLSearchParams(location.search);nextParams.set('lang',lang);history.replaceState(null,'',`${location.pathname}?${nextParams}#${index+1}`);render();};
  $('notesButton').onclick=toggleNotes; $('closeNotes').onclick=toggleNotes;
  $('overviewButton').onclick=overview; $('closeOverview').onclick=()=>$('overview').close();
  $('helpButton').onclick=help; $('closeHelp').onclick=()=>$('help').close();
  $('fullButton').onclick=fullscreen;
  $('slideList').onclick=e=>{const button=e.target.closest('button[data-index]');if(button){go(Number(button.dataset.index));$('overview').close();}};
  $('timerButton').onclick=()=>{if(timerStart){timerElapsed+=Date.now()-timerStart;timerStart=null;}else{timerStart=Date.now();}render();};
  setInterval(()=>{$('timer').textContent=minute(Math.floor((timerElapsed+(timerStart?Date.now()-timerStart:0))/1000));},1000);
  addEventListener('resize',fit);
  addEventListener('hashchange',()=>{const n=Number(location.hash.slice(1));if(n>=1&&n<=deck.slides.length){index=n-1;render();}});
  addEventListener('keydown',e=>{
    if(e.target.closest('input,textarea,select') || document.body.classList.contains('notes-document'))return;
    if($('overview').open || $('help').open)return;
    if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(index+1);}
    else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(index-1);}
    else if(e.key==='Home'){e.preventDefault();go(0);}
    else if(e.key==='End'){e.preventDefault();go(deck.slides.length-1);}
    else if(e.key.toLowerCase()==='n')toggleNotes();
    else if(e.key.toLowerCase()==='o')overview();
    else if(e.key.toLowerCase()==='f')fullscreen();
    else if(e.key.toLowerCase()==='b')$('blank').hidden=!$('blank').hidden;
    else if(e.key.toLowerCase()==='p'){e.preventDefault();printSlides();}
    else if(e.key==='?'||e.key==='h')help();
  });
  let touchX=null;
  $('viewport').addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});
  $('viewport').addEventListener('touchend',e=>{if(touchX===null)return;const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>60)go(index+(delta<0?1:-1));touchX=null;},{passive:true});
  $('blank').onclick=()=>{$('blank').hidden=true;};
  // Exposed read-only rendering hooks allow layout checks without altering science data.
  window.TALK = {get language(){return lang;},get index(){return index;},get slideCount(){return deck.slides.length;},slideHTML,go};
  if(params.get('notes')==='all')notesDocument();else render();
})();
