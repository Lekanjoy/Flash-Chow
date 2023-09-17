"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/header";
import Footer from "@/components/footer";



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
      <Provider store={store}>
      <body className="pt-[54px]">{children}</body>
      </Provider>
      <Header />
      <NextTopLoader color="#EEA734" showSpinner={false} shadow={false} />
      <ToastContainer />
      {isWelcomeOrRegistrationPages ? null : <Footer />}
    </html>
  );
}
