"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/supabase";
import Image from "next/image";
import doodle from "@/public/assets/doodles.svg";

const RecoverPassword = () => {
  const [isResetSent, setIsResetSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const initialTime: number = 120; // 2 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeRemaining]);

  // Format time
   const minutes: number = Math.floor(timeRemaining / 60);
   const seconds: number = timeRemaining % 60;
   const timeFormat: string = `${minutes.toString().padStart(2, "0")}:${seconds
     .toString()
     .padStart(2, "0")}`;

   // Start countdown
   const startCountdown = (): void => {
     setIsRunning(true);
     setTimeRemaining(initialTime); // Reset timeRemaining to initial value
   };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  Check if email is empty or contains empty spaces
    if (!email) return toast.error("Email is required");

    try {
      let { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setIsRunning(false);
        toast.error(error.message);
        console.log(error);

        return;
      }
      if (data) {
        startCountdown();
        toast.success("Please check your email");
        setIsResetSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handlePasswordReset}
      className="w-full p-4 bg-white text-secColor"
    >
      <h3 className="text-3xl mb-5 text-[#010F07]">Forgot Password</h3>
      <p className="text-sm w-[300px]">
        Enter your email address and we will send you a reset instructions
      </p>
      <div className="flex flex-col gap-y-2 mt-4">
        <label htmlFor="email" className="font-light text-xs">
          EMAIL ADDRESS
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-primColor text-[#010F07] outline-none p-2 rounded"
        />
      </div>
      <button
        disabled={isRunning}
        className={`text-white text-center mt-3 bg-primColor rounded-md w-full py-4 text-sm ${
          isRunning ? "bg-opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {!isResetSent
          ? "RESET PASSWORD"
          : `RESEND AGAIN ${timeRemaining > 1 ? `IN ${timeFormat}` : ""}`}
      </button>
      {isResetSent && (
        <div className="flex justify-center items-center w-full  mt-9">
          <Image src={doodle} alt="doodle" />
        </div>
      )}
    </form>
  );
};
export default RecoverPassword;
