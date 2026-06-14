/**
 * section-loader.js
 * Loads section HTML, CSS, and JS files in sequence.
 * Fails gracefully: if one section fails, others still load.
 */

(function () {
  'use strict';

  const SECTIONS = [
    { id: 'section-header',       path: 'header',       js: true  },
    { id: 'section-hero',         path: 'hero',          js: false },
    { id: 'section-trust',        path: 'trust',         js: false },
    { id: 'section-services',     path: 'services',      js: false },
    { id: 'section-about',        path: 'about',         js: false },
    { id: 'section-showcase',     path: 'showcase',      js: false },
    { id: 'section-process',      path: 'process',       js: false },
    { id: 'section-reviews',      path: 'reviews',       js: false },
    { id: 'section-why-greenwood', path: 'why-greenwood', js: false },
    { id: 'section-faq',          path: 'faq',           js: true  },
    { id: 'section-quote',        path: 'quote',         js: true  },
    { id: 'section-location',     path: 'location',      js: false },
    { id: 'section-final-cta',    path: 'final-cta',     js: false },
    { id: 'section-footer',       path: 'footer',        js: false },
  ];

  const injectedStyles = new Set();
  const initializedScripts = new Set();

  function getBasePath() {
    const base = document.querySelector('base');
    if (base && base.href) {
      return base.href.replace(/\/$/, '');
    }
    return '';
  }

  function resolvePath(relativePath) {
    const base = getBasePath();
    return `${base}${relativePath}`;
  }

  function injectCSS(path) {
    const url = resolvePath(`/sections/${path}/${path}.css`);
    if (injectedStyles.has(url)) return Promise.resolve();
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${url}?t=${Date.now()}`;
      link.onload = () => { injectedStyles.add(url); resolve(); };
      link.onerror = () => {
        console.warn(`[sectionLoader] Failed to load CSS: ${url}`);
        resolve();
      };
      document.head.appendChild(link);
    });
  }

  function injectJS(path) {
    const url = resolvePath(`/sections/${path}/${path}.js`);
    if (initializedScripts.has(url)) return Promise.resolve();
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `${url}?t=${Date.now()}`;
      script.defer = true;
      script.onload = () => { initializedScripts.add(url); resolve(); };
      script.onerror = () => {
        console.warn(`[sectionLoader] Failed to load JS: ${url}`);
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  async function loadSection({ id, path, js }) {
    const mount = document.getElementById(id);
    if (!mount) {
      console.warn(`[sectionLoader] Mount point not found: #${id}`);
      return;
    }

    const htmlUrl = resolvePath(`/sections/${path}/${path}.html`);

    try {
      const res = await fetch(`${htmlUrl}?t=${Date.now()}`);
      if (!res.ok) {
        console.error(`[sectionLoader] HTTP ${res.status} for ${htmlUrl}`);
        return;
      }
      const html = await res.text();

      // Inject CSS before inserting HTML to reduce FOUC
      await injectCSS(path);

      mount.innerHTML = html;

      // Restore anchor IDs (navigation targets)
      const anchor = mount.querySelector('[data-section-id]');
      if (anchor) {
        const sectionId = anchor.dataset.sectionId;
        if (sectionId) anchor.id = sectionId;
      }

      if (js) {
        await injectJS(path);
      }
    } catch (err) {
      console.error(`[sectionLoader] Failed to load section "${path}":`, err);
    }
  }

  async function loadAll() {
    for (const section of SECTIONS) {
      await loadSection(section);
    }

    // Notify main.js that all sections are done
    document.dispatchEvent(new CustomEvent('sections:loaded'));
  }

  // Start loading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }
})();
