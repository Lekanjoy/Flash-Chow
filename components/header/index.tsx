import Image from "next/image";
import logo from "@/public/assets/flashChowLogo.svg";

const Header = () => {
  return (
    <header className="fixed w-full h-[50px] bg-white shadow-md p-4 top-0 flex items-center justify-between">
      <Image src={logo} width={50} height={50} alt="FlashChow Logo" />
      <h1 className="text-2xl font-semibold italic">
        Flash⚡<span className="text-primColor">Chow</span>
      </h1>
    </header>
  );
};

export default Header;
