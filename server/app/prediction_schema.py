from pydantic import BaseModel, conint
from typing import Annotated

binaryInt = Annotated[int, conint(ge=0, le=1)]

class Data(BaseModel):
    age: int
    hypertension: binaryInt
    heart_disease: binaryInt
    avg_glucose_level: float
    bmi: float
    gender_Male: binaryInt
    ever_married_Yes: binaryInt
    Residence_type_Urban: binaryInt
    work_type_Govt_job: binaryInt
    work_type_Private: binaryInt
    work_type_Self_employed: binaryInt
    smoking_status_Unknown: binaryInt
    smoking_status_formerly_smoked: binaryInt
    smoking_status_never_smoked: binaryInt
    smoking_status_smokes: binaryInt
