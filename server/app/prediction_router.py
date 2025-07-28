from fastapi import APIRouter
from .prediction_controller import make_prediction, load_model_scaler, get_human_readable_chances
from .prediction_schema import Data
predictionRouter = APIRouter()

@predictionRouter.post("/make-prediction")
def predict(input: Data):
    print(input)
    print("Entered✅")
    try:
        scaler, model = load_model_scaler()
        print("Model loaded ✅")
    except FileNotFoundError:
        return FileNotFoundError("Missing files")
    prob = make_prediction(model, input, scaler)
    print("Got Probabiltity ✅")
    risk_level =  get_human_readable_chances(prob)
    return {"probability": prob, "risk_level": risk_level}