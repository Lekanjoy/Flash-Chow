"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { supabase } from "@/supabase";
import Image from "next/image";
import Link from "next/link";
import facebook from "@/public/assets/facebook.svg";
import google from "@/public/assets/google.svg";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!email || !password) return toast.warn("Please fill all the fields" );

    setLoading(true);
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      if (data) {
        setLoading(false);
        toast.success("Logged In");
        router.push("/choose-location");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }; 
  return (
    <section
      onSubmit={handleLogin}
      className="w-full p-4 bg-white text-secColor"
    >
      <h3 className="text-3xl mb-5 text-[#010F07]">Welcome back</h3>
      <p className="text-sm w-[300px]">
        Enter your Phone number or Email address for sign in. Enjoy your food
      </p>

      <form className="flex flex-col gap-y-4 mt-6">
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
        <Link
          href="/recover-password"
          className="text-[#010F07] text-xs font-light text-right"
        >
          Forgot Password?
        </Link>
        <button
          className={`text-white text-center bg-primColor rounded-md w-full py-4 text-sm
        ${loading ? "bg-opacity-50 cursor-not-allowed" : ""}
        `}
        >
          SIGN IN
        </button>
      </form>

      <div className="flex justify-center items-center w-full gap-x-3 text-xs my-5">
        <p className="text-[#010F07] font-light ">Don’t have account?</p>
        <Link href="/signup" className="text-primColor">
          Create new account
        </Link>
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
          <Image src={google} alt="google logo" />
          <p className="text-white font-medium uppercase">
            Connect with google
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
