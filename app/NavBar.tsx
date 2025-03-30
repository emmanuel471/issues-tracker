"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiFillBug, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Avatar } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Typography } from "@mui/material";

const Links = [
  { label: "Dashboard", link: "/" },
  { label: "Issues", link: "/issues" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const signin_url = "/api/auth/signin";
  const signout_url = "/api/auth/signout";
  const pathname = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 border-b h-15">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <AiFillBug className="text-2xl" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {Links.map((link) => (
            <li
              key={link.link}
              className={classNames(
                "transition-colors",
                pathname === link.link
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              )}
            >
              <Link href={link.link}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          {Links.map((link) => (
            <li key={link.link}>
              <Link
                href={link.link}
                className={classNames(
                  "block px-4 py-2 text-gray-800",
                  pathname === link.link
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-800"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Right Side - Auth Section */}
      <Box className="ml-auto">
        {status === "authenticated" ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Avatar
                src={session.user?.image || ""}
                fallback="U"
                alt="User Avatar"
                size="2"
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="bg-white shadow-md rounded-md p-2"
              >
                <DropdownMenu.Item className="p-2">
                  {session.user?.name}
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2">
                  {session.user?.email}
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="border-t my-2" />
                <DropdownMenu.Item className="p-2">
                  <Link href={signout_url} className="text-red-600">
                    Sign Out
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <Link href={signin_url} passHref>
            <Typography
              color="primary"
              variant="h6"
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign In
            </Typography>
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
