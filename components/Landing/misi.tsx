import { misi1, misi2 } from "@/constants/misi-data";
import React from "react";

const Misi = () => {
  return (
    <section className="mb-20 flex justify-center items-center flex-col w-screen">
      <p className="text-[#333333] mb-10 text-6xl font-bold text-center">
        Misi
      </p>

      <div className="flex flex-wrap justify-center items-center px-6 md:px-15 lg:px-24 gap-4">
        {misi1.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#333333] flex flex-col items-center w-72 h-100 rounded-2xl p-6"
          >
            <p className="font-bold mb-5 text-white text-3xl text-center">
              {item.id}.
            </p>
            {item.icon}
            <p className="text-base text-center mt-5 font-bold text-white">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center mt-3 items-center px-6 md:px-15 lg:px-24 gap-4">
        {misi2.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#333333] flex flex-col items-center w-72 h-100 rounded-2xl p-6"
          >
            <p className="font-bold mb-5 text-white text-3xl text-center">
              {item.id}.
            </p>
            {item.icon}
            <p className="text-base text-center mt-5 font-bold text-white">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Misi;
