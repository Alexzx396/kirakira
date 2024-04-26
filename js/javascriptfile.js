document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function handleResponse(id, data) {
    document.getElementById(id).innerHTML = data;
    if (id === "contacto-placeholder") {
      AOS.init();
    }
  }

  function handleError(id, error) {
    console.error(`Error loading ${id}:`, error);
  }

  function loadContent(id, filePath) {
    fetch(filePath)
      .then(response => response.text())
      .then(data => handleResponse(id, data))
      .catch(error => handleError(id, error));
  }

  const placeholders = [
    { id: "footer-placeholder", filePath: "footer.html" },
    { id: "contacto-placeholder", filePath: "contacto.html" },
    { id: "skills-placeholder", filePath: "skills.html" },
    { id: "phrase-placeholder", filePath: "phrase.html" },
    { id: "project-placeholder", filePath: "project.html" },
    { id: "generalProjects-placeholder", filePath: "generalProjects.html" },
  ];

  placeholders.forEach(placeholder => loadContent(placeholder.id, placeholder.filePath));

  function setActiveLink() {
    const currentPath = window.location.pathname.replace("/index.html", "/").replace(".html", "");
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname.replace("/index.html", "/").replace(".html", "");
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveLink();

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      // Guardar la última pestaña activa en localStorage
      localStorage.setItem('activeNav', this.getAttribute('href'));
    });
  });

  // Restaurar la pestaña activa de localStorage
  const activeNav = localStorage.getItem('activeNav');
  if (activeNav) {
    document.querySelector(`.navbar-nav .nav-link[href="${activeNav}"]`).classList.add('active');
  }
});
