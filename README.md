# Activos en venta

Catálogo público con landing y cinco fichas estáticas, imágenes reales, carruseles, enlaces de detalles y contacto por WhatsApp. Sin backend, usuarios, panel de administración ni base de datos.

Origen público configurado: **http://217.216.86.58:8085/**. El sitio se sirve en la raíz de ese origen. La conexión actual es HTTP; cuando se habilite HTTPS o un dominio, cambie el origen y reconstruya para actualizar canonical, Open Graph, imágenes absolutas y sitemap.

## Estructura

- `html/`: sitio compilado y medios públicos que se entregan a Nginx.
- `Dockerfile`: imagen Nginx que copia exclusivamente `html/`, con rutas estáticas, 404 real y `/healthz`.
- `docker-compose.yml`: servicio `web`, contenedor `activos_en_venta`, puerto **8085:80**, conservados del stack existente.
- `src/`: fuentes editables de Astro, datos de ofertas, componentes y JavaScript del sitio.
- `public/media/`: únicamente fotografías revisadas y video sin audio.
- `scripts/export-static.mjs`: exportación del resultado de Astro a `html/`.

Los documentos originales, cálculos, informes de mercado, notas privadas y perfiles de WhatsApp no forman parte del repositorio ni de la imagen.

## Construir y actualizar contenido

Node.js y pnpm son herramientas de desarrollo; el contenedor de producción solo usa Nginx. Las dependencias están fijadas en `package.json` y `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build:public
```

Edite `src/data/products.ts` y los medios públicos aprobados para modificar, añadir o retirar activos. Reconstruya y exporte antes de desplegar. El precio numérico alimenta tarjetas, fichas y consultas. El vídeo público del camión no contiene pista de audio.

El origen predeterminado está en `astro.config.mjs`; puede sobreescribirse durante la compilación:

```sh
PUBLIC_SITE_ORIGIN="http://217.216.86.58:8085" pnpm build:public
```

En PowerShell, establezca `$env:PUBLIC_SITE_ORIGIN` antes del comando. El origen es una configuración de compilación: no añadirlo al arranque de Nginx esperando que cambie el HTML ya generado.

## Desplegar en Docker Standalone / Portainer

Subir código a GitHub no reconstruye por sí solo el contenedor que ya esté ejecutándose. Desde una copia actualizada del repositorio en el servidor:

```sh
docker compose up -d --build
```

En Portainer, actualice el stack desde `main` y reconstruya la imagen. La vinculación `build` se añadió porque la configuración anterior lanzaba la imagen genérica de Nginx sin copiar la web. El puerto 8085 y el nombre del contenedor se mantienen. No se agregan bases de datos, redes externas o proxies supuestos.

**Swarm no construye imágenes desde `build` de Compose:** si se utiliza Swarm, construya la imagen y distribúyala en un registro accesible a los nodos antes de actualizar el stack. Si el flujo de Portainer no admite construir el contexto Git, use el comando anterior en el host o un proceso de construcción acordado; no sustituya la copia de la web por la imagen genérica de Nginx.

Compruebe después del despliegue la portada, las cinco fichas, `robots.txt`, `sitemap.xml`, `/healthz`, reproducción del vídeo y una ruta inexistente que responda 404. Una página «Welcome to nginx!» significa que aún se está sirviendo la imagen genérica, no este sitio.

## Uso y contacto

Contacto único: **+58 412-7856703**. La foto de portada o tarjeta abre su ficha; flechas, puntos y deslizamientos recorren imágenes sin abrirla por accidente. En las propias fichas las fotos no se enlazan a sí mismas. Los enlaces de fotos funcionan también sin JavaScript.

Los mensajes de consulta se preparan con el activo u opción seleccionados, pero el visitante revisa y envía. La web no lee chats ni publica anuncios automáticamente. Compartir y copiar enlaces tienen alternativas compatibles con HTTP; algunas funciones nativas del navegador requieren HTTPS.

Las publicaciones recurrentes en WhatsApp se preparan aparte y no pertenecen al contenedor de este sitio. Nunca almacenar sesiones, cookies, credenciales o registros de grupos dentro del repositorio público.
