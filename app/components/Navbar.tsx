"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDetailsPage = pathname.includes("/destinations/");

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* MAIN NAVIGATION BAR */}
      <nav
        className={`w-full transition-all duration-300 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md ${
          isScrolled
            ? "h-14 shadow-[0_4px_20px_rgba(10,46,38,0.06)]"
            : "h-16"
        }`}
      >
        {/* DESKTOP NAVBAR VIEW */}
        <div className="hidden lg:flex justify-between items-center max-w-container-max-width mx-auto px-margin-desktop h-full w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform group"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700/30 shadow-xs flex-shrink-0 group-hover:bg-emerald-900 transition-colors">
              <span className="material-symbols-outlined text-white text-lg">flight_takeoff</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-primary tracking-[0.06em] uppercase leading-none">
                Tripora
              </span>
              <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold text-emerald-700 mt-0.5">
                Travel. Explore. Remember.
              </span>
            </div>
          </Link>

          {/* Desktop Menu - About Us, Packages, Destinations, Contact */}
          <div className="flex items-center space-x-8 font-sans text-xs uppercase tracking-wider font-bold text-primary">
            <a
              href="#overview"
              className="hover:text-emerald-700 transition-colors duration-200"
            >
              About Us
            </a>
            <a
              href="#itinerary"
              className="hover:text-emerald-700 transition-colors duration-200"
            >
              Packages
            </a>
            <a
              href="#destinations"
              className="hover:text-emerald-700 transition-colors duration-200"
            >
              Destinations
            </a>
            <a
              href="#contact"
              className="hover:text-emerald-700 transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919656464124?text=Hi%20Tripora!%20I%20am%20interested%20in%20the%207%20Days%20Kerala%20Tour%20Package."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-emerald-700/20 hover:border-emerald-700 text-primary font-semibold px-4 py-1.5 rounded-full font-sans text-xs transition-all active:scale-95 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100"
            >
              <span className="material-symbols-outlined text-[15px] text-emerald-700">chat</span>
              <span>WhatsApp</span>
            </a>

            <a
              href="#contact"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2 rounded-full font-sans text-xs transition-all active:scale-95 uppercase tracking-wider text-center shadow-xs flex items-center gap-1.5"
            >
              <span>Enquire Now</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* MOBILE NAVBAR VIEW */}
        <div className="flex lg:hidden justify-between items-center px-margin-mobile h-full w-full relative">
          <div className="flex items-center z-10">
            {isDetailsPage ? (
              <button
                onClick={() => router.push("/")}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-900/10 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-primary text-xl">
                  arrow_back
                </span>
              </button>
            ) : (
              <Link
                href="/"
                className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700/30 block active:scale-90 transition-transform shadow-xs"
              >
                <span className="material-symbols-outlined text-white text-lg">flight_takeoff</span>
              </Link>
            )}
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto flex flex-col items-center">
            <span className="font-display text-xl font-bold text-primary tracking-[0.08em] uppercase leading-none">
              Tripora
            </span>
            <span className="font-sans text-[8px] tracking-widest uppercase font-semibold text-emerald-700 mt-0.5">
              Travel. Explore. Remember.
            </span>
          </Link>

          <div className="flex items-center z-10 gap-2">
            <a
              href="https://wa.me/919656464124?text=Hi%20Tripora!%20I%20am%20interested%20in%20the%207%20Days%20Kerala%20Tour%20Package."
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center active:scale-90"
              title="Chat on WhatsApp"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </a>
            <a
              href="#contact"
              className="bg-emerald-800 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs"
            >
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

