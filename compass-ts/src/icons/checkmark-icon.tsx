import clsx from "clsx";
import type React from "react";

export function CheckmarkIcon({
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
        d="M10.0715 5.24298C10.2135 5.00628 10.5203 4.92926 10.757 5.0711C10.9937 5.21312 11.0708 5.5199 10.9289 5.75665L7.92892 10.7566C7.84978 10.8885 7.71436 10.977 7.56173 10.9959C7.40892 11.0147 7.25556 10.9622 7.14669 10.8533L5.14669 8.85333L5.08224 8.7752C4.95407 8.58112 4.97583 8.31716 5.14669 8.1463C5.31756 7.97543 5.58152 7.95368 5.7756 8.08184L5.85372 8.1463L7.4006 9.69317L10.0715 5.24298Z"
      />
    </svg>
  );
}
