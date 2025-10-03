import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuItems,
  MenuItemsProps,
  MenuProps,
} from "@headlessui/react";
import Link from "next/link";
import type React from "react";

export function Dropdown(props: MenuProps) {
  return <Menu {...props} />;
}

export function DropdownButton(props: MenuButtonProps) {
  return <MenuButton {...props} />;
}

export function DropdownMenu({
  anchor = "bottom start",
  ...props
}: MenuItemsProps) {
  return (
    <MenuItems
      anchor={anchor}
      className="min-w-38 rounded-lg bg-white/75 p-0.5 shadow-sm outline outline-gray-950/5 backdrop-blur-sm [--anchor-gap:--spacing(1)] [--anchor-offset:--spacing(1)] dark:bg-gray-950/75 dark:outline-white/10"
      {...props}
    />
  );
}

export function DropdownItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <MenuItem>
      <Link
        href={href}
        className="block rounded-md px-3 py-0.5 text-sm/7 text-gray-950 focus:outline-none data-focus:bg-blue-500 data-focus:text-white dark:text-white"
      >
        {children}
      </Link>
    </MenuItem>
  );
}
