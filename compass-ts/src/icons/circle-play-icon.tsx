import clsx from "clsx";
import type React from "react";

export function CirclePlayIcon({
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
      <circle fill="none" cx="8" cy="8" r="7.5" />
      <path
        stroke="none"
        d="M10.25 7.56699C10.5833 7.75944 10.5833 8.24056 10.25 8.43301L7.25 10.1651C6.91667 10.3575 6.5 10.117 6.5 9.73205L6.5 6.26795C6.5 5.88305 6.91667 5.64249 7.25 5.83494L10.25 7.56699Z"
      />
    </svg>
  );
}
