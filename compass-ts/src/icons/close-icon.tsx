import clsx from "clsx";
import type React from "react";

export function CloseIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={clsx(className, "h-4 shrink-0")}
      {...props}
    >
      <path d="M5 5L11 11M11 5L5 11" strokeLinecap="square" />
    </svg>
  );
}
