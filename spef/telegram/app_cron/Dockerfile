FROM python:latest
WORKDIR /code
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY app_cron.py app_cron.py
CMD ["python", "-u", "app_cron.py"]
