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
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-16 mt-auto">
      <div className="max-w-container-max-width mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Info Column */}
        <div className="col-span-1">
          <Link href="/" className="font-display text-headline-sm text-primary mb-6 inline-block">
            Tripora
          </Link>
          <p className="text-on-tertiary-container font-sans text-label-sm mb-6 leading-relaxed">
            Crafting extraordinary journeys for the global elite. Member of the Excellence Group.
          </p>

          <div className="space-y-2.5 mb-6 font-sans text-label-sm">
            <a
              href="tel:+919656464124"
              className="flex items-center gap-2 text-on-tertiary-container hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">call</span>
              +91 96564 64124
            </a>
            <a
              href="mailto:tripora68@gmail.com"
              className="flex items-center gap-2 text-on-tertiary-container hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
              tripora68@gmail.com
            </a>
            <a
              href="https://instagram.com/tripora.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-on-tertiary-container hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">photo_camera</span>
              tripora.in
            </a>
          </div>

          <div className="flex space-x-3">
            <a
              href="https://wa.me/919656464124"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary text-on-surface hover:text-primary cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                chat
              </span>
            </a>
            <a
              href="https://instagram.com/tripora.in"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary text-on-surface hover:text-primary cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                photo_camera
              </span>
            </a>
            <a
              href="mailto:tripora68@gmail.com"
              title="Email Us"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary text-on-surface hover:text-primary cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>
            </a>
            <a
              href="tel:+919656464124"
              title="Call Us"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary text-on-surface hover:text-primary cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                call
              </span>
            </a>
          </div>
        </div>

        {/* Column 1 */}
        <div className="col-span-1">
          <h5 className="text-on-surface font-sans text-label-md mb-6 uppercase tracking-widest">
            Experiences
          </h5>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Heritage Tours
              </Link>
            </li>
            <li>
              <Link href="/destinations/ethereal-alpine-sanctuary" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Munnar Sanctuary
              </Link>
            </li>
            <li>
              <a href="#" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Coastal Villas
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="col-span-1">
          <h5 className="text-on-surface font-sans text-label-md mb-6 uppercase tracking-widest">
            Contact & Company
          </h5>
          <ul className="space-y-4">
            <li>
              <a href="tel:+919656464124" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Call: +91 96564 64124
              </a>
            </li>
            <li>
              <a href="https://instagram.com/tripora.in" target="_blank" rel="noopener noreferrer" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Instagram: @tripora.in
              </a>
            </li>
            <li>
              <a href="mailto:tripora68@gmail.com" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Email: tripora68@gmail.com
              </a>
            </li>
            <li>
              <a href="#" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-on-tertiary-container hover:text-primary transition-colors text-label-sm">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="col-span-1">
          <h5 className="text-on-surface font-sans text-label-md mb-6 uppercase tracking-widest">
            Newsletter
          </h5>
          {subscribed ? (
            <p className="text-secondary text-label-sm">
              Thank you for subscribing to our private list.
            </p>
          ) : (
            <>
              <p className="text-on-tertiary-container text-label-sm mb-4">
                Receive invitations to private openings.
              </p>
              <form onSubmit={handleSubscribe} className="flex border-b border-outline-variant/50 pb-2">
                <input
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-label-sm w-full p-0 text-on-surface placeholder:text-on-tertiary"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="text-primary material-symbols-outlined hover:translate-x-1 transition-transform">
                  arrow_forward
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-container-max-width mx-auto px-margin-desktop mt-16 pt-8 border-t border-outline-variant/10 text-center text-on-tertiary-container font-sans text-label-sm">
        © 2024 Tripora Excellence Group. All rights reserved.
      </div>
    </footer>
  );
}
