# Etapa 1: Usar la imagen base de NGINX
FROM nginx:alpine

# Copiar los archivos de la carpeta dist al directorio de NGINX
COPY dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
