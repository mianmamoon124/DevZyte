import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import StickyNavbar from "@/components/StickyNavbar"
import ServicesList from "@/components/ServicesList"
import ContactUs from "@/components/ContactUs"
import Footer from "@/components/Footer"

export default function UniqueOfferings() {
  return(
  <div>
    <Navbar />
    <HeroSection />
    <StickyNavbar />
    <ServicesList />
    <ContactUs />
    <Footer />
  </div>
  )
}