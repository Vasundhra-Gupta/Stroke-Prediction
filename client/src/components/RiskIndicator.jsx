const RiskIndicator = ({ probability, risklevel }) => {
    console.log(probability, risklevel)
  const getColor = () => {
    if (probability < 0.2) return "bg-green-500";
    if (probability < 0.4) return "bg-blue-500";
    if (probability < 0.6) return "bg-yellow-500";
    if (probability < 0.8) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Stroke Risk</span>
        <span className="text-sm font-medium text-gray-700">{risklevel}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColor()}`}
          style={{ width: `${(probability*100).toFixed(2)}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Probability: {(probability * 100).toFixed(2)}%

      </p>
    </div>
  );
};

export default RiskIndicator;