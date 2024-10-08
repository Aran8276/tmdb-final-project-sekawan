import { ReactNode } from "react";
import HomePage from "./pages/HomePage";
import Favorite from "./pages/Favorite";
import About from "./pages/About";
import Contact from "./pages/Contact";

export interface RouteList {
  label: string;
  href: string;
  element: ReactNode;
}

export const routeLists: RouteList[] = [
  {
    label: "Beranda",
    href: "/",
    element: <HomePage />,
  },
  {
    label: "Favorit",
    href: "/favorites",
    element: <Favorite />,
  },
  {
    label: "Tentang",
    href: "/about",
    element: <About />,
  },
  {
    label: "Kontak",
    href: "/contact",
    element: <Contact />,
  },
];
