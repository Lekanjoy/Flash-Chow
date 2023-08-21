"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import facebook from "@/public/assets/facebook.svg";
import google from "@/public/assets/google.svg";
import { supabase } from "@/supabase";

const SignUp = () => {
  const router = useRouter();
  // Signup
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Send user to database
  const sendUserToDatabase = async () => {
    const { data, error } = await supabase
      .from("Users")
      .insert([{ email: email, full_name: name }]);
    if (error) {
      toast.error(error.message);
      console.log(error);
      return;
    }
    if (data) {
      toast.success("User Profile Created");
    }
  };

  // Handle Signup
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { data, error } = await supabase.auth.signUp({
         email,
        password,
      });
      sendUserToDatabase(); 

      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      if (data) {
        setLoading(false);
       toast.success("Account Created");
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="w-full p-4 bg-white text-secColor">
      <h3 className="text-3xl mb-5 text-[#010F07]">Create Account</h3>
      <p className="text-sm w-[300px]">
        Enter your Name, Email and Password for sign up.{" "}
        <Link href="/login" className="text-primColor">
          Already have account?
        </Link>
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-y-4 mt-6">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className="font-light text-xs">
            FULL NAME
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-primColor text-[#010F07] outline-none p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-y-2">
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

        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="font-light text-xs">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-primColor text-[#010F07] outline-none p-2 rounded"
          />
        </div>
        <button
          
         className={`text-white text-center bg-primColor rounded-md w-full py-4 text-sm
        ${loading ? "bg-opacity-50 cursor-not-allowed" : ""}`}>
          SIGN UP
        </button>
      </form>

      <div className="flex justify-center items-center w-full  text-xs my-5">
        By Signing up you agree to our Terms Conditions & Privacy Policy.
      </div>
      <div className="text-center">Or</div>

      <div className="flex flex-col gap-y-3 mt-6">
        <div className="flex items-center w-full bg-[#395998] rounded-md py-2 px-4 gap-x-[30px] text-xs">
          <Image src={facebook} alt="facebook logo" />
          <p className="text-white font-medium uppercase">
            Connect with Facebook
          </p>
        </div>
        <div className="flex items-center w-full bg-[#4285F4] rounded-md py-2 px-4 gap-x-[30px] text-xs ">
          <Image src={google} alt="facebook logo" />
          <p className="text-white font-medium uppercase">
            Connect with Facebook
          </p>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
