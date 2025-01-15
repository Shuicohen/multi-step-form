import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveFormData } from "../api";
import "../styles/style.css"; // Import the updated CSS
import SideBar from "./SideBar";
import  useLocalStorage  from "../hooks/useLocalStorage";

const Summary = () => {
  const [localFormData, setLocalFormData] = useLocalStorage("formData", {});
  const [formData, setFormData] = useState(localFormData);
  const navigate = useNavigate();

  useEffect(() => {
    // Load data from localStorage on mount
    setFormData(localFormData);
  }, [localFormData]);

  const handleConfirm = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.plan || !formData.billing) {
        alert("Please complete all required fields before confirming.");
        return;
    }
    try {
        const response = await saveFormData(formData);
        if (response.message === "Form data saved successfully!") {
            setLocalFormData({}); // Clear local storage
            navigate("/thank-you"); // Redirect to Thank You page
        } else {
            alert("Failed to save data!");
        }
    } catch (error) {
        console.error("Error saving data:", error);
        alert("An error occurred while saving data.");
    }
};


  const handleGoBack = () => {
    navigate("/step3"); // Navigate back to the Add-ons page
  };

  const handleChangePlan = () => {
    navigate("/step2"); // Navigate back to the Select Plan page
  };

  const calculateTotal = () => {
    const basePrice =
      formData.billing === "Yearly"
        ? formData.plan === "Pro"
          ? 150
          : formData.plan === "Advanced"
          ? 120
          : 90
        : formData.plan === "Pro"
        ? 15
        : formData.plan === "Advanced"
        ? 12
        : 9;

    const addOnPrice =
      formData.addons?.reduce(
        (total, addon) =>
          total +
          (formData.billing === "Yearly"
            ? addon === "Online service"
              ? 10
              : addon === "Larger storage"
              ? 20
              : 20
            : addon === "Online service"
            ? 1
            : addon === "Larger storage"
            ? 2
            : 2),
        0
      ) || 0;

    return basePrice + addOnPrice;
  };

  return (
    <div className="container">
      <SideBar currentStep={4} />
      <div className="form-section">
        <h1>Finishing up</h1>
        <p>Double-check everything looks OK before confirming.</p>

        <div className="summary-details">
          <div className="summary-item">
            <div>
              {formData.plan} ({formData.billing})
              <button onClick={handleChangePlan} className="change-button">
                Change
              </button>
            </div>
            <div>
              $
              {formData.billing === "Yearly"
                ? formData.plan === "Pro"
                  ? 150
                  : formData.plan === "Advanced"
                  ? 120
                  : 90
                : formData.plan === "Pro"
                ? 15
                : formData.plan === "Advanced"
                ? 12
                : 9}
              /{formData.billing === "Yearly" ? "yr" : "mo"}
            </div>
          </div>

          {formData.addons?.map((addon, index) => (
            <div className="summary-item" key={index}>
              <div>{addon}</div>
              <div>
                +$
                {formData.billing === "Yearly"
                  ? addon === "Online service"
                    ? 10
                    : addon === "Larger storage"
                    ? 20
                    : 20
                  : addon === "Online service"
                  ? 1
                  : addon === "Larger storage"
                  ? 2
                  : 2}
                /{formData.billing === "Yearly" ? "yr" : "mo"}
              </div>
            </div>
          ))}

          <div className="summary-item total">
            <div>Total (per {formData.billing === "Yearly" ? "year" : "month"})</div>
            <div>+${calculateTotal()}/{formData.billing === "Yearly" ? "yr" : "mo"}</div>
          </div>
        </div>

        <div className="buttons">
          <button className="secondary" onClick={handleGoBack}>Go Back</button>
          <button onClick={handleConfirm} className="confirm-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
