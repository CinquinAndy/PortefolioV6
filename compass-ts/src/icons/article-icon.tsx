import clsx from "clsx";
import type React from "react";

export function ArticleIcon({
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
      <path
        fill="none"
        d="M1.5 2.5C1.5 1.39543 2.39543 0.5 3.5 0.5H12.5C13.6046 0.5 14.5 1.39543 14.5 2.5V13.5C14.5 14.6046 13.6046 15.5 12.5 15.5H3.5C2.39543 15.5 1.5 14.6046 1.5 13.5V2.5Z"
      />
      <rect stroke="none" x="4" y="3" width="8" height="1" />
      <rect stroke="none" x="4" y="6" width="7" height="1" />
      <rect stroke="none" x="4" y="9" width="8" height="1" />
      <rect stroke="none" x="4" y="12" width="7" height="1" />
    </svg>
  );
}
