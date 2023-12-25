from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from log import logger
from app.db.database import get_db


class ModelApiView:
    model = None

    def get_list(self, db: Session = Depends(get_db)):
        return db.query(self.model).all()

    def create(self, data: dict, db: Session = Depends(get_db)):
        item = self.model(**data)
        db.add(item)
        db.commit()

        return {"id": item.id}

    def update(self, item_id, data: dict, db: Session = Depends(get_db)):
        item = db.query(self.model).filter(self.model.id == item_id).first()

        if not item:
            raise HTTPException(status_code=404, detail={
                                "message": "Item not found"})

        for key, value in data.items():
            setattr(item, key, value)

        db.commit()
        return {"message": "success"}

    def remove(self, item_id: int, db: Session = Depends(get_db)):
        query = db.query(self.model).filter(self.model.id == item_id)
        query.delete()
        db.commit()

        return {"message": "success"}
