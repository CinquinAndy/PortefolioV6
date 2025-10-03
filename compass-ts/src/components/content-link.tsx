import { ArticleIcon } from "@/icons/article-icon";
import { CheckmarkIcon } from "@/icons/checkmark-icon";
import { CirclePlayIcon } from "@/icons/circle-play-icon";
import Link from "next/link";

function formatDuration(seconds: number): string {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;

  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ContentLink({
  title,
  description,
  href,
  type = "article",
  duration,
}: {
  title: string;
  description: string;
  href: string;
  type?: "article" | "tool" | "video";
  duration?: number | null;
}) {
  return (
    <div className="flow-root">
      <Link
        href={href}
        className="-mx-3 -my-2 flex gap-3 rounded-xl px-3 py-2 text-sm/7 hover:bg-gray-950/4 dark:hover:bg-white/5"
      >
        <div className="flex h-lh shrink items-center">
          {type === "article" && (
            <ArticleIcon className="fill-gray-950 stroke-gray-950/40 dark:fill-white dark:stroke-white/40" />
          )}
          {type === "tool" && (
            <CheckmarkIcon className="fill-gray-950 stroke-gray-950/40 dark:fill-white dark:stroke-white/40" />
          )}
          {type === "video" && (
            <CirclePlayIcon className="fill-gray-950 stroke-gray-950/40 dark:fill-white dark:stroke-white/40" />
          )}
        </div>
        <div>
          <div>
            <span className="font-semibold text-gray-950 dark:text-white">
              {title}
            </span>
            {duration && (
              <>
                <span className="mx-2 hidden text-gray-950/25 sm:inline dark:text-white/25">
                  &middot;
                </span>
                <span className="hidden text-gray-500 sm:inline">
                  {formatDuration(duration)}
                </span>
              </>
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-400">{description}</p>
          {duration && (
            <div className="text-gray-500 sm:hidden">
              {formatDuration(duration)}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
