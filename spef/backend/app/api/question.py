from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.db.database import get_db
from app.api.model_view import ModelApiView
from app.db.model import QuestionModel, PracticesModel


class QuestionApiView(ModelApiView):
    model = QuestionModel

    def get_list(self, db: Session = Depends(get_db)):
        questions = []
        yesterday = datetime.now() - timedelta(days=1)
        repeat_date = func.coalesce(PracticesModel.repeat_date, yesterday)
        result = db.query(self.model.id, self.model.tag1, self.model.question, self.model.answer, self.model.text, self.model.img, repeat_date.label('repeat_date'))\
            .join(PracticesModel, PracticesModel.question_id == QuestionModel.id, isouter=True)\
            .all()

        for item in result:
            print(item)
            questions.append({
                "id": item.id,
                "tag1": item.tag1,
                "question": item.question,
                "answer": item.answer,
                "text": item.text,
                "img": item.img,
                "repeat_date": item.repeat_date
            })

        return questions

    def get_tags(self, db: Session = Depends(get_db)):
        tags = []
        for item in db.query(self.model).all():
            tags.append(item.tag1)
            tags.append(item.tag2)
            tags.append(item.tag3)

        freq = {}
        for x in filter(None, tags):
            freq[x] = freq.get(x, 0) + 1

        yesterday = datetime.now() - timedelta(days=1)
        repeat_date = func.coalesce(PracticesModel.repeat_date, yesterday)

        freq["ready"] = db.query(self.model.id, repeat_date.label('repeat_date'))\
            .join(PracticesModel, PracticesModel.question_id == QuestionModel.id, isouter=True)\
            .filter(repeat_date <= datetime.now()).count()

        print(freq)
        # db.query(PracticesModel).filter(
        # PracticesModel.repeat_date <= datetime.now()).count()

        return freq

    def get_detail(self, item_id: int, db: Session = Depends(get_db)):
        item = db.query(self.model).filter(self.model.id == item_id).first()

        return {
            "id": item.id,
            "question": item.question,
            "created_at": item.created_at
        }

    def set_practice(self, item_id: int, data: dict, db: Session = Depends(get_db)):
        print(data)
        # Поиск записи
        record = db.query(PracticesModel).filter(PracticesModel.user_id ==
                                                 data["user_id"], PracticesModel.question_id == item_id).first()

        new_date = datetime.now() + timedelta(days=5)
        # Обновление записи или создание новой, если запись не найдена
        if record:
            record.repeat_date = new_date
        else:
            record = PracticesModel(
                question_id=item_id, user_id=data["user_id"], repeat_date=new_date)
            db.add(record)

        # Сохранение изменений
        db.commit()
        return {"message": "success", "newDate": new_date}

    def remove(self, item_id: int, db: Session = Depends(get_db)):
        print('delete')
        print(item_id)

        practices = db.query(PracticesModel).filter(
            PracticesModel.question_id == item_id).all()

        for practice in practices:
            db.delete(practice)

        db.commit()

        # Теперь вы можете безопасно удалить запись из таблицы questions
        db.query(self.model).filter(self.model.id == item_id).delete()
        db.commit()

        # query = db.query(self.model).filter(self.model.id == item_id)
        # query.delete()
        # db.commit()

        return {"message": "success"}


question_api_view = QuestionApiView()

question_items_router = APIRouter(
    prefix="/api/questions",
    tags=["questions"],
)


question_items_router.add_api_route(
    "",
    question_api_view.get_list,
    methods=["GET"]
)

question_items_router.add_api_route(
    "/tags",
    question_api_view.get_tags,
    methods=["GET"]
)

question_items_router.add_api_route(
    "/{item_id}",
    question_api_view.get_detail,
    methods=["GET"]
)


question_items_router.add_api_route(
    "/{item_id}/practice",
    question_api_view.set_practice,
    methods=["POST"]
)


question_items_router.add_api_route(
    "",
    question_api_view.create,
    methods=["POST"]
)

question_items_router.add_api_route(
    "/{item_id}",
    question_api_view.update,
    methods=["PATCH"]
)

question_items_router.add_api_route(
    "/{item_id}",
    question_api_view.remove,
    methods=["DELETE"]
)

question_tags = [
    {
        "name": "questions",
        "description": "List of questions",
    },
]
