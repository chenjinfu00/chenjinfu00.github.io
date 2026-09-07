(() => {
  'use strict';
  const zh = document.documentElement.lang.startsWith('zh');
  const message = (en, cn) => zh ? cn : en;
  const switcher = document.querySelector('.language-switch');
  switcher?.addEventListener('click', () => {
    const target = new URL(switcher.href);
    target.search = location.search;
    target.hash = location.hash;
    switcher.href = target.href;
  });
  if (window.lucide) window.lucide.createIcons();
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', message('Open navigation', '打开导航'));
  };
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? message('Close navigation', '关闭导航') : message('Open navigation', '打开导航'));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => {
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
