(function () {
  'use strict';

  function initQuote() {
    const form = document.getElementById('quote-form');
    const successEl = document.getElementById('form-success');
    const textarea = document.getElementById('quote-description');
    const counter = form && form.querySelector('.form-char-count');

    if (!form) return;

    if (textarea && counter) {
      textarea.addEventListener('input', function () {
        counter.textContent = this.value.length + ' / 1200';
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach((field) => {
        field.classList.remove('field-error');
        if (!field.value.trim()) {
          field.classList.add('field-error');
          valid = false;
        }
      });

      if (!valid) {
        const firstErr = form.querySelector('.field-error');
        if (firstErr) firstErr.focus();
        return;
      }

      const btn = form.querySelector('.form-submit');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }

      setTimeout(function () {
        form.style.display = 'none';
        if (successEl) {
          successEl.hidden = false;
          successEl.focus();
        }
      }, 600);
    });
  }

  initQuote();
})();
