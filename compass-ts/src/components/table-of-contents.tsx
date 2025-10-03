"use client";

import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useTableOfContents(contentId: string) {
  let [headings, setHeadings] = useState<
    { id: string; text: string; level: number; active: boolean }[]
  >([]);
  let pathname = usePathname();

  useEffect(() => {
    let root = document.getElementById(contentId);
    if (!root) return;

    setHeadings(
      Array.from(root.querySelectorAll("h2, h3")).map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
        active: false,
      })),
    );

    let contentElements = new Map<Element, string>();
    let currentHeadingId: string | null = null;

    Array.from(root.children).forEach((element) => {
      if (
        element.id &&
        (element.tagName === "H2" || element.tagName === "H3")
      ) {
        currentHeadingId = element.id;
      }
      if (!currentHeadingId) return;
      contentElements.set(element, currentHeadingId);
    });

    let visibleElements = new Set<Element>();

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleElements.add(entry.target);
          } else {
            visibleElements.delete(entry.target);
          }
        });

        let firstVisibleContentElement = Array.from(
          contentElements.entries(),
        ).find(([element]) => visibleElements.has(element));

        setHeadings((current) =>
          current.map((heading) => ({
            ...heading,
            active: heading.id === firstVisibleContentElement?.[1],
          })),
        );
      },
      {
        rootMargin: `-${getComputedStyle(document.documentElement).scrollPaddingTop} 0px 0px`,
      },
    );

    Array.from(contentElements.keys()).forEach((element) =>
      observer.observe(element),
    );

    return () => observer.disconnect();
  }, [pathname, contentId]);

  return headings;
}

export default function TableOfContents({ contentId }: { contentId: string }) {
  let headings = useTableOfContents(contentId);

  return (
    <nav className="sticky top-16">
      <h2 className="text-sm/6 font-semibold text-gray-950 dark:text-white">
        On this page
      </h2>
      <ul className="mt-3 flex flex-col gap-3 border-l border-gray-950/10 text-sm/6 text-gray-700 dark:border-white/10 dark:text-gray-400">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={clsx(
              "-ml-px border-l border-transparent pl-4",
              "hover:text-gray-950 hover:not-has-aria-[current=location]:border-gray-400 dark:hover:text-white",
              "has-aria-[current=location]:border-gray-950 dark:has-aria-[current=location]:border-white",
            )}
          >
            <a
              href={`#${heading.id}`}
              aria-current={heading.active ? "location" : undefined}
              className={clsx(
                heading.level === 3 && "pl-4",
                "block aria-[current=location]:font-medium aria-[current=location]:text-gray-950 dark:aria-[current=location]:text-white",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
