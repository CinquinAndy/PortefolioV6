import { clsx } from "clsx";
import Image from "next/image";
import type React from "react";

export function Bookshelf({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        className,
        "grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5",
      )}
      {...props}
    />
  );
}

export function Book({
  title,
  author,
  imageUrl,
  imageWidth,
  imageHeight,
  href,
}: {
  title: string;
  author: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="row-span-2 grid grid-rows-subgrid gap-4"
    >
      <div className="relative w-full self-end">
        <Image
          src={imageUrl}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          sizes="386px"
          priority
        />
      </div>
      <div>
        <p className="text-sm/6 font-semibold text-gray-950 dark:text-white">
          {title}
        </p>
        <p className="text-sm/6 text-gray-700 dark:text-gray-400">{author}</p>
      </div>
    </a>
  );
}
