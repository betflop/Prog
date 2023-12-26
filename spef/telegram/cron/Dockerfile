# Dockerfile to create image with cron services
FROM ubuntu:latest
WORKDIR /code
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY app.py app.py

# Give execution rights on the cron scripts
# RUN chmod 0644 /root/get_date.sh

#Install Cron
RUN apt-get update
RUN apt-get -y install cron

# Add the cron job
RUN crontab -l | { cat; echo "1 * * * * python ~/app.py"; } | crontab -

# CMD ["python", "-u", "app.py"]
# Run the command on container startup
CMD cron
