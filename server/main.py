from fastapi import FastAPI
from typing import List
from app.prediction_router import predictionRouter
app = FastAPI()

app.include_router(predictionRouter, prefix="/api")

@app.get("/")
def root_read():
    return {"message": "Success ☑️"}