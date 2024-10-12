import { ReactNode } from "react";
import HomePage from "./pages/Home/Home";
import Favorite from "./pages/Favorite";
import About from "./pages/About";
import Contact from "./pages/Contact";
import List from "./pages/List/List";

export interface RouteList {
  label: string;
  href: string;
  element: ReactNode;
}

export const weekdays = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];

// Public Constants
export const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export const imgBaseUrlPoster = import.meta.env.VITE_IMG_BASE_URL + "/w500";
export const imgBaseUrlFull = import.meta.env.VITE_IMG_BASE_URL + "/original";
export const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiKey = import.meta.env.VITE_TMDB_API_KEY;
export const verifyURL = import.meta.env.VITE_API_VERIFY_TOKEN_URL;
export const requestHeader = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

export const getTrailerSrcById = (id: string) => {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}`;
};

export const formatDate = (dateString: string, hasDate?: boolean) => {
  const date = new Date(dateString);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  const dayOfWeek = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  if (hasDate) {
    return `${dayOfWeek}, ${dayOfMonth} ${month}, ${year}`;
  }
  return `${dayOfMonth} ${month}, ${year}`;
};
export const routeLists: RouteList[] = [
  {
    label: "Beranda",
    href: "/",
    element: <HomePage />,
  },
  {
    label: "Film",
    href: "/list",
    element: <List />,
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
  // {
  //   label: "Test",
  //   href: "/test",
  //   element: <Test />,
  // },
];
