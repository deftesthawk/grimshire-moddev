// assets/js/app.js
(() => {
  const pages = [
    { href: "index.html", label: "Overview", key: "index" },
    { href: "1-software-and-tools.html", label: "1. Software and tools", key: "software-and-tools" },
    { href: "2-install-and-setup.html", label: "2. Installation and set-up", key: "software-and-tools" },
    { href: "3-creating-a-project.html", label: "3. Creating a project", key: "creating-a-project" },
    { href: "4-configuring-assembly.html", label: "4. Configuring the assembly", key: "configuring-assembly" },
    { href: "5-adding-references.html", label: "5. Adding references", key: "adding-references" },
  ];

  const getCurrentFile = () => {
    const path = window.location.pathname;
    const file = path.split("/").pop();
    return file && file.length > 0 ? file : "index.html";
  };

  const currentFile = getCurrentFile();

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
        const active = page.href === currentFile;
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
    const pageMeta = pages.find((p) => p.href === currentFile);
    const pageLabel = pageMeta ? pageMeta.label : "Guide";

    return `
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-kicker">Documentation</span>
          <h2 class="topbar-title">${escapeHtml(pageLabel)}</h2>
        </div>
        <a class="topbar-link" href="index.html">Home</a>
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
