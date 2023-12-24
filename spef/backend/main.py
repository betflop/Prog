from fastapi import FastAPI

import uvicorn
from app.api import (
    question_items_router,
    question_tags
)

app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    title="Spef",
    version="1.0.0.1",
    description="Spef API",
    openapi_tags=[
        *question_tags
    ],
)


app.include_router(question_items_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
