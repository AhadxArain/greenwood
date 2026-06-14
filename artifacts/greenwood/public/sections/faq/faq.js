(function () {
  'use strict';

  function initFaq() {
    const questions = document.querySelectorAll('.faq-question');
    if (!questions.length) return;

    questions.forEach((btn) => {
      btn.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        const answerId = this.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);
        if (!answer) return;

        if (expanded) {
          this.setAttribute('aria-expanded', 'false');
          answer.hidden = true;
        } else {
          this.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
        }
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  initFaq();
  document.addEventListener('sections:loaded', initFaq);
})();
