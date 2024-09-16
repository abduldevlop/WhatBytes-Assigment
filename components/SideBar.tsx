"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegFile } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";

const SideBar = () => {
  const links = [
    {
      id: 1,
      title: "Dashboard",
      link: "/dashboard",
      icon: <IoStatsChartSharp />,
    },
    { id: 2, title: "Skill Test", link: "/skill-test", icon: <SlBadge /> },
    { id: 3, title: "Internship", link: "/internship", icon: <FaRegFile /> },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <aside className="h-screen p-5 pl-0 pt-10 border border-r-[#E7EBEF] border-t-0">
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            href={link.link}
            key={link.id}
            className={`flex items-center gap-2 hover:bg-[#F3F6F7] px-4 py-5 ${
              pathname === link.link && "bg-[#F3F6F7] text-[#32418B] "
            } hover:text-[#32418B] font-bold rounded-tr-full rounded-br-full hover:font-bold`}
          >
            <span> {link.icon} </span>
            {link.title}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
