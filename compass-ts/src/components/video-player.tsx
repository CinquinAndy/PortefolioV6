"use client";

import { PlayIcon } from "@/icons/play-icon";
import { clsx } from "clsx";
import type React from "react";
import { useEffect, useRef } from "react";

function formatTime(seconds: number): string {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);

  return h > 0
    ? `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Video({ className, ...props }: React.ComponentProps<"video">) {
  let videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    let observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoContainer.setAttribute("data-offscreen", "");
        } else {
          videoContainer.removeAttribute("data-offscreen");
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(videoContainer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className={clsx(
        className,
        "group aspect-video w-full rounded-2xl bg-gray-950 dark:bg-gray-900",
      )}
    >
      <video
        {...props}
        poster={props.poster || undefined}
        preload="metadata"
        controls
        onPlay={(e) => e.currentTarget.setAttribute("data-playing", "")}
        onPause={(e) => {
          if (!videoContainerRef.current?.hasAttribute("data-offscreen")) {
            e.currentTarget.removeAttribute("data-playing");
          }
        }}
        className={clsx(
          "aspect-video w-full rounded-2xl",
          "sm:group-data-offscreen:data-playing:fixed sm:group-data-offscreen:data-playing:right-4 sm:group-data-offscreen:data-playing:bottom-4 sm:group-data-offscreen:data-playing:z-10 sm:group-data-offscreen:data-playing:max-w-md sm:group-data-offscreen:data-playing:rounded-xl sm:group-data-offscreen:data-playing:shadow-lg",
        )}
      />
    </div>
  );
}

export function TimestampButton({
  start,
  videoId,
  className,
}: {
  start: number;
  videoId: string;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        let video = document.getElementById(videoId) as HTMLVideoElement;
        if (video) {
          video.currentTime = start;
          video.play();
        }
      }}
      className={clsx(
        className,
        "inline-flex items-center gap-x-2 rounded-md bg-gray-950/5 px-1.5 font-mono text-xs/6 text-gray-700 hover:bg-gray-950/10 dark:bg-white/5 dark:text-gray-400",
      )}
    >
      <PlayIcon className="fill-gray-950 dark:fill-white" />
      {formatTime(start)}
    </button>
  );
}
