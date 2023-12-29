sudo apt-get install libpq-dev python3-dev
sudo apt install python3.10-venv
pip install psycopg2
pip install psycopg2-binary

python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

docker run --name spef_db -e POSTGRES_DB=spef -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5430:5432 -d postgres

alembic upgrade head

sudo docker build -t pawwlyk52/spef_front .
sudo docker run --name spef_front -d --network=host pawwlyk52/spef_front
sudo docker build -t pawwlyk52/spef_back .
sudo docker run -e SCRIPT_NAME=main.py --network=host --name spef_back pawwlyk52/spef_back
sudo docker run -e SCRIPT_NAME=tg.py --network=host --name spef_tg pawwlyk52/spef_back
