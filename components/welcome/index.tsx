"use client";
import { useState, useEffect } from "react";
import { walkthroughs as walkthroughData } from "@/utils/walkthrough";
import Image from "next/image";
import Link from 'next/link'; 

const Welcome = () => {
  const [walkthroughs] = useState(walkthroughData);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Next Walkthroughs 
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
    <section className="w-full custom-height bg-white h-screen ">
      <div className="flex justify-center items-center w-full my-8">
        <Image
          src={walkthroughs[currentIndex].img}
          alt="Illustration"
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

        <div className="w-full fixed bottom-0 flex px-4 pb-4">
          <Link
            href="/login"
            className="  text-white text-center bg-primColor w-full py-4 text-sm"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
