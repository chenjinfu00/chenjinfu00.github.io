/* Bundled TeX-to-SVG rendering; no external font or extension requests. */
window.MathJax = {
  startup: {typeset: false},
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    packages: ['base', 'ams', 'newcommand', 'configmacros'],
    processEscapes: true
  },
  svg: {fontCache: 'local'},
  options: {enableMenu: false}
};
