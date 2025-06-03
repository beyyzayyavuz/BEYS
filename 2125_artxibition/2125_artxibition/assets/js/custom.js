(function ($) {
  "use strict";

  $(".owl-show-events").owlCarousel({
    items: 4,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let countDown = new Date("Mar 31, 2022 09:30:00").getTime(),
    x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDown - now;

      (document.getElementById("days").innerText = Math.floor(distance / day)),
        (document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        )),
        (document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        )),
        (document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        ));

      //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'IT'S MY BIRTHDAY!;
      //}
    }, second);

  $(function () {
    $("#tabs").tabs();
  });

  $(".schedule-filter li").on("click", function () {
    var tsfilter = $(this).data("tsfilter");
    $(".schedule-filter li").removeClass("active");
    $(this).addClass("active");
    if (tsfilter == "all") {
      $(".schedule-table").removeClass("filtering");
      $(".ts-item").removeClass("show");
    } else {
      $(".schedule-table").addClass("filtering");
    }
    $(".ts-item").each(function () {
      $(this).removeClass("show");
      if ($(this).data("tsmeta") == tsfilter) {
        $(this).addClass("show");
      }
    });
  });

  // Window Resize Mobile Menu Fix
  mobileNav();

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  // Window Resize Mobile Menu Fix
  $(window).on("resize", function () {
    mobileNav();
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $(".submenu").on("click", function () {
      if (width < 767) {
        $(".submenu ul").removeClass("active");
        $(this).find("ul").toggleClass("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".btnLogin-popup");
    const closeIcon = document.querySelector(".icon-close");
    const banner = document.querySelector(".main-banner");
    const wrapper = banner.querySelector(".wrapper");

    if (loginBtn && banner && wrapper && closeIcon) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        banner.classList.add("expanded");
        wrapper.classList.add("active-popup");
      });

      closeIcon.addEventListener("click", () => {
        banner.classList.remove("expanded");
        wrapper.classList.remove("active-popup");
      });
    }
  });
})(window.jQuery);
$(document).ready(function () {
  $(".upcoming-events-slider .owl-carousel").owlCarousel({
    items: 4,
    loop: true,
    margin: 25 /* Az bir boşluk bırak */,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true, // Hover olunca durur
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  });
});
$(document).ready(function () {
  $(".weekend-events-slider .owl-carousel").owlCarousel({
    items: 4,
    loop: true,
    margin: 25 /* Az bir boşluk bırak */,
    autoplay: false,
    autoplayTimeout: 6000,
    autoplayHoverPause: true, // Hover olunca durur
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  });
});
$(document).ready(function () {
  $(".just-for-you-events-slider .owl-carousel").owlCarousel({
    items: 4,
    loop: true,
    margin: 25,
    autoplay: true, // İstersen true/false yapabilirsin
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  });
});
