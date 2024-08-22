import React from "react";
import { GoSearch } from "react-icons/go";
import { BiMessageRoundedDots, BiSlideshow } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="flex justify-between text-black">
      <div className="mx-7 mt-7 hidden md:flex ring-2 rounded-full p-2 gap-2">
        <GoSearch size={24} className="items-center leading-5 flex justify-start "/>
        <input type="text" placeholder="Search" className="bg-transparent outline-none "/>
      </div>

      <div className="flex items-center gap-3 m-4 justify-end w-full">
        <div>
          <BiMessageRoundedDots className="size-10" />
        </div>
        <div className="relative">
          <BiSlideshow className="size-10" />
          <div className="absolute leading-5 -top-1 -right-1 w-5 h-5 bg-purple-500 flex item-center justify-center text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col leading-3 ">
          <span>Jhon Doe</span>
          <span className="text-end text-xs text-gray-400">Support</span>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
