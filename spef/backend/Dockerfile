
# Используйте официальный образ Python 3 как базовый
FROM python:3.9

# Установите рабочую директорию в контейнере
WORKDIR /usr/src/app

# Скопируйте requirements.txt в рабочую директорию
COPY requirements.txt ./

# Запустите приложение

EXPOSE 8080
# Установите все зависимости
RUN pip install -r requirements.txt

# Скопируйте исходный код приложения в рабочую директорию
COPY . .

RUN chmod +x launch.sh

CMD ["./launch.sh"]
# Запустите приложение
# CMD ["python", "main.py"]
