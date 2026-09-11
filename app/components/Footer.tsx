"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-emerald-950 text-white py-7 mt-auto relative border-t border-emerald-900/40">
      {/* Top accent glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Info Column */}
        <div className="col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-2.5 group inline-flex">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 shadow-xs flex-shrink-0">
              <img src="/logo.webp" alt="Tripora Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-white tracking-[0.08em] uppercase leading-none">
                Tripora
              </span>
              <span className="font-sans text-[7px] tracking-widest uppercase font-bold text-amber-300 mt-0.5">
                Travel. Explore. Remember.
              </span>
            </div>
          </Link>
          <p className="text-white/70 font-sans text-[11px] mb-2.5 leading-snug">
            Crafting extraordinary journeys across Kerala's misty tea estates, serene backwaters, and golden coasts.
          </p>

          <div className="space-y-1 mb-3 font-sans text-[11px]">
            <a
              href="tel:+919656464124"
              className="flex items-center gap-1.5 text-white/80 hover:text-amber-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-300">call</span>
              +91 96564 64124
            </a>
            <a
              href="mailto:tripora68@gmail.com"
              className="flex items-center gap-1.5 text-white/80 hover:text-amber-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-300">mail</span>
              tripora68@gmail.com
            </a>
            <a
              href="https://instagram.com/tripora.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/80 hover:text-amber-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] text-amber-300">photo_camera</span>
              tripora.in
            </a>
          </div>

          <div className="flex space-x-2">
            <a
              href="https://wa.me/919656464124"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-amber-300 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
            </a>
            <a
              href="https://instagram.com/tripora.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-amber-300 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            </a>
            <a
              href="mailto:tripora68@gmail.com"
              title="Email Us"
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-amber-300 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">mail</span>
            </a>
            <a
              href="tel:+919656464124"
              title="Call Us"
              className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:border-amber-300 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
            </a>
          </div>
        </div>

        {/* Column 1 */}
        <div className="col-span-1">
          <h5 className="text-amber-300 font-sans text-[10px] font-bold mb-2.5 uppercase tracking-[0.18em]">
            Kerala Destinations
          </h5>
          <ul className="space-y-1.5 font-sans text-[11px]">
            <li>
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Fort Kochi &amp; Heritage
              </Link>
            </li>
            <li>
              <Link href="/destinations/ethereal-alpine-sanctuary" className="text-white/80 hover:text-white transition-colors">
                Munnar Tea Estates
              </Link>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Alleppey Houseboats
              </a>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Kumarakom Lagoon Resort
              </a>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Thekkady Spice Country
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="col-span-1">
          <h5 className="text-amber-300 font-sans text-[10px] font-bold mb-2.5 uppercase tracking-[0.18em]">
            Tour Packages
          </h5>
          <ul className="space-y-1.5 font-sans text-[11px]">
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors font-bold text-amber-300">
                7 Days God's Own Country (Priority #1)
              </a>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Munnar Escape (3D/2N - ₹16,500 for 2)
              </a>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                5 Days / 4 Nights Kerala Tour
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Custom Family &amp; Honeymoon Quotes
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="col-span-1">
          <h5 className="text-amber-300 font-sans text-[10px] font-bold mb-2.5 uppercase tracking-[0.18em]">
            Stay Updated
          </h5>
          {subscribed ? (
            <p className="text-amber-300 text-[11px] font-bold">
              Thank you for subscribing! We will send you exclusive travel updates.
            </p>
          ) : (
            <>
              <p className="text-white/70 text-[11px] mb-2 leading-snug">
                Subscribe to get the best travel deals and custom Kerala tour ideas directly.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  className="bg-white/10 border border-white/20 rounded-full text-[11px] px-3.5 py-1.5 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-300 w-full"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase transition-colors flex-shrink-0"
                >
                  Join
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-6 pt-4 border-t border-white/10 text-center text-[10px] text-white/50 font-sans">
        &copy; {new Date().getFullYear()} Tripora. All rights reserved. | Travel. Explore. Remember.
      </div>
    </footer>
  );
}
