from fastapi import FastAPI
from fastapi.responses import HTMLResponse
 
app = FastAPI()
 
@app.get("/")
def read_root():
    html_content = "<h2>Hello world!</h2>"
    return HTMLResponse(content=html_content)

print(app)
