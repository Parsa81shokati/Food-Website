import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-red-950 text-white py-12 px-6 md:px-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className=" text-lg md:text-2xl font-bold mb-2 md:mb-4">foody</h3>
          <p className="text-xs md:text-xl text-gray-300">
            Foody is your go-to place for delicious meals made with fresh
            ingredients. We bring taste and joy to your table.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
            Quick Links
          </h3>
          <ul>
            <li>
              <Link href="/" className=" hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-red-500">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className="hover:text-red-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="contact">
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
            Contact
          </h3>
          <p className="text-xs md:text-xl text-gray-300">
            123 Main Street, Your City
          </p>
          <p className="text-xs md:text-xl text-gray-300">+1 (234) 567-890</p>
          <p className="text-xs md:text-xl text-gray-300">info@foody.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-red-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-red-500">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-red-500">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Foody. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
