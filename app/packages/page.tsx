"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import plansData from "@/public/plans.json";

const allPackages = plansData.packages;

export default function PackagesPage() {
  // Track open day accordions per package (default: all days open)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: prev[key] === false ? true : false,
    }));
  };

  const getWhatsAppUrl = (pkgTitle: string, pkgDuration: string, pkgPrice: string) => {
    const text = `Hi Tripora! I am interested in booking the *${pkgTitle} (${pkgDuration})* package.%0A%0A*Price:* ${pkgPrice}`;
    return `https://wa.me/919656464124?text=${text}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* ========================================================================= */}
        {/* PAGE HEADER */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-surface border-b border-emerald-900/10">
          <div className="max-w-7xl mx-auto text-center max-w-2xl reveal-up">
            <span className="bg-emerald-100 text-emerald-900 font-sans text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Handcrafted Tour Packages
            </span>
            <h1 className="font-sans text-3xl sm:text-5xl text-primary font-extrabold mt-3 leading-tight">
              Kerala <span className="text-emerald-700 font-script font-normal text-4xl sm:text-6xl">Holiday Packages</span>
            </h1>
            <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-3 leading-relaxed">
              Explore signature Kerala itineraries with private AC transport, handpicked stays, backwater houseboats, and 24/7 dedicated driver support.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PACKAGES LIST SECTION */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
            {allPackages.map((pkg) => (
              <div
                key={pkg.id}
                id={pkg.id}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl scroll-mt-24 reveal-scale"
              >
                {/* 1. Package Header Banner */}
                <div className="relative bg-emerald-950 text-white p-6 sm:p-8 md:p-10">
                  {/* Background Image Accent */}
                  <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
                    <Image
                      fill
                      src={pkg.itinerary[0]?.images[0]?.url || "/locations/AllepyBackwater.webp"}
                      alt={pkg.title}
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/60"></div>
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                        <span className="bg-amber-400 text-emerald-950 font-sans text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          {pkg.badge}
                        </span>
                        <span className="bg-white/15 text-white backdrop-blur-md font-sans text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {pkg.duration}
                        </span>
                      </div>
                      <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
                        {pkg.title}
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-white/80 mt-1.5">
                        📍 <span className="font-semibold">{pkg.route}</span>
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                      <div>
                        <p className="text-[9px] uppercase font-bold text-amber-300">Package Starting Price</p>
                        <p className="text-xl sm:text-2xl font-extrabold text-white">{pkg.price}</p>
                      </div>

                      <a
                        href={getWhatsAppUrl(pkg.title, pkg.duration, pkg.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full transition-all shadow-md flex items-center gap-2 active:scale-95 ml-auto sm:ml-0"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Book on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Key Specs & Inclusions */}
                <div className="p-6 sm:p-8 md:p-10 border-b border-gray-100 bg-surface/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-xl">directions_car</span>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-gray-400">Private Vehicle</p>
                        <p className="text-xs sm:text-sm font-bold text-primary">{pkg.vehicle}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-xl">hotel</span>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-gray-400">Accommodation</p>
                        <p className="text-xs sm:text-sm font-bold text-primary">Handpicked 3★ / 4★ Hotels</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-xs flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-xl">houseboat</span>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold text-gray-400">Backwater Highlight</p>
                        <p className="text-xs sm:text-sm font-bold text-primary">Deluxe Houseboat Cruise</p>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div>
                    <h3 className="font-sans text-xs font-bold text-primary uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-700 text-sm">inventory_2</span>
                      <span>Package Inclusions:</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-sans text-xs">
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-emerald-900/10 shadow-2xs">
                          <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                          <span className="text-on-surface-variant font-medium leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Expandable Day-by-Day Timeline Accordion */}
                <div className="p-6 sm:p-8 md:p-10 bg-white">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-sans text-sm sm:text-base font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-800">event_note</span>
                      <span>Day-by-Day Detailed Itinerary</span>
                    </h3>
                    <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">
                      Click any day to view activities &amp; photos
                    </span>
                  </div>

                  {/* Days Accordion List */}
                  <div className="space-y-4">
                    {pkg.itinerary.map((dayItem) => {
                      const accordionKey = `${pkg.id}-${dayItem.day}`;
                      const isOpen = openAccordions[accordionKey] !== false;

                      return (
                        <div
                          key={dayItem.day}
                          className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                            isOpen
                              ? "border-emerald-700/40 bg-emerald-950/5 shadow-xs"
                              : "border-gray-200 bg-white hover:border-emerald-700/20"
                          }`}
                        >
                          {/* Accordion Bar Header */}
                          <div
                            onClick={() => toggleAccordion(accordionKey)}
                            className="p-4 sm:p-5 sm:px-6 cursor-pointer flex justify-between items-center select-none"
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`font-sans text-xs font-extrabold px-3.5 py-1 rounded-full uppercase ${
                                isOpen ? "bg-emerald-800 text-white" : "bg-emerald-100 text-emerald-900"
                              }`}>
                                DAY {dayItem.day}
                              </span>
                              <div>
                                <h4 className="font-sans text-sm sm:text-base font-bold text-primary">
                                  {dayItem.title}
                                </h4>
                                <p className="font-sans text-[11px] text-gray-500 font-medium mt-0.5">
                                  📍 {dayItem.route}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 px-3.5 py-1.5 rounded-lg border border-emerald-900/10">
                                <span className="material-symbols-outlined text-sm text-emerald-700">hotel</span>
                                <span>{dayItem.stay}</span>
                              </div>

                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                                isOpen ? "bg-emerald-800 text-white rotate-180" : "bg-gray-100 text-gray-600"
                              }`}>
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                              </div>
                            </div>
                          </div>

                          {/* Accordion Content Body */}
                          {isOpen && (
                            <div className="p-5 sm:p-6 sm:px-7 pt-0 border-t border-emerald-900/10 space-y-5 animate-fadeIn">
                              <p className="font-serif italic text-xs sm:text-sm text-primary/80 leading-relaxed mt-4">
                                &ldquo;{dayItem.subtitle}&rdquo;
                              </p>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                {/* Left Sightseeing List */}
                                <div className="lg:col-span-7 space-y-2.5">
                                  <h5 className="font-sans text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-emerald-700 text-sm">checklist</span>
                                    <span>Sightseeing &amp; Activities</span>
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {dayItem.activities.map((act, idx) => (
                                      <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-gray-100 text-xs">
                                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                          {idx + 1}
                                        </span>
                                        <span className="text-on-surface-variant font-medium leading-snug">{act}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right Day Location Gallery */}
                                <div className="lg:col-span-5 space-y-2.5">
                                  <h5 className="font-sans text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-emerald-700 text-sm">photo_camera</span>
                                    <span>Location Highlights</span>
                                  </h5>
                                  <div className="grid grid-cols-2 gap-3">
                                    {dayItem.images.map((img, idx) => (
                                      <div key={idx} className="group relative h-26 sm:h-32 rounded-xl overflow-hidden shadow-xs border border-gray-100">
                                        <Image
                                          fill
                                          src={img.url}
                                          alt={img.label}
                                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                                          sizes="(max-width: 640px) 50vw, 20vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-2.5 z-10 pointer-events-none">
                                          <span className="text-white font-sans text-[10px] font-bold line-clamp-1">{img.label}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Package Card Bottom Action Footer */}
                <div className="p-5 sm:p-7 bg-surface border-t border-emerald-900/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs text-on-surface-variant font-sans text-center sm:text-left">
                    <span className="font-bold text-primary">Need a customized itinerary?</span> We can adjust hotels, dates &amp; vehicles.
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href="/#contact"
                      className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-900/20 font-sans text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider text-center transition-colors shadow-xs"
                    >
                      Enquire Custom Plan
                    </Link>

                    <a
                      href={getWhatsAppUrl(pkg.title, pkg.duration, pkg.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-full transition-all shadow-md text-center flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>Book Package</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
