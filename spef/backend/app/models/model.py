
from datetime import date

from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey

Base = declarative_base()


class QuestionModel(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(Date, default=date.today())
    question = Column(String, nullable=False)
    topic = Column(String, nullable=False)


class PracticesModel(Base):
    __tablename__ = "practices"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    user_id = Column(Integer)
    level = Column(Integer)


class HistoryModel(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    last_request = Column(String)
    last_date = Column(Date)
