"use client";

import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Links = [
  { label: "Dashboard", link: "/" },
  {
    label: "Issues",
    link: "/issues",
  },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-6 border-1 h-15 items-center p-4">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {Links.map((link) => (
          <li
            className={classNames({
              "text-blue-600 font-semibold": pathname === link.link,
              "text-gray-800 hover:text-blue-800 transition-colors":
                pathname !== link.link,
            })}
            key={link.link}
          >
            <Link href={link.link}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
