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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-surface/80 backdrop-blur-xl ${
        isScrolled
          ? "h-16 shadow-md"
          : "h-20"
      }`}
    >
      {/* DESKTOP NAVBAR VIEW */}
      <div className="hidden md:flex justify-between items-center max-w-container-max-width mx-auto px-margin-desktop h-full w-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-headline-sm font-bold text-primary tracking-tight cursor-pointer active:scale-95 transition-transform"
        >
          Tripora
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className={`font-sans text-label-md transition-all duration-300 ${
              pathname === "/"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface hover:text-primary"
            }`}
          >
            Destinations
          </Link>
          <a
            href="#experiences"
            className="font-sans text-label-md text-on-surface hover:text-primary transition-colors duration-300"
          >
            Experiences
          </a>
          <Link
            href="/dashboard"
            className={`font-sans text-label-md transition-all duration-300 ${
              pathname === "/dashboard"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface hover:text-primary"
            }`}
          >
            Private Jet
          </Link>
          <a
            href="#concierge"
            className="font-sans text-label-md text-on-surface hover:text-primary transition-colors duration-300"
          >
            Concierge
          </a>
          <a
            href="#about"
            className="font-sans text-label-md text-on-surface hover:text-primary transition-colors duration-300"
          >
            About
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-label-md ml-2 w-32 placeholder:text-on-surface-variant/50 text-on-surface"
              placeholder="Search experiences"
              type="text"
            />
          </div>

          <Link
            href="/destinations/ethereal-alpine-sanctuary"
            className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-sans text-label-md hover:opacity-80 transition-all active:scale-95 uppercase tracking-widest text-center"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* MOBILE NAVBAR VIEW (Centered Logo, Dynamic Actions) */}
      <div className="flex md:hidden justify-between items-center px-margin-mobile h-full w-full relative">
        {/* Left Side: Back Arrow on Details, Profile on others */}
        <div className="flex items-center z-10">
          {isDetailsPage ? (
            <button
              onClick={() => router.push("/")}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container/30 border border-white/5 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-primary text-xl">
                arrow_back
              </span>
            </button>
          ) : (
            <Link
              href="/dashboard"
              className="w-9 h-9 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 block active:scale-90 transition-transform"
            >
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxYncc-7TLtRp-8_fcUxubkdUvwNrYN2YkSdbUBY6z5aFff3NtZ6kqTTVIQJCLyY71eI514yuOpPgobf7rU2Xmwxg2u7_DPocwVb_aH0NiEwHGoWZ4SA_JulO8SG-maP0TVvHjp2z0HYfpenAjzGDszpSfR3ubYkovctkbcBx6LpiIXu27YdXoppGIc7v-hVSXPdVA3ASBZSBPerjkw10KRNdnijuqwaaCjwk2z3lfie3kw7phzkYV1SFrROH3ilDr1oveMlEWvF4"
              />
            </Link>
          )}
        </div>

        {/* Center: Centered Logo Title */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <span className="font-display text-2xl font-bold text-primary tracking-tight">
            Tripora
          </span>
        </div>

        {/* Right Side: Heart on Details, Bell on others */}
        <div className="flex items-center z-10">
          {isDetailsPage ? (
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container/30 border border-white/5 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-primary text-xl">
                favorite
              </span>
            </button>
          ) : (
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container/30 border border-white/5 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-primary text-xl">
                notifications
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
