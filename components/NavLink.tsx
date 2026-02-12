"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkCompatProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className"
> &
  LinkProps & {
    className?: string;
    activeClassName?: string;
    pendingClassName?: string; // (not really supported in Next like RR)
    exact?: boolean; // add this for exact match behavior
  };

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    { className, activeClassName, pendingClassName, href, exact = true, ...props },
    ref
  ) => {
    const pathname = usePathname();

    const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
    const isActive = exact
      ? pathname === hrefStr
      : hrefStr === "/"
        ? pathname === "/"
        : pathname.startsWith(hrefStr);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
