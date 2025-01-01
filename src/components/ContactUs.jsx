"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import emailjs from "emailjs-com"; // Import EmailJS
import supabase from "../superbaseClient";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../public/animations/contact.json";

// Regex Patterns
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PHONE_REGEX = /^\d+$/;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!EMAIL_REGEX.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (!PHONE_REGEX.test(formData.phone)) newErrors.phone = "Phone must be numeric.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_kvb898h", // Replace with EmailJS service ID
        "template_mff3s1h", // Replace with EmailJS template ID
        formData,
        "LOkeJqkAcHeV2nS51" // Replace with EmailJS user ID
      );

      if (result.status === 200) {
        setPopupMessage("Thank you for contacting us! We'll get back to you shortly.");
        setIsSuccess(true);

        // Insert into Supabase
        const { data, error } = await supabase.from("contactedUsers").insert([
          {
            ...formData,
            phone: parseInt(formData.phone, 10), // Convert phone to numeric
            date: new Date().toISOString(),
          },
        ]);

        if (error) {
          throw new Error("Supabase insertion error");
        }

        // Clear form data on success
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      setPopupMessage("Something went wrong. Please try again later.");
      setIsSuccess(false);
    } finally {
      setShowPopup(true);
      setIsLoading(false);
    }
  };

  // Close popup
  const closePopup = () => setShowPopup(false);

  return (
    <div className="max-w-[1320px] px-4 mx-auto flex flex-col md:flex-row py-16 space-y-8 md:space-y-0">
      {/* Left - Form */}
      <div className="md:w-1/2 flex justify-center">
        <form onSubmit={handleSubmit} className="max-w-[500px] w-full p-8 bg-black shadow-2xl rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">Contact Us</h2>

          {/* Form Inputs */}
          {["name", "email", "phone", "message"].map((field) => (
            <div key={field} className="mb-4">
              <input
                type={field === "message" ? "textarea" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className={`w-full border-b-2 py-2 focus:outline-none bg-transparent text-white ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-secondary mt-4 text-white flex items-center justify-center py-2 px-6 rounded-lg transition-all duration-300 font-semibold hover:bg-gray-700 hover:text-gray-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loader" />
            ) : (
              <>
                Contact
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right - Lottie Animation */}
      <div className="md:w-1/2 flex justify-center items-center">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
            <p className="text-lg font-semibold mb-4">{popupMessage}</p>
            <div className="text-4xl mb-4">{isSuccess ? "😊" : "😞"}</div>
            <button
              onClick={closePopup}
              className="text-secondary text-xl font-semibold hover:text-white"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
