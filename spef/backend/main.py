
from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    topic: str
    description: str


@app.post("/api/cards")
async def get_cards(item: Item):
    print("topic", item.topic)
    return [{"id": 1, "question": "Core linux question", "answer": "answer1", "topic": "linux"},
            {"id": 2, "question": "Kubernetes",
                "answer": "Configmap", "topic": "devops"},
            {"id": 3, "question": "Username root",
                "answer": "answer3", "topic": "linux"},
            {"id": 4, "question": "Docker container", "answer": "answer4", "topic": "devops"}]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
