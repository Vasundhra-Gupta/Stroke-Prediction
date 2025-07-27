const API_URL = import.meta.env.VITE_BACKEND_URL; // Change to your FastAPI endpoint

export const predictStrokeRisk = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/make-prediction`, {
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    });
    console.log(response)

    const res = await response.json()
    console.log(res)
    if(!response.ok){
      throw new Error(res.message || "Prediction failed");
    }
    return res;
  } catch (error) {
    console.log(`error in prediction service ${error}`)
  }

};