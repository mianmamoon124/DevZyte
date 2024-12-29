"use client";
import React from "react";

// Calendar component
const Calendar = () => {
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

      {/* Calendly Script */}
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </div>
  );
};

export default Calendar;
