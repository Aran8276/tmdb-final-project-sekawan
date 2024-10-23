import {
  ArrowRight,
  ChevronDown,
  Heart,
  Search,
  Star,
  Telescope,
  /* Sheet */
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { baseUrl, imgBaseUrlPoster, requestHeader } from "@/Routes";
import { ModeToggle } from "../ModeToggle";
import SearchContext from "@/context/Search";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Result } from "@/types/Search";
import HorizontalMovieCard from "../HorizontalMovieCard";

export default function Navbar() {
  const [data, setData] = useState<Result[]>([]);
  const context = useContext(SearchContext);
  const [isTop, setIsTop] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <header
      className={`text-white transition-all dark:text-white fixed flex w-full justify-between top-0 px-12 items-center pt-6 pb-5 z-10 ${
        isTop ? "" : "backdrop-blur-md"
      }`}
    >
      <section>
        <nav className="hidden flex-col md:space-x-4 gap-6 text-lg font-light md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-foreground"
          >
            Beranda
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex space-x-3 items-center text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-foreground">
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
                      <Link to={`/list?query=${search}&page=1`}>
                        <DialogClose className="flex items-center space-x-3 float-right px-4 pt-6">
                          <span>See more results</span>
                          <ArrowRight />
                        </DialogClose>
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <ModeToggle />
        </div>
      </section>
    </header>
  );
}

/*
      <nav className="pl-8 hidden flex-col md:space-x-12 gap-6 text-lg font-light md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* {routeLists.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.href}
              className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          );
        })} */
//   <Link className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-foreground">
//     Movie
//   </Link>
//   <Link className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-foreground">
//     New & Popular
//   </Link>
// </nav>

// <span>Logo Here</span>

{
  /* <Sheet>

  
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link to="#" className="hover:text-foreground">
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet> */
}
// <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
//   <form className="ml-auto flex-1 sm:flex-initial">
//     <div className="relative">
//       <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//       <Input
//         type="searchString"
//         placeholder="Cari film..."
//         className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
//         onChange={(e) => handleSearch(e)}
//       />
//     </div>
//   </form>
//   <ModeToggle />
{
  /* <Link to="/link">
          <Button variant="outline">Masuk</Button>
        </Link> */
}
{
  /* </div> */
  /*
  {routeLists.map((item, index) => {
    return (
      <Link
        key={index}
        to={item.href}
        className="text-muted-foreground text-[16px] tracking-wide transition-colors hover:text-foreground"
      >
        {item.label}
      </Link>
    );
  })}{" "}
  */
}
