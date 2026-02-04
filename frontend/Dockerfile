# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Aprovechamos el caché de capas de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto de los archivos y generamos el build
COPY . .
RUN npm run build

# Etapa 2: Servidor estable con Nginx
FROM nginx:stable-alpine
# Vite genera la salida en /app/dist por defecto
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 para el tráfico web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]