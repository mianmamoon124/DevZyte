import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StickyNavbar from "@/components/StickyNavbar";
import AboutUs from "@/components/AboutUs";
import OurProcess from "@/components/OurProcess";
import Calendar from "@/components/Calender";
import Footer from "@/components/Footer";

export default function AboutPage(){
    return(
        <div>
        <Navbar />
        <HeroSection />
        <StickyNavbar />
        <AboutUs />
        {/* <OurProcess /> */}
        {/* <Calendar /> */}
        <Footer />
        </div>
    )
}