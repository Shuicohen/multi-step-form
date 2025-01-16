import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage"; // Adjust path if needed
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import FormStep3 from "./components/FormStep3";
import Summary from "./components/Summary";
import ThankYou from "./components/ThankYou";

const App = () => {
  const [formData, setFormData] = useLocalStorage("formData", {
    name: "",
    email: "",
    phone: "",
    plan: "Arcade",
    addons: [],
    billing: "Monthly",
  });

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <Router>
      <div className="container">
      <Routes>
        <Route path="/" element={<FormStep1 onNext={updateFormData} />} />
        <Route path="/step2" element={<FormStep2 onNext={updateFormData} />} />
        <Route path="/step3" element={<FormStep3 onNext={updateFormData} />} />
        <Route path="/summary" element={<Summary formData={formData} />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
