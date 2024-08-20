# Используем официальный образ Nginx
FROM nginx:alpine

# Удаляем конфигурацию по умолчанию
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Копируем содержимое директории в директорию сервера Nginx
COPY . /usr/share/nginx/html

# Открываем порт 80 для доступа к Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
