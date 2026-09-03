import { useState } from "react";
import Link from "next/link";
import { FaGhost, FaCompass, FaArrowLeft } from "react-icons/fa";

function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 text-center transition-all duration-300 hover:shadow-2xl">
        {/* Illustration */}
        <div className="relative inline-block mb-6">
          <div className="text-8xl md:text-9xl font-extrabold leading-none bg-gradient-to-r from-[#9e0910] to-[#c20e17] bg-clip-text text-transparent tracking-tight select-none">
            4<span className="inline-block animate-bounce-slow">0</span>
            <span className="inline-block animate-bounce-slow delay-150">
              4
            </span>
          </div>
          <FaGhost className="absolute -bottom-2 -right-6 text-5xl text-gray-300 opacity-50 animate-float" />
          {/* decorative dots */}
          <span className="absolute top-2 left-0 w-2 h-2 bg-[#9e0910] rounded-full opacity-20 animate-pulse" />
          <span className="absolute bottom-6 right-0 w-3 h-3 bg-[#9e0910] rounded-full opacity-20 animate-pulse delay-700" />
          <span className="absolute top-1/3 right-4 w-1.5 h-1.5 bg-[#9e0910] rounded-full opacity-20 animate-pulse delay-1000" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
          Oops! <span className="text-[#9e0910]">Page not found</span>
        </h1>

        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          <FaCompass className="inline mr-1 text-[#9e0910]" />
          The page you’re looking for might have been removed, renamed, or never
          existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </Link>
        </div>

        {/* Footer links */}
        <div className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-4 flex-wrap">
          <span>© 2026 YourStore</span>
        </div>
      </div>
    </div>
  );
}

Custom404.getLayout = function getLayout(page) {
  return <>{page}</>; // برگرداندن صفحه بدون هیچ لایوتی
};

export default Custom404;
