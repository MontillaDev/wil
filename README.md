# 💌 Sorpresa de cumpleaños

Una página web romántica, interactiva y responsive hecha con **HTML5, CSS3 y JavaScript puro**.
Sin frameworks, sin backend, lista para publicar gratis en **GitHub Pages**.

---

## 📁 Estructura del proyecto

```
cumpleanos/
├── index.html          ← Estructura de la página
├── styles.css          ← Diseño y animaciones
├── script.js           ← Configuración editable + interactividad
├── README.md           ← Este archivo
└── assets/
    ├── images/         ← Tus fotografías
    └── music/          ← Tu canción
```

---

## ✏️ Personalización (5 minutos)

Abre `script.js` y edita **solo** la sección `CONFIG` al principio del archivo:

| Qué cambiar | Dónde | Ejemplo |
|---|---|---|
| Apodo de tu novia | `nombreNovia` | `"Valentina"` |
| Tu nombre | `nombreTu` | `"Andrés"` |
| Mensaje de bienvenida | `bienvenida` | `"Tengo algo para ti ❤️"` |
| Subtítulo de portada | `portadaSubtitulo` | texto libre |
| Carta completa | `carta` | usa `*palabra*` para resaltarla |
| Mensaje final | `mensajeFinal` | texto libre |
| Cierre | `cierreFinal` | `"Te amo. Feliz cumpleaños ❤️"` |
| Fecha del cumpleaños | `fechaCumpleanos` | `"10-12"` (12 de octubre) o `"2026-10-12"` |
| Fotos | `fotos` | rutas relativas a `assets/images/` |
| Canción | `musica` | `"assets/music/cancion.mp3"` |

> **Tip de la carta:** envuelve palabras con asteriscos para que se muestren con tipografía elegante.
> Ejemplo: `"Eres lo *mejor* de mi vida"` → “mejor” aparece destacada.

---

## 📸 Cómo agregar fotografías

1. Copia tus imágenes dentro de `assets/images/`.
2. Renómbralas, por ejemplo: `foto1.jpg`, `foto2.jpg`, `foto3.jpg`.
3. Edita `CONFIG.fotos` en `script.js`:

```js
fotos: [
  { src: "assets/images/foto1.jpg", pie: "Nuestro primer viaje" },
  { src: "assets/images/foto2.jpg", pie: "Ese día tan especial" },
  { src: "assets/images/foto3.jpg", pie: "Siempre juntos" },
],
```

**Consejos:**
- Usa imágenes optimizadas (máx. ~1200px de ancho, JPG o WebP, < 300 KB cada una).
- Si una foto no existe, la página muestra un marco con instrucciones (no se rompe nada).
- Puedes añadir o quitar fotos libremente.

---

## 🎵 Cómo agregar una canción

1. Coloca tu archivo de audio en `assets/music/` con el nombre **`cancion.mp3`**.
2. O cambia la ruta en `CONFIG.musica` si usas otro nombre/formato (mp3 recomendado).

> La música **nunca se reproduce sola**: ella decidirá con el botón ♪ de la esquina.
> Si no hay canción, la página funciona perfectamente igual.

---

## 🖥️ Cómo probar la página localmente

No necesitas servidor. Solo:

1. Haz doble clic en `index.html`.
2. Se abrirá en tu navegador y podrás ver todo.

Si prefieres un servidor local opcional:

```bash
# Con Python (viene en la mayoría de sistemas)
cd cumpleanos
python -m http.server 8000
# Abre http://localhost:8000
```

---

## 🚀 Cómo publicarla en GitHub Pages

1. Crea un repositorio nuevo en [github.com](https://github.com) (puede ser **privado** o público).
2. Sube todos los archivos de la carpeta `cumpleanos/` a la raíz del repositorio:

```bash
cd cumpleanos
git init
git add .
git commit -m "Sorpresa de cumpleaños"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

3. En GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → **Save**

4. En 1–2 minutos estará publicada en:

```
https://TU-USUARIO.github.io/TU-REPOSITORIO/
```

5. Comparte ese enlace con ella. 🎉

> **Importante:** usa rutas relativas (ya están así en el proyecto). Nunca pongas `/assets/...` con barra al principio.

---

## 💡 Detalles incluidos

- ✅ Diseño responsive (móvil, tablet y escritorio)
- ✅ Respeta `prefers-reduced-motion` (menos animaciones si el sistema lo pide)
- ✅ Etiquetas semánticas y textos alternativos
- ✅ Sin autoplay de audio
- ✅ Sin dependencias externas de pago (solo Google Fonts, con respaldo si falla)
- ✅ Sin errores en consola
- ✅ Funciona directamente desde disco (doble clic) y en GitHub Pages

---

## 🎨 Ideas para personalizar aún más

- Cambia la paleta de colores en `styles.css` → variables `:root`
- Añade más fotos en `CONFIG.fotos`
- Escribe una carta más larga o más corta en `CONFIG.carta`
- Cambia el contador a un aniversario usando una fecha futura concreta

---

Hecho con muchísimo amor. ¡Feliz cumpleaños para ella! ❤️
