/**
 * section-loader.js
 * Loads section HTML, CSS, and JS files concurrently.
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
  const pendingStyles = new Map();
  const pendingScripts = new Map();

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
    if (pendingStyles.has(url)) return pendingStyles.get(url);

    const existing = document.querySelector(`link[rel="stylesheet"][href="${url}"], link[rel="stylesheet"][href^="${url}?"]`);
    if (existing) {
      injectedStyles.add(url);
      return Promise.resolve();
    }

    const request = new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => {
        injectedStyles.add(url);
        pendingStyles.delete(url);
        resolve();
      };
      link.onerror = () => {
        pendingStyles.delete(url);
        console.error(`[sectionLoader] Failed to load CSS: ${url}`);
        resolve();
      };
      document.head.appendChild(link);
    });

    pendingStyles.set(url, request);
    return request;
  }

  function injectJS(path) {
    const url = resolvePath(`/sections/${path}/${path}.js`);
    if (initializedScripts.has(url)) return Promise.resolve();
    if (pendingScripts.has(url)) return pendingScripts.get(url);

    const existing = document.querySelector(`script[src="${url}"], script[src^="${url}?"]`);
    if (existing) {
      initializedScripts.add(url);
      return Promise.resolve();
    }

    const request = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;
      script.defer = true;
      script.onload = () => {
        initializedScripts.add(url);
        pendingScripts.delete(url);
        resolve();
      };
      script.onerror = () => {
        pendingScripts.delete(url);
        console.error(`[sectionLoader] Failed to load JS: ${url}`);
        resolve();
      };
      document.body.appendChild(script);
    });

    pendingScripts.set(url, request);
    return request;
  }

  async function loadSection({ id, path, js }) {
    const mount = document.getElementById(id);
    if (!mount) {
      console.warn(`[sectionLoader] Mount point not found: #${id}`);
      return;
    }

    const htmlUrl = resolvePath(`/sections/${path}/${path}.html`);

    try {
      const [res] = await Promise.all([
        fetch(htmlUrl, { cache: 'default' }),
        injectCSS(path),
      ]);
      if (!res.ok) {
        console.error(`[sectionLoader] HTTP ${res.status} for ${htmlUrl}`);
        return;
      }
      const html = await res.text();

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
    await Promise.allSettled(SECTIONS.map((section) => loadSection(section)));

    // Notify main.js that all sections are done
    window.__greenwoodSectionsReady = true;
    document.dispatchEvent(new CustomEvent('sections:loaded'));
  }

  loadAll();
})();
