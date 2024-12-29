"use client";
import Logo from "../../public/assets/logo/logo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [time, setTime] = useState("");
  const [seconds, setSeconds] = useState("");
  const [date, setDate] = useState("");

  // Toggle theme between dark and light
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Apply dark mode class on initial render
  useEffect(() => {
    document.documentElement.classList.remove("light"); // Ensure light class is not applied initially
  }, []);

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const pakTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const pakSeconds = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        second: "2-digit",
      });
      const pakDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        month: "long",
        day: "numeric",
      });

      setTime(pakTime);
      setSeconds(pakSeconds);
      setDate(pakDate);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="w-full shadow-md py-4 px-4 bg-[#f2f2f] md:px-10 lg:px-12 z-10">
      <div className=" mx-auto flex items-center justify-between">
        {/* Left Side: Logo and Tagline */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={Logo}
              alt="DevZyte Logo"
              className="w-[55px] md:w-[70px]"
            />
          </Link>
          <div className="border-l-2 border-gray-400 h-10 mx-2"></div>

          {/* Tagline in Three Lines */}
          <div className="block ml-[-4px] font-medium">
            <p className="text-[11px] font-semibold leading-tight">INNOVATING, DEVELOPING,</p>
            <p className="text-[11px] font-semibold leading-tight">AND DELIVERING</p>
            <p className="text-[11px] font-semibold leading-tight">EXCELLENCE</p>
          </div>
        </div>

        {/* Right Side: Theme Toggle and Time/Date */}
        <div className="flex items-center cursor-pointer sm:space-x-4 font-mono">
          {/* Theme Toggle Button */}
          {/* <button
            onClick={toggleTheme}
            className="p-3 text-2xl rounded-full cursor-pointer"
          >
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} />
          </button> */}

          {/* Time and Date */}
          <div className="hidden sm:flex items-center space-x-1">
            <span className="sm:text-4xl text-xl font-extrabold">{time}</span>
            <span className="text-lg font-extrabold">:</span>
            <div className="flex flex-col ml-2">
              <span className="text-sm sm:text-lg mb-[-5px] sm:mb-[-10px] font-bold">
                {seconds}
              </span>
              <span className="font-bold text-sm sm:text-lg">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
