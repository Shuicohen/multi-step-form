import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import  useLocalStorage  from "../hooks/useLocalStorage"; // Custom hook for localStorage
import "../styles/style.css";

const FormStep3 = () => {
  const [addons, setAddons] = useState([]);
  const [localFormData, setLocalFormData] = useLocalStorage("formData", {});
  const navigate = useNavigate();

  const billingCycle = localFormData.billing || "Monthly"; // Fallback to "Monthly" if billing is undefined

  const addonOptions = [
    { name: "Online service", description: "Access to multiplayer games", price: billingCycle === "Monthly" ? 1 : 10 },
    { name: "Larger storage", description: "Extra 1TB of cloud save", price: billingCycle === "Monthly" ? 2 : 20 },
    { name: "Customizable profile", description: "Custom theme on your profile", price: billingCycle === "Monthly" ? 2 : 20 },
  ];

  // Load add-ons from localStorage on mount
  useEffect(() => {
    if (localFormData.addons) {
      setAddons(localFormData.addons);
    }
  }, [localFormData]);

  const toggleAddon = (addon) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter((a) => a !== addon));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const handleSubmit = () => {
    const updatedFormData = { ...localFormData, addons };
    setLocalFormData(updatedFormData); // Save updated data to localStorage
    navigate("/summary");
  };

  const handleGoBack = () => {
    navigate("/step2");
  };

  return (
    <div className="container">
      <Sidebar currentStep={3} />
      <div className="form-section">
        <h1>Pick add-ons</h1>
        <p>Add-ons help enhance your gaming experience.</p>
        <div className="addons-container">
          {addonOptions.map((addon, index) => (
            <div
              key={index}
              className={`addon-card ${addons.includes(addon.name) ? "selected" : ""}`}
              onClick={() => toggleAddon(addon.name)}
            >
              <div className="addon-info">
                <input
                  type="checkbox"
                  checked={addons.includes(addon.name)}
                  onChange={() => toggleAddon(addon.name)}
                />
                <div>
                  <h3>{addon.name}</h3>
                  <p>{addon.description}</p>
                </div>
              </div>
              <div className="addon-price">+${addon.price}/{billingCycle === "Monthly" ? "mo" : "yr"}</div>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="secondary" onClick={handleGoBack}>Go Back</button>
          <button onClick={handleSubmit}>Next Step</button>
        </div>
      </div>
    </div>
  );
};

export default FormStep3;
