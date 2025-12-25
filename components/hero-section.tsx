"use client";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="flex md:justify-center h-fit md:h-screen md:gap-32 pt-24 md:mt-0 items-center text-center flex-col md:flex-row pb-10 relative overflow-hidden overflow-x-hidden">
      <div className="overflow-hidden md:hidden -z-1 absolute inset-0 pointer-events-none w-full h-full">
        {/* MOBILE ONLY */}
        {/* Sebelah kiri */}
        <motion.div
          animate={{ x: [0, -400] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex-max absolute -left-112.5 md:right-0 -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <img
              key={idx}
              src="/img/kiri3.png"
              className="w-100 shrink-0"
              alt="kiri"
            />
          ))}
        </motion.div>
        {/* yg ini kanan */}
        <motion.div
          animate={{ x: [-400, 0] }}
          transition={{
            ease: "linear",
            duration: 50,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex-max absolute -right-175 bottom-0 md:-left-20 -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <img
              key={idx}
              src="/img/kiri3.png"
              className="w-100 shrink-0"
              alt="kiri"
            />
          ))}
        </motion.div>
      </div>
      <div className="md:order-2 relative">
        <div className="hidden md:block -z-1 absolute inset-0 pointer-events-none w-full h-full">
          {/* DESKTOP ONLY */}
          {/* Sebelah kiri */}
          <motion.div
            animate={{ x: [0, -1024] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-max absolute -left-112.5 right-0 -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
          >
            {Array.from({ length: 10 }).map((_, idx) => (
              <img
                key={idx}
                src="/img/kiri3.png"
                className="w-screen h-auto shrink-0"
                alt="kiri"
              />
            ))}
          </motion.div>
          {/* yg ini kanan */}
          <motion.div
            animate={{ x: [-1024, 0] }}
            transition={{
              ease: "linear",
              duration: 50,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-max absolute -right-175 bottom-0 -left-20 -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
          >
            {Array.from({ length: 10 }).map((_, idx) => (
              <img
                key={idx}
                src="/img/kiri3.png"
                className="w-screen h-auto shrink-0"
                alt="kiri"
              />
            ))}
          </motion.div>
        </div>
        <div className="absolute hidden md:block inset-0 backdrop-blur-md bg-white/5 rounded-full"></div>
        <img
          src={"/img/logo.png"}
          className="w-60 h-60 md:w-100 md:h-100 md:opacity-75 rounded-full shadow-2xl"
        />
      </div>
      <div className="md:order-1 md:text-left text-center ">
        <p className="text-[#333333] mt-8 text-lg font-bold">
          Official Website Of
        </p>
        <p className="mt-3 text-4xl font-bold md:text-7xl md:w-150 w-100 text-wrap md:leading-20 leading-12 text-[#333333]">
          MPK LETRIS INDONESIA 2
        </p>
        <p className="text-[#333333] mt-3 font-bold md:text-2xl text-lg text-wrap">
          Majelis Permusyawaratan/Perwakilan Kelas
        </p>
        {/* <div className="flex gap-3 mt-3 items-center justify-center md:justify-start">
          <button className="bg-[#a18f31] w-42.5 h-12.5 flex gap-2 justify-center items-center rounded-lg font-semibold text-white text-lg">
            Tentang SIT <Info className="size-5" />
          </button>
          <button className="bg-[#333333] w-42.5 h-12.5 flex gap-2 justify-center items-center rounded-lg font-semibold text-white text-lg">
            Mulai Telusuri <ArrowRight className="size-5" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
