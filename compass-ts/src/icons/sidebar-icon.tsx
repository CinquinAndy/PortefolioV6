import clsx from "clsx";
import type React from "react";

export function SidebarIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 14"
      fill="none"
      className={clsx(className, "h-3.5 shrink-0")}
      {...props}
    >
      <path d="M5.5 0.5H2.5C1.39543 0.5 0.5 1.39543 0.5 2.5V11.5C0.5 12.6046 1.39543 13.5 2.5 13.5H5.5M5.5 0.5H13.5C14.6046 0.5 15.5 1.39543 15.5 2.5V11.5C15.5 12.6046 14.6046 13.5 13.5 13.5H5.5M5.5 0.5V13.5" />
    </svg>
  );
}
