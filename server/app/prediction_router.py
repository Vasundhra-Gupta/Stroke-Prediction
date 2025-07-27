import pandas as pd
from fastapi import APIRouter
from .prediction_controller import make_prediction, load_model_scaler, get_human_readable_chances
from .prediction_schema import Data
predictionRouter = APIRouter()

@predictionRouter.post("/make-prediction")
def predict(input: Data):
    try:
        scaler, model = load_model_scaler()
    except FileNotFoundError:
        return FileNotFoundError("Missing files")
    prob = make_prediction(model, input, scaler)
    result = f"{prob*100:.2f}%"
    risk_level =  get_human_readable_chances(prob)
    return {"probability": result, "risk_level": risk_level}