// La barra de direcciones muestra siempre solo el dominio (www.etherdreams.cl).
// Se carga en el <head> de cada página, antes de que se pinte.
// - En /information, /ourteams, etc. se reemplaza la URL visible por "/" y se guarda
//   la página real en history.state.
// - Al recargar o al volver con "atrás"/"adelante" el navegador pide "/", así que si
//   history.state indica otra página, se abre esa.
(function () {
  const path = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  const state = history.state;

  if (path === "/" && state && state.page && state.page !== "/") {
    location.replace(state.page + location.hash);
    return;
  }

  if (path !== "/") {
    history.replaceState({ page: path }, "", "/" + location.hash);
  } else if (location.search) {
    // llegamos con /?inicio (ver abajo): dejar la barra limpia
    history.replaceState(null, "", "/" + location.hash);
  }

  // Página real, para marcar el link activo del menú
  window.currentPage = path;

  // Links a la portada: como la barra ya muestra "/", ir a "/" sería ir a la misma
  // URL y el navegador reutilizaría la entrada del historial (con la página anterior).
  // Con "/?inicio" es una navegación nueva; la barra se limpia al cargar.
  // Links a otras páginas: href="/" data-page="/ourteams". Así, al pasar el mouse o al
  // copiar el link, se ve solo el dominio; al hacer clic se abre la página real.
  function openPage(event) {
    const link = event.target.closest("a[data-page]");
    if (!link || event.button > 1) return false;
    event.preventDefault();
    const newTab = link.target === "_blank" || event.button === 1 ||
      event.ctrlKey || event.metaKey || event.shiftKey;
    if (newTab) window.open(link.dataset.page, "_blank");
    else location.assign(link.dataset.page);
    return true;
  }
  document.addEventListener("auxclick", openPage);

  document.addEventListener("click", function (event) {
    if (openPage(event)) return;
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === "/" && !url.search) {
      event.preventDefault();
      location.assign("/?inicio" + url.hash);
    }
  });
})();
