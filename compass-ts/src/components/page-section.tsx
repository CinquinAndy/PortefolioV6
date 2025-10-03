import type React from "react";

export function PageSection({
  title,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode;
}) {
  return (
    <section
      {...props}
      className="grid grid-cols-4 border-t border-gray-950/10 dark:border-white/10"
    >
      <div className="col-span-full sm:col-span-1">
        <div className="-mt-px inline-flex border-t border-gray-950 pt-px dark:border-white">
          <div className="pt-4 text-sm/7 font-semibold text-gray-950 sm:pt-10 dark:text-white">
            {title}
          </div>
        </div>
      </div>
      <div className="col-span-full pt-6 sm:col-span-3 sm:pt-10">
        {children}
      </div>
    </section>
  );
}
