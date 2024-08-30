import { FaHome, FaChalkboardTeacher } from "react-icons/fa";

const MenuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: FaHome,
        label: "Home/Dashboard",
        href: "/homepage",
      },
      {
        icon: FaChalkboardTeacher,
        label: "Reconcilation",
        href: "/reconcilation",
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
