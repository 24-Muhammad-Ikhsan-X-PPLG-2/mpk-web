import Link from "next/link";

export const listNavbar = [
  {
    display: "Keuangan",
    link: "#",
  },
  {
    display: "Publikasi",
    link: "#",
  },
  {
    display: "Surat",
    link: "#",
  },
];
const Navbar = () => {
  return (
    <>
      <nav className="bg-[#D4AF37] w-full lg:h-19.75 h-14 lg:p-2 p-1 px-4 lg:px-28 lg:px-24 fixed top-0 z-999">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex gap-2 items-center">
            <img src="/img/logo.png" className="lg:w-12 md:w-10 w-8" />
            <p className="text-white lg:text-lg font-bold">MPK LETRIS 2</p>
          </div>
          <div className="lg:flex gap-7 hidden">
            {listNavbar.map((item, idx) => (
              <p
                key={idx}
                className={`font-semibold ${
                  item.display == "Surat" ? "text-[#dacc86]" : "text-white"
                }`}
              >
                {item.display}
              </p>
            ))}
          </div>
          <Link href={"/signin"}>
            <button className="bg-transparent border border-slate-200 w-20.5 h-10.75 text-lg shadow-2xl rounded-lg text-white font-semibold lg:block hidden cursor-pointer">
              Login
            </button>
          </Link>
          <button className="w-8 h-fit lg:hidden">
            <img src={"/img/button-nav.png"} className="w-8" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
