import Link from "next/link";
import React from "react";
import MenuItems from "../constants/menuItems";

const SideMenu = () => {
  return (
    <div>
      {MenuItems.map((each, index) => (
        <div className="flex flex-col gap-1" key={index}>
          <span className="hidden md:block text-blue-400 font-extrabold my-2 ">{each.title}</span>
          {each.items.map((item, index) => (
            <Link className="py-2 shadow-inner shadow-lg" href={item.href} key={index}>
              <div className="flex">
                <item.icon className="mr-2 size-6"/>
                <span className="hidden md:block ">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
