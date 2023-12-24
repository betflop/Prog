from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model_view import ModelApiView
from app.models.model import QuestionModel


class QuestionApiView(ModelApiView):
    model = QuestionModel

    def get_list(self, db: Session = Depends(get_db)):
        return [
            {
                "id": item.id,
                "topic": item.topic,
                "question": item.question,
            }
            for item in db.query(self.model).all()
        ]

    def get_detail(self, item_id: int, db: Session = Depends(get_db)):
        item = db.query(self.model).filter(self.model.id == item_id).first()

        return {
            "id": item.id,
            "question": item.question,
            "created_at": item.created_at
        }


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
    "/{item_id}",
    question_api_view.get_detail,
    methods=["GET"]
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
