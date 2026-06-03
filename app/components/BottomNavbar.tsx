"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  // Hide mobile bottom navbar on details pages to make room for fixed booking bar
  if (pathname.includes("/destinations/")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-surface/95 backdrop-blur-lg border-t border-outline-variant/20 shadow-[0_-4px_20px_rgba(0,0,128,0.15)] rounded-t-xl">
      <div className="flex justify-around items-center px-6 pb-6 pt-3">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center relative transition-all duration-200 ${
            pathname === "/"
              ? "text-primary scale-95 after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full"
              : "text-on-surface-variant opacity-70 hover:opacity-100"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: pathname === "/" ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-label-sm mt-1">Home</span>
        </Link>

        {/* Search */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="text-label-sm mt-1">Search</span>
        </Link>

        {/* Bookings */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center relative transition-all duration-200 ${
            pathname === "/dashboard"
              ? "text-primary scale-95 after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full"
              : "text-on-surface-variant opacity-70 hover:opacity-100"
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: pathname === "/dashboard" ? "'FILL' 1" : "'FILL' 0" }}
          >
            confirmation_number
          </span>
          <span className="text-label-sm mt-1">Bookings</span>
        </Link>

        {/* Profile */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center relative transition-all duration-200 ${
            pathname === "/dashboard"
              ? "text-primary scale-95 after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-secondary after:rounded-full"
              : "text-on-surface-variant opacity-70 hover:opacity-100"
          }`}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-label-sm mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
