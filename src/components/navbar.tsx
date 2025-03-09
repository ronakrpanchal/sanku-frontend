import React from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

type Props = {};

const navLinks = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "FAQ's",
    href: "/faq",
  },
];

export default function Navbar({}: Props) {
  return (
    <nav>
      <div className="flex m-10 mb-5 justify-between items-center wrapper">
        <h2 className="text-3xl flex gap-2 items-center font-semibold">
          <Dumbbell />
          RepMate
        </h2>
        <div className="flex items-center gap-10 font-semibold text-gray-400">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <Link href={"/about"}>
          <Button className="p-5 py-7 font-semibold">Join Waitlist</Button>
        </Link>
      </div>
      <Separator />
    </nav>
  );
}
