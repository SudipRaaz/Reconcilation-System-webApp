import { FaHome, FaChalkboardTeacher } from "react-icons/fa";

const MenuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: FaHome,
        label: "Home",
        href: "/",
      },
      {
        icon: FaChalkboardTeacher,
        label: "Dashboard",
        href: "/teachers",
      },
    ],
  },
  {
    title: "Teacher",
    items: [
      {
        icon: FaHome,
        label: "label",
        href: "/",
      },
      {
        icon: FaChalkboardTeacher,
        label: "Teachers",
        href: "/teachers",
      },
    ],
  },
];

export default MenuItems;
