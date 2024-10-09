import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SetURLSearchParams } from "react-router-dom";

interface SelfProps {
  steps: number;
  current: number;
  pageHandler: SetURLSearchParams;
  max?: number;
}

export default function PaginationComponent(props: SelfProps) {
  const getPaginationItems = (steps: number, current: number) => {
    const totalPages = props.max || steps + current;
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, current + 2);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
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
                props.pageHandler({ page: (props.current - 1).toString() });
              }
            }}
          />
        </PaginationItem>

        {getPaginationItems(props.steps, props.current).map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className="cursor-pointer select-none"
              onClick={() => props.pageHandler({ page: page.toString() })}
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
              if (props.current < (props.max || props.steps)) {
                props.pageHandler({ page: (props.current + 1).toString() });
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
