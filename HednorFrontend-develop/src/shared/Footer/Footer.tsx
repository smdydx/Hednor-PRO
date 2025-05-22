import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import logoImg from "@/images/HednorLogoLight.png";
import Image from "next/image";
import Link from "next/link";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Company",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/subscription", label: "Subscription" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/collection", label: "Collection" },
      { href: "/search", label: "Search" },
      { href: "/", label: "Pricing" },
      { href: "/", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Policies",
    menus: [
      { href: "/", label: "Privacy Policy" },
      { href: "/", label: "Terms & Conditions" },
      { href: "/", label: "Shipping Information" },
      { href: "/", label: "Returns & Refunds Policy" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "/", label: "Discussion Forums" },
      { href: "/", label: "Code of Conduct" },
      { href: "/", label: "Contributing" },
      { href: "/", label: "API Reference" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                className="text-neutral-400  hover:text-white"
                href={item.href}
                rel="noopener noreferrer">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative pt-20 border-t border-neutral-200 dark:border-neutral-700 bg-black">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            {/* <Logo /> */}
            <Image
              className={`block h-12 sm:h-20 w-auto 
          }`}
              src={logoImg}
              alt="Logo"
              sizes="100px"
              priority
            />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex w-full space-x-6 " />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
      <div className="border-t mt-10 py-4 border-slate-600">
        <h5 className="text-center text-slate-300">
          © 2024 Hednor . All Rights Reserved.
        </h5>
      </div>
    </div>
  );
};

export default Footer;
