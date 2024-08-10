import Link from "next/link";
import cn from "classnames";

interface PaginationProps {
  total: number;
  current: number;
  pathname: string;
}

export default function Pagination({
  current,
  total,
  pathname,
}: PaginationProps) {
  return (
    <div className="join">
      <Link
        href={{ pathname, query: { p: current - 1 } }}
        className={cn("btn join-item", {
          "btn-disabled pointer-events-none": current === 1,
        })}
      >
        «
      </Link>

      <Link
        href={{
          pathname,
          query: { p: 1 },
        }}
        className={cn("btn join-item", { "btn-active": current === 1 })}
      >
        1
      </Link>

      {current > 2 && <span className="btn btn-disabled join-item">...</span>}

      {current > 1 && current < total && (
        <Link
          href={{
            pathname,
            query: { p: 1 },
          }}
          className="btn join-item btn-active"
        >
          1
        </Link>
      )}

      {total - current > 1 && (
        <span className="btn btn-disabled join-item">...</span>
      )}

      <Link
        href={{
          pathname,
          query: { p: total },
        }}
        className={cn("btn join-item", { "btn-active": current === total })}
      >
        {total}
      </Link>

      <Link
        href={{ pathname, query: { p: current + 1 } }}
        className={cn("btn join-item", {
          "btn-disabled pointer-events-none": current === total,
        })}
      >
        »
      </Link>
    </div>
  );
}
