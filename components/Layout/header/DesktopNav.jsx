import Link from "next/link";
import React from "react";

function DesktopNav({ isLinkActive, routes }) {
  return (
    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
      {routes.map((route) => {
        const isActive = isLinkActive(route);

        return (
          <Link
            key={route.id}
            href={route.pathname}
            scroll={route.pathname.includes("#") ? false : true}
            className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-300 group overflow-hidden
                  ${
                    isActive
                      ? "text-[#9e0910]"
                      : "text-gray-700 hover:text-[#9e0910]"
                  }`}
          >
            <span className="relative z-10">{route.name}</span>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#9e0910] rounded-full" />
            )}
            <span className="absolute inset-0 bg-[#9e0910]/0 group-hover:bg-[#9e0910]/5 transition-all duration-300 rounded-full" />
          </Link>
        );
      })}
    </nav>
  );
}

export default DesktopNav;
