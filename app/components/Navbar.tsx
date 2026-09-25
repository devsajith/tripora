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
        className={`w-full transition-all duration-300 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md h-16 ${
          isScrolled ? "shadow-[0_4px_20px_rgba(10,46,38,0.06)]" : ""
        }`}
      >
        {/* DESKTOP NAVBAR VIEW */}
        <div className="hidden lg:flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 h-full w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-900/10 shadow-xs flex-shrink-0 group-hover:border-emerald-800/30 transition-colors">
              <img src="/logo.webp" alt="Tripora Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins text-xl font-bold text-primary tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                Tripora
              </span>
              <span className="font-sans text-[8.5px] tracking-[0.22em] uppercase font-bold text-emerald-700 mt-1 leading-none">
                Travel. Explore. Remember.
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Home, About Us, Destinations, Packages, Contact */}
          <div className="flex items-center gap-1.5 xl:gap-2.5 font-sans text-xs uppercase tracking-wider font-bold">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-emerald-800 font-extrabold bg-emerald-50/80"
                      : "text-primary/80 hover:text-emerald-800 hover:bg-emerald-50/40"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-emerald-800 rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/#contact"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-full font-sans text-xs transition-all active:scale-95 uppercase tracking-wider text-center shadow-xs hover:shadow flex items-center gap-1.5"
            >
              <span>Enquire Now</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* MOBILE NAVBAR VIEW */}
        <div className="flex lg:hidden justify-between items-center px-4 sm:px-6 h-full w-full">
          {/* Left: Back button or Logo + Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            {isDetailsPage ? (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => router.push("/")}
                  className="h-9 w-9 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-900/10 text-primary active:scale-90 transition-transform flex-shrink-0"
                  aria-label="Go back"
                >
                  <span className="material-symbols-outlined text-xl">
                    arrow_back
                  </span>
                </button>
                <Link href="/" className="flex flex-col">
                  <span className="font-poppins text-lg font-bold text-primary tracking-tight leading-none">
                    Tripora
                  </span>
                  <span className="font-sans text-[7.5px] tracking-wider uppercase font-bold text-emerald-700 mt-0.5 leading-none">
                    Travel. Explore. Remember.
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2.5 active:scale-95 transition-transform flex-shrink-0"
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-900/10 shadow-xs flex-shrink-0">
                  <img src="/logo.webp" alt="Tripora" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins text-lg font-bold text-primary tracking-tight leading-none">
                    Tripora
                  </span>
                  <span className="font-sans text-[7.5px] tracking-[0.2em] uppercase font-bold text-emerald-700 mt-0.5 leading-none">
                    Travel. Explore. Remember.
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* Right: Quick Action CTA */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <Link
              href="/#contact"
              className="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs transition-all"
            >
              <span>Enquire</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

