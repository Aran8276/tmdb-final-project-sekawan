import Footer from "@/components/layout-components/Footer";
import Navbar from "@/components/layout-components/Navbar";
import React, { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{props.children}</main>
      <Footer />
    </>
  );
}
