"use client";
import About from "@/components/Landing/about";
import Footer from "@/components/Landing/footer";
import HeroSection from "@/components/Landing/hero-section";
import Misi from "@/components/Landing/misi";
import Navbar from "@/components/Landing/navbar";
import SectCarousel from "@/components/Landing/sect-carousel";
import Visi from "@/components/Landing/visi";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <About />
      <SectCarousel />
      <Visi />
      <Misi />
      <Footer />
    </div>
  );
};
export default Home;
