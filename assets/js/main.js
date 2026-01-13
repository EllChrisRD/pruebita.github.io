/**
* Template Name: Learner
* Template URL: https://bootstrapmade.com/learner-bootstrap-course-template/
* Updated: Jul 08 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

})();

/*
   * filtro de evento
   */

  document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.event-item');
  const filterType = document.getElementById('filterType');
  const applyFiltersBtn = document.getElementById('applyFilters');

  if (!filterType || !applyFiltersBtn) return;

  applyFiltersBtn.addEventListener('click', function () {
    items.forEach(item => {
      const type = item.dataset.type;
      const match =
        filterType.value === 'all' || filterType.value === type;

      item.style.display = match ? 'block' : 'none';
    });
  });
});






/** PAGINACION */

document.addEventListener("DOMContentLoaded", () => {

  /* <!--======================================================
     SELECCIÓN DE ELEMENTOS (NO TOCAR)
     ======================================================--> */

  const events = document.querySelectorAll(".event-item"); // Cada evento
  const pagination = document.getElementById("pagination"); // Paginación
  const searchInput = document.getElementById("searchInput"); // Buscador


  /* <!--======================================================
     CONFIGURACIÓN PRINCIPAL
     CAMBIA ESTE NÚMERO PARA MÁS O MENOS PÁGINAS
     ======================================================--> */

  /*
    <!--
      ESTE NÚMERO CONTROLA CUÁNTOS EVENTOS SE MUESTRAN POR PÁGINA

      👉 Número MENOR  = MÁS páginas
      👉 Número MAYOR  = MENOS páginas

      Ejemplos:
      2 = muchas páginas
      3 = recomendado
      5 = pocas páginas
    -->
  */
  const itemsPerPage = 3; // 🔥 CAMBIA SOLO ESTE NÚMERO


  /* <!--======================================================
     VARIABLES INTERNAS (NO TOCAR)
     ======================================================--> */

  let currentPage = 1;
  let searchText = ""; // Texto que se escribe en el buscador


  /* <!--======================================================
     EVENTO DEL BUSCADOR
     ======================================================--> */

  searchInput.addEventListener("input", () => {
    searchText = searchInput.value.toLowerCase();
    currentPage = 1; // Reinicia a la página 1 al buscar
    showPage(currentPage);
  });


  /* <!--======================================================
     FUNCIÓN: MOSTRAR EVENTOS POR PÁGINA + BÚSQUEDA
     ======================================================--> */

  function showPage(page) {

    currentPage = page;
    let visibleIndex = 0; // Cuenta solo los eventos filtrados

    events.forEach((item) => {

      const text = item.innerText.toLowerCase();
      const matchesSearch = text.includes(searchText);

      // Oculta todo por defecto
      item.style.display = "none";
      item.classList.remove("zoom");

      if (matchesSearch) {

        // Aplica paginación SOLO a los filtrados
        if (
          visibleIndex >= (currentPage - 1) * itemsPerPage &&
          visibleIndex < currentPage * itemsPerPage
        ) {
          item.style.display = "block";

          // Reinicia animación
          void item.offsetWidth;

          // Aplica animación tipo zoom
          item.classList.add("zoom");
        }

        visibleIndex++;
      }
    });

    buildPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  /* <!--======================================================
     FUNCIÓN: CONSTRUIR PAGINACIÓN AUTOMÁTICA
     ======================================================--> */

  function buildPagination() {

    pagination.innerHTML = "";

    // Filtra eventos según el texto de búsqueda
    const filteredEvents = Array.from(events).filter(event =>
      event.innerText.toLowerCase().includes(searchText)
    );

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

    // Si solo hay 1 página, no mostrar paginación
    if (totalPages <= 1) return;

    /* <!-- Flecha izquierda --> */
    pagination.innerHTML += `
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" data-page="${currentPage - 1}">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
    `;

    /* <!-- Números de página --> */
    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
        <li class="page-item ${i === currentPage ? "active" : ""}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    /* <!-- Flecha derecha --> */
    pagination.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    `;

    /* <!-- Clicks de la paginación --> */
    pagination.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page >= 1 && page <= totalPages) {
          showPage(page);
        }
      });
    });
  }


  /* <!--======================================================
     INICIO DEL SISTEMA (NO TOCAR)
     ======================================================--> */

  showPage(1);

});


