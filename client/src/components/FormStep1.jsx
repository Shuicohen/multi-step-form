import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar.jsx";
import  useLocalStorage  from "../hooks/useLocalStorage"; // Ensure the correct path
import "../styles/style.css";

const FormStep1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [localFormData, setLocalFormData] = useLocalStorage("formData", {});
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    if (localFormData) {
      setName(localFormData.name || "");
      setEmail(localFormData.email || "");
      setPhone(localFormData.phone || "");
    }
  }, [localFormData]);

  const validateForm = () => {
    if (!name || !email || !phone) {
      setError("Please fill out all fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      const updatedFormData = { ...localFormData, name, email, phone };
      setLocalFormData(updatedFormData); // Save to localStorage
      navigate("/step2");
    }
  };

  return (
    <div className="container">
      <Sidebar currentStep={1} />
      <div className="form-section">
        <h1>Personal Info</h1>
        <p>Please provide your name, email address, and phone number.</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name
          <input
            type="text"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </label>
          <label>Email
          <input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </label>
          <label>
            Phone Number
          <input
            type="text"
            placeholder="e.g. +1 234 567 890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </label>
          <button className="buttons" type="submit">Next Step</button>
        </form>
      </div>
    </div>
  );
};

export default FormStep1;
