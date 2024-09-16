import React from "react";
import logo from "@/assets/logo.png";
import profile from "@/assets/profile.png";
import Image from "next/image";
const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-10 mt-5 border-t-0 border border-b-[#E7EBEF] pb-4">
      <div className="flex items-center">
        <Image src={logo} alt="logo" className="w-16 hidden md:block" />
        <h1 className="text-2xl font-bold">WhatBytes</h1>
      </div>
      <div className="flex items-center gap-2 shadow-custom w-fit  p-2 rounded-md">
        <Image
          src={profile}
          alt="profile"
          className="w-7 h-7 rounded-full object-cover"
        />
        <h1 className="font-bold">Rahil Siddique</h1>
      </div>
    </nav>
  );
};

export default NavBar;
