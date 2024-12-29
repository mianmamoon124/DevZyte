"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  // Words to cycle through for the animated effect
  const words = ['entertaining', 'marvellous', 'special', 'unique', 'awesome'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Change the word every 2 seconds
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black text-white py-8 px-5 md:py-12 md:px-[80px]">
      <div className=" mx-auto flex flex-col space-y-10">
        {/* Heading with animated text */}
        <h1 className="text-[2rem] xl:text-[3.5rem] 2xl:text-[5rem] font-bold leading-snug">
          Let's Make →
          <br />
          Something{' '}
          <span className="text-secondary inline-block">
            {words[currentWordIndex]}
          </span>
        </h1>

        {/* Contact Information */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-16">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold">Speak to us</h3>
            <p className="text-pink-400 mt-2 text-base md:text-lg">+92 318 6932297</p>
            <p className="text-pink-400 text-base md:text-lg">info@devzyte.com</p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold">Our Location</h3>
            <p className="mt-2 text-base md:text-lg">A Block Shalimar Housing Scheme,</p>
            <p className="text-base md:text-lg">Lahore, Punjab</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700 my-8"></div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-sm md:text-base">
            <p>
              DevZyte © 2024{' '}
              <Link href="/privacy" className="underline hover:text-secondary">
                Privacy
              </Link>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/devzyte?igsh=dmt6YWtld2FoaTN6" target="_blank" className="hover:text-secondary">
              Instagram
            </Link>
            <span>•</span>
            <Link href="https://www.linkedin.com/company/devzyte/" target="_blank" className="hover:text-secondary">
              Linkedin
            </Link>
            <span>•</span>
            <Link href="https://www.facebook.com/share/18XBverHbW/" target="_blank" className="hover:text-secondary">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
