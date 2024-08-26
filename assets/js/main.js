(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      startEvent: 'DOMContentLoaded', // Initialize AOS as soon as the DOM is ready
      offset: 120, // Adjust this offset to your needs (default is 120px)
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  function initializeGLightbox() {
    const glightbox = GLightbox({
      selector: ".glightbox",
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
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

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      offset: 120, // Adjust this offset as necessary
      duration: 600,
      once: true,
    });
    AOS.refresh(); // Recalculate positions of elements after the page has loaded
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  

  document.addEventListener("DOMContentLoaded", function () {
    const tyres = [
      {
        imgSrc: "assets/img/tyres/apollo-amazer-4g.png",
        warranty: "5 years warranty",
        rating: 4,
        reviews: 320,
        price: "3,774",
        offer: "Offer available",
        type: "Tubeless",
        brand: "Apollo",
        model: "Amazer 4G Life",
        size: "155/70 R13 75T",
      },
      {
        imgSrc: "assets/img/tyres/apollo-amazer-4g.png",
        warranty: "5 years warranty",
        rating: 4,
        reviews: 320,
        price: "3,774",
        offer: "Offer available",
        type: "Tubeless",
        brand: "Apollo",
        model: "Amazer 4G Life",
        size: "155/70 R13 75T",
      },
      {
        imgSrc: "assets/img/tyres/apollo-amazer-4g.png",
        warranty: "5 years warranty",
        rating: 4,
        reviews: 320,
        price: "3,774",
        offer: "Offer available",
        type: "Tubeless",
        brand: "Apollo",
        model: "Amazer 4G Life",
        size: "155/70 R13 75T",
      },
      {
        imgSrc: "assets/img/tyres/apollo-amazer-4g.png",
        warranty: "5 years warranty",
        rating: 4,
        reviews: 320,
        price: "3,774",
        offer: "Offer available",
        type: "Tubeless",
        brand: "Apollo",
        model: "Amazer 4G Life",
        size: "155/70 R13 75T",
      },
      {
        imgSrc: "assets/img/tyres/apollo-amazer-4g.png",
        warranty: "5 years warranty",
        rating: 4,
        reviews: 320,
        price: "3,774",
        offer: "Offer available",
        type: "Tubeless",
        brand: "Apollo",
        model: "Amazer 4G Life",
        size: "155/70 R13 75T",
      },
      {
        imgSrc: "assets/img/tyres/apollo-amazer-4g.png",
        warranty: "5 years warranty",
        rating: 4,
        reviews: 320,
        price: "3,774",
        offer: "Offer available",
        type: "Tubeless",
        brand: "Apollo",
        model: "Amazer 4G Life",
        size: "155/70 R13 75T",
      },
    ];

    const itemsPerPage = 4;
    let currentPage = 1;
    const totalPages = Math.ceil(tyres.length / itemsPerPage);

    function displayPage(page) {
        const tyreContainer = document.querySelector('.row.gy-4.item-lists');
        tyreContainer.innerHTML = '';

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = tyres.slice(start, end);

        paginatedItems.forEach((tyre, index) => {
            const tyreHtml = `
                <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                    <div class="item">
                        <div class="tyre-img">
                            <img src="${tyre.imgSrc}" class="img-fluid" alt="">
                            <div class="details">
                                <h4><i class="bi bi-shield-fill-check"></i> ${tyre.warranty}</h4>                  
                                <p><span><i class="bi bi-star-fill"></i> ${tyre.rating}</span>  ${tyre.reviews} reviews</p>
                                <p><i class="bi bi-currency-rupee"></i> ${tyre.price}</p>
                                <p><a href="" title="More Details" class="details-link offer">${tyre.offer}</a></p>
                                <p>${tyre.type}</p>
                                <div class="icons d-flex">
                                    <a href="${tyre.imgSrc}" title="${tyre.brand}-${tyre.model}-${tyre.size}" data-gallery="tyres-gallery-branding" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="tyre-info">
                            <h4>${tyre.brand}</h4>
                            <p>${tyre.model}</p>
                            <span>${tyre.size}</span>
                        </div>
                    </div>
                </div>
            `;
            tyreContainer.innerHTML += tyreHtml;
        });

        // Call the separate function to initialize GLightbox
        initializeGLightbox();
        displayPagination();
    }

    function displayPagination() {
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                displayPage(currentPage);
            });
            paginationContainer.appendChild(pageItem);
        }
    }

    displayPage(currentPage);
  });
})();
