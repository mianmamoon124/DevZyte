"use client";
import React, { useState } from "react";
import Lottie from "lottie-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import animationData from "../../public/animations/contact.json"; // Replace with your Lottie file
import emailjs from "emailjs-com";  // Import EmailJS
import supabase from "../superbaseClient";

const ContactUs = () => {
  // State for form fields, errors, and submission status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // For success/failure state
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate fields on submission
  const validateForm = () => {
    const newErrors = {
      name: formData.name === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email), // Simple email validation regex
      phone: !/^\d+$/.test(formData.phone), // Ensures phone is numeric
      message: formData.message === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // Start loading when submitting

      try {
        // Send email using EmailJS
        const templateParams = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        };

        const result = await emailjs.send(
          'service_kvb898h',    // Replace with your EmailJS service ID
          'template_mff3s1h',    // Replace with your EmailJS template ID
          templateParams,
          'LOkeJqkAcHeV2nS51'   // Replace with your EmailJS user ID
        );

        // If email is sent successfully, insert data into Supabase
        if (result.status === 200) {
          setPopupMessage("Thank you for contacting us. Our team will get in touch with you soon.");
          setIsSuccess(true); // Set to success
          setShowPopup(true);

          // Insert data into Supabase
          const { data, error } = await supabase.from("contactedUsers").insert([
            {
              name: formData.name,
              email: formData.email,
              number: parseInt(formData.phone), // Convert phone to numeric type
              message: formData.message,
              date: new Date().toISOString(), // Automatically set contact date
            },
          ]);

          if (error) {
            console.error("Error inserting data into Supabase:", error);
            setPopupMessage("We encountered an error while saving your data.");
            setIsSuccess(false); // Set to failure
            setShowPopup(true);
          }

          // Clear form data after successful submission
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          throw new Error("Email sending failed");
        }
      } catch (error) {
        setPopupMessage("We are currently experiencing technical issues. Please try again later.");
        setIsSuccess(false); // Set to failure
        setShowPopup(true);
      } finally {
        setIsLoading(false); // Reset loading state once the request is finished
      }
    }
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-[1320px] px-4 mx-auto flex flex-col md:flex-row py-16 space-y-8 md:space-y-0">
      {/* Left Half - Contact Form */}
      <div className="md:w-1/2 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[500px] w-full p-8 bg-black shadow-2xl rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Contact Us</h2>

          {/* Name Field */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full border-b-2 py-2 mb-4 focus:outline-none bg-transparent text-white ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

          {/* Email Field */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border-b-2 py-2 mb-4 focus:outline-none bg-transparent text-white ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">Enter a valid email address</p>}

          {/* Phone Number Field */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`w-full border-b-2 py-2 mb-4 focus:outline-none bg-transparent text-white ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">Phone number must be numeric</p>}

          {/* Message Field */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="4"
            className={`w-full border-b-2 py-2 mb-6 focus:outline-none bg-transparent text-white ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.message && <p className="text-red-500 text-sm">Message is required</p>}

          {/* Contact Us Button */}
          <button
            type="submit"
            className="bg-secondary mt-4 text-white flex items-center justify-center py-2 px-6 rounded-lg transition-all duration-300 font-semibold hover:bg-gray-700 hover:text-gray-100"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <div className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6 mr-2"></div>
            ) : (
              <>
                Contact
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 transform transition-transform duration-300"
                />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Half - Lottie Animation */}
      <div className="md:w-1/2 flex justify-center items-center">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Popup Box */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`bg-black text-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center`}>
            <p className="text-lg font-semibold mb-4">{popupMessage}</p>
            <div className="text-4xl mb-4">
              {isSuccess ? "😊" : "😞"}
            </div>
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
