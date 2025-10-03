import clsx from "clsx";
import type React from "react";

export function BookIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={clsx(className, "h-4 shrink-0")}
      {...props}
    >
      <path
        d="M13.5 12.5V.5H4.5M13.5 12.5l-.26.39c-.45.67-.45 1.48 0 2.15l.26.46H4c-.83 0-1.5-.67-1.5-1.5v0M13.5 12.5H4.5M2.5 14V2.5C2.5 1.4 3.4.5 4.5.5v0M2.5 14c0-.83.67-1.5 1.5-1.5h.5M4.5.5v12"
        strokeLinejoin="round"
      />
    </svg>
  );
}
