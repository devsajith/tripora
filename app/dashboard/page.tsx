"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Booking {
  id: string;
  title: string;
  loc: string;
  dates: string;
  status: "COMPLETED" | "UPCOMING" | "PROCESSING";
  img: string;
}

const defaultReservations: Booking[] = [
  {
    id: "res-1",
    title: "Hotel de Crillon",
    loc: "Paris, France",
    dates: "Nov 12 — Nov 18, 2026",
    status: "COMPLETED",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7TdzG50JkhTX11VkW5wSwEk4LYj1-IpMMkfYdXeVpXPQ7RtPr9lQb542R-yaZa99S5khMVp6H_x9oxH5aKrXbwFgTF2YHTRwGPfcRv2olVXsOJWJMGUjcmjRH74LdHr6wz2V992HC1sS6vsk7AcD54QiuvfIsd696Lc3CEKHRivTUZhNN5hMapZazIYf1iJMHTiGuDwvVg-N2kVil1og1w_KVYuimIszKJORynhEGWAVtKJeiSCmvnyav4eH-q77hTwhTiJ92nIQ",
  },
  {
    id: "res-2",
    title: "The Alpina Gstaad",
    loc: "Gstaad, Switzerland",
    dates: "Dec 20 — Dec 28, 2026",
    status: "UPCOMING",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr-ndpMU-zlxD5sReK7t-H29KhICVJIzffYF_elL8C_hUCTGvAy6ER5eJHoh-LXBY627cypSBJZ7G1blylbEbqvlqdDBNR2IznAtwuJMY5HoIGrWhpu-51iTXSsTwVDnqDwtjzJq_pjt_d5VsG6EgyIrFpAuE_iYUGaOk2y4DvxvrkhlXjk5jQgiDNEJXXe9XQxDqBMRgWpC7dk3H8BRMUbkNoRL_CAs9RJOB6SmCO9gC-lSRRlPzQy5CPrt62jXY9b5_-QrVKtKU",
  },
  {
    id: "res-3",
    title: "Charter: Private Jet",
    loc: "Aspen Express",
    dates: "Jan 05, 2027",
    status: "PROCESSING",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgeNPlbdM_0n3AVEjBjaSfYeE92QrbwnHdDn0mqf1TBuQKV5Jj6GPi8Cv8j1LHEX-gjxhedJFJLw5UTwqamFHkMwqsjB0ICzet9BRj8rnz7UMu5gAaQ1QQRKiYDDQITgnMvm7Qcmd2wK3S86CeYUfrSVT4DO_I5tC9k1vEGWsvXEXmoREdKP6eHyssWrFY6Grb70WV6enjLmmCgPf50pXtLrfiZNJ09Arf-5mLWSXyA1vCk14xquzoKRttIXJH6Agc3v64_uqAmV0",
  },
];

export default function Dashboard() {
  const [reservations, setReservations] = useState<Booking[]>([]);

  useEffect(() => {
    // Read reservations from localStorage
    const saved = localStorage.getItem("tripora_bookings");
    let bookingsList: Booking[] = saved ? JSON.parse(saved) : [];

    // If empty, initialize with default list
    if (bookingsList.length === 0) {
      localStorage.setItem("tripora_bookings", JSON.stringify(defaultReservations));
      bookingsList = defaultReservations;
    }

    setReservations(bookingsList);
  }, []);

  const handleClearBookings = () => {
    localStorage.removeItem("tripora_bookings");
    setReservations(defaultReservations);
    localStorage.setItem("tripora_bookings", JSON.stringify(defaultReservations));
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-24 w-full">
        {/* Welcome Header */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-secondary font-sans text-label-md mb-2 tracking-widest font-semibold uppercase">
                Established Privilege
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-display-lg text-white leading-tight">
                Welcome back, <span className="text-primary italic">Julian</span>
              </h1>
            </div>
            <div className="text-left md:text-right border-t md:border-t-0 border-outline-variant/20 pt-4 md:pt-0">
              <p className="font-sans text-[10px] text-label-sm text-on-surface-variant tracking-widest font-semibold uppercase">
                Membership Tier
              </p>
              <p className="font-display text-headline-sm text-secondary">
                Palladium Elite
              </p>
            </div>
          </div>
        </header>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Maldives Countdown Card */}
          <div className="col-span-12 lg:col-span-8 relative h-[350px] md:h-[500px] rounded-xl overflow-hidden group glow-accent">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Maldives Private overwater villa"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB89iii5PHKEbdFFdWJkeLeQF6eDftM1u6OuP7_vXzzAqPMSCLA8OYKKtUBsKz0P2WLZpMDrNMIHYR0g6izbhCdMk1Cqg0pXOsWCVo_7fcrBymejEsSDRRXvAyuEJ9cO3XihM0YtkwfMOKxdworDDaukxnKqCaxiNlKc0hpoDACdG1Hr9qOC5-RNFoV0KsyTiCq_MZkcEWxoAD033_MVe6DHqqXY93IFim7tgaGJqkGmopVwPkUVhz5xZjDCVwPgtlIDX_QryaEj1E"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
              <div>
                <span className="inline-block px-3 py-1 bg-primary text-on-primary font-sans text-[10px] text-label-sm font-semibold mb-4 rounded-sm">
                  NEXT JOURNEY
                </span>
                <h2 className="font-display text-headline-md md:text-headline-lg text-white mb-2 leading-tight">
                  Amilla Fushi, Maldives
                </h2>
                <p className="font-sans text-body-lg text-primary-fixed-dim">
                  Private Villa &amp; Spa Sanctuary
                </p>
              </div>
              <div className="text-left md:text-right w-full md:w-auto flex md:block justify-between items-center border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                <p className="font-sans text-[10px] text-label-sm text-on-surface-variant tracking-widest md:mb-1 font-semibold">
                  DEPARTING IN
                </p>
                <div className="flex gap-2 items-baseline">
                  <span className="font-display text-4xl md:text-display-lg text-secondary">
                    08
                  </span>
                  <span className="font-sans text-label-md text-secondary/80 font-bold">
                    DAYS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Status Component */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-xl p-8 flex flex-col justify-between border border-outline-variant/10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-headline-sm text-white">Live Flight Status</h3>
                <span className="flex items-center gap-1 text-[11px] font-sans text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                  On Time
                </span>
              </div>

              {/* Mobile Horizontal Connector View (Hidden on Desktop) */}
              <div className="flex justify-between items-center py-4 border-y border-outline-variant/10 my-4 md:hidden">
                <div className="text-center">
                  <p className="text-3xl text-primary leading-tight font-display">LHR</p>
                  <p className="text-[11px] text-on-surface-variant">London</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="w-full h-[1px] bg-outline-variant/30 relative">
                    <span className="material-symbols-outlined absolute -top-3.5 left-1/2 -translate-x-1/2 text-secondary text-[18px]">
                      flight_takeoff
                    </span>
                  </div>
                  <span className="text-[9px] font-sans text-on-surface-variant mt-1.5 uppercase tracking-wider font-semibold">BA2049</span>
                </div>
                <div className="text-center">
                  <p className="text-3xl text-primary leading-tight font-display">MLE</p>
                  <p className="text-[11px] text-on-surface-variant">Male</p>
                </div>
              </div>

              {/* Desktop Vertical View (Hidden on Mobile) */}
              <div className="hidden md:block space-y-8 my-6">
                <div className="relative pl-6 border-l border-primary/30">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
                  <p className="font-sans text-[10px] text-label-sm text-on-surface-variant font-semibold tracking-wider">
                    LHR • LONDON
                  </p>
                  <p className="font-display text-headline-sm text-white">14:20</p>
                  <p className="font-sans text-label-md text-secondary font-bold">
                    ON TIME
                  </p>
                </div>
                <div className="relative pl-6 border-l border-outline-variant/30">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-outline-variant"></div>
                  <p className="font-sans text-[10px] text-label-sm text-on-surface-variant font-semibold tracking-wider">
                    MLE • MALÉ
                  </p>
                  <p className="font-display text-headline-sm text-white">06:45</p>
                  <p className="font-sans text-label-md text-on-surface-variant">
                    +1 DAY
                  </p>
                </div>
              </div>

              {/* Flight Logistics Info */}
              <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/10 pt-4 md:hidden">
                <div>
                  <p className="text-[10px] text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Gate</p>
                  <p className="font-bold text-white text-body-md">B42</p>
                </div>
                <div>
                  <p className="text-[10px] text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Departure</p>
                  <p className="font-bold text-white text-body-md">10:45 AM</p>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-outline-variant/10">
              <p className="font-sans text-[10px] text-label-sm text-on-surface-variant font-semibold mb-2">
                AIRCRAFT
              </p>
              <div className="flex justify-between items-center">
                <p className="font-sans text-body-md text-white font-medium">
                  Gulfstream G650ER
                </p>
                <p className="font-sans text-label-md text-primary font-bold">
                  Tail: N700TJ
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Component (Visible on Dashboard, Responsive Row) */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <a
              href="#"
              className="flex items-center justify-between bg-surface-container/70 p-5 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">settings</span>
                </div>
                <div>
                  <p className="font-sans text-body-md font-bold text-white">Profile Settings</p>
                  <p className="text-[11px] font-sans text-on-surface-variant">Account and security settings</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </a>

            <a
              href="tel:+41440000000"
              className="flex items-center justify-between bg-surface-container/70 p-5 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <p className="font-sans text-body-md font-bold text-white">24/7 Support Desk</p>
                  <p className="text-[11px] font-sans text-on-surface-variant">Instant concierge assistance</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </a>
          </div>

          {/* Reservations List */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-xl p-8 border border-outline-variant/10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 gap-4">
              <h3 className="font-display text-headline-sm text-white">
                Recent Reservations
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={handleClearBookings}
                  className="text-on-surface-variant hover:text-white font-sans text-label-md border border-outline-variant/30 px-4 py-1.5 rounded-lg transition-colors text-xs"
                >
                  Reset List
                </button>
                <button className="text-primary font-sans text-label-md hover:underline font-bold text-xs uppercase tracking-wider">
                  View All History
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {reservations.map((item) => (
                <div key={item.id} className="flex gap-6 group cursor-pointer border-b border-outline-variant/5 pb-6 last:border-0 last:pb-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-low">
                    <img
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-grow flex justify-between items-start">
                    <div className="space-y-1">
                      <span
                        className={`font-sans text-[9px] text-label-sm font-bold tracking-widest uppercase ${
                          item.status === "COMPLETED"
                            ? "text-secondary"
                            : item.status === "UPCOMING"
                            ? "text-on-primary-container bg-primary-container/20 px-2 py-0.5 rounded"
                            : "text-primary"
                        }`}
                      >
                        {item.status}
                      </span>
                      <h4 className="font-sans text-body-md font-bold text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant">
                        {item.loc}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-[11px] text-on-surface-variant font-medium">
                        {item.dates}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
