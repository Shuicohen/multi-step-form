import axios from 'axios';

export const saveFormData = async (formData) => {
    console.log("Submitting Form Data:", formData); // Debugging
    try {
        const response = await axios.post("https://multi-step-form-oho5.onrender.com/api/form", formData);
        console.log("Form saved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
        throw error;
    }
};
