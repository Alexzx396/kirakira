document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carouselWrapper");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
    }

    function next() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }

    function prev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // Deslizar con el dedo en móvil
    let touchStartX = null;
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(deltaX) < 40) return;
      if (deltaX < 0) next(); else prev();
    });

    // Tráiler: el video de YouTube se carga solo al apretar play
    document.querySelectorAll(".video-play").forEach(btn => {
      btn.addEventListener("click", () => {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0`;
        iframe.title = btn.getAttribute("aria-label");
        iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        iframe.allowFullscreen = true;
        btn.replaceWith(iframe);
      });
    });
  });
  