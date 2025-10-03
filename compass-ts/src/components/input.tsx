"use client";

import { clsx } from "clsx";
import {
  OTPInput as BaseOTPInput,
  SlotProps as BaseOTPSlotProps,
  REGEXP_ONLY_DIGITS,
} from "input-otp";
import type React from "react";

export function TextInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={clsx(
        className,
        "block w-full rounded-lg bg-white px-3 py-1.5",
        "text-base/6 text-gray-950 sm:text-sm/6 dark:text-white",
        "outline -outline-offset-1 outline-gray-950/15 focus:outline-2 focus:outline-blue-500 dark:bg-white/10 dark:outline-white/15",
      )}
      {...props}
    />
  );
}

function OTPSlot({ isActive, char, hasFakeCaret }: BaseOTPSlotProps) {
  return (
    <div
      data-active={isActive ? "" : undefined}
      className={clsx(
        "relative flex h-16 w-14 items-center justify-center bg-white dark:text-white",
        "text-2xl/7 text-gray-950 dark:bg-white/10",
        "border-y border-r border-gray-950/15 first:rounded-l-md first:border-l last:rounded-r-md dark:border-white/15",
        "data-active:z-10 data-active:outline-3 data-active:-outline-offset-1 data-active:outline-blue-500",
      )}
    >
      {hasFakeCaret ? (
        <span
          aria-hidden="true"
          className="animate-caret-blink h-8 w-px bg-gray-950 dark:bg-white"
        />
      ) : (
        char
      )}
    </div>
  );
}

export function OTPInput({
  className,
  maxLength,
}: {
  className?: string;
  maxLength: number;
}) {
  return (
    <BaseOTPInput
      required
      containerClassName={className}
      maxLength={maxLength}
      spellCheck={false}
      pattern={REGEXP_ONLY_DIGITS}
      render={({ slots }) => (
        <div className="isolate flex w-full justify-center">
          {slots.map((slot, index) => (
            <OTPSlot key={index} {...slot} />
          ))}
        </div>
      )}
    />
  );
}
