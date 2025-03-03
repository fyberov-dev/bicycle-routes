"use strict";

const $hamburger = document.querySelector(".hamburger-menu");
const $list = document.querySelector(".navbar-list");
const $map = document.querySelector(".map-iframe");
const $openMapButton = document.querySelector(".open-map-button");
const $modal = document.querySelector(".modal-background");
const $contactButton = document.querySelector(".contact-button");

const $secureBlock = document.querySelector(".secure-block");
const $mapIframe = document.querySelector(".map-iframe");

if ($secureBlock) {
  let secureBlockTimeout;

  $secureBlock.addEventListener("mouseover", (_) => {
    if (!$secureBlock.classList.contains("hide")) {
      secureBlockTimeout = setTimeout(() => {
        $secureBlock.classList.add("hide");
      }, 1000);
    }
  });

  $secureBlock.addEventListener("mouseout", (_) => {
    if (!$secureBlock.classList.contains("hide")) {
      clearTimeout(secureBlockTimeout);
    }
  });

  $secureBlock.addEventListener("click", (_) => {
    if (!$secureBlock.classList.contains("hide")) {
      $secureBlock.classList.add("hide");
    }
  });

  $mapIframe.addEventListener("mouseout", (_) => {
    if ($secureBlock.classList.contains("hide")) {
      secureBlockTimeout = setTimeout(() => {
        $secureBlock.classList.remove("hide");
      }, 1000);
    }
  });

  $mapIframe.addEventListener("mouseover", (_) => {
    if ($secureBlock.classList.contains("hide")) {
      clearTimeout(secureBlockTimeout);
    }
  });
}

// slider
const $navigation = document.querySelector(".slider-navigation");
if ($navigation) {
  let slideIndex = 0;
  showSlides(slideIndex);

  let interval = setInterval(() => {
    slideIndex++;
    slideIndex = showSlides(slideIndex);
  }, 4000);

  $navigation.addEventListener("click", (e) => {
    let index = e.target.dataset.index;
    if (index) {
      showSlides(index);
      clearInterval(interval);
      interval = setInterval(() => {
        index++;
        slideIndex = showSlides(index);
      }, 4000);
    }
  });

  function showSlides(index) {
    let currentIndex = index;
    const $slides = document.querySelectorAll(".slide");
    const $dots = document.querySelectorAll(".dot");

    if (index >= $slides.length) currentIndex = 0;

    $slides.forEach((item) => {
        hideItem(item);
    });
    $dots.forEach((item) => {
      item.classList.remove("active");
    });
    showItem($slides[currentIndex]);
    $dots[currentIndex].classList.add("active");

    return currentIndex;
  }
}

function showItem(item) {
  item.classList.add("show");
  item.classList.remove("hide");
}

function hideItem(item) {
  item.classList.add("hide");
  item.classList.remove("show");
}

$hamburger.addEventListener("click", (e) => {
  e.preventDefault();

  if ($hamburger.classList.contains("hided")) {
    $hamburger.classList.add("showed");
    $hamburger.classList.remove("hided");
    $list.classList.add("d-flex");
    document.body.classList.add("no-overflow");
  } else {
    $hamburger.classList.remove("showed");
    $hamburger.classList.add("hided");
    $list.classList.remove("d-flex");
    document.body.classList.remove("no-overflow");
  }
});

if ($openMapButton) {
  $openMapButton.addEventListener("click", (e) => {
    e.preventDefault();

    if ($map.classList.contains("show")) {
      $map.classList.remove("show");
      $openMapButton.innerHTML = `<p class='smaller'>${$openMapButton.dataset.open}</p>`;
    } else {
      $map.classList.add("show");
      $openMapButton.innerHTML = `<p class='smaller'>${$openMapButton.dataset.close}</p>`;
    }
  });
}

$contactButton.addEventListener("click", (e) => {
  e.preventDefault();

  $modal.classList.remove("hide");
  $modal.classList.add("show");
  document.body.style.overflowY = "hidden";
});

$modal.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("close-btn") ||
    e.target.classList.contains("background")
  ) {
    $modal.classList.remove("show");
    $modal.classList.add("hide");
    document.body.style.overflowY = "scroll";
  }
});

// =========
// =gallery=
// =========

let $pictureName = document.querySelectorAll(".gallery-page .gallery-column");
let amount = Math.floor($pictureName.length / 6);

for (let i = 1; i <= amount; i++) {
  let id = 1 + (i - 1) * 6;
  $pictureName[id - 1].classList.add("column-1");
  $pictureName[id].classList.add("column-2");
  $pictureName[id + 1].classList.add("column-3");

  let id2 = 4 + (i - 1) * 6;
  $pictureName[id2 - 1].classList.add("column-4");
  $pictureName[id2].classList.add("column-5");
  $pictureName[id2 + 1].classList.add("column-6");
}

// file upload

let $fileButton = document.querySelector(".file-button");
let $fileModal = document.querySelector(".gallery-modal-background");
if ($fileButton) {
  $fileButton.addEventListener("click", (e) => {
    e.preventDefault();

    $fileModal.classList.remove("hide");
    $fileModal.classList.add("show");
    document.body.style.overflowY = "hidden";
  });
}

if ($fileModal) {
  $fileModal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("close-btn") ||
      e.target.classList.contains("background")
    ) {
      $fileModal.classList.remove("show");
      $fileModal.classList.add("hide");
      document.body.style.overflowY = "scroll";
    }
  });
}

const images = document.querySelectorAll(".async-image");
Array.from(images).map((item) => {
  const img = new Image();
  img.src = item.dataset.src;

  img.onload = () => {
    item.classList.remove("async-image");
    return (item.src = item.dataset.src);
  };
});
