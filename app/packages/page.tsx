"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import plansData from "@/public/plans.json";

const allPackages = plansData.packages;

export default function PackagesPage() {
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  const currentPkg = allPackages[selectedPkgIndex];

  const getWhatsAppUrl = () => {
    const text = `Hi Tripora! I am interested in the *${currentPkg.title} (${currentPkg.duration})* package.%0A%0APrice: ${currentPkg.price}`;
    return `https://wa.me/919656464124?text=${text}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* ========================================================================= */}
        {/* DETAILED ITINERARY & PACKAGE SWITCHER SECTION */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-10 px-margin-mobile md:px-margin-desktop bg-surface">
          <div className="max-w-container-max-width mx-auto">
            {/* Page Header */}
            <div className="mb-6 border-b border-emerald-900/10 pb-4">
              <span className="text-emerald-700 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                Tripora Tour Packages
              </span>
              <h1 className="font-sans text-2xl sm:text-4xl text-primary font-extrabold mt-0.5">
                Explore Our <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">Kerala Packages</span>
              </h1>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1">
                Select any package below to inspect full day-by-day itineraries, inclusions, and book via WhatsApp.
              </p>
            </div>
            {/* COMPACT PACKAGE SELECTOR BAR */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                <span>Select Package:</span>
              </label>

              {/* Horizontal Pill Selector Buttons */}
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
                {allPackages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPkgIndex(idx);
                        setActiveDay(1);
                      }}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 flex items-center gap-2.5 border ${
                        isSelected
                          ? "bg-emerald-900 text-white border-emerald-800 shadow-md scale-[1.01]"
                          : "bg-white text-primary hover:bg-emerald-50 border-emerald-900/10"
                      }`}
                    >
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-amber-400 text-emerald-950" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {pkg.duration}
                      </span>
                      <span>{pkg.title}</span>
                      <span className={`text-[11px] font-extrabold ${isSelected ? "text-amber-300" : "text-emerald-800"}`}>
                        {pkg.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COMPACT FULL WIDTH PACKAGE EXPLAINER CARD */}
            <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-md p-3.5 sm:p-4">
                
                {/* Active Package Banner Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-2.5 border-b border-gray-100 gap-2 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="bg-emerald-800 text-white font-sans text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {currentPkg.duration}
                      </span>
                      <span className="bg-emerald-100 text-emerald-900 font-sans text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {currentPkg.vehicle}
                      </span>
                    </div>
                    <h2 className="font-sans text-lg sm:text-xl font-bold text-primary leading-tight">
                      {currentPkg.title}
                    </h2>
                    <p className="font-serif italic text-[11px] text-primary/70">
                      "{currentPkg.subtitle}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-900/10 text-right">
                      <p className="text-[7px] uppercase font-bold text-gray-400 leading-none">Starting Price</p>
                      <p className="text-xs font-extrabold text-emerald-900 leading-snug">{currentPkg.price}</p>
                    </div>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-[10px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full transition-all shadow-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">chat</span>
                      <span>WhatsApp Book</span>
                    </a>
                  </div>
                </div>

                {/* Compact Inclusions Bar */}
                <div className="bg-surface px-3 py-1.5 rounded-xl border border-emerald-900/10 mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[10.5px]">
                  <span className="font-bold text-primary uppercase text-[9px] tracking-wider flex items-center gap-1 text-emerald-800">
                    <span className="material-symbols-outlined text-xs">inventory_2</span>
                    <span>Inclusions:</span>
                  </span>
                  {currentPkg.inclusions.map((inc, i) => (
                    <span key={i} className="flex items-center gap-1 text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-emerald-700 text-[11px]">check_circle</span>
                      <span>{inc}</span>
                    </span>
                  ))}
                </div>

                {/* Day Selector Tabs */}
                <div className="flex overflow-x-auto no-scrollbar gap-1 mb-3 pb-0.5 justify-start sm:justify-center">
                  {currentPkg.itinerary.map((dayItem) => (
                    <button
                      key={dayItem.day}
                      onClick={() => setActiveDay(dayItem.day)}
                      className={`px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
                        activeDay === dayItem.day
                          ? "bg-emerald-800 text-white shadow-xs scale-105"
                          : "bg-surface text-primary border border-emerald-900/10 hover:bg-emerald-100"
                      }`}
                    >
                      Day {dayItem.day}
                    </button>
                  ))}
                </div>

                {/* Active Day Content Breakdown */}
                {currentPkg.itinerary
                  .filter((item) => item.day === activeDay)
                  .map((currentDay) => (
                    <div key={currentDay.day} className="space-y-2.5 animate-fadeIn">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-1.5 border-b border-gray-100 gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-800 text-white font-sans text-[8.5px] font-bold px-2 py-0.5 rounded-full uppercase">
                            DAY {currentDay.day}
                          </span>
                          <h3 className="font-sans text-base font-bold text-primary">
                            {currentDay.title}
                          </h3>
                          <span className="text-gray-400 text-[10px] font-sans uppercase font-semibold hidden md:inline">
                            ({currentDay.route})
                          </span>
                        </div>

                        <div className="bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-900/10 flex items-center gap-1 text-[10px]">
                          <span className="material-symbols-outlined text-emerald-700 text-xs">hotel</span>
                          <span className="font-bold text-emerald-900">Stay: {currentDay.stay}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                        {/* Left Activities List */}
                        <div className="lg:col-span-7">
                          <h4 className="font-sans text-[11px] font-bold text-primary mb-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-emerald-700 text-xs">checklist</span>
                            <span>Attractions &amp; Sightseeing</span>
                          </h4>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-sans text-[10.5px]">
                            {currentDay.activities.map((act, i) => (
                              <li key={i} className="flex items-start gap-1 p-1.5 rounded-lg bg-surface border border-gray-100 hover:bg-emerald-50 transition-colors">
                                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[8.5px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span className="text-on-surface-variant font-medium leading-tight">{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right Photo Gallery */}
                        <div className="lg:col-span-5">
                          <h4 className="font-sans text-[11px] font-bold text-primary mb-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-emerald-700 text-xs">collections</span>
                            <span>Day Highlights</span>
                          </h4>

                          <div className="grid grid-cols-2 gap-1.5">
                            {currentDay.images.map((img, i) => (
                              <div key={i} className="group relative h-16 sm:h-18 rounded-lg overflow-hidden border border-gray-100 shadow-xs">
                                <img
                                  src={img.url}
                                  alt={img.label}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-1.5">
                                  <span className="text-white font-sans text-[9px] font-bold tracking-wide line-clamp-1">{img.label}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
