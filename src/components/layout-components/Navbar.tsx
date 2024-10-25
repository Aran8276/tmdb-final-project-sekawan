import {
  ArrowRight,
  ChevronDown,
  CircleUser,
  Heart,
  LogOut,
  Search,
  Star,
  Telescope,
  /* Sheet */
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import {
  baseUrl,
  imgBaseUrlPoster,
  requestHeader,
  sessionIdGetter,
  sessionKeyName,
  str,
} from "@/Routes";
import { ModeToggle } from "../ModeToggle";
import SearchContext from "@/context/Search";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios, { AxiosError } from "axios";
import { Result } from "@/types/Search";
import HorizontalMovieCard from "../HorizontalMovieCard";
import { motion } from "framer-motion";
import { Account } from "@/types/Account";

export default function Navbar() {
  const [account, setAccount] = useState<Account | null>(null);
  const [data, setData] = useState<Result[]>([]);
  const context = useContext(SearchContext);
  const [isTop, setIsTop] = useState(true);
  const [hasSessionId, setHasSessionId] = useState(false);
  const [search, setSearch] = useState("");
  const [darkBgInLight, setDarkBg] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    if (sessionIdGetter) {
      setHasSessionId(true);
      fetchAccount();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.pathname == "/") {
      setDarkBg(true);
      return;
    }
    setDarkBg(false);
  }, [location]);

  useEffect(() => {
    fetchSearch(search);
  }, [search]);

  if (!context) {
    throw new Error("useContext must be used within a SearchContext Provider");
  }

  const fetchSearch = useCallback(
    async (query: string) => {
      try {
        const res = await axios.get(
          baseUrl + `/search/movie?query=${query}&include_adult=false`,
          requestHeader
        );
        setData(res.data.results);
        return;
      } catch (error: any) {
        console.log(error.message);
      }
    },
    [search]
  );

  const fetchAccount = async () => {
    try {
      const res = await axios.get(
        baseUrl + `/account/null?session_id=${sessionIdGetter}`,
        requestHeader
      );
      setAccount(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const handleLogout = () => {
    str.removeItem(sessionKeyName);
    window.location.replace("/login");
  };

  return (
    <header
      className={
        (darkBgInLight ? "text-white" : "text-black dark:text-white") +
        ` transition-all fixed flex w-full justify-between top-0 px-12 items-center pt-6 pb-5 z-10 ${
          isTop ? "" : "backdrop-blur-md"
        }`
      }
    >
      <section>
        <nav className="hidden flex-col md:space-x-4 gap-6 text-lg font-light md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-white"
          >
            Beranda
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex space-x-3 items-center text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-white">
              <span>Film</span>
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative top-3">
              <Link to="/list">
                <DropdownMenuItem className="flex space-x-3 items-center cursor-pointer">
                  <Telescope className="size-4" />
                  <span>Jelajah</span>
                </DropdownMenuItem>
              </Link>
              {hasSessionId ? (
                <>
                  <Link to="/favorites">
                    <DropdownMenuItem className="flex space-x-3 items-center cursor-pointer">
                      <Heart className="size-4" />
                      <span>Favorit</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/rated">
                    <DropdownMenuItem className="flex space-x-3 items-center cursor-pointer">
                      <Star className="size-4" />
                      <span>Daftar Ulas</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </section>
      <section>
        <h1 className="font-semibold text-2xl">Movie Sekawan</h1>
      </section>
      <section>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Dialog
            onOpenChange={(open: boolean) => {
              if (!open) {
                setData([]);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-transparent border-0"
                variant="outline"
                size="icon"
              >
                <Search className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
              </Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden bg-transparent border-0 shadow-none">
              <div className="relative">
                <div className="flex space-y-4 flex-col">
                  <form action={`/list?query=${search}&page=1`} method="GET">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-[0.7rem] h-4 w-4 text-muted-foreground" />
                      <Input
                        name="query"
                        type="searchString"
                        placeholder="Cari film..."
                        className="pl-10 w-full transition-all"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </form>
                  {data.length > 0 ? (
                    <div className="bg-background rounded-lg w-full p-4">
                      <div className="flex flex-col space-y-3">
                        {data.slice(0, 4).map((item, index) => {
                          return (
                            <HorizontalMovieCard
                              key={index}
                              title={item.title}
                              to={`/movie/${item.id}`}
                              img={imgBaseUrlPoster + item.poster_path}
                              description={item.overview}
                              growOnHover
                              isForSearch
                            />
                          );
                        })}
                      </div>
                      <motion.div initial={{ x: -10 }} whileHover={{ x: 0 }}>
                        <Link to={`/list?query=${search}&page=1`}>
                          <DialogClose className="flex items-center space-x-3 float-right px-4 pt-6">
                            <span>Lihat selengkapnya</span>
                            <ArrowRight />
                          </DialogClose>
                        </Link>
                      </motion.div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <ModeToggle />
          {sessionIdGetter ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex space-x-3 items-center text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-white">
                <Button
                  className="bg-transparent border-0"
                  variant="outline"
                  size="icon"
                >
                  <CircleUser className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative right-3">
                <DropdownMenuLabel>
                  Halo {account?.username} 👋
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="flex space-x-3 items-center cursor-pointer"
                >
                  <LogOut className="size-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-white"
            >
              Masuk
            </Link>
          )}
        </div>
      </section>
    </header>
  );
}
