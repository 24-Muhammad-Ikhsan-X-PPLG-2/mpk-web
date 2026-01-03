"use client";

const ImageWallpaper = () => {
  return (
    <div className="h-80  w-full relative">
      <img
        src="/img/wallpaper/1.jpg"
        className="h-80 w-full object-cover object-center rounded-xl"
        alt=""
      />
      <div className="absolute bottom-0 rounded-b-xl w-full h-[70%] bg-linear-to-t from-black to-transparent flex justify-center items-end">
        <p className="text-lg text-white font-bold mb-10">
          Welcome to admin panel
        </p>
      </div>
    </div>
  );
};

export default ImageWallpaper;
