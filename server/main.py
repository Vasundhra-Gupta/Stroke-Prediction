from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.prediction_router import predictionRouter
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://stroke-prediction-ml.vercel.app"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

app.include_router(predictionRouter, prefix="/api")

@app.get("/")
def root_read():
    return {"message": "Success ☑️"}