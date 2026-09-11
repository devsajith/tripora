"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/packages") {
        setActiveSection("packages");
        return;
      }

      const aboutElem = document.getElementById("about");
      const destElem = document.getElementById("destinations");
      const contactElem = document.getElementById("contact");
      const scrollPos = window.scrollY + 200;

      if (contactElem && scrollPos >= contactElem.offsetTop) {
        setActiveSection("contact");
      } else if (destElem && scrollPos >= destElem.offsetTop) {
        setActiveSection("destinations");
      } else if (aboutElem && scrollPos >= aboutElem.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isDetailsPage = pathname.includes("/destinations/");

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About Us", href: "/#about" },
    { id: "destinations", label: "Destinations", href: "/#destinations" },
    { id: "packages", label: "Packages", href: "/packages" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ];

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
        <div className="hidden lg:flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-full w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform group"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-900/10 shadow-xs flex-shrink-0">
              <img src="/logo.webp" alt="Tripora Logo" className="w-full h-full object-cover" />
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

          {/* Desktop Menu - Home, About Us, Destinations, Packages, Contact */}
          <div className="flex items-center space-x-7 font-sans text-xs uppercase tracking-wider font-bold">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-800 font-extrabold"
                      : "text-primary hover:text-emerald-700"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-800 rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2 rounded-full font-sans text-xs transition-all active:scale-95 uppercase tracking-wider text-center shadow-xs flex items-center gap-1.5"
            >
              <span>Enquire Now</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* MOBILE NAVBAR VIEW */}
        <div className="flex lg:hidden justify-between items-center px-4 sm:px-6 h-full w-full relative">
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
                className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-900/10 block active:scale-90 transition-transform shadow-xs"
              >
                <img src="/logo.webp" alt="Tripora" className="w-full h-full object-cover" />
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
            <Link
              href="/#contact"
              className="bg-emerald-800 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs"
            >
              <span>Enquire</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

