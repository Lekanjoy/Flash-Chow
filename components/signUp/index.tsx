"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

const SignUp = () => {
  // Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (data) {
        alert("Check your email for confirmation");
      }

      if (error) {
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // verify login with OTP
  const [number, setNumber] = useState("");

  const otpLogin = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signInWithOtp({
        phone: number,
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (data) {
        alert("Check your SMS for OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border-none"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border-none"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-md hover:opacity-80"
        >
          Sign Up
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-12">
        <input
          type="phone"
          placeholder="Phone Number"
          onChange={(e) => setNumber(e.target.value)}
          className="p-2 rounded border-none"
        />
        <button
          onClick={otpLogin}
          type="submit"
          className="bg-green-600 text-white p-2 rounded-md hover:opacity-80"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
export default SignUp;