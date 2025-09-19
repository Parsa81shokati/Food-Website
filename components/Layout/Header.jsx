import Link from "next/link";
import React, { useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import CheckoutModal from "../checkout/CheckoutModal";
import { useRouter } from "next/router";
import LoginModal from "../Login/LoginModal";

export const routes = [
  { id: "1", pathname: "/", name: "Home" },
  { id: "2", pathname: "/Menu", name: "Menu" },
  { id: "3", pathname: "/#reservation", name: "Reservation" },
  { id: "4", pathname: "/#aboutUs", name: "About Us" },
  { id: "5", pathname: "/#contact", name: "Contact" },
];

function Header() {
  const [onOpenCheckout, setOnopenCheckout] = useState(false);
  const [onOpenLogin, setOnopenLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className=" flex justify-between p-6 md:p-0 md:justify-around  md:my-10 md:gap-14">
      {/* Logo */}
      <div className="flex items-center md:flex-col">
        <IoFastFoodSharp className=" text-[#9e0910] text-2xl md:text-3xl" />
        <h1 className="ml-1 md:ml-0 text-xl md:text-2xl font-bold">
          <span className="text-[#9e0910]">f</span>oody
        </h1>
      </div>

      {/* Links */}
      <nav className="hidden md:flex gap-12">
        {routes.map((rout) => (
          <Link
            key={rout.id}
            href={rout.pathname}
            className={`text-2xl hover:text-[#9e0910] ${
              rout.pathname === currentPath && "text-[#9e0910] font-bold"
            }`}
          >
            {rout.name}
          </Link>
        ))}
      </nav>

      {/* Shopp & Signup */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="relative  "
          onClick={() => setOnopenCheckout(!onOpenCheckout)}
        >
          <AiOutlineShoppingCart className=" text-2xl md:text-4xl" />
        </button>
        {onOpenCheckout && (
          <div className=" absolute md:top-23 md:right-50">
            <CheckoutModal />
          </div>
        )}
        <button
          onClick={() => setOnopenLogin(!onOpenLogin)}
          className="p-2 md:p-0 md:block md:w-40 md:h-15 bg-[#9e0910] text-white rounded-4xl"
        >
          <FaUser className="md:hidden" />
          <p className="hidden md:flex md:justify-center text-2xl">Sign Up</p>
        </button>
        <button
          className="md:hidden text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          <HiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-57 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex">
            <IoFastFoodSharp className=" text-[#9e0910] text-xl" />
            <h1 className="text-xl font-bold">
              <span className="text-[#9e0910]">f</span>oody
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className=" hover:text-[#9e0910]"
          >
            <HiX className="text-2xl " />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-6">
          {routes.map((rout) => (
            <Link
              key={rout.id}
              href={rout.pathname}
              onClick={() => setSidebarOpen(false)}
              className={`text-sm hover:text-[#9e0910] ${
                rout.pathname == currentPath && "text-[#9e0910] font-bold"
              }`}
            >
              {rout.name}
            </Link>
          ))}
        </nav>
      </div>
      {onOpenLogin && (
        <div className=" absolute ">
          <LoginModal setOnopenLogin={setOnopenLogin} />
        </div>
      )}
    </div>
  );
}

export default Header;
