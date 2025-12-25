import React from "react";

const About = () => {
  return (
    <>
      <div className="bg-[#a18f31] w-full h-3"></div>
      <section className="bg-white w-full h-fit md:h-70">
        <div className="flex md:flex-row flex-col justify-center items-center h-fit md:h-70 md:gap-24 gap-10 w-full">
          <div className="md:pl-10">
            <img
              src="/img/smk-logo.png"
              className="md:w-60 w-50 mt-10 md:mt-0"
              alt=""
            />
          </div>
          <div className="px-14 mb-20 md:mb-0">
            <p className="text-[#333333] font-semibold text-lg">Tentang MPK</p>
            <p className="text-[#333333] md:text-3xl text-2xl font-bold mt-2">
              MPK adalah Majelis Perwakilan Kelas
            </p>
            <p className="text-[#333333] md:text-base text-sm mt-2 md:w-[600px]">
              Merupakan organisasi siswa di sekolah yang berfungsi sebagai
              lembaga legislatif, mengawasi, mengevaluasi, dan membantu kinerja
              OSIS (Organisasi Siswa Intra Sekolah), serta menjadi penyalur
              aspirasi siswa dari setiap kelas kepada pihak sekolah. MPK Letris
              Indonesia 2 disahkan pada 25 Oktober 2024 melalui musyawarah
              besar.
            </p>
          </div>
        </div>
      </section>
      <div className="bg-[#a18f31] w-full h-3 mb-28"></div>
    </>
  );
};

export default About;
