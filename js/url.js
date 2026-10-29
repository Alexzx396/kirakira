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
  }

  // Página real, para marcar el link activo del menú
  window.currentPage = path;
})();
