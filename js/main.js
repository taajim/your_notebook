/* =========================================================
   MAIN.JS — Mobile nav, modal popups, form handling, toast
   Works the same across every page that includes it.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------
     1. MOBILE NAV TOGGLE
  --------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when a link is clicked
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------
     2. MODAL / POPUP SYSTEM
     Triggers: elements with [data-modal-trigger="modalId"]
     or a parent card with [data-modal="modalId"] + Enter/Space
     Closes: [data-modal-close], overlay click, or Escape key
  --------------------------------------------------- */
  var openModalEl = null;

  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    openModalEl = modal;

    // Move focus to the close button for accessibility
    var closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    openModalEl = null;
  }

  // Click triggers (buttons)
  document.querySelectorAll('[data-modal-trigger]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal(btn.getAttribute('data-modal-trigger'));
    });
  });

  // Card-level triggers (whole card clickable + keyboard accessible)
  document.querySelectorAll('[data-modal]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // avoid double-firing if a button inside already handled it
      if (e.target.closest('[data-modal-trigger]')) return;
      openModal(card.getAttribute('data-modal'));
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-modal'));
      }
    });
  });

  // Close buttons
  document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  // Click outside modal content closes it
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Escape key closes any open modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openModalEl) {
      closeModal(openModalEl);
    }
  });

  /* ---------------------------------------------------
     3. TOAST NOTIFICATION HELPER
  --------------------------------------------------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  /* ---------------------------------------------------
     4. FORM HANDLING (non-functional demo submission)
     Applies to: contact form, comment form, newsletter form
  --------------------------------------------------- */
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic HTML5 validity check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var successEl = form.querySelector('.form-success');
      var formName = form.getAttribute('data-demo-form');

      if (successEl) {
        successEl.classList.add('is-visible');
      }

      showToast('Thanks! Your ' + (formName || 'message') + ' was received (demo only — no data is stored).');

      form.reset();

      // If this form lives inside a modal, close the modal after a short pause
      var parentModal = form.closest('.modal-overlay');
      if (parentModal) {
        setTimeout(function () {
          closeModal(parentModal);
          if (successEl) successEl.classList.remove('is-visible');
        }, 1600);
      }
    });
  });

  /* ---------------------------------------------------
     5. ACTIVE NAV LINK HIGHLIGHTING (based on filename)
  --------------------------------------------------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });

});
