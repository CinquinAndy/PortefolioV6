import clsx from "clsx";
import type React from "react";

export function ClockIcon({
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
      <circle cx="8" cy="8" r="7.5" />
      <path d="M8 4V8H12" />
    </svg>
  );
}
