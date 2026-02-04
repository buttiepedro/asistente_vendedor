# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# --- PASO CLAVE PARA RAILWAY ---
# Declaramos la variable que Railway tiene en su panel
ARG VITE_API_URL
# La hacemos disponible para el proceso de 'npm run build'
ENV VITE_API_URL=$VITE_API_URL
# -------------------------------

COPY package*.json ./
RUN npm install

COPY . . 

# Verificamos que los archivos y la variable estén presentes
RUN echo "La URL de la API es: $VITE_API_URL"
RUN ls -la 

RUN npm run build

# Etapa 2: Servidor de Producción (Nginx)
FROM nginx:stable-alpine

# Copiamos tu configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos generados por Vite desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (el que configuramos en el panel de Railway)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]