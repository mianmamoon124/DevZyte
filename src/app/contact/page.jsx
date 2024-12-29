import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import StickyNavbar from "@/components/StickyNavbar"
import AboutUs from "@/components/AboutUs"
import ContactUs from "@/components/ContactUs"
import Calendar from "@/components/Calender"
import Footer from "@/components/Footer"

export default function Contact() {
  return(
  <div>
    <Navbar />
    <HeroSection />
    <StickyNavbar />
    <AboutUs />
    <ContactUs />
    {/* <Calendar /> */}
    <Footer />
  </div>
  )
}