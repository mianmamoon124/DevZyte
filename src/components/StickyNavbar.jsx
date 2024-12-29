"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { gsap } from "gsap";

const StickyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the mobile menu is open
  const navbarRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(true); // Start with navbar visible

  useEffect(() => {
    // Initial setup for GSAP animation
    gsap.set(navbarRef.current, { opacity: 1, y: 0 }); // Ensure navbar is visible on mount

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If user has scrolled past 120vh
      if (currentScrollY > window.innerHeight * 1.2) {
        // If the navbar is visible, slide it out
        if (navbarVisible) {
          gsap.to(navbarRef.current, {
            opacity: 0,
            y: 100,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => setNavbarVisible(false), // Update state when hidden
          });
        }
      } else {
        // If user scrolls back up and navbar is not visible, slide it in
        if (!navbarVisible) {
          gsap.to(navbarRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => setNavbarVisible(true), // Update state when shown
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarVisible]); // Depend only on navbarVisible

  return (
    <nav
      ref={navbarRef}
      className="fixed bottom-5 left-1/2 rounded-xl transform -translate-x-1/2 bg-black bg-opacity-50 backdrop-blur-md shadow-lg z-50 max-w-[700px] w-full"
    >
      <div className="mx-auto flex items-center justify-between p-4">
        {/* Left Side: Home Icon (Visible only on medium and larger screens) */}
        <div className="hidden md:block">
          <Link href="/" className="text-secondary">
            <FontAwesomeIcon icon={faHome} className="text-2xl" />
          </Link>
        </div>

        {/* Center Menu Items (Visible only on medium and larger screens) */}
        <div className="hidden text-white  md:flex space-x-10">
          <Link href="/" className=" hover:text-secondary">Home</Link>
          <Link href="/about" className=" hover:text-secondary">About</Link>
          <Link href="/unique-offerings" className=" hover:text-secondary">Unique Offerings</Link>
          {/* <Link href="/blog" className=" hover:text-secondary">Blogs</Link> */}
          <Link href="/contact" className=" hover:text-secondary">Contact</Link>
        </div>

        {/* Right Side: Let's Talk Button */}
        <Link href="/contact" className="block">
          <button className=" bg-secondary text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-90">
            Let&apos;s Talk
          </button>
        </Link>

        {/* Mobile Hamburger Menu (Visible only on smaller screens) */}
        <div className="md:hidden flex items-center">
          <button 
            className="p-2 text-secondary" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-black bg-opacity-50 p-4 rounded-b-xl">
          <div className="flex flex-col text-white space-y-4">
            <Link href="/" className="text-white font-bold hover:text-secondary">Home</Link>
            <Link href="/about" className="text-white font-bold hover:text-secondary">About</Link>
            <Link href="/unique-offerings" className="text-white font-bold hover:text-secondary">Unique Offerings</Link>
            <Link href="/blogs" className="text-white font-bold hover:text-secondary">Blogs</Link>
            <Link href="/contact" className="text-white font-bold hover:text-secondary">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNavbar;
