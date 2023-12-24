import base64

import urllib.parse

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from starlette.config import Config
from sqlalchemy.engine import URL

config = Config(".env")

# DECODED_PASSWORD = base64.b64decode(config.get(
# "DB_PASS")).decode('utf-8').replace('\n', '')
DECODED_PASSWORD = config.get("DB_PASS")

DB_USER = config.get("DB_USER")

DB_PASSWORD = urllib.parse.quote_plus(DECODED_PASSWORD).replace("%", "%%")
DB_HOST = config.get("DB_HOST")
DB_PORT = config.get("DB_PORT")
DB_NAME = config.get("DB_NAME")

ALEMBIC_DATABASE_URL = f'postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

urlConnect = URL.create(
    drivername="postgresql+psycopg2",
    username=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
)

engine = create_engine(urlConnect)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
