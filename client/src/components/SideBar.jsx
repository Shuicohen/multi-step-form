import React from "react";
import "../styles/style.css";

const Sidebar = ({ currentStep }) => {
  const steps = [
    { label: "Your Info", number: 1 },
    { label: "Select Plan", number: 2 },
    { label: "Add-Ons", number: 3 },
    { label: "Summary", number: 4 },
  ];

  return (
    <div className="sidebar">
      <ul>
        {steps.map((step) => (
          <li
            key={step.number}
            className={currentStep === step.number ? "active" : ""}
          >
            <span>Step {step.number}</span> {step.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
