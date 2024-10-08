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

export const imgBaseUrl = import.meta.env.VITE_IMG_BASE_URL;
export const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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
