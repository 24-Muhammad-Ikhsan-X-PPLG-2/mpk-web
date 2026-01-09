"use client";
import { fetchImages } from "@/lib/client/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const SectCarousel = () => {
  const [currentImg, setCurrentImg] = useState(1);
  const { isLoading, data: img } = useQuery({
    queryKey: ["img_home"],
    queryFn: fetchImages,
  });
  const handleNextImg = () => {
    if (!img) return;
    if (currentImg == img.length) {
      setCurrentImg(1);
    } else {
      setCurrentImg((prev) => prev + 1);
    }
  };
  const handlePrevImg = () => {
    if (!img) return;
    if (currentImg == 1) {
      setCurrentImg(img.length);
    } else {
      setCurrentImg((prev) => prev - 1);
    }
  };
  return (
    <section className="md:px-14 px-4" id="seminar">
      <div className="bg-[#333333] flex flex-col items-center w-full h-fit md:rounded-[50px] rounded-xl relative">
        <p className="md:text-4xl relative z-10 text-2xl text-white font-bold mt-12 text-center">
          Info Seminar & Workshop
        </p>
        {img && !isLoading ? (
          <div className="flex mt-16 gap-6 items-center relative overflow-hidden z-10">
            {img.length !== 1 && (
              <>
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
              </>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                key={`img-${currentImg}`}
              >
                <Image
                  width={450}
                  height={600}
                  src={img[currentImg - 1].img_url}
                  className="lg:w-[450px] lg:h-[600px] w-[300px] h-[400px] object-cover object-center rounded-xl"
                  loading="lazy"
                  alt=""
                />
              </motion.div>
            </AnimatePresence>
            <div className="bg-black/50 absolute md:bottom-5 bottom-3 left-3 md:left-5 backdrop-blur-md cursor-pointer p-3 rounded-full z-1">
              <a href={img[currentImg - 1].img_url} download={true}>
                <Download className="md:size-8 size-5 text-white" />
              </a>
            </div>
            <div className="absolute bottom-0 w-full h-20 flex justify-center items-center">
              <div className="bg-black/50 w-fit flex justify-center items-center backdrop-blur-sm  h-5 p-3 rounded-xl">
                <div className="flex gap-2">
                  {img.map((_, idx) => {
                    const id = ++idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setCurrentImg(id)}
                        className={`md:size-3 size-2 rounded-full ${
                          id == currentImg ? "bg-white" : "bg-white/50"
                        } cursor-pointer`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Image
            width={450}
            height={600}
            src={"https://placehold.co/450x600?text=Loading"}
            className="lg:w-[450px] lg:h-[600px] w-[300px] h-[400px] object-cover object-center rounded-xl mt-16"
            loading="lazy"
            alt=""
            unoptimized
          />
        )}
        <p className="text-white relative z-10 font-bold lg:text-2xl md:text-xl text-lg text-center w-[90%] mt-16 mb-16">
          Tujuan seminar & workshop adalah untuk menyebarkan pengetahuan
          teoretis dan keterampilan prakits serta wawasan terkini kepada audiens
          luas melalui presentasi ahli.
        </p>
        <Image
          width={256}
          height={256}
          src="/img/kanan-atas.webp"
          className="absolute top-0 right-0 md:w-64 w-32  md:rounded-tr-[50px] rounded-tr-xl"
          alt=""
        />
        <Image
          width={256}
          height={256}
          src="/img/kiri-bawah.webp"
          className="absolute bottom-0 left-0 md:w-64 w-32 md:rounded-bl-[50px] rounded-bl-xl"
          alt=""
        />
      </div>
    </section>
  );
};

export default SectCarousel;
