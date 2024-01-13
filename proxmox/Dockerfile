
# Используйте официальный образ Python 3 как базовый
FROM python:3.9

# Установите рабочую директорию в контейнере
WORKDIR /usr/src/app

# Скопируйте requirements.txt в рабочую директорию
# COPY requirements.txt ./

COPY . .

# Установите все зависимости
RUN pip install -r requirements.txt

# Запустите приложение
CMD [ "python", "./main.py" ]
