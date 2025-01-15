import React from "react";
import Sidebar from "./SideBar.jsx";
import iconThankYou from "/assets/images/icon-thank-you.svg";
import "../styles/style.css";

const ThankYou = () => {
  return (
    <div className="container">
      <Sidebar currentStep={5} />
      <div className="form-section thank-you-section">
        <img src={iconThankYou} alt="Thank You Icon" className="icon-thank-you" />
        <h1>Thank You!</h1>
        <p>
          Thanks for confirming your subscription! We hope you have fun using our
          platform. If you ever need support, please feel free to email us at{" "}
          <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
