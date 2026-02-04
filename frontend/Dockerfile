# ... (Etapa de build igual a la anterior)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
# Añade esta línea para debuguear si los archivos están ahí
RUN ls -la 
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Railway necesita saber que el puerto es el 80
EXPOSE 80

CMD ["/bin/sh", "-c", "sed -i 's/listen 80;/listen '\"$PORT\"';/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]