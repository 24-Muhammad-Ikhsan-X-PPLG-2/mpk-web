"use client";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-fit">
      <div className="hidden lg:flex flex-col gap-32 inset-0 left-80 -z-1 absolute overflow-hidden pointer-events-none">
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
          className="flex-max -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
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
          className="flex-max -z-99 -rotate-25 md:rotate-45 flex whitespace-nowrap"
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
      <section className="flex md:justify-center h-fit lg:h-screen pt-24 lg:mt-0 items-center text-center flex-col lg:flex-row pb-10 relative overflow-hidden overflow-x-hidden">
        <div className="overflow-hidden lg:hidden -z-1 absolute inset-0 pointer-events-none w-full h-full">
          {/* MOBILE & Tablet */}
          {/* Sebelah kiri */}
          <motion.div
            animate={{ x: [0, -400] }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-max absolute -left-112.5 lg:right-0 -z-99 -rotate-25 lg:rotate-45 flex whitespace-nowrap"
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
            className="flex-max absolute -right-175 bottom-0 lg:-left-20 -z-99 -rotate-25 lg:rotate-45 flex whitespace-nowrap"
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
        <div className="lg:order-2 relative w-fit">
          <div className="absolute hidden md:block inset-0 backdrop-blur-md bg-white/5 rounded-full"></div>
          <img
            src={"/img/logo.png"}
            className="w-60 h-60 lg:w-100 lg:h-100 md:w-50 md:h-50 md:opacity-75 rounded-full shadow-2xl"
          />
        </div>
        <div className="lg:order-1 lg:text-left text-center w-fit">
          <p className="text-[#333333] mt-8 text-lg font-bold">
            Official Website Of
          </p>
          <p className="mt-3 text-4xl font-bold lg:text-7xl lg:w-150 w-100 text-wrap lg:leading-20 leading-12 text-[#333333]">
            MPK LETRIS INDONESIA 2
          </p>
          <p className="text-[#333333] mt-3 font-bold lg:text-2xl md:text-lg text-sm mix-blend-difference text-wrap">
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
    </div>
  );
};

export default HeroSection;
