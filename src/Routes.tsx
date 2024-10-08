import { ReactNode } from "react";
import HomePage from "./pages/Home/HomePage";
import Favorite from "./pages/Favorite";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyList from "./pages/MyList";

export interface RouteList {
  label: string;
  href: string;
  element: ReactNode;
}

// Public Constants
export const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export const imgBaseUrl = import.meta.env.VITE_IMG_BASE_URL;
export const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiKey = import.meta.env.VITE_TMDB_API_KEY;
export const requestHeader = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

export const getTrailerSrcById = (id: string) => {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",

    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  const ordinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Covers 11th to 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix(dayOfMonth)}`;
};
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
  {
    label: "Daftar",
    href: "/list",
    element: <MyList />,
  },
];
