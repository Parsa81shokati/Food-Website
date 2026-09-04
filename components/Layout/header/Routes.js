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

