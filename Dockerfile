# Etapa 1: Compilación de la aplicación
FROM node:18-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación (modo producción o desarrollo según necesidad)
RUN npm run build-dev

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:alpine

# Copiar los archivos de la carpeta dist generada en la primera etapa al directorio de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el archivo de configuración personalizado de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para NGINX
EXPOSE 80

# Comando para iniciar NGINX en modo no demonizado
CMD ["nginx", "-g", "daemon off;"]
