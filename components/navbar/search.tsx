"use client";

import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleQueryChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  return (
    <div className="form-control">
      <input
        name="q"
        type="text"
        placeholder="Search"
        onChange={handleQueryChange}
        className="input input-sm input-bordered w-full min-w-10 sm:w-auto"
      />
    </div>
  );
}
