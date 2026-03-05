/* portfolio.js – shared persistence logic */

(function () {
  'use strict';

  /* Save all [data-key] elements inside a container to localStorage */
  function saveAll(containerId) {
    var panel = document.getElementById(containerId);
    if (!panel) return;
    panel.querySelectorAll('[data-key]').forEach(function (el) {
      localStorage.setItem(el.dataset.key, el.innerText);
    });
    var notice = document.getElementById('save-notice');
    if (notice) {
      notice.textContent = '✔ Enregistré le ' + new Date().toLocaleString('fr-FR');
      setTimeout(function () { notice.textContent = ''; }, 4000);
    }
  }

  /* Load all [data-key] elements inside a container from localStorage */
  function loadAll(containerId) {
    var panel = document.getElementById(containerId);
    if (!panel) return;
    panel.querySelectorAll('[data-key]').forEach(function (el) {
      var saved = localStorage.getItem(el.dataset.key);
      if (saved !== null) el.innerText = saved;
    });
  }

  /* Wire save button(s) */
  document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('[data-lesson-id]');
    if (container) {
      var lessonId = container.dataset.lessonId;
      loadAll(lessonId);
      document.querySelectorAll('[data-save]').forEach(function (btn) {
        btn.addEventListener('click', function () { saveAll(lessonId); });
      });
    }
  });
})();
