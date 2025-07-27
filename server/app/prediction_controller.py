import pandas as pd
from joblib import load

def get_human_readable_chances(probability: float) -> str:
  match probability:
      case prob if prob==1:
          return "You have Stroke. Danger 💀⚡"
      case prob if prob >= 0.9:
          return "Extremely High Risk"
      case prob if prob >= 0.75:
          return "Very High Risk"
      case prob if prob >= 0.6:
          return "High Risk"
      case prob if prob >= 0.45:
          return "Moderate Risk"
      case prob if prob >= 0.3:
          return "Slight Risk"
      case prob if prob >= 0.15:
          return "Low Risk"
      case prob if prob < 0.15 & prob>0:
          return "Very Low Risk"
      case prob if prob==0:
          return "No Stroke"
      case _:
        return "Some Errror"
  
def make_prediction(model, input, scaler):
  input_dict = input.dict()
  input_df = pd.DataFrame([input_dict])
  if scaler:
    numeric_cols = ["avg_glucose_level", "bmi", "age"]
    input_df[numeric_cols] = scaler.transform(input_df[numeric_cols])
  if hasattr(model, "predict_proba"):
    prob = model.predict_proba(input_df)[0][1]
    print(f"Printed Probability of stroke is {prob:.2f}")
    return prob
  else:
    pred = model.predict(input_df)[0]
    print(f"Printed Prediction is {[pred]}")
    return pred
  
def load_model_scaler():
  try:
    scaler = load("stroke-prediction-scaler.joblib")
    model = load("stroke-prediction-model.joblib")
    print("MODEL LOADED!!💡💡💡💡")
    return scaler, model
  except FileNotFoundError:
    raise FileNotFoundError("Model or Scaler Files are missing.")