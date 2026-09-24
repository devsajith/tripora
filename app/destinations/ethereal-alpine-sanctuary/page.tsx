"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface DayItinerary {
  day: number;
  title: string;
  route: string;
  stayLocation: string;
  desc: string;
  activities: string[];
  images: { url: string; title: string }[];
}

import plansData from "@/public/plans.json";

const k7Package = plansData.packages[0];

const packageItinerary = k7Package.itinerary.map((item) => ({
  day: item.day,
  title: item.title,
  route: item.route,
  stayLocation: item.stay,
  desc: item.subtitle,
  activities: item.activities,
  images: item.images.map((img) => ({ url: img.url, title: img.label })),
}));

export default function DetailsPage() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("2026-10-24");
  const [guests, setGuests] = useState("2 Adults");
  const [activeDay, setActiveDay] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookNow = () => {
    const newReservation = {
      id: "booking-" + Date.now(),
      title: "7 Days Kerala Tour Package (God's Own Country)",
      loc: "Kochi → Munnar → Thekkady → Alleppey → Trivandrum",
      dates: `${new Date(checkIn).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} (7 Days / 6 Nights)`,
      status: "UPCOMING",
      img: "/locations/AllepyBackwater.webp",
    };

    const existing = localStorage.getItem("tripora_bookings");
    const bookings = existing ? JSON.parse(existing) : [];
    
    const exists = bookings.some((b: any) => b.title === newReservation.title);
    if (!exists) {
      bookings.push(newReservation);
      localStorage.setItem("tripora_bookings", JSON.stringify(bookings));
    }

    setIsBooked(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* ========================================================= */}
        {/* HERO BANNER SECTION */}
        {/* ========================================================= */}
        <section className="relative h-[480px] md:h-[620px] w-full overflow-hidden bg-primary">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Kerala Tour Package"
            src="/locations/AllepyBackwater.webp"
          />
          <div className="absolute inset-0 details-hero-gradient"></div>

          <div className="absolute bottom-0 left-0 w-full px-margin-mobile md:px-margin-desktop pb-10 md:pb-16 max-w-container-max-width mx-auto left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-tertiary text-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-md shadow-xs">
                7 DAYS / 6 NIGHTS
              </span>
              <span className="bg-white/20 text-white backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md border border-white/30">
                START: KOCHI • END: TRIVANDRUM
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3 max-w-3xl leading-tight">
              7 Days of Kerala — God's Own Country Package
            </h1>
            <p className="font-sans text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              From misty tea mountains in Munnar to serene Alleppey backwaters and Kovalam ocean beaches — experience the very best of Kerala in this carefully crafted 7 days journey.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PACKAGE OVERVIEW BAR */}
        {/* ========================================================= */}
        <section className="bg-white border-b border-outline-variant/40 py-8 shadow-xs reveal-up">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 text-center md:text-left">
              <div className="border-r border-outline-variant/30 pr-4 last:border-0">
                <span className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1">
                  DURATION
                </span>
                <span className="font-display text-base font-bold text-primary">
                  7 Days / 6 Nights
                </span>
              </div>

              <div className="border-r border-outline-variant/30 pr-4 last:border-0">
                <span className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1">
                  START POINT
                </span>
                <span className="font-display text-base font-bold text-primary">
                  Kochi (COK)
                </span>
              </div>

              <div className="border-r border-outline-variant/30 pr-4 last:border-0">
                <span className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1">
                  END POINT
                </span>
                <span className="font-display text-base font-bold text-primary">
                  Trivandrum (TRV)
                </span>
              </div>

              <div className="border-r border-outline-variant/30 pr-4 last:border-0">
                <span className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1">
                  PACKAGE TYPE
                </span>
                <span className="font-display text-base font-bold text-primary">
                  Private &amp; Tailored
                </span>
              </div>

              <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-center justify-center lg:justify-end">
                <a
                  href="#book-bar"
                  className="w-full lg:w-auto bg-tertiary hover:bg-tertiary-hover text-white text-xs font-bold px-6 py-3 rounded-lg uppercase tracking-wider text-center shadow-md transition-all active:scale-95"
                >
                  Book This Package
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MAIN ITINERARY CONTENT & ROUTE MAP SECTION */}
        {/* ========================================================= */}
        <section className="py-16 bg-surface">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            
            {/* Left Content Column (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Route & Highlights Box */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-xs reveal-from-left">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-tertiary mb-2 block">
                  PACKAGE HIGHLIGHTS
                </span>
                <h2 className="font-display text-2xl text-primary font-normal mb-6">
                  What makes this journey extraordinary
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Majestic Athirappilly Waterfalls & Munnar Hill Stations",
                    "Wildlife Safaris & Spice Plantation Guided Tour",
                    "Serene Backwaters & Deluxe Alleppey Houseboat Stay",
                    "Pristine Kovalam Beaches & Trivandrum Cultural Heritage",
                    "Comfortable Stays & Private AC Chauffeur Vehicle",
                    "24/7 Dedicated Concierge & Local Assistance",
                  ].map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-tertiary text-lg flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="font-sans text-xs text-on-surface-variant font-medium leading-relaxed">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Journey Route Timeline Bar */}
                <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary block mb-3">
                    JOURNEY ROUTE
                  </span>
                  <div className="flex flex-wrap items-center gap-2 font-sans text-xs font-bold text-primary">
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Kochi</span>
                    <span className="text-tertiary">→</span>
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Athirappilly</span>
                    <span className="text-tertiary">→</span>
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Munnar</span>
                    <span className="text-tertiary">→</span>
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Thekkady</span>
                    <span className="text-tertiary">→</span>
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Kumarakom</span>
                    <span className="text-tertiary">→</span>
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Alleppey</span>
                    <span className="text-tertiary">→</span>
                    <span className="bg-white px-3 py-1 rounded border border-primary/20">Trivandrum</span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Detailed Itinerary Accordion / Tabs */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-tertiary mb-1 block">
                      7 DAYS DETAILED ITINERARY
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-primary font-normal">
                      Day by Day Experience
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {packageItinerary.map((item) => (
                    <div
                      key={item.day}
                      className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                        activeDay === item.day
                          ? "border-primary shadow-md"
                          : "border-outline-variant/40 hover:border-primary/40"
                      }`}
                    >
                      <button
                        onClick={() => setActiveDay(item.day)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-10 h-10 rounded-lg bg-tertiary text-white font-display text-base font-bold flex items-center justify-center flex-shrink-0 shadow-xs">
                            D{item.day}
                          </span>
                          <div>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-tertiary block">
                              DAY {item.day} • {item.route}
                            </span>
                            <h3 className="font-display text-xl text-primary font-normal">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <span className="material-symbols-outlined text-primary text-xl transition-transform">
                          {activeDay === item.day ? "expand_less" : "expand_more"}
                        </span>
                      </button>

                      {activeDay === item.day && (
                        <div className="px-6 pb-6 pt-2 border-t border-outline-variant/20 space-y-6">
                          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                            {item.desc}
                          </p>

                          {/* Day Activities List */}
                          <div>
                            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-primary block mb-3">
                              DAY HIGHLIGHTS &amp; ACTIVITIES:
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.activities.map((act, i) => (
                                <li key={i} className="flex items-center gap-2.5 font-sans text-xs text-on-surface-variant">
                                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0"></span>
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Overnight Stay Badge */}
                          <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 flex items-center gap-3">
                            <span className="material-symbols-outlined text-tertiary text-xl">hotel</span>
                            <div>
                              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                                OVERNIGHT STAY
                              </span>
                              <span className="font-sans text-xs font-bold text-primary">
                                {item.stayLocation}
                              </span>
                            </div>
                          </div>

                          {/* Photo Gallery for Day */}
                          <div className="grid grid-cols-3 gap-3 pt-2">
                            {item.images.map((img, i) => (
                              <div key={i} className="relative h-24 sm:h-28 rounded-lg overflow-hidden border border-outline-variant/30 group">
                                <img
                                  src={img.url}
                                  alt={img.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="font-sans text-[9px] font-bold text-white uppercase tracking-wider">
                                    {img.title}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Inclusions Checklist */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-outline-variant/40 shadow-xs reveal-scale">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-tertiary mb-2 block">
                  TRANSPARENT INCLUSIONS
                </span>
                <h2 className="font-display text-2xl text-primary font-normal mb-6">
                  What is included in your package
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-primary border-b pb-2 border-outline-variant/30">
                      ✅ PACKAGE INCLUSIONS
                    </h3>
                    <ul className="space-y-2.5 text-xs font-sans text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base">check</span>
                        <span>6 Nights Accommodations (Hotels, Resorts &amp; Houseboat)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base">check</span>
                        <span>Daily Breakfast at all hotels &amp; all meals on Houseboat</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base">check</span>
                        <span>Private Air-Conditioned Vehicle throughout journey</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base">check</span>
                        <span>Experienced English/Hindi-speaking Chauffeur</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base">check</span>
                        <span>Complete Sightseeing as per itinerary</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base">check</span>
                        <span>Kochi pickup &amp; Trivandrum airport drop</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-primary border-b pb-2 border-outline-variant/30">
                      ℹ️ GOOD TO KNOW
                    </h3>
                    <ul className="space-y-2.5 text-xs font-sans text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">info</span>
                        <span>Flexible dates — Choose your own departure date</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">info</span>
                        <span>Customizable — Modify stays, hotels, or pace anytime</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">info</span>
                        <span>24/7 Concierge support during travel</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Booking Panel (4 Cols) */}
            <div className="lg:col-span-4 reveal-from-right delay-150">
              <div className="sticky top-28 bg-white rounded-2xl p-6 border border-outline-variant/40 shadow-lg space-y-6" id="book-bar">
                <div className="border-b border-outline-variant/30 pb-4">
                  <span className="font-sans text-[10px] font-bold text-tertiary uppercase tracking-widest block mb-1">
                    BESPOKE TOUR PACKAGE
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-primary">$2,850</span>
                    <span className="font-sans text-xs text-on-surface-variant font-medium">/ per person</span>
                  </div>
                  <span className="font-sans text-[11px] text-primary font-bold mt-1 block">
                    ⭐ 5.0 (140+ Happy Guest Reviews)
                  </span>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4 font-sans">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1.5">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-surface border border-outline-variant/50 rounded-lg p-3 text-xs text-primary font-medium focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1.5">
                      Travelers
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-surface border border-outline-variant/50 rounded-lg p-3 text-xs text-primary font-medium focus:outline-none focus:border-primary"
                    >
                      <option>2 Adults (1 Room)</option>
                      <option>2 Adults, 1 Child</option>
                      <option>4 Adults (2 Rooms)</option>
                      <option>Group / Custom</option>
                    </select>
                  </div>
                </div>

                {isBooked ? (
                  <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl text-center">
                    <span className="material-symbols-outlined text-primary text-3xl mb-1">check_circle</span>
                    <p className="font-sans text-xs font-bold text-primary mb-1">Reservation Confirmed!</p>
                    <p className="font-sans text-[11px] text-on-surface-variant">Redirecting to your dashboard...</p>
                  </div>
                ) : (
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-tertiary hover:bg-tertiary-hover text-white font-bold py-4 rounded-lg font-sans text-xs uppercase tracking-widest shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Reserve Package</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                )}

                <div className="border-t border-outline-variant/30 pt-4 space-y-3 font-sans text-xs text-on-surface-variant">
                  <a
                    href="tel:+919656464124"
                    className="flex items-center gap-2 text-primary font-bold hover:text-tertiary transition-colors"
                  >
                    <span className="material-symbols-outlined text-tertiary text-lg">call</span>
                    <span>Direct Call: +91 96564 64124</span>
                  </a>
                  <a
                    href="https://wa.me/919656464124"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-bold hover:text-tertiary transition-colors"
                  >
                    <span className="material-symbols-outlined text-tertiary text-lg">chat</span>
                    <span>Instant WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
