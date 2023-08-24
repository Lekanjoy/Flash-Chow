import Image from "next/image";
import Link from 'next/link'
import logo from "@/public/assets/flashChowLogo.svg";

const Header = () => {
  return (
    <header className="fixed w-full h-[50px] bg-white shadow-md p-4 top-0 flex items-center justify-between">
      <Link href='/'>
      <Image src={logo} width={30} height={30} alt="FlashChow Logo" />
      </Link>
      <h1 className="text-xl font-semibold italic">
        Flash⚡<span className="text-primColor">Chow</span>
      </h1>
    </header>
  );
};

export default Header;
