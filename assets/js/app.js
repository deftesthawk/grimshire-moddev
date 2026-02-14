(() => {
  const BASE_PATH = "/grimshire-moddev/";

  const pages = [
    { href: `${BASE_PATH}`, label: "Overview", key: "index" },
    { href: `${BASE_PATH}software-and-tools/`, label: "1. Software and tools", key: "software-and-tools" },
    { href: `${BASE_PATH}install-and-setup/`, label: "2. Installation and set-up", key: "install-and-setup" },
    { href: `${BASE_PATH}creating-a-project/`, label: "3. Creating a project", key: "creating-a-project" },
    { href: `${BASE_PATH}configuring-assembly/`, label: "4. Configuring the assembly", key: "configuring-assembly" },
    { href: `${BASE_PATH}adding-references/`, label: "5. Adding references", key: "adding-references" },
    { href: `${BASE_PATH}exploring-game-files/`, label: "6. Exploring the game files", key: "exploring-game-files" },

  ];

  const normalizePath = (p) => {
    if (!p) return BASE_PATH;
    return p.endsWith("/") ? p : `${p}/`;
  };

  const currentPath = normalizePath(window.location.pathname);

  const escapeHtml = (str) =>
    str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const renderSidebar = () => {
    const navItems = pages
      .map((page) => {
        const active = normalizePath(page.href) === currentPath;
        return `
          <a class="nav-link ${active ? "active" : ""}" href="${escapeHtml(page.href)}">
            ${escapeHtml(page.label)}
          </a>
        `;
      })
      .join("");

    return `
      <div class="sidebar-inner">
        <div class="brand">
          <div class="brand-dot" aria-hidden="true"></div>
          <div>
            <div class="brand-title">Grimshire Guide</div>
            <div class="brand-subtitle">Mod Development</div>
          </div>
        </div>

        <nav class="nav" aria-label="Guide navigation">
          ${navItems}
        </nav>
      </div>
    `;
  };

  const renderTopbar = () => {
    const pageMeta = pages.find((p) => normalizePath(p.href) === currentPath);
    const pageLabel = pageMeta ? pageMeta.label : "Guide";

    return `
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-kicker">Documentation</span>
          <h2 class="topbar-title">${escapeHtml(pageLabel)}</h2>
        </div>
        <a class="topbar-link" href="${BASE_PATH}">Home</a>
      </header>
    `;
  };

  const mountIncludes = () => {
    document.querySelectorAll("[data-include]").forEach((node) => {
      const includeType = node.getAttribute("data-include");

      if (includeType === "sidebar") {
        node.innerHTML = renderSidebar();
      } else if (includeType === "topbar") {
        node.innerHTML = renderTopbar();
      }
    });
  };

  const enhanceExternalLinks = () => {
    document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      mountIncludes();
      enhanceExternalLinks();
    });
  } else {
    mountIncludes();
    enhanceExternalLinks();
  }
})();
