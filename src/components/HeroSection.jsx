"use client";
// components/HeroSection.js
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from "../../public/animations/HeroSection.json"; // Adjust the path as necessary
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HeroSection = () => {
  const taglineRef = useRef(null);
  const headlineRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const starRef = useRef(null); // Reference for the hero-section-star element

  // GSAP Animation for hero-section-star
  useEffect(() => {
    const initialWidth = window.innerWidth < 768 ? "0px" : "0px";
    const finalWidth = window.innerWidth < 768 ? "55px" : "70px";

    gsap.fromTo(
      starRef.current,
      { width: initialWidth },
      {
        width: finalWidth,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="px-4 xl:px-20 xl:h-screen main-hero-section">
      <div className="mx-auto flex flex-col md:mt-3 mt-2 md:flex-row xl:mt-0 items-center md:justify-between">
        <div className="flex flex-col justify-start md:pl-4 items-start space-y-2 w-full md:w-1/2">
          <h2 ref={taglineRef} className="ml-2 tracking-wider text-[1rem] heading-2 xl:text-[1.375rem] mt-4 pt-4 hero-tagline md:mt-3 font-bold">
            <div className="flex items-center uppercase">
              <div ref={starRef} className="hero-section-star mr-2 inline-block"></div>
              Unlocking Infinite Power
            </div>
            <span className="uppercase">of Technology</span>
          </h2>
          <h1 ref={headlineRef} className="text-[2rem] xl:text-[3.5rem] 2xl:text-[5rem] theme-primary heading tracking-wider md:leading-[1.4] font-bold hero-heading">
            Taking Your<br />
            <span className="block text-secondary">Brand To New</span>
            <span className="block">Heights In the</span>
            <span className="block">Digital Space</span>
          </h1>
          <div className="flex space-x-3 md:space-x-4">
            <button
              ref={buttonRef}
              className="text-white flex items-center justify-center py-1 md:py-3 px-4 md:px-8 rounded-md transition-all duration-300 hero-section-button font-semibold hover:text-white heading gradient-bg"
            >
              Explore
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform transition-transform duration-300" />
            </button>
            <button
              ref={buttonRef}
              className="flex items-center hero-section-button bg-transparent justify-center md:py-3 py-1 px-4 md:px-8 rounded-md border-secondary border-2 text-secondary heading transition-all duration-300"
            >
              How We Work
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform transition-transform duration-300" />
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex z-[-10] justify-center h-[100%] hero-svg md:mt-[-30px]">
          <Lottie animationData={animationData} className="w-[100%] h-[100%]" loop={true} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
