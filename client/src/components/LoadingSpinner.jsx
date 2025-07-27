import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="mt-4 text-lg text-gray-700">Analyzing health data...</p>
      <p className="text-sm text-gray-500">This usually takes just a moment</p>
    </div>
  );
};

export default LoadingSpinner;