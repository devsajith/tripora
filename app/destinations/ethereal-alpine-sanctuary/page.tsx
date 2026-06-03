"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DetailsPage() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("2026-10-24");
  const [checkOut, setCheckOut] = useState("2026-10-29");
  const [guests, setGuests] = useState("2 Adults, 0 Children");
  const [isBooked, setIsBooked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(20970);
  
  // Mobile sheet toggle
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  // Calculate total price based on dates
  useEffect(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const timeDiff = d2.getTime() - d1.getTime();
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    const base = nights * 3800; // Munnar rate is $3,800
    const concierge = 850;
    const tax = Math.round(base * 0.05);
    setTotalPrice(base + concierge + tax);
  }, [checkIn, checkOut]);

  const handleBookNow = () => {
    // Save reservation to localStorage so dashboard can read it
    const newReservation = {
      id: "booking-" + Date.now(),
      title: "Munnar Tea Estate Sanctuary",
      loc: "Munnar, Kerala, India",
      dates: `${new Date(checkIn).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} — ${new Date(checkOut).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
      status: "UPCOMING",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9-tRLh1ZCHPXJ3DjzNGto_IHAcCxh6V-TN9WYbPeBZaLKd0s-lt58FqgFav5kmLG85EshJ3UdOZIRG_EPjd9P6CHavN3KtQILnuZ7iVQO-u02HAjjf_sj7eW0VjEYD0ljUBb8F3Lffr-3_QWptsAhD5wi15W7LCnn6D45Bc_1lsuYF7JJfaQPhD5gCDKKyQzUCfyS2VpEup-fA37pZp56uu7PgBdkKSXUSwGLCN4SnIuPBbyQdykcnn70XnvjC4OuU2Xw8ZbMQMI",
    };

    const existing = localStorage.getItem("tripora_bookings");
    const bookings = existing ? JSON.parse(existing) : [];
    
    // Check if this booking already exists
    const exists = bookings.some((b: any) => b.title === newReservation.title);
    if (!exists) {
      bookings.push(newReservation);
      localStorage.setItem("tripora_bookings", JSON.stringify(bookings));
    }

    setIsBooked(true);
    setMobilePanelOpen(false);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[530px] md:h-[870px] w-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="A luxury hilltop resort in Munnar, Kerala, overlooking sprawling emerald green tea plantations shrouded in heavy morning fog."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9-tRLh1ZCHPXJ3DjzNGto_IHAcCxh6V-TN9WYbPeBZaLKd0s-lt58FqgFav5kmLG85EshJ3UdOZIRG_EPjd9P6CHavN3KtQILnuZ7iVQO-u02HAjjf_sj7eW0VjEYD0ljUBb8F3Lffr-3_QWptsAhD5wi15W7LCnn6D45Bc_1lsuYF7JJfaQPhD5gCDKKyQzUCfyS2VpEup-fA37pZp56uu7PgBdkKSXUSwGLCN4SnIuPBbyQdykcnn70XnvjC4OuU2Xw8ZbMQMI"
          />
          <div className="absolute inset-0 details-hero-gradient"></div>

          <div className="absolute bottom-0 left-0 w-full px-margin-mobile md:px-margin-desktop pb-16 md:pb-24 max-w-container-max-width mx-auto left-1/2 -translate-x-1/2">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 text-[10px] text-label-sm font-semibold uppercase tracking-widest rounded-sm">
                Limited Availability
              </span>
              <div className="flex items-center text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-display-lg mb-4 text-white max-w-3xl leading-tight">
              Munnar Tea Estate Sanctuary
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
              An exclusive heritage retreat nestled amidst sprawling emerald green tea plantations, ancient mountain peaks, and mist-covered valleys.
            </p>

            {/* Desktop Metrics (Hidden on Mobile) */}
            <div className="hidden md:flex flex-wrap gap-8 md:gap-12 border-t border-outline-variant/30 pt-8">
              <div>
                <p className="text-[10px] text-label-sm font-semibold text-on-tertiary-container uppercase mb-1 tracking-wider">
                  Location
                </p>
                <p className="text-body-md font-sans font-semibold text-on-surface">
                  Munnar, Kerala, India
                </p>
              </div>
              <div>
                <p className="text-[10px] text-label-sm font-semibold text-on-tertiary-container uppercase mb-1 tracking-wider">
                  Elevation
                </p>
                <p className="text-body-md font-sans font-semibold text-on-surface">
                  1,600 Meters
                </p>
              </div>
              <div>
                <p className="text-[10px] text-label-sm font-semibold text-on-tertiary-container uppercase mb-1 tracking-wider">
                  Season
                </p>
                <p className="text-body-md font-sans font-semibold text-on-surface">
                  September to May
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Metrics Horizontal Swipe Row (Hidden on Desktop) */}
        <section className="md:hidden px-margin-mobile mt-8 flex gap-4 overflow-x-auto no-scrollbar w-full">
          <div className="flex-shrink-0 bg-surface-container border border-outline-variant/10 p-4 rounded-xl min-w-[130px] shadow-sm">
            <span className="text-secondary material-symbols-outlined mb-1">location_on</span>
            <p className="text-on-surface-variant text-label-sm font-semibold uppercase text-[10px]">Location</p>
            <p className="text-white font-bold text-body-md">Munnar, Kerala</p>
          </div>
          <div className="flex-shrink-0 bg-surface-container border border-outline-variant/10 p-4 rounded-xl min-w-[130px] shadow-sm">
            <span className="text-secondary material-symbols-outlined mb-1">height</span>
            <p className="text-on-surface-variant text-label-sm font-semibold uppercase text-[10px]">Elevation</p>
            <p className="text-white font-bold text-body-md">1,600 M</p>
          </div>
          <div className="flex-shrink-0 bg-surface-container border border-outline-variant/10 p-4 rounded-xl min-w-[130px] shadow-sm">
            <span className="text-secondary material-symbols-outlined mb-1">star</span>
            <p className="text-on-surface-variant text-label-sm font-semibold uppercase text-[10px]">Rating</p>
            <p className="text-white font-bold text-body-md">5.0 / 5.0</p>
          </div>
          <div className="flex-shrink-0 bg-surface-container border border-outline-variant/10 p-4 rounded-xl min-w-[130px] shadow-sm">
            <span className="text-secondary material-symbols-outlined mb-1">calendar_today</span>
            <p className="text-on-surface-variant text-label-sm font-semibold uppercase text-[10px]">Season</p>
            <p className="text-white font-bold text-body-md">Sep - May</p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-24 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-24">
            {/* Gallery Bento Grid */}
            <div>
              <h2 className="font-display text-3xl font-semibold mb-12 text-white">
                Curated Spaces
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px]">
                <div className="col-span-1 md:row-span-2 overflow-hidden bg-surface-container rounded-xl h-[300px] md:h-auto">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                    alt="Premium master suite overlooking plantations"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqAsFoIXt8Gl0StrsAesBT7KDlyTlfGkJfCYN8RmEku865U8XM2zK_7ZeTkTr2HkqcTWQlCKDGhI-LScpj3j0Tc5eRcdiS-NvXOO6-VVonCGzW_Tlo6aKswJqvbUn1HyzWes9TcYmTNT6KO9m8scpfeTWYI99W50x_qROTOhjsUKn8ts6GrBd2wyC4GZ_BXBZk-VWxHTjO-PDH76vD_tjH3WA51AtT8h3TYZgQLj32EcMsihDOprCP2QIpUL0LO0nD6BxHXbCDY4"
                  />
                </div>
                <div className="col-span-1 overflow-hidden bg-surface-container rounded-xl h-[200px] md:h-auto">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                    alt="Outdoor infinity pool steaming in the morning mist"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_qvd0Rm5fdCiarqyrG_Mj5L_ciwbQr-G0tgbRvC97tRtu6oR-InzUQ1IuaYuBrwQaBooNpJ3EC2KAktgX9Bxcuy0uVzb-y92M7my8OBdhbUvz5x3BVbLEllOPVpk4zXooWyL2sssD3BxPW2oXFQTV9ObbV1taA6QaV7XDmXDkfp0neQeXDgDCMWe0tz-l6nCtTCVkEkhIMgr0NCU7bQuKu6xlljao3rdm3JtVEFfO9e0xxK1yvI9t6MOokgcII_ub6jny7Ey2H38"
                  />
                </div>
                <div className="col-span-1 overflow-hidden bg-surface-container rounded-xl h-[200px] md:h-auto">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                    alt="Private chef dining set in a wooden gazebo surrounded by tea bushes"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCvCoYwomuLyLHDNgkcUjjWjRd9_CH3K9BjQ6W0nxKDKONCNbzMUnGDvvocGsFteMpjoxYDsz2CJiidr-K8lcA7V3ADF5zp6fGpIczJgC0Nfxd2KjtAz-LBqN6nwDm3aQ44yUi0mlYcbhdWQFgWZHxl7ukbhKXqQlIVtHdGz3ISubnN5Y_Q7MZlhLM0YL_cXTZmLPVtMYzykdFekEvuYAWXBUKGdXHWSskx5Nj00zTuM231yu1rIzEA8-MwVDjT5qEqIxVcb2rQtI"
                  />
                </div>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div>
              <h2 className="font-display text-3xl font-semibold mb-12 text-white">
                The Tripora Journey
              </h2>
              <div className="relative space-y-12 itinerary-line pl-8 ml-2">
                {/* Day 1 */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-surface shadow-[0_0_10px_rgba(255,180,168,0.3)]"></div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] text-label-sm font-semibold text-primary uppercase tracking-widest">
                      Day 01 — Arrival
                    </span>
                    <h3 className="font-display text-headline-sm text-white">
                      Private Arrival &amp; Estate Welcome
                    </h3>
                    <p className="text-body-md text-on-surface-variant max-w-xl leading-relaxed">
                      Chauffeur-driven transfer from Cochin International Airport followed by a scenic mountain drive to Munnar. Tea-tasting greeting on the East Terrace as the sun sets over the hills.
                    </p>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface"></div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] text-label-sm font-semibold text-primary uppercase tracking-widest">
                      Day 02 — Immersion
                    </span>
                    <h3 className="font-display text-headline-sm text-white">
                      Plantation Walk &amp; Ayurvedic Spa
                    </h3>
                    <p className="text-body-md text-on-surface-variant max-w-xl leading-relaxed">
                      Guided private walk through the organic tea gardens, followed by a bespoke 4-hour wellness treatment utilizing local spices, cardamom oils, and traditional Ayurvedic therapy.
                    </p>
                  </div>
                </div>

                {/* Day 3 */}
                <div className="relative">
                  <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface"></div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] text-label-sm font-semibold text-primary uppercase tracking-widest">
                      Day 03 — Gastronomy
                    </span>
                    <h3 className="font-display text-headline-sm text-white">
                      The Chef's Estate Gazebo Dinner
                    </h3>
                    <p className="text-body-md text-on-surface-variant max-w-xl leading-relaxed">
                      An 8-course tasting menu curated by our executive chef, featuring local Kerala spices, organic farm produce, and premium single-estate tea pairings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-surface-container p-8 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-primary mb-4 text-3xl">
                  helicopter
                </span>
                <h4 className="font-display text-headline-sm mb-2 text-white">
                  Estate-Concierge
                </h4>
                <p className="text-on-surface-variant text-body-md leading-relaxed">
                  Private helicopter transfers directly from Kochi or private SUV logistics for seamless mountain access.
                </p>
              </div>
              <div className="bg-surface-container p-8 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-primary mb-4 text-3xl">
                  wine_bar
                </span>
                <h4 className="font-display text-headline-sm mb-2 text-white">
                  Spice Cellar
                </h4>
                <p className="text-on-surface-variant text-body-md leading-relaxed">
                  Curated selection of organic spices, rare teas, and premium single-malt pairings from the Western Ghats.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Booking Side-card (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32 w-full mt-12 lg:mt-0">
            <div className="bg-surface-container-high p-8 rounded-xl shadow-2xl border border-white/5 space-y-8">
              <div>
                <p className="text-[10px] text-label-sm font-semibold text-on-tertiary-container uppercase tracking-widest mb-1 font-bold">
                  Starting from
                </p>
                <div className="flex items-baseline space-x-2">
                  <span className="font-display text-3xl font-semibold text-white">
                    $3,800
                  </span>
                  <span className="text-on-surface-variant text-label-md">/ night</span>
                </div>
              </div>

              {/* Form Input Group */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-surface-container-high px-2 text-[10px] uppercase font-bold text-on-tertiary-container tracking-wider">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-0"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-surface-container-high px-2 text-[10px] uppercase font-bold text-on-tertiary-container tracking-wider">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-0"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-4 bg-surface-container-high px-2 text-[10px] uppercase font-bold text-on-tertiary-container tracking-wider">
                    Guests
                  </label>
                  <select
                    className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-0 cursor-pointer"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option>1 Adult</option>
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>3 Adults</option>
                  </select>
                </div>
              </div>

              {/* Cost Breakdown Summary */}
              <div className="border-t border-outline-variant/20 pt-6 space-y-3">
                <div className="flex justify-between text-on-tertiary-container text-label-md">
                  <span>Calculated Total Rate</span>
                  <span>${totalPrice.toLocaleString()}.00</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <button
                  onClick={handleBookNow}
                  disabled={isBooked}
                  className={`w-full bg-primary-container text-on-primary-container py-5 rounded-xl font-sans text-label-md uppercase tracking-widest font-semibold hover:brightness-110 active:scale-95 transition-all duration-300 ${
                    isBooked ? "bg-secondary text-surface cursor-wait" : ""
                  }`}
                >
                  {isBooked ? "Reserving Passage..." : "Book Passage"}
                </button>
                <a
                  href="tel:+91484000000"
                  className="w-full border border-outline-variant py-4 rounded-xl font-sans text-label-md uppercase tracking-widest text-center block text-on-surface hover:bg-white/5 transition-all duration-300"
                >
                  Contact Concierge
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-8 border-t border-outline-variant/30 text-on-tertiary-container space-y-4 text-label-sm font-medium">
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-base">
                    verified_user
                  </span>
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="material-symbols-outlined text-base">
                    event_available
                  </span>
                  <span>Free Cancellation until 15 Oct 2026</span>
                </div>
              </div>
            </div>

            {/* Exclusive Banner */}
            <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-primary font-sans text-label-md font-bold mb-2">
                Member Exclusive
              </p>
              <p className="text-label-sm text-on-surface-variant leading-relaxed">
                Log in to receive 5% credit back in Tripora Reward points on this booking.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* MOBILE FIXED BOOKING BAR (Visible on Mobile Only, Sticky at Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-surface-container/95 backdrop-blur-2xl border-t border-outline-variant/20 px-6 py-4 z-40 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
        <div>
          <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">
            Starting from
          </p>
          <p className="text-white font-bold text-headline-sm font-display leading-tight">
            $3,800 <span className="text-xs font-normal text-on-surface-variant">/ night</span>
          </p>
        </div>
        <button
          onClick={() => setMobilePanelOpen(true)}
          disabled={isBooked}
          className="bg-primary text-on-primary px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform"
        >
          {isBooked ? "Reserved" : "Book Now"}
        </button>
      </div>

      {/* MOBILE BOOKING SHEET MODAL OVERLAY */}
      {mobilePanelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobilePanelOpen(false)}
          ></div>

          {/* Sliding sheet */}
          <div className="relative w-full bg-surface-container-high border-t border-outline-variant/20 rounded-t-2xl p-8 space-y-6 z-10 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-display text-headline-sm text-white">Select Passage Details</h3>
              <button
                onClick={() => setMobilePanelOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-surface-container border border-white/10"
              >
                <span className="material-symbols-outlined text-sm text-white">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="absolute -top-2 left-4 bg-surface-container-high px-2 text-[10px] uppercase font-bold text-on-tertiary-container tracking-wider">
                  Check-in
                </label>
                <input
                  type="date"
                  className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-0"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-4 bg-surface-container-high px-2 text-[10px] uppercase font-bold text-on-tertiary-container tracking-wider">
                  Check-out
                </label>
                <input
                  type="date"
                  className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-0"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-4 bg-surface-container-high px-2 text-[10px] uppercase font-bold text-on-tertiary-container tracking-wider">
                  Guests
                </label>
                <select
                  className="w-full bg-surface-container-low border-b border-outline-variant py-4 px-4 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-0 cursor-pointer"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option>1 Adult</option>
                  <option>2 Adults, 0 Children</option>
                  <option>2 Adults, 1 Child</option>
                  <option>3 Adults</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-outline-variant/20">
              <span className="text-on-tertiary-container text-label-md">Total Passage Cost</span>
              <span className="text-primary font-display text-headline-sm font-bold">${totalPrice.toLocaleString()}.00</span>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-sans text-label-md uppercase tracking-widest font-semibold hover:brightness-110 active:scale-95 transition-all"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}

      {/* Extra padding at bottom for mobile to prevent content clipping behind fixed booking bar */}
      <div className="lg:hidden h-24"></div>

      <Footer />
    </div>
  );
}
