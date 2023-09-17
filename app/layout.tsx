"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/header";
import Footer from "@/components/footer";

// export const metadata: Metadata = {
//   title: "FLASH⚡CHOW",
//   description:
//     "Order your favorite food and cravings from your favorite restaurants and get it in a flash.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWelcomeOrRegistrationPages =
    pathname === "/" ||
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/recover-password" ||
    pathname === "/choose-location";

  return (
    <html lang="en">
      <body className="pt-[54px]">{children}</body>
      <Header />
      <NextTopLoader color="#EEA734" showSpinner={false} shadow={false} />
      <ToastContainer />
      {isWelcomeOrRegistrationPages ? null : <Footer />}
    </html>
  );
}
