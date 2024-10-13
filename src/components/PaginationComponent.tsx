import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchContext from "@/context/Search";
import { useContext, useEffect } from "react";
import { SetURLSearchParams } from "react-router-dom";

interface SelfProps {
  steps: number;
  current: number;
  pageHandler: SetURLSearchParams;
  max?: number;
  noQuery?: boolean;
}

export default function PaginationComponent(props: SelfProps) {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useContext must be used within a SearchContext Provider");
  }
  const { searchString } = context;
  const getPaginationItems = (steps: number, current: number) => {
    const totalPages = props.max || steps + current;
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, current + 2);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    window.scrollTo(0, 0);
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer select-none"
            onClick={() => {
              if (props.current > 1) {
                if (props.noQuery) {
                  props.pageHandler({
                    page: (props.current - 1).toString(),
                  });
                  return;
                }
                props.pageHandler({
                  query: searchString,
                  page: (props.current - 1).toString(),
                });
              }
            }}
          />
        </PaginationItem>

        {getPaginationItems(props.steps, props.current).map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="cursor-pointer select-none"
              onClick={() => {
                if (props.noQuery) {
                  props.pageHandler({
                    page: page.toString(),
                  });
                  return;
                }
                props.pageHandler({
                  query: searchString,
                  page: page.toString(),
                });
              }}
              isActive={page === props.current}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer select-none"
            onClick={() => {
              if (props.noQuery) {
                if (props.current < (props.max || props.steps)) {
                  props.pageHandler({
                    page: (props.current + 1).toString(),
                  });
                  return;
                }
                props.pageHandler({
                  query: searchString,
                  page: (props.current + 1).toString(),
                });
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
