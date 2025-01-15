import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import  useLocalStorage  from "../hooks/useLocalStorage";
import "../styles/style.css";

const FormStep2 = () => {
  const [selectedPlan, setSelectedPlan] = useState("Arcade");
  const [billing, setBilling] = useState("Monthly");
  const [localFormData, setLocalFormData] = useLocalStorage("formData", {});
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    if (localFormData) {
      setSelectedPlan(localFormData.plan || "Arcade");
      setBilling(localFormData.billing || "Monthly");
    }
  }, [localFormData]);

  const handlePlanChange = (plan) => setSelectedPlan(plan);
  const handleBillingToggle = () =>
    setBilling((prev) => (prev === "Monthly" ? "Yearly" : "Monthly"));

  const handleSubmit = () => {
    const updatedFormData = { ...localFormData, plan: selectedPlan, billing };
    setLocalFormData(updatedFormData); // Save data to localStorage
    navigate("/step3");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <Sidebar currentStep={2} />
      <div className="form-section">
        <h1>Select Your Plan</h1>
        <p>You have the option of monthly or yearly billing.</p>
        <div className="plans">
          {["Arcade", "Advanced", "Pro"].map((plan) => (
            <div
              key={plan}
              className={`plan ${selectedPlan === plan ? "active" : ""}`}
              onClick={() => handlePlanChange(plan)}
            >
              <img
                src={`/assets/images/icon-${plan.toLowerCase()}.svg`}
                alt={`${plan} icon`}
              />
              <h3>{plan}</h3>
              <p>
                {billing === "Monthly"
                  ? `$${plan === "Pro" ? 15 : plan === "Advanced" ? 12 : 9}/mo`
                  : `$${plan === "Pro" ? 150 : plan === "Advanced" ? 120 : 90}/yr`}
              </p>
            </div>
          ))}
        </div>
        <div className="billing-toggle">
          <span>Monthly</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={billing === "Yearly"}
              onChange={handleBillingToggle}
            />
            <span className="slider"></span>
          </label>
          <span>Yearly</span>
        </div>
        <div className="buttons">
          <button className="secondary" onClick={handleGoBack}>Go Back</button>
          <button onClick={handleSubmit}>Next Step</button>
        </div>
      </div>
    </div>
  );
};

export default FormStep2;
