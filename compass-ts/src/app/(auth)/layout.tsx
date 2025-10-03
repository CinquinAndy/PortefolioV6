import { Logo } from "@/components/logo";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xs">
        <div className="flex justify-center">
          <Link href="/" aria-label="Compass">
            <Logo className="h-6 fill-gray-950 dark:fill-white" />
          </Link>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
