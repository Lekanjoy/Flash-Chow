'use client'
import {useState} from 'react'
import Image from "next/image";
import home from "@/public/assets/home.svg";
import profile from "@/public/assets/profile.svg";
import orders from "@/public/assets/orders.svg";
import search from "@/public/assets/search.svg";
import Link from 'next/link';

interface footerDataProps{
    id: number,
    img: string,
    name: string,
}
const footerData: footerDataProps[] = [
  {
    id: 0,
    name: "Home",
    img: home,
  },
  {
    id: 1,
    name: "Search",
    img: search,
  },
  {
    id: 2,
    name: "Orders",
    img: orders,
  },
  {
    id: 3,
    name: "Profile",
    img: profile,
  },
];

const Footer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <footer className="fixed bg-white  border-t z-10 bottom-0 left-0 flex gap-x-4 justify-between items-center w-full px-7 py-4">
      {footerData.map((data, index) => {
        return (
          <Link href={'/' + data.name.toLowerCase()} 
                      onClick={() => setCurrentIndex(index)}
            className={`
                flex items-center flex-col cursor-pointer
              ${currentIndex === index ? "text-primColor" : "text-secColor"}
              
            `}
            key={data.id}
          >
            <Image src={data.img} alt={data.name} />
            <p>{data.name}</p>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
