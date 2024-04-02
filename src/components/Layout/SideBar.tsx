"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import SideBarContent from "./SideBarContent";

export default function SideBar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <section className="relative">
      <div
        onClick={() => setShowNav(!showNav)}
        className="absolute left-10 top-5 z-10 cursor-pointer lg:hidden"
      >
        {<Menu size={40} color="#46783E" />}
      </div>
      <div className="hidden md:block">
        <SideBarContent showNav={showNav} setShowNav={setShowNav} />
      </div>
      {showNav && <SideBarContent showNav={showNav} setShowNav={setShowNav} />}
    </section>
  );
}
