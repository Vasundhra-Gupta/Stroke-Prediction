import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import FormInput from "../components/FormInput";
import LoadingSpinner from "../components/LoadingSpinner";
import PredictionResult from "../components/PredictionResult";
import { predictStrokeRisk } from "../services/api";
import { parseValueFromTransform } from "framer-motion";

const HomePage = () => {
  const [formData, setFormData] = useState({
    age: "",
    hypertension: "0",
    heart_disease: "0",
    avg_glucose_level: "",
    bmi: "",
    gender: "Female",
    ever_married: "No",
    residence_type: "Rural",
    work_type: "Private",
    smoking_status: "never smoked"
});

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
    const categoricalEncoding = {
      gender_Male: formData.gender === "Male" ? 1 : 0,
      ever_married_Yes: formData.ever_married === "Yes" ? 1 : 0,
      Residence_type_Urban: formData.residence_type === "Urban" ? 1 : 0,
      work_type_Govt_job: formData.work_type === "Government Job" ? 1 : 0,
      work_type_Private: formData.work_type === "Private" ? 1 : 0,
      work_type_Self_employed: formData.work_type === "Self-employed" ? 1 : 0,
      smoking_status_Unknown: formData.smoking_status === "Unknown" ? 1 : 0,
      smoking_status_formerly_smoked: formData.smoking_status === "formerly smoked" ? 1 : 0,
      smoking_status_never_smoked: formData.smoking_status === "never smoked" ? 1 : 0,
      smoking_status_smokes: formData.smoking_status === "smokes" ? 1 : 0,
    };
    const payload = {
      age: parseFloat(formData.age),
      avg_glucose_level: parseFloat(formData.avg_glucose_level),
      bmi: parseFloat(formData.bmi),
      hypertension: parseInt(formData.hypertension),
      heart_disease: parseInt(formData.heart_disease),
      ...categoricalEncoding
    };

      console.log(payload)
      const data = await predictStrokeRisk(payload);
      setResult(data);
      console.log(result)
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze. Please try again.");
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (result && result.risk_level && result.probability) {
    return <PredictionResult risklevel={result.risk_level} probability={result.probability} onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Stroke Risk Calculator</h1>
            <p className="mt-2 text-gray-600">
              Fill in the details to assess stroke risk probability
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div className="col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Personal Information
                </h2>
              </div>
              
              <FormInput
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              
              <FormInput
                label="Average Glucose Level"
                name="avg_glucose_level"
                type="number"
                step="0.1"
                value={formData.avg_glucose_level}
                onChange={handleChange}
              />
              
              <FormInput
                label="BMI"
                name="bmi"
                type="number"
                step="0.1"
                value={formData.bmi}
                onChange={handleChange}
              />
              
              <FormInput
                label="Gender"
                name="gender"
                type="select"
                value={formData.gender}
                onChange={handleChange}
                options={[
                    { value: "Female", label: "Female" },
                    { value: "Male", label: "Male" }
                ]}
                />
              
              {/* Health Conditions */}
              <div className="col-span-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Health Conditions
                </h2>
              </div>
              
              <FormInput
                label="Hypertension"
                name="hypertension"
                type="select"
                value={formData.hypertension}
                onChange={handleChange}
                options={[
                  { value: "0", label: "No" },
                  { value: "1", label: "Yes" },
                ]}
              />
              
              <FormInput
                label="Heart Disease"
                name="heart_disease"
                type="select"
                value={formData.heart_disease}
                onChange={handleChange}
                options={[
                  { value: "0", label: "No" },
                  { value: "1", label: "Yes" },
                ]}
              />
              
              {/* Lifestyle Factors */}
              <div className="col-span-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Lifestyle Factors
                </h2>
              </div>
              
              <FormInput
                label="Married"
                name="ever_married"
                type="select"
                value={formData.ever_married}
                onChange={handleChange}
                options={[
                    { value: "No", label: "No" },
                    { value: "Yes", label: "Yes" }
                ]}
                />
              
              <FormInput
                label="Residence Type"
                name="residence_type"
                type="select"
                value={formData.residence_type}
                onChange={handleChange}
                options={[
                    { value: "Rural", label: "Rural" },
                    { value: "Urban", label: "Urban" }
                ]}
                />

                <FormInput
                label="Work Type"
                name="work_type"
                type="select"
                value={formData.work_type}
                onChange={handleChange}
                options={[
                    { value: "Government Job", label: "Government Job" },
                    { value: "Private", label: "Private" },
                    { value: "Self-employed", label: "Self-employed" }
                ]}
                />

                <FormInput
                label="Smoking Status"
                name="smoking_status"
                type="select"
                value={formData.smoking_status}
                onChange={handleChange}
                options={[
                    { value: "formerly smoked", label: "Formerly Smoked" },
                    { value: "never smoked", label: "Never Smoked" },
                    { value: "Unknown", label: "Unknown" },
                    { value: "smokes", label: "Smokes" }
                ]}
                />
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
              >
                Calculate Stroke Risk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;