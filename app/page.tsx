"use client";
import About from "@/components/about";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Misi from "@/components/misi";
import Navbar from "@/components/navbar";
import SectCarousel from "@/components/sect-carousel";
import Visi from "@/components/visi";

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
