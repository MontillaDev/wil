/* ============================================================
    SORPRESA DE CUMPLEAÑOS — script.js
    ------------------------------------------------------------
    👇👇👇  EDITA SOLO LA SECCIÓN DE CONFIGURACIÓN  👇👇👇
    Cambia aquí los textos, la fecha, las fotos y la música.
    El resto del código no necesita modificarse.
   ============================================================ */

const CONFIG = {
  // ---------- Nombres ----------
  nombreNovia: "mi amor",            // Apodo o nombre de tu novia
  nombreTu: "Tu novio",              // Tu nombre (aparece en la firma)

  // ---------- Textos ----------
  bienvenida: "Tengo una sorpresa para ti, mi amor ❤️",

  portadaSubtitulo:
    "Feliz cumpleaños, mi amor, mi presente y mi futuro",

  // Texto de la carta. Puedes usar *palabras* para resaltarlas con tipografía elegante.
  carta:
    "Hola, *mi amor*:\n\n" +
    "Hoy celebro no solo tu cumpleaños, sino la suerte infinita de tenerte en mi vida. " +
    "Eres mi lugar favorito, mi calma y mi alegría más grande.\n\n" +
    "Gracias por cada risa, cada abrazo y cada instante que hace que todo valga la pena. " +
    "Prometo seguir regalándote motivos para sonreír, hoy y siempre.\n\n" +
    "Que este nuevo año te traiga todo lo bonito que mereces. " +
    "Contigo, *todo* es más bonito.",

  mensajeFinal:
    "",

  cierreFinal: "Te amo. Feliz cumpleaños, mi vida ❤️",

  // ---------- Fecha del cumpleaños ----------
  // Formato: "MM-DD" (mes y día). Ejemplo: "10-12" → 12 de octubre.
  // Si quieres un año concreto para el contador, usa "YYYY-MM-DD".
  fechaCumpleanos: "10-12",

  // ---------- Fotografías ----------
  // Coloca tus imágenes en assets/images/ y pon aquí sus rutas (relativas).
  // Si una imagen no existe, se muestra un marco con instrucciones.
  // Deja la ruta vacía ("") para mostrar solo el placeholder.
  fotos: [
    { src: "assets/images/foto1.jpeg", pie: "Nuestro comienzo" },
    { src: "assets/images/foto2.jpeg", pie: "Un día inolvidable" },
    { src: "assets/images/foto3.jpeg", pie: "Siempre juntos" },
    { src: "assets/images/foto4.jpeg", pie: "Un momento especial" },
    { src: "assets/images/foto5.jpeg", pie: "Para siempre" },
  ],

  // ---------- Música ----------
  // Coloca tu canción en assets/music/cancion.mp3
  // (o cambia la ruta aquí y en index.html).
  musica: "assets/music/cancion.mp3",

  // ---------- Comportamiento ----------
  velocidadEscrituraCarta: 28,   // ms por carácter (más bajo = más rápido)
  numeroCorazonesFondo: 14,      // corazones flotantes de fondo (0 para desactivar)
};

/* ============================================================
   A PARTIR DE AQUÍ NO NECESITAS CAMBIAR NADA
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  // ---------- Preferencia del sistema: reducir movimiento ----------
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ============================================================
  // 1. APLICAR CONFIGURACIÓN AL DOM
  // ============================================================
  function aplicarConfig() {
    document.title = `Feliz cumpleaños, ${CONFIG.nombreNovia}`;

    const saludo = $("#bienvenida-saludo");
    if (saludo) saludo.textContent = CONFIG.bienvenida;

    const nombreTitulo = $("#nombre-titulo");
    if (nombreTitulo) nombreTitulo.textContent = CONFIG.nombreNovia;

    const subtitulo = $("#portada-subtitulo");
    if (subtitulo) subtitulo.textContent = CONFIG.portadaSubtitulo;

    const firma = $("#carta-firma");
    if (firma) firma.textContent = `Con amor, ${CONFIG.nombreTu}`;

    const tarjetaMsg = $("#tarjeta-mensaje");
    if (tarjetaMsg) tarjetaMsg.textContent = CONFIG.mensajeFinal;

    const cierre = $("#tarjeta-cierre");
    if (cierre) cierre.textContent = CONFIG.cierreFinal;

    const pie = $("#pie-texto");
    if (pie) pie.textContent = `Hecho con amor para ${CONFIG.nombreNovia} ❤️`;

    const fechaEl = $("#portada-fecha");
    if (fechaEl) fechaEl.textContent = formatearFechaLarga(CONFIG.fechaCumpleanos);
  }

  function formatearFechaLarga(fecha) {
    try {
      const partes = parseFecha(fecha);
      const opciones = { day: "numeric", month: "long" };
      let texto = new Date(2000, partes.mes - 1, partes.dia)
        .toLocaleDateString("es-ES", opciones);
      if (partes.anio) {
        texto += ` de ${partes.anio}`;
      }
      return `Hoy celebramos · ${texto}`;
    } catch (_) {
      return "Hoy es un día muy especial";
    }
  }

  function parseFecha(fecha) {
    const limpio = String(fecha || "").trim();
    const anioActual = new Date().getFullYear();
    if (/^\d{4}-\d{2}-\d{2}$/.test(limpio)) {
      const [a, m, d] = limpio.split("-").map(Number);
      return { anio: a, mes: m, dia: d };
    }
    if (/^\d{2}-\d{2}$/.test(limpio)) {
      const [m, d] = limpio.split("-").map(Number);
      return { anio: anioActual, mes: m, dia: d };
    }
    throw new Error("Formato de fecha no válido");
  }

  function proximoCumpleanos(fecha) {
    const { mes, dia } = parseFecha(fecha);
    const ahora = new Date();
    let objetivo = new Date(ahora.getFullYear(), mes - 1, dia, 0, 0, 0);
    // Si ya pasó este año, apunta al siguiente (para la cuenta atrás)
    if (objetivo.getTime() < ahora.getTime() - 24 * 60 * 60 * 1000) {
      objetivo = new Date(ahora.getFullYear() + 1, mes - 1, dia, 0, 0, 0);
    }
    return objetivo;
  }

  // ============================================================
  // 2. PANTALLA DE BIENVENIDA + SOBRE
  // ============================================================
  function initBienvenida() {
    const btnAbrir = $("#btn-abrir");
    const sobre = $("#sobre");
    const bienvenida = $("#bienvenida");
    const principal = $("#principal");

    if (!btnAbrir || !bienvenida || !principal) return;

    function abrirSorpresa() {
      if (sobre) sobre.classList.add("abierto");

      setTimeout(() => {
        bienvenida.classList.add("abierta");
        principal.classList.remove("oculto");
        // Retira la bienvenida del flujo tras la transición
        setTimeout(() => {
          bienvenida.setAttribute("aria-hidden", "true");
          bienvenida.style.display = "none";
        }, 1100);
        // Inicia la carta cuando la portada ya se ve
        setTimeout(initCartaVisible, 800);
      }, menosMovimiento ? 100 : 950);
    }

    btnAbrir.addEventListener("click", abrirSorpresa);
    if (sobre) sobre.addEventListener("click", abrirSorpresa);
  }

  // ============================================================
  // 3. CONTADOR DE CELEBRACIÓN
  // ============================================================
  function initContador() {
    const elDias = $("#contador-dias");
    const elHoras = $("#contador-horas");
    const elMin = $("#contador-minutos");
    const elSeg = $("#contador-segundos");
    const leyenda = $("#contador-leyenda");
    if (!elDias) return;

    let objetivo;
    try {
      objetivo = proximoCumpleanos(CONFIG.fechaCumpleanos);
    } catch (_) {
      if (leyenda) leyenda.textContent = "para celebrar juntos";
      return;
    }

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function actualizar() {
      const ahora = new Date();
      let diff = objetivo.getTime() - ahora.getTime();

      if (diff <= 0) {
        // ¡Es (o acaba de ser) su cumpleaños!
        elDias.textContent = "00";
        elHoras.textContent = "00";
        elMin.textContent = "00";
        elSeg.textContent = "00";
        if (leyenda) leyenda.textContent = "¡Hoy es tu día! 🎉";
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= dias * 1000 * 60 * 60 * 24;
      const horas = Math.floor(diff / (1000 * 60 * 60));
      diff -= horas * 1000 * 60 * 60;
      const minutos = Math.floor(diff / (1000 * 60));
      diff -= minutos * 1000 * 60;
      const segundos = Math.floor(diff / 1000);

      elDias.textContent = pad(dias);
      elHoras.textContent = pad(horas);
      elMin.textContent = pad(minutos);
      elSeg.textContent = pad(segundos);

      if (leyenda) {
        leyenda.textContent =
          dias === 0
            ? "para darte la felicidad de tu cumpleaños"
            : "para celebrar juntos";
      }
    }

    actualizar();
    const intervalo = setInterval(actualizar, 1000);
  }

  // ============================================================
  // 4. POLAROIDS (historia)
  // ============================================================
  function initPolaroids() {
    const contenedor = $("#polaroids");
    if (!contenedor) return;

    const rotaciones = ["-4deg", "3deg", "-2deg", "5deg", "-3deg", "2deg"];

    CONFIG.fotos.forEach((foto, i) => {
      const figura = document.createElement("figure");
      figura.className = "polaroid";
      figura.style.setProperty("--rot", rotaciones[i % rotaciones.length]);

      const marco = document.createElement("div");
      marco.className = "polaroid-marco";

      const hayFoto = foto && typeof foto.src === "string" && foto.src.trim() !== "";

      if (hayFoto) {
        const img = document.createElement("img");
        img.src = foto.src;
        img.alt = foto.pie ? `Recuerdo: ${foto.pie}` : `Fotografía ${i + 1} de nuestra historia`;
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("error", () => {
          // Si la imagen no existe, muestra el placeholder con instrucciones
          marco.innerHTML = placeholderHTML(i);
        });
        marco.appendChild(img);
      } else {
        marco.innerHTML = placeholderHTML(i);
      }

      const pie = document.createElement("figcaption");
      pie.className = "polaroid-pie";
      pie.textContent = foto && foto.pie ? foto.pie : `Momento ${i + 1}`;

      figura.appendChild(marco);
      figura.appendChild(pie);
      contenedor.appendChild(figura);
    });
  }

  function placeholderHTML(i) {
    return (
      '<div class="polaroid-placeholder">' +
      '<span class="icono" aria-hidden="true">📷</span>' +
      `<strong>Foto ${i + 1}</strong><br>` +
      "Coloca tu imagen en<br><code>assets/images/</code><br>" +
      "y edita <code>CONFIG.fotos</code><br>en <code>script.js</code>" +
      "</div>"
    );
  }

  // ============================================================
  // 5. CARTA CON ESCRITURA PROGRESIVA
  // ============================================================
  let cartaIniciada = false;

  function initCartaVisible() {
    if (cartaIniciada) return;
    const zonaCarta = $("#carta");
    if (!zonaCarta) return;

    if (typeof IntersectionObserver === "undefined") {
      escribirCarta();
      return;
    }

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            escribirCarta();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(zonaCarta);
  }

  function escribirCarta() {
    if (cartaIniciada) return;
    cartaIniciada = true;

    const elCarta = $("#carta-texto");
    const firma = $("#carta-firma");
    if (!elCarta) return;

    const texto = CONFIG.carta || "";

    if (menosMovimiento) {
      // Sin animación: muestra el texto completo de inmediato
      elCarta.innerHTML = resaltarPalabras(texto);
      if (firma) firma.classList.add("visible");
      return;
    }

    elCarta.innerHTML = '<span class="cursor-escritura" aria-hidden="true"></span>';
    const cursor = elCarta.querySelector(".cursor-escritura");

    let i = 0;
    const velocidad = Math.max(8, CONFIG.velocidadEscrituraCarta || 28);

    function paso() {
      if (i >= texto.length) {
        if (cursor) cursor.remove();
        if (firma) firma.classList.add("visible");
        return;
      }

      // Inserta carácter a carácter, pero agrupa las marcas *destacadas*
      const resto = texto.slice(i);
      const matchDestacada = resto.match(/^\*([^*]+)\*/);

      if (matchDestacada) {
        const span = document.createElement("span");
        span.className = "palabra-destacada";
        span.textContent = matchDestacada[1];
        elCarta.insertBefore(span, cursor);
        i += matchDestacada[0].length;
        setTimeout(paso, velocidad * 3);
        return;
      }

      const sig = texto[i];
      // Inserta el carácter como nodo de texto para respetar saltos de línea
      elCarta.insertBefore(document.createTextNode(sig), cursor);
      i += 1;

      // Pausa más larga tras puntos y saltos de línea (efecto natural)
      const pausa =
        sig === "\n" ? velocidad * 8 :
        sig === "." || sig === "!" || sig === "?" ? velocidad * 6 :
        velocidad;

      setTimeout(paso, pausa);
    }

    paso();
  }

  function resaltarPalabras(texto) {
    const escapado = texto
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return escapado.replace(/\*([^*]+)\*/g, '<span class="palabra-destacada">$1</span>');
  }

  // ============================================================
  // 6. SORPRESA FINAL + LLUVIA DE CORAZONES
  // ============================================================
  function initSorpresa() {
    const btn = $("#btn-sorpresa");
    const tarjeta = $("#tarjeta-final");
    if (!btn || !tarjeta) return;

    btn.addEventListener("click", () => {
      tarjeta.classList.remove("oculto");
      btn.setAttribute("aria-expanded", "true");
      btn.disabled = true;
      btn.textContent = "¡Para ti, con todo mi amor! ❤️";

      if (!menosMovimiento) {
        lanzarLluviaCorazones();
      }

      // Lleva la tarjeta a la vista
      setTimeout(() => {
        tarjeta.scrollIntoView({ behavior: menosMovimiento ? "auto" : "smooth", block: "center" });
      }, 150);
    });
  }

  function lanzarLluviaCorazones() {
    const cont = $("#lluvia-corazones");
    if (!cont) return;

    const corazones = ["♥", "❤", "♡", "🌹", "✨"];
    const colores = ["#d4748c", "#7b2d42", "#e8a8b8", "#c45c72", "#f6d7de"];
    const total = 40;

    for (let i = 0; i < total; i++) {
      const s = document.createElement("span");
      s.className = "corazon-lluvia";
      s.textContent = corazones[Math.floor(Math.random() * corazones.length)];
      s.style.left = Math.random() * 100 + "%";
      s.style.color = colores[Math.floor(Math.random() * colores.length)];
      s.style.fontSize = 0.8 + Math.random() * 1.4 + "rem";
      s.style.animationDuration = 2.6 + Math.random() * 2.4 + "s";
      s.style.animationDelay = Math.random() * 0.9 + "s";
      cont.appendChild(s);

      // Limpieza automática para no acumular nodos
      setTimeout(() => s.remove(), 6500);
    }
  }

  // ============================================================
  // 7. CORAZONES DE FONDO Y ESTRELLAS
  // ============================================================
  function initDecoraciones() {
    if (menosMovimiento) return;

    const fondo = $("#corazones-fondo");
    if (fondo) {
      const simbolos = ["♥", "♡", "❤"];
      for (let i = 0; i < CONFIG.numeroCorazonesFondo; i++) {
        const c = document.createElement("span");
        c.className = "corazon-flotante";
        c.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
        c.style.left = Math.random() * 100 + "%";
        c.style.fontSize = 0.7 + Math.random() * 1.1 + "rem";
        c.style.animationDuration = 12 + Math.random() * 14 + "s";
        c.style.animationDelay = Math.random() * 14 + "s";
        c.style.color = `rgba(212, 116, 140, ${0.18 + Math.random() * 0.25})`;
        fondo.appendChild(c);
      }
    }

    const estrellas = $("#estrellas");
    if (estrellas) {
      for (let i = 0; i < 18; i++) {
        const e = document.createElement("span");
        e.className = "estrella";
        e.textContent = Math.random() > 0.5 ? "✦" : "✧";
        e.style.left = Math.random() * 100 + "%";
        e.style.top = Math.random() * 100 + "%";
        e.style.animationDuration = 2.5 + Math.random() * 3.5 + "s";
        e.style.animationDelay = Math.random() * 4 + "s";
        e.style.fontSize = 0.6 + Math.random() * 0.8 + "rem";
        estrellas.appendChild(e);
      }
    }
  }

  // ============================================================
  // 8. MÚSICA (sin autoplay; si falta el archivo, todo sigue bien)
  // ============================================================
  function initMusica() {
    const btn = $("#btn-musica");
    const audio = $("#audio-musica");
    const texto = $("#texto-musica");
    if (!btn || !audio) return;

    // Aplica la ruta de la configuración
    if (CONFIG.musica) {
      const source = audio.querySelector("source");
      if (source) source.src = CONFIG.musica;
      audio.load();
    }

    let disponible = true;

    audio.addEventListener("error", () => {
      disponible = false;
      btn.disabled = true;
      btn.title = "Añade tu canción en assets/music/cancion.mp3";
      if (texto) texto.textContent = "Sin música";
    });

    // Algunos navegadores no emiten "error" en <source>; comprueba readyState
    audio.addEventListener("loadedmetadata", () => {
      disponible = true;
    });

    btn.addEventListener("click", async () => {
      if (!disponible) return;
      try {
        if (audio.paused) {
          await audio.play();
          btn.classList.add("sonando");
          btn.setAttribute("aria-pressed", "true");
          if (texto) texto.textContent = "Pausar";
        } else {
          audio.pause();
          btn.classList.remove("sonando");
          btn.setAttribute("aria-pressed", "false");
          if (texto) texto.textContent = "Música";
        }
      } catch (_) {
        // Reproducción bloqueada o archivo no válido: no rompe la página
        disponible = false;
        btn.disabled = true;
        if (texto) texto.textContent = "Sin música";
      }
    });
  }

  // ============================================================
  // 9. DESPLAZAMIENTO SUAVE PARA ENLACES INTERNOS
  // ============================================================
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const enlace = e.target.closest('a[href^="#"]');
      if (!enlace) return;
      const id = enlace.getAttribute("href");
      if (!id || id === "#") return;
      const destino = document.querySelector(id);
      if (!destino) return;
      e.preventDefault();
      destino.scrollIntoView({
        behavior: menosMovimiento ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================
  function init() {
    aplicarConfig();
    initBienvenida();
    initContador();
    initPolaroids();
    initSorpresa();
    initDecoraciones();
    initMusica();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
