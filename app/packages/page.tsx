"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import plansData from "@/public/plans.json";

const allPackages = plansData.packages;

type DurationFilter = "all" | "3" | "5" | "7";

interface DurationOption {
  id: DurationFilter;
  label: string;
  badge: string;
  nightsDays: string;
  title: string;
  route: string;
  price: string;
  highlights: string[];
  icon: string;
  packageId?: string;
}

const durationOptions: DurationOption[] = [
  {
    id: "3",
    label: "3 Days",
    badge: "🌿 Weekend Getaway",
    nightsDays: "2 Nights / 3 Days",
    title: "Munnar Escape",
    route: "Kochi → Athirappilly Waterfalls → Munnar Tea Gardens",
    price: "Custom Quote",
    highlights: ["Athirappilly Falls", "Mattupetty Dam", "Echo Point", "Tea Plantations"],
    icon: "weekend",
    packageId: "pkg-munnar-3d",
  },
  {
    id: "5",
    label: "5 Days",
    badge: "⭐ Most Popular",
    nightsDays: "4 Nights / 5 Days",
    title: "5 Days / 4 Nights Kerala Tour",
    route: "Kochi → Munnar → Thekkady → Alleppey",
    price: "Custom Quote",
    highlights: ["Munnar Hill Station", "Thekkady Spice Hills", "Alleppey Houseboat", "Private AC Cab"],
    icon: "explore",
    packageId: "pkg-kerala-5d",
  },
  {
    id: "7",
    label: "7 Days",
    badge: "👑 Grand Circuit",
    nightsDays: "6 Nights / 7 Days",
    title: "7 Days of Kerala (God's Own Country)",
    route: "Kochi → Athirappilly → Munnar → Thekkady → Kumarakom → Alleppey → Trivandrum",
    price: "Signature Priority",
    highlights: ["7 Destinations", "Waterfalls & Hills", "Houseboat Cruise", "Trivandrum Beach"],
    icon: "diamond",
    packageId: "pkg-kerala-7d",
  },
];

const getPackageDays = (pkgId: string): string => {
  if (pkgId.includes("3d")) return "3";
  if (pkgId.includes("5d")) return "5";
  if (pkgId.includes("7d")) return "7";
  return "other";
};

// Sort packages logically by duration: 3 Days -> 5 Days -> 7 Days
const sortedPackages = [...allPackages].sort((a, b) => {
  const dayOrder: Record<string, number> = { "3": 1, "5": 2, "7": 3 };
  return (dayOrder[getPackageDays(a.id)] || 99) - (dayOrder[getPackageDays(b.id)] || 99);
});

export default function PackagesPage() {
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>("all");
  // Track open day accordions per package (default: all days open)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  // Sync hash on initial mount (e.g. #3d, #5d, #7d, #pkg-munnar-3d)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("3d") || hash.includes("munnar")) {
      setSelectedDuration("3");
    } else if (hash.includes("5d")) {
      setSelectedDuration("5");
    } else if (hash.includes("7d") || hash.includes("kerala-7d")) {
      setSelectedDuration("7");
    }
  }, []);

  const handleSelectDuration = (duration: DurationFilter, shouldScroll = true) => {
    setSelectedDuration(duration);

    if (typeof window !== "undefined") {
      const hash = duration === "all" ? "" : `#${duration}d`;
      const newUrl = hash
        ? `${window.location.pathname}${hash}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }

    if (shouldScroll) {
      const listElem = document.getElementById("packages-list");
      if (listElem) {
        const yOffset = -140; // account for fixed navbar + sticky selector
        const y = listElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: prev[key] === false ? true : false,
    }));
  };

  const setAllAccordionsForPackage = (pkgId: string, days: number[], expand: boolean) => {
    setOpenAccordions((prev) => {
      const next = { ...prev };
      days.forEach((day) => {
        next[`${pkgId}-${day}`] = expand;
      });
      return next;
    });
  };

  const getWhatsAppUrl = (pkgTitle: string, pkgDuration: string, pkgPrice: string) => {
    const text = `Hi Tripora! I am interested in booking the *${pkgTitle} (${pkgDuration})* package.%0A%0A*Price:* ${pkgPrice}`;
    return `https://wa.me/919656464124?text=${text}`;
  };

  const getCustomItineraryWhatsAppUrl = (pkgTitle?: string) => {
    const text = pkgTitle
      ? `Hi Tripora! I would like to request a customized itinerary based on the *${pkgTitle}* package.`
      : `Hi Tripora! I would like to request a custom Kerala tour itinerary.`;
    return `https://wa.me/919656464124?text=${encodeURIComponent(text)}`;
  };

  const displayedPackages = selectedDuration === "all"
    ? sortedPackages
    : sortedPackages.filter((pkg) => getPackageDays(pkg.id) === selectedDuration);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* ========================================================================= */}
        {/* PAGE HEADER WITH INTEGRATED PACKAGE SELECTOR */}
        {/* ========================================================================= */}
        <section className="pt-12 sm:pt-16 pb-12 sm:pb-14 px-4 sm:px-8 lg:px-12 bg-surface border-b border-emerald-900/10">
          <div className="max-w-7xl mx-auto">
            {/* Header Title */}
            <div className="text-center max-w-2xl mx-auto">
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

            {/* ========================================================================= */}
            {/* PACKAGE DURATION SELECTOR (3 DAY, 5 DAY, 7 DAY) */}
            {/* ========================================================================= */}
            <div className="mt-8 sm:mt-10 max-w-5xl mx-auto">
              {/* Selector Label & Segmented Tabs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-surface-container-low/70 p-2 sm:p-2.5 rounded-2xl border border-emerald-900/10">
                <div className="flex items-center gap-2 px-3 py-1 text-primary">
                  <span className="material-symbols-outlined text-emerald-800 text-lg">schedule</span>
                  <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-950">
                    Select Trip Duration:
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleSelectDuration("all")}
                    className={`font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      selectedDuration === "all"
                        ? "bg-emerald-800 text-white shadow-md scale-[1.02]"
                        : "bg-white text-emerald-950 hover:bg-emerald-50 border border-emerald-900/10"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">grid_view</span>
                    <span>All Packages (3)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectDuration("3")}
                    className={`font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      selectedDuration === "3"
                        ? "bg-emerald-800 text-white shadow-md scale-[1.02]"
                        : "bg-white text-emerald-950 hover:bg-emerald-50 border border-emerald-900/10"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">weekend</span>
                    <span>3 Days</span>
                    <span className="text-[10px] opacity-80 font-normal hidden sm:inline">(2N/3D)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectDuration("5")}
                    className={`font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      selectedDuration === "5"
                        ? "bg-emerald-800 text-white shadow-md scale-[1.02]"
                        : "bg-white text-emerald-950 hover:bg-emerald-50 border border-emerald-900/10"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">explore</span>
                    <span>5 Days</span>
                    <span className="text-[10px] opacity-80 font-normal hidden sm:inline">(4N/5D)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectDuration("7")}
                    className={`font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                      selectedDuration === "7"
                        ? "bg-emerald-800 text-white shadow-md scale-[1.02]"
                        : "bg-white text-emerald-950 hover:bg-emerald-50 border border-emerald-900/10"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">diamond</span>
                    <span>7 Days</span>
                    <span className="text-[10px] opacity-80 font-normal hidden sm:inline">(6N/7D)</span>
                  </button>
                </div>
              </div>

              {/* Duration Preview Comparison Cards (3 Day, 5 Day, 7 Day) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {durationOptions.map((opt) => {
                  const isSelected = selectedDuration === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectDuration(opt.id)}
                      className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? "bg-white border-2 border-emerald-700 shadow-xl ring-4 ring-emerald-700/10 -translate-y-1"
                          : "bg-white/80 hover:bg-white border border-emerald-900/10 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Active Checkmark Pill */}
                      {isSelected && (
                        <div className="absolute -top-3 right-4 bg-emerald-700 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check</span>
                          <span>Active Selection</span>
                        </div>
                      )}

                      <div>
                        {/* Badge and Duration */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="bg-emerald-100 text-emerald-900 font-sans text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {opt.badge}
                          </span>
                          <span className="font-sans text-xs font-bold text-emerald-800 bg-surface-container px-2.5 py-1 rounded-full">
                            {opt.nightsDays}
                          </span>
                        </div>

                        {/* Title & Route */}
                        <h3 className="font-sans text-lg font-extrabold text-primary group-hover:text-emerald-800 transition-colors">
                          {opt.label} Tour Package
                        </h3>
                        <p className="font-sans text-xs text-on-surface-variant line-clamp-2 mt-1 leading-snug">
                          {opt.title}
                        </p>
                        <p className="font-sans text-[11px] text-gray-500 mt-2 flex items-start gap-1">
                          <span>📍</span>
                          <span className="line-clamp-1">{opt.route}</span>
                        </p>

                        {/* Highlight Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {opt.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium bg-surface text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-900/10"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Select Action Button */}
                      <div className="mt-5 pt-4 border-t border-emerald-900/10 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] uppercase font-bold text-gray-400">Package Starting</p>
                          <p className="text-xs sm:text-sm font-bold text-primary">{opt.price}</p>
                        </div>

                        <span
                          className={`font-sans text-xs font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                            isSelected
                              ? "bg-emerald-800 text-white shadow-xs"
                              : "bg-emerald-50 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white"
                          }`}
                        >
                          <span>{isSelected ? "Viewing" : "Select Plan"}</span>
                          <span className="material-symbols-outlined text-xs">
                            {isSelected ? "arrow_downward" : "arrow_forward"}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STICKY FILTER SUB-BAR (Visible while scrolling) */}
        {/* ========================================================================= */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs py-2.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-800 text-lg">filter_alt</span>
              <span className="font-sans text-xs sm:text-sm font-bold text-primary hidden xs:inline">
                Trip Duration:
              </span>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => handleSelectDuration("all")}
                className={`font-sans text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDuration === "all"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-surface text-emerald-950 hover:bg-emerald-100/60 border border-emerald-900/10"
                }`}
              >
                All Packages
              </button>

              <button
                type="button"
                onClick={() => handleSelectDuration("3")}
                className={`font-sans text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDuration === "3"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-surface text-emerald-950 hover:bg-emerald-100/60 border border-emerald-900/10"
                }`}
              >
                3 Days
              </button>

              <button
                type="button"
                onClick={() => handleSelectDuration("5")}
                className={`font-sans text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDuration === "5"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-surface text-emerald-950 hover:bg-emerald-100/60 border border-emerald-900/10"
                }`}
              >
                5 Days
              </button>

              <button
                type="button"
                onClick={() => handleSelectDuration("7")}
                className={`font-sans text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDuration === "7"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-surface text-emerald-950 hover:bg-emerald-100/60 border border-emerald-900/10"
                }`}
              >
                7 Days
              </button>
            </div>

            {/* Current View Counter */}
            <div className="text-[11px] sm:text-xs text-on-surface-variant font-medium">
              Showing <span className="font-bold text-emerald-900">{displayedPackages.length}</span>{" "}
              {displayedPackages.length === 1 ? "Package" : "Packages"}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PACKAGES LIST SECTION */}
        {/* ========================================================================= */}
        <section
          id="packages-list"
          className="py-10 sm:py-14 md:py-16 px-4 sm:px-8 lg:px-12 bg-surface-container-lowest scroll-mt-28"
        >
          <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
            {/* Filter Active Notice Banner */}
            {selectedDuration !== "all" && (
              <div className="bg-emerald-50 border border-emerald-800/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                    {selectedDuration}D
                  </div>
                  <div>
                    <h2 className="font-sans text-sm sm:text-base font-bold text-primary">
                      Showing {selectedDuration} Days Kerala Package
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Detailed day-wise itinerary, private transfers, and inclusions for this plan.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectDuration("all", false)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-white hover:bg-emerald-100/50 px-4 py-2 rounded-full border border-emerald-800/20 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ml-auto sm:ml-0"
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  <span>View All Durations (3, 5 &amp; 7 Days)</span>
                </button>
              </div>
            )}

            {displayedPackages.map((pkg) => (
              <div
                key={pkg.id}
                id={pkg.id}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl scroll-mt-32 animate-fade-in"
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
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                    <h3 className="font-sans text-sm sm:text-base font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-800">event_note</span>
                      <span>Day-by-Day Detailed Itinerary</span>
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-emerald-700 font-semibold hidden md:inline">
                        Click any day to view activities &amp; photos
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const allDays = pkg.itinerary.map((d) => d.day);
                          const allOpen = allDays.every((d) => openAccordions[`${pkg.id}-${d}`] !== false);
                          setAllAccordionsForPackage(pkg.id, allDays, !allOpen);
                        }}
                        className="text-[11px] sm:text-xs text-emerald-900 font-bold bg-emerald-50 hover:bg-emerald-100/70 px-3 py-1.5 rounded-lg border border-emerald-900/10 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">unfold_more</span>
                        <span>Toggle All Days</span>
                      </button>
                    </div>
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
                    <a
                      href={getCustomItineraryWhatsAppUrl(pkg.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-900/20 font-sans text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider text-center transition-colors shadow-xs inline-flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm text-emerald-800">edit_calendar</span>
                      <span>Enquire Custom Plan</span>
                    </a>

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
