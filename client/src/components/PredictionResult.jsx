import RiskIndicator from "./RiskIndicator";

const PredictionResult = ({ probability, risklevel, onReset }) => {

  const getRecommendation = () => {
    if (probability < 0.3) {
      return "Your stroke risk is relatively low. Maintain a healthy lifestyle with regular exercise and balanced diet.";
    } else if (probability < 0.6) {
      return "Moderate stroke risk detected. Consider consulting a healthcare provider for preventive measures.";
    } else {
      return "High stroke risk identified. Please schedule a consultation with your doctor as soon as possible.";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Stroke Risk Assessment
      </h3>
      <RiskIndicator probability={probability} risklevel={risklevel} />
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800">Recommendation</h4>
        <p className="mt-2 text-blue-700">{getRecommendation()}</p>
      </div>
      <button
        onClick={onReset}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
      >
        Assess Another Patient
      </button>
    </div>
  );
};

export default PredictionResult;