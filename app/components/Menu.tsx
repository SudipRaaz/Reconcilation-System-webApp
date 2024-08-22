const MenuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/logo.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/logo.png",
        label: "Teachers",
        href: "/teachers",
      },
    ],
  },
];

import Link from "next/link";
import React from "react";

const SideMenu = () => {
  return (
    <>
      <div>SideMenu</div>
      {MenuItems.map((each) => (
        <div className="" key={each.title}>
          <span>{each.title}</span>
          {each.items.map((item) => (
            <Link href={item.href} key={item.label}>
              <img src={item.icon} alt="icon not found" width={30} height={30}/>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
};

export default SideMenu;
