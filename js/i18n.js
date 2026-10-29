// Idioma del sitio (español / inglés).
// Se carga en el <head> para fijar el idioma antes de que se pinte la página.
// - Textos cortos: elementos con data-i18n="clave" (data-i18n-aria para aria-label,
//   data-i18n-alt para el texto alternativo de imágenes).
// - Textos largos (Privacidad, Términos): bloques con data-lang="es" / data-lang="en",
//   el CSS muestra solo el del idioma activo.
(function () {
  const TEXTS = {
    es: {
      "nav.home": "INICIO",
      "nav.about": "NOSOTROS",
      "nav.menu": "Abrir menú",

      "hero.buy": "COMPRAR",
      "hero.info": "MÁS INFO",
      "hero.trailer": "TRÁILER",
      "hero.available": "DISPONIBLE EN STEAM",

      "home.welcome": "BIENVENIDOS A",
      "home.intro": "Somos un estudio independiente de videojuegos de Chile, dedicado por completo al apasionante mundo del entretenimiento digital. Nuestro objetivo es crear experiencias de juego únicas, inspiradoras y entretenidas para jugadores de todas las edades.",
      "tagline": "Nuestros sueños están más allá de este planeta.",
      "home.ourTeam": "NUESTRO EQUIPO",
      "social.label": "REDES",
      "social.title": "SÍGUENOS",
      "social.text": "Síguenos en redes sociales para enterarte de todas las novedades.",
      "social.instagram": "Síguenos en Instagram",
      "social.x": "Síguenos en X",
      "projects.label": "PROYECTOS",
      "projects.text": "Descubre todos los detalles de nuestro primer juego, \"KIRAKIRA SLIMES\". Salva a Kirakira del mal en un tierno juego de puzles con slimes.",
      "projects.more": "VER MÁS",

      "game.title": "SOBRE EL JUEGO",
      "game.text": "Kirakira Slimes es un entretenido juego de puzles indie en el que debes combinar slimes de forma estratégica en un espacio cada vez más reducido. Fusiónalos desde el más pequeño hasta el Rey Slime para sumar muchos puntos y superar el récord.",
      "game.art": "ARTE",
      "carousel.prev": "Imagen anterior",
      "carousel.next": "Imagen siguiente",

      "team.weAre": "SOMOS",
      "team.intro": "Ether Dreams nació en 2024, fundado por un grupo de amigos después de una pésima experiencia en la industria de los videojuegos. Compartimos la pasión por los juegos indie y nos inspira la posibilidad de aportar algo positivo a la industria del entretenimiento digital y dejar nuestra huella en el desarrollo de videojuegos.",
      "team.hello": "TE PRESENTAMOS A NUESTRO",
      "role.alba": "DISEÑO UX Y GRÁFICO",
      "role.alex": "DESARROLLO WEB",
      "role.babu": "ILUSTRACIÓN Y CONCEPT ART",
      "role.gameplay": "PROGRAMACIÓN DE GAMEPLAY",
      "role.jim": "DIRECCIÓN, PROGRAMACIÓN Y ANIMACIÓN",
      "role.seba": "COMPOSICIÓN Y DISEÑO DE AUDIO",

      "footer.rights": "Todos los derechos reservados",
      "footer.privacy": "Privacidad",
      "footer.terms": "Términos y Condiciones",
      "footer.madeBy": "Sitio web creado por",

      "title.home": "Ether Dreams | Estudio indie de videojuegos de Chile",
      "title.game": "Kirakira Slimes | Ether Dreams",
      "title.team": "Nosotros | Ether Dreams",
      "title.privacy": "Política de privacidad | Ether Dreams",
      "title.terms": "Términos y condiciones | Ether Dreams",
      "title.notFound": "Página no encontrada | Ether Dreams",

      "notFound.title": "¡Ups! Este slime se perdió",
      "notFound.text": "La página que buscas no existe o cambió de lugar.",
      "notFound.home": "VOLVER AL INICIO",
      "notFound.game": "VER KIRAKIRA SLIMES",

      "alt.screenshot": "Captura de pantalla de Kirakira Slimes",
      "alt.card1": "Combina dos slimes del mismo tipo para crear uno más grande y aumentar tu puntaje. Pero ten cuidado: mientras más slimes haya en la caja, más posibilidades tienes de perder.",
      "alt.card2": "Al combinar slimes y sumar puntos llenas la barra de poder, que te da una habilidad extra. Tú decides cuándo y cómo usarla mejor.",
      "alt.card3": "Hay 11 tipos de slimes jugables: combínalos, fusiónalos y potencia tus slimes en este puzle indie, solo o con amigos en el modo versus local.",
      "alt.art1": "Arte de Kirakira Slimes 1",
      "alt.art2": "Arte de Kirakira Slimes 2",
      "alt.art3": "Arte de Kirakira Slimes 3"
    },
    en: {
      "nav.home": "HOME",
      "nav.about": "ABOUT US",
      "nav.menu": "Open menu",

      "hero.buy": "BUY NOW",
      "hero.info": "MORE INFO",
      "hero.trailer": "TRAILER",
      "hero.available": "AVAILABLE ON STEAM",

      "home.welcome": "WELCOME TO",
      "home.intro": "We are an indie videogame development company based in Chile and exclusively dedicated to the exciting world of digital entertainment. Our main goal is to create unique, inspiring and entertaining gaming experiences for gamers of all ages.",
      "tagline": "Our dreams are beyond this planet.",
      "home.ourTeam": "OUR TEAM",
      "social.label": "SOCIAL",
      "social.title": "FOLLOW US",
      "social.text": "Join us on our social media to keep up with the latest updates and news.",
      "social.instagram": "Follow us on Instagram",
      "social.x": "Follow us on X",
      "projects.label": "PROJECTS",
      "projects.text": "Check out all the details of our first game \"KIRAKIRA SLIMES\". Save Kirakira from evil in a cute slime and puzzle game.",
      "projects.more": "LEARN MORE",

      "game.title": "ABOUT THE GAME",
      "game.text": "Kirakira Slimes is a fun indie puzzle game in which you have to combine slimes strategically in an ever smaller space. Merge from the smallest to the Slime King, in order to get many points and top the highest score.",
      "game.art": "ART",
      "carousel.prev": "Previous image",
      "carousel.next": "Next image",

      "team.weAre": "WE ARE",
      "team.intro": "Ether dreams was founded in 2024 by a group of friends after a horrible experience in the game industry. We all have a shared passion for indie video games and are inspired by the possibility of positively impacting the digital entertainment industry and making our mark in the world of video game development.",
      "team.hello": "SAY HELLO TO A",
      "role.alba": "UX & GRAPHIC DESIGNER",
      "role.alex": "WEB DEVELOPER",
      "role.babu": "ILLUSTRATOR & CONCEPT ARTIST",
      "role.gameplay": "GAMEPLAY PROGRAMMER",
      "role.jim": "DIRECTOR, PROGRAMMER & ANIMATOR",
      "role.seba": "COMPOSER & AUDIO DESIGNER",

      "footer.rights": "All Rights Reserved",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms and Conditions",
      "footer.madeBy": "Website made by",

      "title.home": "Ether Dreams | Indie game studio from Chile",
      "title.game": "Kirakira Slimes | Ether Dreams",
      "title.team": "About us | Ether Dreams",
      "title.privacy": "Privacy Policy | Ether Dreams",
      "title.terms": "Terms and Conditions | Ether Dreams",
      "title.notFound": "Page not found | Ether Dreams",

      "notFound.title": "Oops! This slime got lost",
      "notFound.text": "The page you're looking for doesn't exist or has moved.",
      "notFound.home": "BACK TO HOME",
      "notFound.game": "SEE KIRAKIRA SLIMES",

      "alt.screenshot": "Kirakira Slimes screenshot",
      "alt.card1": "Combine two slimes of the same type to create a bigger one and increase your score. But be careful, the more slimes you have inside the box, the more chances you have to lose.",
      "alt.card2": "By combining slimes and scoring points, you will fill the power up bar. This gives you an additional ability. You decide when and how to use it most effectively.",
      "alt.card3": "There are 11 types of playable slimes in total - combine, merge and power up your slimes in this indie puzzle, either playing alone or with friends in local versus mode!",
      "alt.art1": "Kirakira Slimes artwork 1",
      "alt.art2": "Kirakira Slimes artwork 2",
      "alt.art3": "Kirakira Slimes artwork 3"
    }
  };

  function initialLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") return saved;
    } catch (e) { /* almacenamiento bloqueado: seguimos con el navegador */ }
    return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
  }

  let lang = initialLang();
  document.documentElement.lang = lang;

  function apply(root) {
    const scope = root || document;
    const dict = TEXTS[lang];
    scope.querySelectorAll("[data-i18n]").forEach(el => {
      const text = dict[el.dataset.i18n];
      if (text !== undefined) el.textContent = text;
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach(el => {
      const text = dict[el.dataset.i18nAria];
      if (text !== undefined) el.setAttribute("aria-label", text);
    });
    scope.querySelectorAll("[data-i18n-alt]").forEach(el => {
      const text = dict[el.dataset.i18nAlt];
      if (text !== undefined) el.setAttribute("alt", text);
    });
    document.querySelectorAll("[data-set-lang]").forEach(btn => {
      const active = btn.dataset.setLang === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active);
    });
  }

  function setLang(newLang) {
    lang = newLang;
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) { /* sin almacenamiento: solo esta visita */ }
    apply();
  }

  window.I18n = { apply, setLang };

  // Volver a leer el idioma guardado (puede haber cambiado en otra página o pestaña)
  function sync() {
    const saved = initialLang();
    if (saved !== lang) {
      lang = saved;
      document.documentElement.lang = lang;
      apply();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.addEventListener("click", event => {
      const btn = event.target.closest("[data-set-lang]");
      if (btn) setLang(btn.dataset.setLang);
    });
  });

  // Al volver con "atrás"/"adelante" el navegador restaura la página tal como quedó
  window.addEventListener("pageshow", event => {
    if (event.persisted) sync();
  });
  // Privacidad y Términos se abren en otra pestaña: mantenerlas todas en el mismo idioma
  window.addEventListener("storage", event => {
    if (event.key === "lang") sync();
  });
})();
