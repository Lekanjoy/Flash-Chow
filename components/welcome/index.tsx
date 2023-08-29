"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { walkthroughs as walkthroughsData } from "@/utils/walkthrough";
import Image from "next/image";
import Link from "next/link";

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Next Walkthroughs
  const handleNextWalkthrough = () => {
    setCurrentIndex((prevState) =>
      prevState < walkthroughsData.length - 1 ? prevState + 1 : (prevState = 0)
    );
  };

  //AutoPlay Walkthroughs
  useEffect(() => {
    setInterval(() => {
      handleNextWalkthrough();
    }, 10000);
  }, []);

  return (
    <section className="w-full relative custom-height bg-white h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" flex justify-center items-center w-full my-8">
            <Image
              src={walkthroughsData[currentIndex].img}
              alt="Illustration"
              width={214}
              height={244}
            />
          </div>
          <div className=" flex items-center flex-col text-[#3A3A3A]">
            <h2 className=" mb-6 text-[28px] font-semibold ">
              {walkthroughsData[currentIndex].title}
            </h2>
            <p className="text-sm text-center mb-[40px] max-w-[330px]">
              {walkthroughsData[currentIndex].text}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="w-full flex items-center justify-center gap-x-[6px] mb-[40px]">
        {walkthroughsData.map((_, index) => {
          return (
            <div
              key={index}
              className={`w-[10px] h-[5px] rounded-[41px] cursor-pointer ${
                currentIndex === index ? "bg-[#22A45D]" : " bg-[#868686]"
              }`}
            ></div>
          );
        })}
      </div>

      <div className="w-full fixed left-0 px-4 bottom-0 flex pb-4">
        <Link
          href="/login"
          className="text-white text-center bg-primColor w-full py-4 text-sm"
        >
          GET STARTED
        </Link>
      </div>
    </section>
  );
};

export default Welcome;
