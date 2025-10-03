import { Button } from "@/components/button";
import { OTPInput } from "@/components/input";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enter one-time password - Compass",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Enter one-time password</h1>
      <p className="text-center text-sm/7 text-gray-950 dark:text-white">
        A 6-digit verification code has been sent to{" "}
        <span className="font-semibold">adam@example.com</span>.
      </p>
      <form action="/" className="mt-6">
        <OTPInput maxLength={6} />
        <p className="mt-6 text-center text-sm/7 text-gray-600 dark:text-gray-400">
          Didn't receive a code?{" "}
          <button
            type="button"
            className="font-semibold text-gray-950 underline decoration-gray-950/25 underline-offset-2 hover:decoration-gray-950/50 dark:text-white dark:decoration-white/25 dark:hover:decoration-white/50"
          >
            Request new code
          </button>
        </p>
        <Button type="submit" className="mt-6 w-full">
          Verify
        </Button>
      </form>
      <p className="mt-6 text-center text-sm/7 dark:text-gray-400">
        <Link
          href="/login"
          className="font-semibold text-gray-950 dark:text-white"
        >
          Use a different email
        </Link>
      </p>
    </>
  );
}
