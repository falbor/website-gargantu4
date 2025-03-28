document.addEventListener("DOMContentLoaded", () => {
  let currentLang = 'it';

  // Language switcher
  document.querySelectorAll('.lang-flag').forEach(flag => {
    flag.addEventListener('click', () => {
      const lang = flag.dataset.lang;
      currentLang = lang;
      updateLanguage(lang);
      document.querySelectorAll('.lang-flag').forEach(f => f.classList.remove('active'));
      flag.classList.add('active');
      localStorage.setItem('preferredLanguage', lang);
    });
  });

  // Load saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    currentLang = savedLang;
    updateLanguage(savedLang);
    document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');
  }

  function updateLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.dataset.translate;
      if (translations[lang][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });
    document.documentElement.lang = lang;
  }

  // element toggle function
  const elementToggleFunc = function(elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function() {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  }

  // add click event to all modal items
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function() {
      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
      }
    });
  });

  // add click event to modal close button
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function() { elementToggleFunc(this); });
  }

  // add event in all select items
  selectItems.forEach(item => {
    item.addEventListener("click", function() {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function(selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  // Set "All" as default active filter on page load
  filterBtn.forEach(btn => {
    if (btn.innerText.toLowerCase() === "all") {
      btn.classList.add("active");
      lastClickedBtn = btn;
      filterFunc("all");
    } else {
      btn.classList.remove("active");
    }
  });

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function() {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      // Remove active class from all buttons first
      filterBtn.forEach(button => button.classList.remove("active"));
      // Add active class only to clicked button
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // Form handling (from edited snippet)
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (formInputs.length && form && formBtn) {
    formInputs.forEach(input => {
      input.addEventListener("input", function() {
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  }

  // Navigation (from edited snippet)
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", function() {
      const targetPage = this.textContent.toLowerCase();

      pages.forEach((page) => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
          link.classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
        }
      });

      navigationLinks.forEach((navLink) => {
        if (navLink !== link) {
          navLink.classList.remove("active");
        }
      });
    });
  });

  // Theme switcher (from edited snippet)
  const themeBtn = document.createElement('button');
  themeBtn.classList.add('theme-btn');
  themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(themeBtn);

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.innerHTML = document.body.classList.contains('dark-theme') ?
      '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Project pages functionality
  document.querySelectorAll('.project-item a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.closest('.project-item').dataset.category;
      openProjectPage(projectId);
    });
  });

  function openProjectPage(projectId) {
    const projectPages = {
      js: '/projects/finance.html',
      games: '/projects/games.html'
    };

    window.location.href = projectPages[projectId] || '/projects/default.html';
  }
});

import translations from './translations.js';