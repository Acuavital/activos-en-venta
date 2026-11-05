FROM nginx:stable-alpine

# Astro is built and exported to html/ before building this image.
# Single-quoted lines preserve Nginx variables without shell expansion.
RUN printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    server_name _;' \
    '    root /usr/share/nginx/html;' \
    '    index index.html;' \
    '    autoindex off;' \
    '    server_tokens off;' \
    '' \
    '    add_header X-Content-Type-Options "nosniff" always;' \
    '    add_header Referrer-Policy "strict-origin" always;' \
    '    add_header Cache-Control "no-cache" always;' \
    '' \
    '    error_page 404 /404.html;' \
    '    location = /404.html {' \
    '        internal;' \
    '    }' \
    '' \
    '    location = /healthz {' \
    '        default_type text/plain;' \
    '        return 200 "ok\n";' \
    '    }' \
    '' \
    '    # Static media uses standard Nginx MIME types and byte-range support.' \
    '    location / {' \
    '        try_files $uri $uri/ =404;' \
    '    }' \
    '}' \
    > /etc/nginx/conf.d/default.conf \
    && rm -rf /usr/share/nginx/html/*

COPY html/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
