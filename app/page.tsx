"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import plansData from "@/public/plans.json";

const corePillars = plansData.corePillars;
const destinationSpotlights = plansData.destinationSpotlights;
const allPackages = plansData.packages;
const packageInclusions = plansData.packageInclusions;

export default function Home() {
  // Form State
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    guests: "2 Adults",
    selectedPackage: "7 Days of Kerala (6 Nights / 7 Days - Signature Package)",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Tripora! I am interested in booking a Kerala Tour Package.%0A%0A*Package:* ${formState.selectedPackage}%0A*Name:* ${formState.name || "Guest"}%0A*Phone:* ${formState.phone}%0A*Travel Date:* ${formState.travelDate || "TBD"}%0A*Guests:* ${formState.guests}%0A*Notes:* ${formState.notes || "None"}`;
    return `https://wa.me/919656464124?text=${text}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section id="overview" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 px-4 sm:px-8 lg:px-12 bg-emerald-950">
          {/* Background Image with Dark Atmospheric Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero.jpg"
              alt="Kerala Backwaters Houseboat Sunset View"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/40"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center text-white w-full animate-fade-in-up">
            {/* Cursive Accent */}
            <span className="font-script text-4xl sm:text-6xl text-amber-300 block mb-2 drop-shadow-md">
              Journey To
            </span>

            {/* Main Hero Headline */}
            <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 uppercase leading-none text-white drop-shadow-lg">
              NATURE'S BEST
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto text-white/90 font-sans text-xs sm:text-base mb-10 leading-relaxed font-light">
              Discover stunning Kerala destinations and create memories that last a lifetime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/packages"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs sm:text-sm uppercase tracking-wider font-bold px-8 py-3.5 rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Explore Packages</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Animated Scroll Down Indicator Cue */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-center animate-bounce-slow">
            <a
              href="#steps"
              className="inline-flex flex-col items-center text-white/75 hover:text-amber-300 transition-colors group cursor-pointer"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest mb-1 text-white/70 group-hover:text-amber-300 transition-colors">
                Scroll to explore
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:border-amber-300/40 transition-colors">
                <span className="material-symbols-outlined text-base text-amber-300">
                  keyboard_arrow_down
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: PLAN YOUR TRIP IN 3 EASY STEPS */}
        {/* ========================================================================= */}
        <section id="steps" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4 reveal-up">
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary">
                  Plan Your Trip <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">in 3 Easy Steps</span>
                </h2>
                <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1.5">
                  Simple steps to book your dream vacation.
                </p>
              </div>

              <Link
                href="/packages"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wider shadow-xs transition-colors"
              >
                View All
              </Link>
            </div>

            {/* 3 Vertical Feature Cards with Gradients - Staggered Scroll Reveals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 01: Choose Destination -> #destinations */}
              <Link
                href="#destinations"
                className="reveal-up delay-100 bg-gradient-to-b from-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-teal-600/30 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/95 text-teal-800 flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-extrabold text-white/25 block mb-2">01</span>
                  <h3 className="font-sans text-lg sm:text-xl font-bold mb-2 text-white">Choose Destination</h3>
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    Pick your favorite place from our handpicked list of Kerala highlights like Munnar, Alleppey &amp; Thekkady.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-[11px] font-bold text-teal-200 uppercase tracking-wider">
                  <span>Explore Locations</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </Link>

              {/* Card 02: Select Package -> /packages */}
              <Link
                href="/packages"
                className="reveal-up delay-200 bg-gradient-to-b from-sky-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-sky-400/30 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/95 text-sky-800 flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-extrabold text-white/25 block mb-2">02</span>
                  <h3 className="font-sans text-lg sm:text-xl font-bold mb-2 text-white">Select Package</h3>
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    Choose the ideal 7-Day, 3-Day or 5-Day itinerary for your budget, family size, and preferred travel dates.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                  <span>View Itineraries</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </Link>

              {/* Card 03: Enjoy Your Trip -> #contact */}
              <Link
                href="#contact"
                className="reveal-up delay-300 bg-gradient-to-b from-emerald-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-700/30 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/95 text-emerald-800 flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">luggage</span>
                </div>
                <div>
                  <span className="font-sans text-3xl sm:text-4xl font-extrabold text-white/25 block mb-2">03</span>
                  <h3 className="font-sans text-lg sm:text-xl font-bold mb-2 text-white">Enjoy Your Trip</h3>
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    Pack your bags and get ready for an unforgettable Kerala journey with our dedicated AC vehicle &amp; driver.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                  <span>Start Vacation</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: ABOUT US / WHY TRIPORA */}
        {/* ========================================================================= */}
        <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 bg-surface border-t border-emerald-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Image Showcase & Floating Trust Badges */}
              <div className="lg:col-span-6 relative reveal-from-left">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[280px] sm:h-[420px]">
                  <img
                    src="/locations/Munnarteagarden.webp"
                    alt="Tripora Kerala Tea Gardens Munnar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>

                  {/* Overlaid Bottom Title */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="bg-amber-400 text-emerald-950 font-sans text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-md">
                      ⭐ Local Kerala Experts
                    </span>
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-white leading-tight">
                      Crafting Unforgettable Journeys in God's Own Country
                    </h3>
                  </div>
                </div>

                {/* Stat Cards - Stacked grid on mobile, overlay on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 lg:mt-0 lg:absolute lg:-bottom-7 lg:right-4 z-10 reveal-scale delay-200">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-900/10 shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0">
                      ★
                    </div>
                    <div>
                      <p className="font-sans text-xs font-extrabold text-primary">4.9 / 5 Rating</p>
                      <p className="font-sans text-[10px] text-on-surface-variant font-medium">10,000+ Happy Vacationers</p>
                    </div>
                  </div>

                  <div className="bg-emerald-900 text-white p-4 rounded-2xl border border-emerald-700/30 shadow-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-300 text-xl flex-shrink-0">directions_car</span>
                    <div className="text-[11px] font-bold">
                      <p className="leading-tight">100% Private AC Vehicles</p>
                      <p className="text-[9px] text-white/70 font-normal">Dedicated Local Drivers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Brand Story & Trust Pillars */}
              <div className="lg:col-span-6 space-y-5 reveal-from-right">
                <div>
                  <span className="text-emerald-700 font-sans text-xs uppercase tracking-[0.2em] font-bold block mb-1.5">
                    ABOUT TRIPORA
                  </span>
                  <h2 className="font-sans text-3xl sm:text-4xl text-primary font-bold leading-tight">
                    Your Trusted Companion for <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">Kerala Holidays</span>
                  </h2>
                </div>

                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  At <strong>Tripora</strong>, we believe travel is not just about visiting places—it's about feeling the soul of Kerala. Born out of a deep love for mist-clad tea mountains, emerald backwaters, and pristine palm beaches, we craft hassle-free tour packages tailored for families, couples, and group travelers.
                </p>

                {/* 4 Feature Badges with Auto-Stagger */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 reveal-stagger">
                  <div className="reveal-scale bg-surface p-4 rounded-2xl border border-emerald-900/10 flex items-start gap-3 hover:border-emerald-700/30 hover:shadow-sm transition-all duration-300">
                    <span className="material-symbols-outlined text-emerald-800 text-xl flex-shrink-0 mt-0.5">verified_user</span>
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-primary">Transparent Pricing</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-snug mt-0.5">Zero hidden fees. Tolls, fuel &amp; driver allowance included.</p>
                    </div>
                  </div>

                  <div className="reveal-scale bg-surface p-4 rounded-2xl border border-emerald-900/10 flex items-start gap-3 hover:border-emerald-700/30 hover:shadow-sm transition-all duration-300">
                    <span className="material-symbols-outlined text-emerald-800 text-xl flex-shrink-0 mt-0.5">support_agent</span>
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-primary">24/7 On-Trip Support</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-snug mt-0.5">Instant WhatsApp concierge throughout your entire trip.</p>
                    </div>
                  </div>

                  <div className="reveal-scale bg-surface p-4 rounded-2xl border border-emerald-900/10 flex items-start gap-3 hover:border-emerald-700/30 hover:shadow-sm transition-all duration-300">
                    <span className="material-symbols-outlined text-emerald-800 text-xl flex-shrink-0 mt-0.5">hotel</span>
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-primary">Handpicked Stays</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-snug mt-0.5">Vetted 3-Star &amp; 4-Star resorts and private houseboats.</p>
                    </div>
                  </div>

                  <div className="reveal-scale bg-surface p-4 rounded-2xl border border-emerald-900/10 flex items-start gap-3 hover:border-emerald-700/30 hover:shadow-sm transition-all duration-300">
                    <span className="material-symbols-outlined text-emerald-800 text-xl flex-shrink-0 mt-0.5">route</span>
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-primary">Custom Itineraries</h4>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-snug mt-0.5">Flexible travel dates, vehicle choices &amp; custom stops.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs sm:text-sm uppercase tracking-wider font-bold px-7 py-3.5 rounded-full transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>Plan Your Vacation</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>

                  <a
                    href="https://wa.me/919656464124?text=Hi%20Tripora!%20I%20would%20like%20to%20know%20more%20about%20your%20Kerala%20tour%20packages."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-900/20 font-sans text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base text-emerald-700">chat</span>
                    <span>Chat With Expert</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* SECTION 3: TRENDING DESTINATIONS */}
        {/* ========================================================================= */}
        <section id="destinations" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 bg-surface-container-lowest border-t border-emerald-900/10 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 reveal-up">
              <h2 className="font-sans text-3xl sm:text-4xl text-primary font-bold">
                Handpicked Destinations <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">loved by travelers</span>
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-2">
                Explore iconic Kerala spots woven seamlessly into our curated tour packages.
              </p>
            </div>

            {/* Showcase Grid: Badges + Featured Cutout Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
              {/* Left Column: 6 Feature Badges */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 reveal-from-left reveal-stagger">
                {[
                  { title: "Best Price Guaranteed", icon: "verified" },
                  { title: "Curated Experiences", icon: "shield" },
                  { title: "24/7 Travel Support", icon: "support_agent" },
                  { title: "Safe & Secure", icon: "lock" },
                  { title: "Signature Circuits", icon: "explore" },
                  { title: "Handpicked Stays", icon: "hotel" },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="reveal-scale bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-900/10 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-emerald-700/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                    </div>
                    <span className="font-sans text-xs font-bold text-primary leading-snug">{badge.title}</span>
                  </div>
                ))}
              </div>

              {/* Right Column: Organic Cutout Showcase Image */}
              <div className="lg:col-span-6 relative reveal-from-right delay-150">
                <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white h-72 sm:h-88 relative group">
                  <img
                    src="/locations/houseboat.webp"
                    alt="Alleppey Backwaters Scenic View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <span className="bg-emerald-800/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                      ⭐ Highlight Spotlight
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">Alleppey Luxury Houseboat Cruise</h3>
                    <p className="font-sans text-xs sm:text-sm text-white/80">Experience sunset over palm-fringed backwater canals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Spotlight Cards Grid - Staggered Scale Reveals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {destinationSpotlights.map((dest, i) => (
                <div
                  key={i}
                  className={`reveal-scale delay-${(i + 1) * 100} group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-emerald-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>
                      <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <span className="material-symbols-outlined text-emerald-700 text-xs">location_on</span>
                        <span className="font-sans text-[11px] font-bold text-primary uppercase">{dest.name}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-primary mb-2">{dest.title}</h3>
                      <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">{dest.desc}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex justify-between items-center text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <span>Included in Packages</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FEATURED TOUR PACKAGES SHOWCASE */}
        {/* ========================================================================= */}
        <section id="itinerary" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 bg-surface border-y border-emerald-900/10">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 reveal-up">
              <span className="text-emerald-700 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                Featured Packages
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl text-primary font-bold mt-1">
                Explore Our Signature <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">Holiday Packages</span>
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-2">
                Handcrafted itineraries for families, couples, and adventurers. Inspect full day-by-day plans on our dedicated packages page.
              </p>
            </div>

            {/* 3 Package Showcase Cards Grid - Staggered Reveals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {allPackages.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className={`reveal-up delay-${(idx + 1) * 100} bg-white rounded-2xl border border-emerald-900/10 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {pkg.badge}
                      </span>
                      <span className="font-sans text-xs font-bold text-emerald-800">
                        {pkg.duration}
                      </span>
                    </div>

                    <h3 className="font-sans text-lg font-bold text-primary mb-1.5 group-hover:text-emerald-800 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-1 mb-4">
                      {pkg.route}
                    </p>

                    <div className="bg-surface p-3.5 rounded-xl border border-emerald-900/10 mb-5">
                      <p className="text-[9px] uppercase font-bold text-gray-400">Starting Price</p>
                      <p className="text-sm font-bold text-emerald-900">💰 {pkg.price}</p>
                    </div>

                    <div className="space-y-2 font-sans text-xs text-on-surface-variant mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-emerald-700 text-sm">directions_car</span>
                        <span>{pkg.vehicle}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-emerald-700 text-sm">hotel</span>
                        <span>Handpicked Deluxe Accommodation</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-emerald-700 text-sm">houseboat</span>
                        <span>Backwater &amp; Sightseeing Highlights</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/packages#${pkg.id}`}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs uppercase tracking-wider font-bold py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>Inspect Detailed Itinerary</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner to /packages */}
            <div className="text-center reveal-scale delay-200">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs sm:text-sm uppercase tracking-wider font-bold px-8 py-3.5 rounded-full transition-all shadow-md active:scale-95"
              >
                <span>View All Packages &amp; Day-by-Day Itineraries</span>
                <span className="material-symbols-outlined text-base">east</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CONTACT / BOOKING SECTION */}
        {/* ========================================================================= */}
        <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-emerald-900/40">
              
              {/* Left Contact Info */}
              <div className="lg:col-span-5 space-y-5 reveal-from-left">
                <div>
                  <span className="text-amber-300 font-sans text-[11px] uppercase tracking-[0.2em] font-bold block mb-2">
                    CONTACT / BOOKING
                  </span>
                  <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    Let's plan your perfect <span className="text-amber-300 font-script font-normal text-4xl sm:text-5xl">Kerala getaway!</span>
                  </h2>
                </div>
                
                <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
                  Have questions about custom dates, hotel upgrades, or private vehicle preferences? Connect directly with our Kerala travel experts.
                </p>

                {/* Horizontal Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15 font-sans text-xs">
                  <a
                    href="tel:+919656464124"
                    className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 flex-shrink-0">
                      <span className="material-symbols-outlined text-amber-300 text-sm">call</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] text-white/60 uppercase font-bold truncate">Call Us</p>
                      <p className="font-bold text-xs truncate">+91 96564 64124</p>
                    </div>
                  </a>

                  <a
                    href="mailto:tripora68@gmail.com"
                    className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 flex-shrink-0">
                      <span className="material-symbols-outlined text-amber-300 text-sm">mail</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] text-white/60 uppercase font-bold truncate">Email</p>
                      <p className="font-bold text-xs truncate">tripora68@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/tripora.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 flex-shrink-0">
                      <span className="material-symbols-outlined text-amber-300 text-sm">photo_camera</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] text-white/60 uppercase font-bold truncate">Instagram</p>
                      <p className="font-bold text-xs truncate">tripora.in</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Booking / WhatsApp Form */}
              <div className="lg:col-span-7 bg-white text-on-surface rounded-2xl p-6 sm:p-8 shadow-lg reveal-from-right delay-150">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-primary">
                    Request Package Quote
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Instant WhatsApp itinerary quote &amp; pricing
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <span className="material-symbols-outlined text-emerald-600 text-4xl">check_circle</span>
                    <h4 className="font-sans text-lg font-bold text-primary">Inquiry Submitted!</h4>
                    <p className="font-sans text-xs text-on-surface-variant">
                      Thank you, {formState.name}! We will contact you immediately via WhatsApp.
                    </p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-700 text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>Continue on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-primary mb-1.5 uppercase tracking-wider text-[9px]">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-primary mb-1.5 uppercase tracking-wider text-[9px]">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Row 2: Travel Date & Package */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-primary mb-1.5 uppercase tracking-wider text-[9px]">Travel Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                          value={formState.travelDate}
                          onChange={(e) => setFormState({ ...formState, travelDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-primary mb-1.5 uppercase tracking-wider text-[9px]">Select Package</label>
                        <select
                          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface cursor-pointer"
                          value={formState.selectedPackage}
                          onChange={(e) => setFormState({ ...formState, selectedPackage: e.target.value })}
                        >
                          <option>7 Days of Kerala (6N / 7D)</option>
                          <option>Munnar Escape (2N / 3D)</option>
                          <option>5 Days / 4 Nights Kerala Tour</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Notes */}
                    <div>
                      <label className="block font-bold text-primary mb-1.5 uppercase tracking-wider text-[9px]">Special Requests / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Preferred hotel category, meal requirements..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                        value={formState.notes}
                        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      ></textarea>
                    </div>

                    {/* Row 4: Side-by-Side Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                      <button
                        type="submit"
                        className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-5 rounded-full uppercase tracking-wider text-[11px] transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>Send Booking Inquiry</span>
                        <span className="material-symbols-outlined text-xs">send</span>
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-full uppercase tracking-wider text-[11px] transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-xs">chat</span>
                        <span>Instant WhatsApp Book</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
