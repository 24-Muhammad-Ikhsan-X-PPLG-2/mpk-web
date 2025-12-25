"use client";
import Navbar from "@/components/navbar";
import { ArrowRight, Info } from "lucide-react";
import { motion } from "motion/react";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="flex md:justify-center h-fit md:h-screen md:gap-32 pt-24 md:mt-0 items-center text-center flex-col md:flex-row z-9999 mb-10">
        <div className="overflow-hidden absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-max absolute -left-112.5 md:-left-50 -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <img
                key={idx}
                src="/img/kiri.png"
                className="w-100 md:w-fit shrink-0"
                alt="kiri"
              />
            ))}
          </motion.div>
          <motion.div
            animate={{ x: ["300px", "50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-max absolute -right-175 bottom-0 md:-right-325 -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <img
                key={idx}
                src="/img/kiri.png"
                className="w-100 md:w-fit shrink-0"
                alt="kiri"
              />
            ))}
          </motion.div>
        </div>
        <div className="md:order-2 relative">
          <div className="absolute hidden md:block inset-0 backdrop-blur-md bg-white/5 rounded-full"></div>
          <img
            src={"/img/SIT2.png"}
            className="w-60 h-60 md:w-100 md:h-100 md:opacity-75 rounded-full shadow-2xl"
          />
        </div>
        <div className="md:order-1 md:text-left text-center ">
          <p className="text-[#324173] mt-8 text-lg font-bold">
            Selamat Datang di
          </p>
          <p className="mt-3 text-4xl font-bold md:text-7xl md:w-150 w-100 text-wrap md:leading-20 leading-12 text-[#324173]">
            Sistem Informasi Terintegrasi
          </p>
          <p className="text-[#324173] mt-3 font-bold md:text-2xl text-lg ">
            Badan Ekslusif Mahasiswa UI
          </p>
          <div className="flex gap-3 mt-3 items-center justify-center md:justify-start">
            <button className="bg-[#a18f31] w-42.5 h-12.5 flex gap-2 justify-center items-center rounded-lg font-semibold text-white text-lg">
              Tentang SIT <Info className="size-5" />
            </button>
            <button className="bg-[#324173] w-42.5 h-12.5 flex gap-2 justify-center items-center rounded-lg font-semibold text-white text-lg">
              Mulai Telusuri <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </section>
      <div className="bg-[#324173] w-full h-4"></div>
    </>
  );
};
export default Home;
