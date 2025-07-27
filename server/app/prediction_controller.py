from pathlib import Path
from joblib import load
import os
import pandas as pd

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
    """Load model and scaler files with robust path handling"""
    try:
        current_dir = Path(__file__).parent
        model_dir = current_dir.parent / "model"  # Goes up one level to server/, then into model/
        
        # Construct full file paths
        scaler_path = model_dir / "stroke-prediction-scaler.joblib"
        model_path = model_dir / "stroke-prediction-model.joblib"
        
        # Verify files exist before loading
        if not scaler_path.exists():
            raise FileNotFoundError(f"Scaler file not found at: {scaler_path}")
        if not model_path.exists():
            raise FileNotFoundError(f"Model file not found at: {model_path}")
        
        # Load files
        scaler = load(scaler_path)
        model = load(model_path)
        
        print("✅ MODEL AND SCALER SUCCESSFULLY LOADED!")
        print(f"Model path: {model_path}")
        print(f"Scaler path: {scaler_path}")
        
        return scaler, model
        
    except Exception as e:
        print(f"❌ ERROR LOADING MODEL: {str(e)}")
        # Print debug information
        print("\nDEBUG INFO:")
        print(f"Current directory: {os.getcwd()}")
        print(f"Script location: {__file__}")
        print(f"Attempted model directory: {model_dir}")
        if 'model_dir' in locals():
            print(f"Files in model directory: {list(model_dir.glob('*'))}")
        raise