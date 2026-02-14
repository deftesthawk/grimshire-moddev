(() => {
  const BASE = "/grimshire-moddev";
  const VERSION = "2";

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = `${BASE}/assets/css/style.css?v=${VERSION}`;
  document.head.appendChild(css);

  const app = document.createElement("script");
  app.src = `${BASE}/assets/js/app.js?v=${VERSION}`;
  app.defer = true;
  document.head.appendChild(app);
})();
