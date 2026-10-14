(() => {
  'use strict';

  const labels = {
    zh: {reportLabel:'科研面试报告',overview:'目录',overviewTitle:'报告目录',overviewHint:'选择任意一页，进入报告。',presentationMap:'报告脉络',notes:'讲稿',presenterOnly:'演讲者备注',notesHint:'按 N 显示或隐藏讲稿。备注不会出现在打印稿中。',rehearsal:'彩排计时',running:'计时中',paused:'已暂停',overtime:'已超过 40 分钟',next:'下一页',previous:'上一页',moveSlide:'切换页面',language:'语言',fullScreen:'全屏',close:'关闭',backup:'备用页',minutes:'分钟',source:'资料来源',startTimer:'开始计时',pauseTimer:'暂停计时',resetTimer:'重置计时',overviewTitleButton:'报告目录 (O)',notesTitle:'讲稿备注 (N)',languageTitle:'切换语言 (L)',fullScreenTitle:'全屏展示 (F)',exitFullScreen:'退出全屏 (F)',print:'打印 / 保存 PDF',closeNotes:'关闭讲稿',closeOverview:'关闭目录',presentationLabel:'科研报告',sectionsLabel:'报告章节',toolbarLabel:'报告工具',firstSlide:'返回第一页',noNotes:'本页暂无讲稿备注。',focusMode:'已开启专注展示。按 F 返回。',fullScreenUnavailable:'已开启专注展示。浏览器未允许全屏，可按 F 返回。',loadingError:'报告未能加载。请检查 assets/content.js 后刷新页面。',backupTime:'问答参考',linkHomepage:'个人主页',linkScholar:'Google 学术',slideAnnouncement:'第 {n} 页，共 {total} 页：{title}',pausedToast:'彩排计时已暂停',resetToast:'彩排计时已归零',timerFinished:'已到 40 分钟，可进入问答环节。'},
    en: {reportLabel:'Research interview',overview:'Overview',overviewTitle:'Presentation overview',overviewHint:'Select a slide to jump into the presentation.',presentationMap:'Presentation map',notes:'Notes',presenterOnly:'Presenter notes',notesHint:'Press N to show or hide notes. Notes are excluded from the print version.',rehearsal:'Rehearsal timer',running:'Running',paused:'Paused',overtime:'Over 40 minutes',next:'Next',previous:'Previous',moveSlide:'Navigate',language:'Language',fullScreen:'Full screen',close:'Close',backup:'Backup',minutes:'min',source:'Sources',startTimer:'Start timer',pauseTimer:'Pause timer',resetTimer:'Reset timer',overviewTitleButton:'Presentation overview (O)',notesTitle:'Presenter notes (N)',languageTitle:'Switch language (L)',fullScreenTitle:'Full screen (F)',exitFullScreen:'Exit full screen (F)',print:'Print / Save PDF',closeNotes:'Close notes',closeOverview:'Close overview',presentationLabel:'Research presentation',sectionsLabel:'Presentation sections',toolbarLabel:'Presentation tools',firstSlide:'Return to the first slide',noNotes:'No presenter notes for this slide.',focusMode:'Focus mode is on. Press F to return.',fullScreenUnavailable:'Focus mode is on. The browser did not permit full screen. Press F to return.',loadingError:'The presentation could not load. Check assets/content.js and refresh the page.',backupTime:'For discussion',linkHomepage:'Homepage',linkScholar:'Google Scholar',slideAnnouncement:'Slide {n} of {total}: {title}',pausedToast:'Rehearsal timer paused',resetToast:'Rehearsal timer reset',timerFinished:'40 minutes reached. You can move to questions.'}
  };
  const $ = id => document.getElementById(id);
  const state = {lang:'zh',index:0,notes:false,timerRunning:false,elapsed:0,timerStartedAt:0,timerNotice:false,focusMode:false};
  let report;
  let sections = [];
  let toastTimeout;
  let tickInterval;
  const totalSeconds = 40 * 60;
  const escapeHTML = text => String(text ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const tr = key => labels[state.lang][key] || key;
  const localized = value => typeof value === 'string' ? value : value?.[state.lang] ?? value?.zh ?? value?.en ?? '';
  const readStored = key => {try{return localStorage.getItem(key);}catch{return null;}};
  const storeValue = (key,value) => {try{localStorage.setItem(key,value);}catch{/* Presentation works without storage. */}};
  const sourceURL = value => {try{const url = new URL(value,location.href);return /^(https?:|mailto:)$/.test(url.protocol) ? url.href : '';}catch{return '';}};
  const digits = number => String(number).padStart(2,'0');
  const formatTime = seconds => `${digits(Math.floor(seconds / 60))}:${digits(Math.floor(seconds % 60))}`;
  const minutesLabel = slide => slide.backup ? tr('backupTime') : `${Number(slide.minutes) || 0} ${tr('minutes')}`;

  function toast(message) {
    clearTimeout(toastTimeout);
    $('toast').textContent = message;
    $('toast').hidden = false;
    toastTimeout = setTimeout(() => {$('toast').hidden = true;},4200);
  }

  function renderSlides() {
    $('slides').innerHTML = report.slides.map((slide,index) => {
      const sources = (slide.sources || []).map(source => {
        const url = sourceURL(source.url);
        return url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(localized(source.label))}</a>` : '';
      }).join('');
      return `<article class="slide${index === 0 ? ' slide--first' : ''}${slide.backup ? ' slide--backup' : ''}" id="slide-${escapeHTML(slide.id || index + 1)}" data-slide-index="${index}" ${index !== state.index ? 'hidden' : ''} aria-labelledby="slide-title-${index}">
        <header class="slide-header"><div class="slide-topline"><span class="slide-kicker">${escapeHTML(localized(slide.kicker) || localized(slide.section))}</span>${slide.backup ? `<span class="backup-label">${tr('backup')}</span>` : ''}<span class="slide-index">${digits(index + 1)}</span></div><h1 id="slide-title-${index}">${escapeHTML(localized(slide.title))}</h1></header>
        <div class="slide-body">${localized(slide.html)}</div>
        <footer class="slide-footer"><div class="slide-sources" aria-label="${tr('source')}">${sources}</div><span class="slide-footer-number">${digits(index + 1)} / ${digits(report.slides.length)}</span></footer>
      </article>`;
    }).join('');
    updateSlide(false);
  }

  function buildSections() {
    sections = [];
    report.slides.forEach((slide,index) => {
      const key = `${localized(slide.section)}${slide.backup ? ':backup' : ''}`;
      const existing = sections.find(section => section.key === key);
      if(existing) existing.indices.push(index);
      else sections.push({key,label:localized(slide.section) || tr('overview'),start:index,indices:[index],backup:Boolean(slide.backup)});
    });
    $('section-rail').innerHTML = sections.map((section,index) => `<button type="button" class="rail-item" data-section-index="${index}" title="${escapeHTML(section.label)}" aria-label="${escapeHTML(section.label)}"><span class="rail-number">${section.backup ? '+' : digits(index + 1)}</span><span class="rail-label">${escapeHTML(section.label)}</span></button>`).join('');
    $('section-rail').querySelectorAll('button').forEach(button => button.addEventListener('click',() => navigate(sections[Number(button.dataset.sectionIndex)].start)));
    renderOverview();
  }

  function renderOverview() {
    $('overview-content').innerHTML = sections.map(section => `<section class="overview-group"><div class="overview-group-heading"><h3>${escapeHTML(section.label)}</h3>${section.backup ? `<span class="backup-label">${tr('backup')}</span>` : ''}</div><div class="overview-grid">${section.indices.map(index => {
      const slide = report.slides[index];
      return `<button type="button" class="overview-slide${index === state.index ? ' active' : ''}" data-target="${index}" ${index === state.index ? 'aria-current="step"' : ''}><span class="overview-slide-number">${digits(index + 1)}</span><span class="overview-slide-copy"><span class="overview-slide-title">${escapeHTML(localized(slide.title))}</span><span class="overview-slide-time">${escapeHTML(minutesLabel(slide))}</span></span></button>`;
    }).join('')}</div></section>`).join('');
    $('overview-content').querySelectorAll('button').forEach(button => button.addEventListener('click',() => {navigate(Number(button.dataset.target));closeOverview();}));
  }

  function updateSlide(animate = true) {
    const slide = report.slides[state.index];
    $('slides').querySelectorAll('.slide').forEach((element,index) => {
      element.hidden = index !== state.index;
      element.classList.remove('enter');
      if(index === state.index){element.scrollTop = 0;if(animate) {void element.offsetWidth;element.classList.add('enter');}}
    });
    $('presentation').scrollTop = 0;
    $('slide-section').textContent = localized(slide.section);
    $('slide-number').textContent = `${digits(state.index + 1)} / ${digits(report.slides.length)}`;
    $('slide-minutes').textContent = minutesLabel(slide);
    $('prev-button').disabled = state.index === 0;
    $('next-button').disabled = state.index === report.slides.length - 1;
    $('deck-progress-value').style.width = `${((state.index + 1) / report.slides.length) * 100}%`;
    $('section-rail').querySelectorAll('button').forEach((button,index) => {
      const active = sections[index].indices.includes(state.index);
      button.classList.toggle('active',active);
      if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
    });
    $('overview-content').querySelectorAll('button[data-target]').forEach(button => {
      const active = Number(button.dataset.target) === state.index;
      button.classList.toggle('active',active);
      if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
    });
    renderNotes();
    $('announcement').textContent = tr('slideAnnouncement').replace('{n}',state.index + 1).replace('{total}',report.slides.length).replace('{title}',localized(slide.title));
    document.title = `${localized(slide.title)} · ${localized(report.profile?.name) || tr('reportLabel')}`;
  }

  function navigate(index,{updateHash = true} = {}) {
    const nextIndex = Math.max(0,Math.min(report.slides.length - 1,index));
    if(!Number.isFinite(nextIndex))return;
    state.index = nextIndex;
    updateSlide();
    if(updateHash){const id = report.slides[state.index].id || state.index + 1;try{history.replaceState(null,'',`#${encodeURIComponent(id)}`);}catch{/* Local files may restrict history access. */}}
  }

  function hashIndex() {
    let id = '';
    try{id = decodeURIComponent(location.hash.slice(1));}catch{id = location.hash.slice(1);}
    const index = report.slides.findIndex((slide,index) => String(slide.id || index + 1) === id);
    return index >= 0 ? index : 0;
  }

  function renderNotes() {
    const slide = report.slides[state.index];
    $('notes-title').textContent = `${digits(state.index + 1)} — ${localized(slide.title)}`;
    const notes = localized(slide.notes);
    $('notes-content').textContent = notes || tr('noNotes');
  }

  function setNotes(open) {
    state.notes = open;
    $('notes-panel').hidden = !open;
    document.body.classList.toggle('notes-open',open);
    $('notes-toggle').setAttribute('aria-expanded',String(open));
    if(!open && $('notes-panel').contains(document.activeElement)) $('notes-toggle').focus();
  }

  function openOverview() {
    if(typeof $('overview-dialog').showModal === 'function') $('overview-dialog').showModal();
    else { $('overview-dialog').setAttribute('open',''); $('overview-dialog').style.display = 'block'; }
    requestAnimationFrame(() => {const current = $('overview-content').querySelector('.active');if(current){current.scrollIntoView({block:'nearest'});current.focus({preventScroll:true});}});
  }
  function closeOverview() {
    if(typeof $('overview-dialog').close === 'function')$('overview-dialog').close();
    else{$('overview-dialog').removeAttribute('open');$('overview-dialog').style.display = '';}
    $('overview-toggle').focus({preventScroll:true});
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(element => {element.textContent = tr(element.dataset.i18n);});
    $('profile-name').textContent = localized(report.profile?.name) || tr('reportLabel');
    $('profile-subtitle').textContent = localized(report.profile?.subtitle);
    $('identity').setAttribute('aria-label',tr('firstSlide'));
    $('presentation').setAttribute('aria-label',tr('presentationLabel'));
    $('section-rail').setAttribute('aria-label',tr('sectionsLabel'));
    document.querySelector('.toolbar').setAttribute('aria-label',tr('toolbarLabel'));
    $('notes-panel').setAttribute('aria-label',tr('notesTitle'));
    $('language-toggle').querySelector('.language-current').textContent = state.lang === 'zh' ? '中文' : 'EN';
    $('language-toggle').querySelector('.language-target').textContent = state.lang === 'zh' ? 'EN' : '中文';
    const attributes = {'overview-toggle':'overviewTitleButton','notes-toggle':'notesTitle','language-toggle':'languageTitle','print-button':'print','notes-close':'closeNotes','overview-close':'closeOverview','timer-reset':'resetTimer','prev-button':'previous','next-button':'next'};
    Object.entries(attributes).forEach(([id,key]) => {$(id).title = tr(key);$(id).setAttribute('aria-label',tr(key));});
    $('prev-button').title = `${tr('previous')} (←)`;
    $('next-button').title = `${tr('next')} (→)`;
    updateFullscreenLabel();
    buildSections();
    renderSlides();
    updateTimer();
  }

  function changeLanguage() {state.lang = state.lang === 'zh' ? 'en' : 'zh';storeValue('research-presentation-language',state.lang);applyLanguage();}

  function elapsedSeconds() {return state.elapsed + (state.timerRunning ? (performance.now() - state.timerStartedAt) / 1000 : 0);}
  function updateTimer() {
    const seconds = elapsedSeconds();
    $('timer-value').textContent = formatTime(seconds);
    $('time-progress-value').style.width = `${Math.min(100,seconds / totalSeconds * 100)}%`;
    document.querySelector('.rehearsal').classList.toggle('over-time',seconds >= totalSeconds);
    $('timer-status').textContent = seconds >= totalSeconds ? tr('overtime') : state.timerRunning ? tr('running') : seconds > 0 ? tr('paused') : tr('rehearsal');
    $('timer-toggle').setAttribute('aria-label',tr(state.timerRunning ? 'pauseTimer' : 'startTimer'));
    $('timer-toggle').title = tr(state.timerRunning ? 'pauseTimer' : 'startTimer');
    $('timer-icon').innerHTML = state.timerRunning ? '<path d="M8 5v14M16 5v14"/>' : '<path d="m9 5 11 7-11 7z"/>';
    if(seconds >= totalSeconds && !state.timerNotice){state.timerNotice = true;toast(tr('timerFinished'));}
  }
  function toggleTimer() {
    if(state.timerRunning){state.elapsed = elapsedSeconds();state.timerRunning = false;clearInterval(tickInterval);}
    else{state.timerStartedAt = performance.now();state.timerRunning = true;tickInterval = setInterval(updateTimer,250);}
    updateTimer();
  }
  function resetTimer() {clearInterval(tickInterval);state.timerRunning = false;state.elapsed = 0;state.timerNotice = false;updateTimer();toast(tr('resetToast'));}

  function updateFullscreenLabel() {
    const active = Boolean(document.fullscreenElement || state.focusMode);
    $('fullscreen-toggle').title = tr(active ? 'exitFullScreen' : 'fullScreenTitle');
    $('fullscreen-toggle').setAttribute('aria-label',tr(active ? 'exitFullScreen' : 'fullScreen'));
    $('fullscreen-toggle').setAttribute('aria-pressed',String(active));
  }
  async function toggleFullscreen() {
    if(document.fullscreenElement){try{await document.exitFullscreen();}catch{/* Focus mode remains available. */}state.focusMode = false;document.body.classList.remove('focus-mode');}
    else if(state.focusMode){state.focusMode = false;document.body.classList.remove('focus-mode');}
    else {
      state.focusMode = true;document.body.classList.add('focus-mode');
      if(document.documentElement.requestFullscreen){try{await document.documentElement.requestFullscreen();}catch{toast(tr('fullScreenUnavailable'));}}
      else toast(tr('focusMode'));
    }
    updateFullscreenLabel();
  }

  function bindEvents() {
    $('identity').addEventListener('click',event => {event.preventDefault();navigate(0);});
    $('prev-button').addEventListener('click',() => navigate(state.index - 1));
    $('next-button').addEventListener('click',() => navigate(state.index + 1));
    $('language-toggle').addEventListener('click',changeLanguage);
    $('notes-toggle').addEventListener('click',() => setNotes(!state.notes));
    $('notes-close').addEventListener('click',() => setNotes(false));
    $('overview-toggle').addEventListener('click',openOverview);
    $('overview-close').addEventListener('click',closeOverview);
    $('overview-dialog').addEventListener('click',event => {if(event.target === $('overview-dialog')){const rect = $('overview-dialog').getBoundingClientRect();if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)closeOverview();}});
    $('fullscreen-toggle').addEventListener('click',toggleFullscreen);
    $('print-button').addEventListener('click',() => window.print());
    $('timer-toggle').addEventListener('click',toggleTimer);
    $('timer-reset').addEventListener('click',resetTimer);
    window.addEventListener('hashchange',() => navigate(hashIndex(),{updateHash:false}));
    document.addEventListener('fullscreenchange',() => {if(!document.fullscreenElement){state.focusMode = false;document.body.classList.remove('focus-mode');}updateFullscreenLabel();});
    document.addEventListener('keydown',event => {
      if(event.ctrlKey || event.altKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      if($('overview-dialog').open){if(event.key.toLowerCase() === 'l'){event.preventDefault();changeLanguage();}return;}
      if(event.target.closest('button,a') && (event.key === ' ' || event.key === 'Enter'))return;
      const key = event.key.toLowerCase();
      if(['arrowright','arrowdown','pagedown',' '].includes(key)){event.preventDefault();navigate(state.index + 1);}
      else if(['arrowleft','arrowup','pageup'].includes(key)){event.preventDefault();navigate(state.index - 1);}
      else if(key === 'home'){event.preventDefault();navigate(0);}
      else if(key === 'end'){event.preventDefault();navigate(report.slides.length - 1);}
      else if(key === 'n'){event.preventDefault();setNotes(!state.notes);}
      else if(key === 'l'){event.preventDefault();changeLanguage();}
      else if(key === 'f'){event.preventDefault();toggleFullscreen();}
      else if(key === 'o'){event.preventDefault();openOverview();}
      else if(key === 'escape'){if(state.notes)setNotes(false);else if(state.focusMode && !document.fullscreenElement)toggleFullscreen();}
    });
    let touch = null;
    $('presentation').addEventListener('touchstart',event => {
      if(event.touches.length !== 1 || event.target.closest('a,button,input,textarea,select,[contenteditable]')){touch = null;return;}
      const point = event.touches[0];touch = {x:point.clientX,y:point.clientY,time:performance.now()};
    },{passive:true});
    $('presentation').addEventListener('touchend',event => {
      if(!touch || event.changedTouches.length !== 1)return;
      const point = event.changedTouches[0];const dx = point.clientX - touch.x;const dy = point.clientY - touch.y;const duration = performance.now() - touch.time;
      if(Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.7 && duration < 650)navigate(state.index + (dx < 0 ? 1 : -1));
      touch = null;
    },{passive:true});
    $('presentation').addEventListener('touchcancel',() => {touch = null;},{passive:true});
  }

  function initialize() {
    report = window.REPORT;
    if(!report || !Array.isArray(report.slides) || report.slides.length === 0){$('slides').innerHTML = `<div class="loading-state"><p>${escapeHTML(tr('loadingError'))}</p></div>`;return;}
    const savedLanguage = readStored('research-presentation-language');
    if(savedLanguage === 'zh' || savedLanguage === 'en')state.lang = savedLanguage;
    state.index = hashIndex();
    applyLanguage();
    bindEvents();
  }
  initialize();
})();
