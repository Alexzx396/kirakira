document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Cargar el footer compartido
  fetch("/footer")
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.text();
    })
    .then(data => {
      const footer = document.getElementById("footer-placeholder");
      footer.innerHTML = data;
      footer.querySelectorAll(".footer-year").forEach(el => el.textContent = new Date().getFullYear());
      if (window.I18n) I18n.apply(footer);
    })
    .catch(error => console.error("Error loading footer:", error));

  // Animaciones (solo en páginas que cargan AOS)
  if (window.AOS) {
    AOS.init();
  }

  // Marcar como activo el link de la página actual
  function normalizePath(path) {
    return path.replace(/\.html$/, "").replace(/\/index$/, "/");
  }

  // url.js deja la barra en "/", así que la página real viene de window.currentPage
  const currentPath = normalizePath(window.currentPage || window.location.pathname);
  navLinks.forEach(link => {
    const linkPath = normalizePath(link.dataset.page || new URL(link.href).pathname);
    link.classList.toggle('active', linkPath === currentPath);
  });
});
