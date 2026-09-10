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
    <footer className="bg-primary text-white py-10 mt-auto relative border-t border-white/10">
      {/* Terracotta ambient glow bar at top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-tertiary/80 to-transparent"></div>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Info Column */}
        <div className="col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-3 group inline-flex">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-tertiary transition-colors shadow-md flex-shrink-0">
              <span className="material-symbols-outlined text-white text-xl">flight_takeoff</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-white tracking-[0.12em] uppercase leading-none">
                Tripora
              </span>
              <span className="font-sans text-[8px] tracking-widest uppercase font-semibold text-secondary-container mt-0.5">
                Travel. Explore. Remember.
              </span>
            </div>
          </Link>
          <p className="text-white/70 font-sans text-xs mb-4 leading-relaxed">
            Crafting extraordinary 7-day luxury journeys across Kerala's misty tea estates, serene backwaters, and golden coasts.
          </p>

          <div className="space-y-2 mb-4 font-sans text-xs">
            <a
              href="tel:+919656464124"
              className="flex items-center gap-2 text-white/80 hover:text-tertiary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary">call</span>
              +91 96564 64124
            </a>
            <a
              href="mailto:tripora68@gmail.com"
              className="flex items-center gap-2 text-white/80 hover:text-tertiary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary">mail</span>
              tripora68@gmail.com
            </a>
            <a
              href="https://instagram.com/tripora.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-tertiary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary">photo_camera</span>
              tripora.in
            </a>
          </div>

          <div className="flex space-x-2.5">
            <a
              href="https://wa.me/919656464124"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-tertiary hover:bg-tertiary/20 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                chat
              </span>
            </a>
            <a
              href="https://instagram.com/tripora.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-tertiary hover:bg-tertiary/20 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                photo_camera
              </span>
            </a>
            <a
              href="mailto:tripora68@gmail.com"
              title="Email Us"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-tertiary hover:bg-tertiary/20 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                mail
              </span>
            </a>
            <a
              href="tel:+919656464124"
              title="Call Us"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-tertiary hover:bg-tertiary/20 text-white cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                call
              </span>
            </a>
          </div>
        </div>

        {/* Column 1 */}
        <div className="col-span-1">
          <h5 className="text-tertiary font-sans text-xs font-semibold mb-4 uppercase tracking-[0.2em]">
            Kerala Destinations
          </h5>
          <ul className="space-y-2 font-sans text-xs">
            <li>
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Fort Kochi &amp; Heritage
              </Link>
            </li>
            <li>
              <Link href="/destinations/ethereal-alpine-sanctuary" className="text-white/80 hover:text-white transition-colors">
                Munnar Tea Lodges
              </Link>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Alleppey Houseboats
              </a>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Kumarakom Lake Resort
              </a>
            </li>
            <li>
              <a href="#itinerary" className="text-white/80 hover:text-white transition-colors">
                Kovalam Beach Villas
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="col-span-1">
          <h5 className="text-tertiary font-sans text-xs font-semibold mb-4 uppercase tracking-[0.2em]">
            Pan-India Circuits
          </h5>
          <ul className="space-y-2 font-sans text-xs">
            <li>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Royal Rajasthan Palaces
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Golden Triangle Taj Mahal
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Hampi &amp; South India Sacred
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Ladakh Himalayan Valleys
              </a>
            </li>
            <li>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Terms &amp; Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="col-span-1">
          <h5 className="text-tertiary font-sans text-xs font-semibold mb-4 uppercase tracking-[0.2em]">
            Private Journal
          </h5>
          {subscribed ? (
            <p className="text-tertiary text-xs font-semibold">
              Thank you for subscribing to our private list.
            </p>
          ) : (
            <>
              <p className="text-white/70 text-xs mb-3 leading-relaxed">
                Receive invitations to private openings and curated seasonal passages across Kerala.
              </p>
              <form onSubmit={handleSubscribe} className="flex border-b border-white/30 focus-within:border-tertiary pb-1.5">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs w-full p-0 text-white placeholder:text-white/40"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="text-tertiary material-symbols-outlined hover:translate-x-1 transition-transform">
                  arrow_forward
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-8 pt-6 border-t border-white/10 text-center text-white/50 font-sans text-xs tracking-wider">
        © 2026 Tripora Excellence Group. All rights reserved. Made with bespoke Kerala craftsmanship.
      </div>
    </footer>
  );
}

