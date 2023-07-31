"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";

import { PaginationProps } from "@/utils/interfaces";

const Pagination = ({
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) => {
  const router = useRouter();
  const handleNavigation = (val: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (val === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    }
    if (val === "first" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;
    router.push(newPathname);
  };
  return (
    <div className="w-full flexCenter mt-10 gap-5">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasNextPage && (
        <Button title="Next" handleClick={() => handleNavigation("next")} />
      )}
    </div>
  );
};

export default Pagination;
