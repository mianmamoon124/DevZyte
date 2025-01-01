"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "../../public/assets/logo/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import animationData from "../../public/animations/contact.json";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ContactSection = () => {
  return (
    <div className="max-w-[1320px] px-5 md:px-8 lg:px-10 xl:px-20 mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center bg-black text-white rounded-xl p-5 md:py-20 lg:py-16 md:px-6 lg:px-8 xl:px-10 border-2 border-secondary">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 text-center md:mb-0 mb-8">
          <div className="flex flex-col items-center md:space-y-8 space-y-5 text-center">
            <Image
              src={LogoImg}
              alt="DevZyte Logo"
              className="w-[55px] md:w-[70px]"
            />
            <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-4 px-4 sm:px-0">
              Ready to make an impact? Reach out to us and discover the exciting
              opportunities waiting for you at DevZyte.
            </h2>
            <Link href="/contact">
              <button
                className="bg-secondary flex items-center justify-center py-2 px-5 md:px-6 lg:px-8 rounded-lg transition-all duration-300 hero-section-button font-semibold hover:text-white hover:bg-secondary"
              >
                Contact
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
        {/* Right Side Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center md:mt-0 mt-6">
          <Lottie
            animationData={animationData}
            className="w-[100%] max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] h-auto"
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
