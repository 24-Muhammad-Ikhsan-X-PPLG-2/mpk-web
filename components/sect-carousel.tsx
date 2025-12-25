"use client";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
// const images = [
//   "/img/seminar/seminar1.jpeg",
//   "/img/seminar/seminar2.jpeg",
//   "/img/seminar/seminar3.jpeg",
// ];
const images = [
  {
    item: 1,
    img: "/img/seminar/seminar1.jpeg",
  },
  {
    item: 2,
    img: "/img/seminar/seminar2.jpeg",
  },
  {
    item: 3,
    img: "/img/seminar/seminar3.jpeg",
  },
];

const SectCarousel = () => {
  const [currentImg, setCurrentImg] = useState(1);
  const handleNextImg = () => {
    if (currentImg == 3) {
      setCurrentImg(1);
    } else {
      setCurrentImg((prev) => prev + 1);
    }
  };
  const handlePrevImg = () => {
    if (currentImg == 1) {
      setCurrentImg(3);
    } else {
      setCurrentImg((prev) => prev - 1);
    }
  };
  return (
    <section className="md:px-14 px-4">
      <div className="bg-[#333333] flex flex-col items-center w-full h-fit rounded-[50px] relative">
        <p className="md:text-4xl relative z-10 text-2xl text-white font-bold mt-12 text-center">
          Info Seminar & Workshop
        </p>
        <div className="flex mt-16 gap-6 items-center relative overflow-hidden">
          <div
            className="text-white absolute left-5 cursor-pointer bg-[#333333]/50 p-2 rounded-full backdrop-blur-md"
            onClick={handlePrevImg}
          >
            <ArrowLeft className="md:size-8 size-5" />
          </div>
          <div
            className="text-white absolute right-5 cursor-pointer bg-[#333333]/50 p-2 rounded-full backdrop-blur-md"
            onClick={handleNextImg}
          >
            <ArrowRight className="md:size-8 size-5" />
          </div>
          <AnimatePresence mode="wait">
            <motion.img
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              key={`img-${currentImg}`}
              src={images[currentImg - 1].img}
              className="md:w-[450px] md:h-[600px] w-[350px] h-[500px] object-cover object-center rounded-xl cursor-pointer"
              alt=""
            />
          </AnimatePresence>
          <div className="bg-black/50 absolute md:bottom-5 bottom-3 left-3 md:left-5 backdrop-blur-md cursor-pointer p-3 rounded-full z-1">
            <a href={images[currentImg - 1].img} download={true}>
              <Download className="md:size-8 size-5 text-white" />
            </a>
          </div>
          <div className="absolute bottom-0 w-full h-20 flex justify-center items-center">
            <div className="bg-black/50 w-fit flex justify-center items-center backdrop-blur-sm  h-5 p-3 rounded-xl">
              <div className="flex gap-2">
                {images.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentImg(item.item)}
                    className={`md:size-3 size-2 rounded-full ${
                      item.item == currentImg ? "bg-white" : "bg-white/50"
                    } cursor-pointer`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-white relative z-10 font-bold md:text-2xl text-xl text-center w-[90%] mt-16 mb-16">
          Tujuan seminar & workshop adalah untuk menyebarkan pengetahuan
          teoretis dan keterampilan prakits serga wawasan terkini kepada audiens
          luas melalui presentasi ahli.
        </p>
        <img
          src="/img/kanan-atas.png"
          className="absolute top-0 right-0 md:w-64 w-32  rounded-tr-[50px]"
          alt=""
        />
        <img
          src="/img/kiri-bawah.png"
          className="absolute bottom-0 left-0 md:w-64 w-32 rounded-bl-[50px]"
          alt=""
        />
      </div>
    </section>
  );
};

export default SectCarousel;
