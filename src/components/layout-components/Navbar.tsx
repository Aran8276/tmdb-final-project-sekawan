import {
  Clapperboard,
  Search,
  /* Sheet */
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
// import { SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { routeLists } from "@/Routes";
import { ModeToggle } from "../ModeToggle";
import ApplicationLogo from "../ApplicationLogo";
import SearchContext from "@/context/Search";
import { ChangeEvent, useContext, useEffect } from "react";

export default function Navbar() {
  const [page, setPage] = useSearchParams();
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useContext must be used within a SearchContext Provider");
  }
  const { setSearch } = context;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage({ query: e.target.value, page: "1" });
  };
  return (
    <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="pl-12 w-48">
        <ApplicationLogo />
      </div>
      <nav className="pl-8 hidden flex-col md:space-x-12 gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {routeLists.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      {/* <Sheet>
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
      </Sheet> */}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="searchString"
              placeholder="Cari film..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </form>
        <ModeToggle />
      </div>
    </header>
  );
}
