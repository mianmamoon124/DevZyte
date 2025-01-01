"use client";
import React, { useEffect } from "react";

// Calendar component
const Calendar = () => {
  useEffect(() => {
    // Dynamically load the Calendly widget script only on the client side
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-[800px] mx-auto py-12">
      {/* Heading */}
      <h2 className="text-[22px] md:text-[30px] text-secondary font-bold text-center mb-8">
        Let&apos;s Connect for an Appointment
      </h2>

      {/* Calendly Widget */}
      <div
        className="calendly-inline-widget mx-1"
        data-url="https://calendly.com/hamzaraies-2005/appointment"
        style={{ minWidth: "320px", height: "700px" }}
      ></div>
    </div>
  );
};

export default Calendar;
