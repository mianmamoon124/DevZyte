"use client"
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StickyNavbar from "@/components/StickyNavbar";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default function AboutPage(){
    return(
        <div>
        <Navbar />
        <HeroSection />
        <StickyNavbar />
        <AboutUs />
        <Footer />
        </div>
    )
}