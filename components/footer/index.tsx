"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { footerData } from "@/utils/footerData";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="fixed bg-white  border-t z-10 bottom-0 left-0 flex gap-x-4 justify-between items-center w-full px-7 py-4">
      {footerData.map((data) => {
        const URL = "/" + data.name.toLowerCase();
        return (
          <Link
            key={data.id} 
            href={URL}
            className={`
                flex items-center flex-col cursor-pointer
              ${pathname === URL ? "text-primColor" : "text-secColor"}
              
            `}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d={data.path}
                fill={pathname === URL ? "#EEA734" : "#868686"}
              />
            </svg>
            <p>{data.name}</p>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
