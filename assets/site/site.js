(() => {
  'use strict';
  let zh = document.documentElement.lang.startsWith('zh');
  const message = (en, cn) => zh ? cn : en;
  const switcher = document.querySelector('.language-switch');
  let renderedPath=location.pathname,languageBusy=false;
  const languagePages=new Map();
  const stableHeightSelectors=['.hero-copy','.hero h1','.hero-statement','.hero-description','.hero-links','.section-heading','.research-topic','.paper-row','.about-copy','.event-row','.page-heading','.filter-toolbar','.archive-meta','.group-title','.bio-grid','.timeline-section>.eyebrow','.timeline-section>h2','.timeline article','.teaching-section>.eyebrow','.teaching-section>h2','.teaching-section>p:not(.eyebrow)','.course-row','.detail-page>h1','.detail-summary','.citation-block','.footer-top','.footer-bottom'];
  const stableWidthSelectors=['.wordmark','#navigation>a','.language-switch','.hero-copy','.hero h1','.hero-statement','.hero-description','.hero-links'];
  const children = node => [...node.childNodes].filter(child=>child.nodeType!==Node.TEXT_NODE||child.nodeValue.trim());
  const iconPair = (current,next) => current.nodeType===Node.ELEMENT_NODE&&next.nodeType===Node.ELEMENT_NODE
    &&current.matches('svg.lucide')&&next.matches('i[data-lucide]');
  function compatibleTree(current,next) {
    if(iconPair(current,next))return true;
    if(current.nodeType!==next.nodeType)return false;
    if(current.nodeType===Node.TEXT_NODE)return true;
    if(current.nodeType!==Node.ELEMENT_NODE||current.tagName!==next.tagName)return false;
    const currentChildren=children(current),nextChildren=children(next);
    return currentChildren.length===nextChildren.length&&currentChildren.every((child,index)=>compatibleTree(child,nextChildren[index]));
  }
  function syncTree(current,next) {
    if(iconPair(current,next))return;
    if(current.nodeType===Node.TEXT_NODE){current.nodeValue=next.nodeValue;return;}
    for(const attribute of [...current.attributes])if(!next.hasAttribute(attribute.name))current.removeAttribute(attribute.name);
    for(const attribute of [...next.attributes])current.setAttribute(attribute.name,attribute.value);
    const currentChildren=children(current),nextChildren=children(next);
    currentChildren.forEach((child,index)=>syncTree(child,nextChildren[index]));
  }
  async function languagePage(target) {
    const key=target.pathname;
    if(!languagePages.has(key))languagePages.set(key,fetch(target,{headers:{'X-Requested-With':'language-switch'}}).then(async response=>{
      if(!response.ok)throw new Error(`Language page returned ${response.status}`);
      return new DOMParser().parseFromString(await response.text(),'text/html');
    }));
    return languagePages.get(key);
  }
  const selectedNodes = (root,selector) => [...root.querySelectorAll(selector)];
  function measureLanguageLayout(next) {
    const currentHeights=Object.fromEntries(stableHeightSelectors.map(selector=>[selector,selectedNodes(document,selector).map(node=>node.getBoundingClientRect().height)]));
    const currentWidths=Object.fromEntries(stableWidthSelectors.map(selector=>[selector,selectedNodes(document,selector).map(node=>node.getBoundingClientRect().width)]));
    const sandbox=document.createElement('div');
    sandbox.className=`language-measure ${next.body.className}`;
    sandbox.style.cssText='position:absolute;left:0;top:0;width:100%;height:auto;visibility:hidden;pointer-events:none;z-index:-100;overflow:hidden';
    for(const selector of ['.site-header','#main','.site-footer'])sandbox.append(next.querySelector(selector).cloneNode(true));
    const previousLang=document.documentElement.lang;
    document.documentElement.lang=next.documentElement.lang;
    document.body.append(sandbox);
    try{window.lucide?.createIcons({nodes:[...sandbox.querySelectorAll('i[data-lucide]')]});}catch{}
    const heights=Object.fromEntries(stableHeightSelectors.map(selector=>[selector,selectedNodes(sandbox,selector).map((node,index)=>Math.max(currentHeights[selector][index]||0,node.getBoundingClientRect().height))]));
    const widths=Object.fromEntries(stableWidthSelectors.map(selector=>[selector,selectedNodes(sandbox,selector).map((node,index)=>Math.max(currentWidths[selector][index]||0,node.getBoundingClientRect().width))]));
    sandbox.remove();document.documentElement.lang=previousLang;
    return {heights,widths};
  }
  function applyLanguageLayout({heights,widths}) {
    for(const [selector,values] of Object.entries(heights))selectedNodes(document,selector).forEach((node,index)=>{
      if(!values[index])return;
      node.style.minHeight=`${Math.ceil(values[index])}px`;node.dataset.languageHeight='true';
    });
    for(const [selector,values] of Object.entries(widths))selectedNodes(document,selector).forEach((node,index)=>{
      if(!values[index])return;
      node.style.width=`${Math.ceil(values[index])}px`;node.dataset.languageWidth='true';
    });
  }
  let stableViewportWidth=innerWidth,layoutTimer;
  async function prepareLanguageLayout() {
    if(!switcher)return;
    try {
      const next=await languagePage(new URL(switcher.href));
      applyLanguageLayout(measureLanguageLayout(next));
      document.documentElement.dataset.languageLayout='ready';
    } catch { /* A normal navigation remains available when prefetching fails. */ }
  }
  async function switchLanguage(target,push=true) {
    if(languageBusy)return;
    languageBusy=true;switcher?.setAttribute('aria-busy','true');
    try {
      const next=await languagePage(target);
      const stableLayout=measureLanguageLayout(next);
      const selectors=['head','.skip-link','.site-header','#main','.site-footer'];
      const pairs=selectors.map(selector=>[document.querySelector(selector),next.querySelector(selector)]);
      if(pairs.some(([current,replacement])=>!current||!replacement||!compatibleTree(current,replacement)))throw new Error('Language pages have different structures');
      pairs.forEach(([current,replacement])=>syncTree(current,replacement));
      const physicsActive=document.body.classList.contains('physics-active');
      const physicsFixed=document.body.classList.contains('physics-fixed');
      document.body.className=next.body.className;
      if(physicsActive)document.body.classList.add('physics-active');
      if(physicsFixed)document.body.classList.add('physics-fixed');
      zh=next.documentElement.lang.startsWith('zh');
      document.documentElement.lang=next.documentElement.lang;
      applyLanguageLayout(stableLayout);
      if(push)history.pushState(null,'',target.pathname+target.search+target.hash);
      renderedPath=target.pathname;
      window.lucide?.createIcons();
      document.dispatchEvent(new CustomEvent('site:languagechange',{detail:{zh}}));
    } catch {
      location.assign(target.href);
    } finally {
      languageBusy=false;switcher?.removeAttribute('aria-busy');
    }
  }
  switcher?.addEventListener('click', event => {
    event.preventDefault();
    const target = new URL(switcher.href);
    target.search = location.search;
    target.hash = location.hash;
    switchLanguage(target);
  });
  addEventListener('popstate',()=>{
    if(location.pathname!==renderedPath)switchLanguage(new URL(location.href),false);
  });
  addEventListener('resize',()=>{
    if(Math.abs(innerWidth-stableViewportWidth)<2)return;
    stableViewportWidth=innerWidth;clearTimeout(layoutTimer);
    layoutTimer=setTimeout(()=>{
      document.querySelectorAll('[data-language-height]').forEach(node=>{node.style.minHeight='';delete node.dataset.languageHeight;});
      document.querySelectorAll('[data-language-width]').forEach(node=>{node.style.width='';delete node.dataset.languageWidth;});
      prepareLanguageLayout();
    },120);
  });
  if (window.lucide) window.lucide.createIcons();
  prepareLanguageLayout();
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const fieldTools = document.querySelector('.field-tools');
  const fieldToggle = fieldTools?.querySelector('.field-toggle');
  const fieldControls = fieldTools?.querySelector('.field-controls');
  const closeField = () => {
    if(!fieldControls)return;
    fieldControls.hidden=true;
    fieldToggle.setAttribute('aria-expanded','false');
  };
  const closeMenu = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', message('Open navigation', '打开导航'));
  };
  menu.addEventListener('click', () => {
    closeField();
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? message('Close navigation', '关闭导航') : message('Open navigation', '打开导航'));
  });
  fieldToggle?.addEventListener('click', () => {
    const open=fieldControls.hidden;
    closeMenu();
    fieldControls.hidden=!open;
    fieldToggle.setAttribute('aria-expanded',String(open));
  });
  fieldTools?.addEventListener('focusout',event=>{
    if(!fieldTools.contains(event.relatedTarget))closeField();
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if(event.key==='Escape' && fieldControls && !fieldControls.hidden){closeField();fieldToggle.focus();}
    if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => {
    if(fieldTools&&!event.composedPath().includes(fieldTools))closeField();
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.querySelectorAll('[data-filter-root]').forEach(root => {
    const search = root.querySelector('input[type="search"]');
    const clear = root.querySelector('.clear-search');
    const filters = [...root.querySelectorAll('[data-filter]')];
    const results = [...root.querySelectorAll('[data-result]')];
    const params = new URLSearchParams(location.search);
    let selected = filters.some(button => button.dataset.filter === params.get('topic')) ? params.get('topic') : 'all';
    search.value = params.get('q') || '';
    function update(syncUrl = true) {
      const query = search.value.trim().toLowerCase();
      let count = 0;
      results.forEach(result => {
        result.hidden = !((selected === 'all' || selected === result.dataset.topic) && query.split(/\s+/).every(word => result.dataset.search.includes(word)));
        if (!result.hidden) count++;
      });
      filters.forEach(button => {
        const active = button.dataset.filter === selected;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      root.querySelectorAll('[data-group]').forEach(group => {
        group.hidden = [...group.querySelectorAll('[data-result]')].every(result => result.hidden);
      });
      const noun = document.body.classList.contains('page-works') ? 'work' : 'presentation';
      root.querySelector('[data-count]').textContent = zh ? `${count} ${noun === 'work' ? '项成果' : '场报告与海报'}` : `${count} ${noun}${count === 1 ? '' : 's'}`;
      root.querySelector('.empty-state').hidden = count !== 0;
      clear.hidden = !search.value;
      if (syncUrl) {
        const url = new URL(location.href);
        selected === 'all' ? url.searchParams.delete('topic') : url.searchParams.set('topic', selected);
        query ? url.searchParams.set('q', search.value.trim()) : url.searchParams.delete('q');
        history.replaceState(null, '', url);
      }
    }
    filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.filter; update(); }));
    search.addEventListener('input', () => update());
    clear.addEventListener('click', () => { search.value = ''; update(); search.focus(); });
    root.querySelector('.reset-filters').addEventListener('click', () => { selected = 'all'; search.value = ''; update(); search.focus(); });
    document.addEventListener('site:languagechange',()=>update(false));
    update(false);
  });
  let toastTimer;
  const showMessage = text => {
    const status = document.querySelector('#status-message');
    status.textContent = text;
    status.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => status.classList.remove('visible'), 2800);
  };
  document.querySelectorAll('.copy-citation').forEach(button => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.citation);
      showMessage(message('Citation copied', '已复制引用'));
    } catch {
      const input = document.createElement('textarea');
      input.value = button.dataset.citation;
      input.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';
      document.body.append(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      button.focus();
      showMessage(copied ? message('Citation copied', '已复制引用') : message('Copy unavailable. The full citation is on the paper details page.', '无法复制，请在成果详情页查看完整引用。'));
    }
  }));
  document.querySelectorAll('.print-page').forEach(button => button.addEventListener('click', () => window.print()));
})();
