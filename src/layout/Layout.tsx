import Footer from "@/components/layout-components/Footer";
import Navbar from "@/components/layout-components/Navbar";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{props.children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
