import React from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    <>
      <nav className="wrapper">
        <div className="flex m-10 mb-5 justify-between items-center ">
          <h2 className="text-3xl flex gap-2 items-center font-semibold">
            <Dumbbell />
            Gymbro
          </h2>
          <div className="hidden md:flex items-center gap-10 font-semibold text-gray-400">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
          <Link href={"/about"} className="hidden md:block">
            <Button className="p-5 py-7 font-semibold cursor-pointer">
              Join Waitlist
            </Button>
          </Link>

          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
      </nav>
      <Separator />
    </>
  );
}
