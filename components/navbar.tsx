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
      <nav className="bg-[#D4AF37] w-full md:h-19.75 h-14 md:p-2 p-1 px-4 lg:px-28 md:px-24 fixed top-0 z-999">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex gap-2 items-center">
            <img src="/img/logo.png" className="md:w-12 w-8" />
            <p className="text-white md:text-lg font-bold">MPK LETRIS 2</p>
          </div>
          <div className="md:flex gap-7 hidden">
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
          <button className="bg-transparent border border-slate-200 w-20.5 h-10.75 text-lg shadow-2xl rounded-lg text-white font-semibold md:block hidden cursor-pointer">
            Login
          </button>
          <button className="w-8 h-fit md:hidden">
            <img src={"/img/button-nav.png"} className="w-8" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
