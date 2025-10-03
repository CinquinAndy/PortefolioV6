import { Button } from "@/components/button";
import { TextInput } from "@/components/input";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Compass",
};

export default function Page() {
  return (
    <>
      <h1 className="sr-only">Login</h1>
      <form action="/otp">
        <div>
          <label
            htmlFor="email"
            className="block w-full text-sm/7 font-medium text-gray-950 dark:text-white"
          >
            Email
          </label>
          <TextInput type="email" id="email" required className="mt-2" />
        </div>
        <Button type="submit" className="mt-6 w-full">
          Send one-time password
        </Button>
      </form>
    </>
  );
}
