# Используйте официальный образ Node.js как базовый
FROM node:21

# Установите рабочую директорию в контейнере
WORKDIR /usr/src/app

# Скопируйте package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Установите все зависимости
RUN npm install

# Скопируйте исходный код приложения в рабочую директорию
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80


# Запустите приложение
CMD ["npm", "run", "dev", "--", "--host", "--port", "80"]
