/* Shared tawk.to widget. Public widget identifiers; no secret credentials. */
window.Tawk_API = window.Tawk_API || {};
window.Tawk_LoadStart = new Date();
(function () {
  if (document.getElementById('tawk-widget-loader')) return;
  var script = document.createElement('script');
  script.id = 'tawk-widget-loader';
  script.async = true;
  script.src = 'https://embed.tawk.to/6ab1db24f7bb3d3443bfeb23/1k33c01fl';
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.head.appendChild(script);
})();
