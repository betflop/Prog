
from datetime import date

from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text, UniqueConstraint

Base = declarative_base()


class QuestionModel(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    created_at = Column(Date, default=date.today())
    text = Column(String)
    question = Column(String, nullable=False)
    answer = Column(String)
    img = Column(Text)
    tag1 = Column(String, nullable=False)
    tag2 = Column(String)
    tag3 = Column(String)


class PracticesModel(Base):
    __tablename__ = "practices"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    user_id = Column(Integer)
    level = Column(Integer)
    practice_date = Column(Date, default=date.today())
    repeat_date = Column(Date)
    __table_args__ = (UniqueConstraint(
        'question_id', 'user_id', name='_question_user_uc'),)


class HistoryModel(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    question_id = Column(Integer, ForeignKey("questions.id"))
    date = Column(Date, default=date.today())
