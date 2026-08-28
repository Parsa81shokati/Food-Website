import { FiHome, FiInfo, FiPhone } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import {
  FiUser,
  FiShoppingBag,
  FiSettings,
  FiHelpCircle,
} from "react-icons/fi";
import { MdLocalOffer } from "react-icons/md";

export const routes = [
  {
    id: "1",
    pathname: "/",
    name: "Home",
    icon: <FiHome className="text-lg" />,
  },
  {
    id: "2",
    pathname: "/menu",
    name: "Menu",
    icon: <MdOutlineRestaurantMenu className="text-lg" />,
  },
  {
    id: "3",
    pathname: "/#reservation",
    name: "Reservation",
    icon: <GiFullPizza className="text-lg" />,
  },
  {
    id: "4",
    pathname: "/#aboutUs",
    name: "About Us",
    icon: <FiInfo className="text-lg" />,
  },
  {
    id: "5",
    pathname: "/contact",
    name: "Contact Us",
    icon: <FiPhone className="text-lg" />,
  },
];

export const menuItems = [
  {
    id: "profile",
    label: "My Profile",
    description: "Manage your account",
    icon: <FiUser className="text-lg" />,
    href: "/profile",
    color: "text-blue-500",
  },
  {
    id: "orders",
    label: "My Orders",
    description: "Track your orders",
    icon: <FiShoppingBag className="text-lg" />,
    href: "/orders",
    color: "text-green-500",
  },
  {
    id: "offers",
    label: "Special Offers",
    description: "Exclusive deals for you",
    icon: <MdLocalOffer className="text-lg" />,
    href: "/offers",
    color: "text-purple-500",
    badge: "3 New",
  },
  // {
  //   id: "help",
  //   label: "Help & Support",
  //   description: "Get assistance",
  //   icon: <FiHelpCircle className="text-lg" />,
  //   href: "/help",
  //   color: "text-teal-500",
  // },
];
