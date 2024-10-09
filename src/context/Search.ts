import { createContext, Dispatch, SetStateAction } from "react";

interface SearchContextType {
  searchString: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;
