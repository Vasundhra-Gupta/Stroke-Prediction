import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <HomePage />
    </>
  );
}

export default App;