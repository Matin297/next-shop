"use client";

import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
    <div className="form-control w-full sm:max-w-md">
      <input
        name="q"
        type="text"
        defaultValue={searchParams.get("q") || ""}
        placeholder="Search"
        onChange={handleQueryChange}
        className="input input-bordered"
      />
    </div>
  );
}
