"use client";
import { useState, useEffect } from "react";
import { walkthroughs as walkthroughData } from "@/utils/walkthrough";
import Image from "next/image";
import Link from 'next/link'; 
import logo from "@/public/assets/flashChowLogo.svg";
import circleBg from "@/public/assets/circle-Bg.svg";

const Welcome = () => {
  const [walkthroughs] = useState(walkthroughData);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Previous Walkthroughs Click
  const handleNextWalkthrough = () => { 
    setCurrentIndex((prevState) =>
      prevState < walkthroughs.length - 1 ? prevState + 1 : (prevState = 0)
    );
  };

  //AutoPlay Walkthroughs
  useEffect(() => {
    setInterval(() => {
      handleNextWalkthrough();
    }, 10000);
  }, []);

  return (
    <section className=" w-full  bg-white">
      <div className="flex items-center justify-between">
        <Image src={logo} alt="FlashChow Logo" />
        <h1 className="text-2xl font-semibold italic">
          Flash⚡<span className="text-primColor">Chow</span>
        </h1>
      </div>

      {walkthroughs[0].img ? (
        <div className="absolute left-0 top-0">
          <Image src={circleBg} alt="" />
        </div>
      ) : null}

      <div className="flex justify-center items-center w-full my-4">
        <Image
          src={walkthroughs[currentIndex].img}
          alt="Welcome page Illustration"
          width={214}
          height={244}
        />
      </div>
      <div className="flex items-center flex-col text-[#3A3A3A]">
        <h2 className="mb-6 text-[28px] font-semibold ">
          {walkthroughs[currentIndex].title}
        </h2>
        <p className="text-sm text-center mb-[40px] max-w-[330px]">
          {walkthroughs[currentIndex].text}
        </p>

        <div className="w-full flex items-center justify-center gap-x-[6px] mb-[40px]">
          {walkthroughs.map((_, index) => {
            return (
              <div
                onClick={() => setCurrentIndex(index)} 
                key={index}
                className={`w-[10px] h-[5px] rounded-[41px] cursor-pointer ${
                  currentIndex === index ? "bg-[#22A45D]" : " bg-[#868686]"
                }`}
              ></div>
            );
          })}
        </div>

        <Link href="/login" className="text-white text-center bg-primColor w-full py-4 text-sm">
          GET STARTED
        </Link> 
      </div>
    </section>
  );
};

export default Welcome;
