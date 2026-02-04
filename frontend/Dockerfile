# ... (Etapa de build igual a la anterior)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de Producción
FROM nginx:stable-alpine
# Copiamos nuestro archivo de configuración personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copiamos el build de Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]