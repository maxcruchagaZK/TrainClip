# TrainClip

Landing page de TrainClip en español (`index.html`) e inglés (`en/index.html`).
Es un sitio estático: no necesita servidor, base de datos ni instalación.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta a la raíz.
2. Entra a **Settings > Pages**.
3. En **Source** elige **Deploy from a branch**, luego `main` y `/ (root)`. Guarda.
4. En unos minutos la página queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Mientras no tengas el dominio, la página funciona igual en esa dirección.

## Conectar el dominio

Cuando compres `trainclip.com`:

1. En **Settings > Pages > Custom domain**, escribe `trainclip.com` y guarda.
2. En tu proveedor de dominio, crea los registros DNS que indica la
   [guía de GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. Activa **Enforce HTTPS** cuando esté disponible.

Las etiquetas para Google (`canonical`, `hreflang`, `sitemap.xml`, `robots.txt`) y la imagen
para compartir en redes ya apuntan a `https://trainclip.com`. No promociones la dirección de
github.io ni hagas campañas antes de conectar el dominio. Si eliges otro dominio, reemplaza
`trainclip.com` en esos archivos y en ambas páginas.

## Conectar el formulario

El formulario necesita un servicio externo porque GitHub Pages no guarda datos.
Mientras no lo conectes, al enviarlo se abre el programa de correo de la persona con el mensaje listo.

1. Crea una cuenta en un servicio de formularios, como Formspree, usando `info@trainclip.com`.
2. Crea un formulario y copia su dirección de envío.
3. En `index.html` y `en/index.html`, busca `data-endpoint=""` y pega ahí esa dirección.

Haz una prueba real antes de publicar la página.

## Cambios frecuentes

- **Textos:** `index.html` (español) y `en/index.html` (inglés).
- **WhatsApp y correo:** busca `56948712212` e `info@trainclip.com` en ambas páginas.
- **Marcas:** están en `assets/marcas`. Publica solo logos con permiso.
- **Colores y estilos:** `assets/styles.css`.
- **Tipografía:** Inter, cargada desde Google Fonts.
