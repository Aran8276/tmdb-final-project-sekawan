import Navbar from "@/components/layout-components/Navbar";
import React, { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-8">{props.children}</main>
    </>
  );
}
