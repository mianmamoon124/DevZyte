import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import StickyNavbar from "@/components/StickyNavbar"
import AboutUs from "@/components/AboutUs"
import ServicesList from "@/components/ServicesList"
import OurProcess from "@/components/OurProcess"
import ContactUs from "@/components/ContactUs"
import ContactSection from "@/components/ContactSection"
import Calendar from "@/components/Calender"
import Footer from "@/components/Footer"

export default function Home() {
  return(
  <div>
    <Navbar />
    <HeroSection />
    <StickyNavbar />
    <AboutUs />
    <ServicesList />
    {/* <OurProcess /> */}
    {/* <ContactUs /> */}
    <ContactSection />
    {/* <Calendar /> */}
    <Footer />
  </div>
  )
}
