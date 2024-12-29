"use client";
import React from "react";
import Lottie from 'lottie-react';
import animationData from '../../public/animations/About.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <div className="max-w-[1320px] mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center py-16 md:px-16">
        {/* Left Side Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-secondary heading text-[25px] uppercase about-heading md:text-[40px] font-medium">
            Who We Are
          </h2>

          {/* Full Description Text */}
          <p className="text-[16px] sm:text-lg text-gray-400">
          Welcome to DevZyte, here we are ready to transform your desires and valuable ideas into reality. We have provided innovative solutions for different queries and problems of our clients belonging from a number of industries that include mobile app, web development and last but not the least AI development. The digital world is progressing on a daily basis.
          <br /><br />
          If you want to stay in the competition then you will have to get geared up and we are here to gear you up with our most advanced services and software and tech solutions. Because our goal is to make our way to success while enlightening yours. Because our success is associated with yours. So we are here to make the state of the Art and the most reliable and efficient technology accessible for you at an arm’s length. 
          </p>

          {/* Main Action Button */}
          <button
            className="bg-secondary flex items-center justify-center py-2 px-6 rounded-lg transition-all duration-300 hero-section-button font-semibold hover:text-white hover:bg-secondary"
          >
            Contact
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>

        {/* Right Side (Lottie Animation) */}
        <div className="w-full md:w-1/2 flex  text-center justify-center hero-svg md:mt-[-80px]">
          <Lottie animationData={animationData} className="w-[100%]  h-[100%]" loop={true} />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
