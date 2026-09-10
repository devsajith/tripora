"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 5 Core Inclusions / Pillars from Page 1
const corePillars = [
  {
    title: "Comfortable Stay",
    desc: "Handpicked premium hotels, jungle resorts & luxury backwater houseboats",
    icon: "hotel",
  },
  {
    title: "Delicious Meals",
    desc: "Daily authentic Kerala breakfasts & freshly prepared onboard meals",
    icon: "restaurant",
  },
  {
    title: "Scenic Sightseeing",
    desc: "Cascading waterfalls, tea estates, tiger reserves & coastal heritage",
    icon: "photo_camera",
  },
  {
    title: "Safe & Reliable Transport",
    desc: "Dedicated private AC vehicle with knowledgeable local chauffeur",
    icon: "directions_car",
  },
  {
    title: "24/7 Assistance",
    desc: "Round-the-clock local concierge support for a stress-free vacation",
    icon: "support_agent",
  },
];

// Destinations Highlight Grid using user uploaded location images
const destinationSpotlights = [
  {
    name: "Munnar",
    title: "Misty Tea Highlands",
    img: "/locations/munnar.jpg",
    desc: "Rolling emerald tea plantations, cool mountain air, and waterfalls.",
  },
  {
    name: "Alleppey",
    title: "Enchanting Backwaters",
    img: "/locations/alleppey.jpg",
    desc: "Overnight luxury houseboat cruise along palm-fringed village canals.",
  },
  {
    name: "Thekkady",
    title: "Wild Spices & Forests",
    img: "/locations/thekkady.jpg",
    desc: "Aromatic spice gardens, Periyar boat safaris, and wild elephants.",
  },
  {
    name: "Kumarakom",
    title: "Tranquil Lagoon Stays",
    img: "/locations/kumarakom.jpg",
    desc: "Lakeside luxury resorts, bird sanctuary trails, and serene water views.",
  },
  {
    name: "Trivandrum",
    title: "Heritage & Golden Coasts",
    img: "/locations/trivandrum.jpg",
    desc: "Spiritual temple majesty, Kovalam lighthouse beach, and royal culture.",
  },
  {
    name: "Kochi",
    title: "Gateway of Heritage",
    img: "/locations/kochi.jpg",
    desc: "Historic Fort Kochi, Chinese fishing nets, and vibrant spice bazaars.",
  },
];

// Original 7-Day Detailed Itinerary (Priority Package 1) with local location images
const original7DayItinerary = [
  {
    day: 1,
    title: "Kochi → Athirappilly → Munnar",
    route: "Arrival & Waterfall Scenic Transfer",
    stay: "MUNNAR HOTEL / RESORT",
    subtitle: "Welcome to God's Own Country! Begin your journey with lush green drives and cascading waterfalls.",
    activities: [
      "Kochi Airport / Railway Station pickup by private chauffeur",
      "Direct transfer to Athirappilly Waterfalls sightseeing",
      "En route Cheeyappara Waterfalls & Valara Waterfalls photo stops",
      "Check-in at Munnar hotel & evening leisure time",
      "Overnight stay in Munnar",
    ],
    images: [
      { url: "/locations/athirappilly.jpg", label: "Athirapilly Waterfalls" },
      { url: "/locations/cheeyappara.jpg", label: "Cheeyappara Waterfalls" },
      { url: "/locations/munnar.jpg", label: "Munnar Scenic Drive" },
    ],
  },
  {
    day: 2,
    title: "Munnar Sightseeing",
    route: "Tea Gardens & High Peaks Exploration",
    stay: "MUNNAR HOTEL / RESORT",
    subtitle: "Explore emerald tea hills, natural acoustic points, and high-altitude lakes.",
    activities: [
      "Mattupetty Dam visit & optional speedboat ride",
      "Echo Point natural acoustics experience",
      "Kundala Lake pedal boating & scenic photo spots",
      "Guided walk through sprawling Tea Plantations",
      "Top Station mountain viewpoint / Optional sightseeing",
      "Overnight stay in Munnar",
    ],
    images: [
      { url: "/locations/munnar.jpg", label: "Munnar Tea Estates" },
      { url: "/locations/munnar.jpg", label: "Kundala & Mattupetty Lake" },
      { url: "/locations/munnar.jpg", label: "Top Station View" },
    ],
  },
  {
    day: 3,
    title: "Munnar → Thekkady",
    route: "Spice Estates & Wildlife Sanctuary",
    stay: "THEKKADY HOTEL / RESORT",
    subtitle: "Experience the wild side of Kerala amid lush forests, spices, and serene lakes.",
    activities: [
      "Delicious breakfast & checkout from Munnar",
      "Scenic hill drive to Thekkady spice country",
      "Guided Spice Plantation tour (cardamom, pepper, cinnamon)",
      "Optional Periyar Lake boating & wildlife spotting",
      "Overnight stay in Thekkady",
    ],
    images: [
      { url: "/locations/thekkady.jpg", label: "Thekkady Wildlife Reserve" },
      { url: "/locations/thekkady.jpg", label: "Periyar Boating" },
      { url: "/locations/thekkady.jpg", label: "Spice Plantation" },
    ],
  },
  {
    day: 4,
    title: "Thekkady → Kumarakom",
    route: "Tranquil Backwater Lagoon Retreat",
    stay: "KUMARAKOM BACKWATER RESORT",
    subtitle: "Relax by the tranquil backwaters and enjoy the calm, village life of Kerala.",
    activities: [
      "Breakfast & checkout from Thekkady",
      "Scenic transfer to Kumarakom lagoon shores",
      "Backwater sightseeing & bird sanctuary visits",
      "Leisure time at luxury lakeside resort",
      "Overnight stay in Kumarakom",
    ],
    images: [
      { url: "/locations/kumarakom.jpg", label: "Kumarakom Lake Resort" },
      { url: "/locations/kumarakom.jpg", label: "Vembanad Lagoon View" },
      { url: "/locations/kumarakom.jpg", label: "Bird Sanctuary Trail" },
    ],
  },
  {
    day: 5,
    title: "Kumarakom → Alleppey",
    route: "Houseboat Check-in & Sunset Cruise",
    stay: "ALLEPPEY HOUSEBOAT",
    subtitle: "Drift into tranquility as you cruise through the enchanting backwaters of Alleppey.",
    activities: [
      "Breakfast & checkout from Kumarakom",
      "Short transfer to Alleppey jetty",
      "Check-in to traditional Deluxe Houseboat with welcome drink & lunch",
      "Afternoon & sunset backwater cruise through village canals",
      "Overnight stay on Alleppey Houseboat with freshly cooked dinner",
    ],
    images: [
      { url: "/locations/alleppey.jpg", label: "Alleppey Houseboat" },
      { url: "/locations/alleppey.jpg", label: "Backwater Cruise" },
      { url: "/locations/alleppey.jpg", label: "Sunset Magic" },
    ],
  },
  {
    day: 6,
    title: "Alleppey → Trivandrum",
    route: "Golden Beaches & Capital Heritage",
    stay: "TRIVANDRUM / KOVALAM HOTEL",
    subtitle: "Relax on golden beaches and explore the rich culture and heritage of Trivandrum.",
    activities: [
      "Morning breakfast & checkout from houseboat",
      "Transfer to Trivandrum / Kovalam Beach",
      "Kovalam Beach relaxation & ocean promenade walk",
      "Trivandrum local sightseeing & landmark visits",
      "Overnight stay in Trivandrum",
    ],
    images: [
      { url: "/locations/trivandrum.jpg", label: "Trivandrum Heritage Landmarks" },
      { url: "/locations/trivandrum.jpg", label: "Kovalam Coastline" },
      { url: "/locations/trivandrum.jpg", label: "Culture & Museum" },
    ],
  },
  {
    day: 7,
    title: "Trivandrum Sightseeing & Departure",
    route: "Sacred Temple & Departure Transfer",
    stay: "DEPARTURE",
    subtitle: "Take back memories that last a lifetime!",
    activities: [
      "Breakfast & checkout from hotel",
      "Visit sacred Sri Padmanabhaswamy Temple & Napier Museum",
      "Local handicraft shopping & souvenirs free time",
      "Drop at Trivandrum Airport / Railway Station with lifelong memories!",
    ],
    images: [
      { url: "/locations/trivandrum.jpg", label: "Napier Museum & Heritage" },
      { url: "/locations/trivandrum.jpg", label: "Sri Padmanabhaswamy Temple" },
      { url: "/locations/trivandrum.jpg", label: "Drop & Departure" },
    ],
  },
];

// All Tripora Tour Packages Collection with Local Location Images
const allPackages = [
  {
    id: "pkg-kerala-7d",
    title: "7 Days of Kerala (God's Own Country)",
    duration: "6 Nights / 7 Days",
    price: "Signature Priority Package",
    vehicle: "Private AC Chauffeur Vehicle",
    badge: "⭐ Official #1 Priority Package",
    route: "Kochi → Athirappilly → Munnar → Thekkady → Kumarakom → Alleppey → Trivandrum",
    subtitle: "The ultimate 7-day circuit covering waterfalls, tea estates, tiger reserve, Kumarakom & Kovalam beach.",
    inclusions: [
      "Handpicked 3-Star / 4-Star Hotels & Deluxe Houseboat",
      "Private AC Vehicle with experienced driver",
      "Complete sightseeing & airport pickup/drop",
      "24/7 Concierge assistance throughout your stay",
    ],
    itinerary: original7DayItinerary,
  },
  {
    id: "pkg-munnar-3d",
    title: "Munnar Escape",
    duration: "2 Nights / 3 Days",
    price: "₹16,500 for 2 Persons",
    vehicle: "Private Sedan Package",
    badge: "Special Offer • ₹16,500",
    route: "Arrival → Munnar → Mattupetty → Top Station → Drop",
    subtitle: "Scenic mountains • Waterfalls • Tea Gardens • Adventure • Valley Views",
    inclusions: [
      "2 Nights stay at a 3★ property with swimming pool",
      "Private Sedan car for all transfers & sightseeing",
      "Pickup from designated point & drop-off",
      "Driver allowance, fuel, toll & transportation",
      "All mentioned sightseeing as per itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival → Munnar Sightseeing",
        route: "En Route Waterfalls & Scenic Attractions",
        stay: "MUNNAR 3★ HOTEL (WITH POOL)",
        subtitle: "Pickup from designated point & proceed to Munnar enjoying cascading waterfalls and tea valleys.",
        activities: [
          "Cheeyappara Waterfalls & Valara Waterfalls",
          "Guided Spice Plantation Visit",
          "Live Chocolate Factory Visit",
          "Adventure Zipline & Glass Bridge",
          "Handloom Weaving Centre",
          "Chithirapuram & 2nd Mile View Points",
          "Attukad Waterfall View Point",
          "Check-in & Overnight stay in Munnar 3★ Resort",
        ],
        images: [
          { url: "/locations/cheeyappara.jpg", label: "Cheeyappara Waterfalls" },
          { url: "/locations/athirappilly.jpg", label: "Valara Waterfalls" },
          { url: "/locations/munnar.jpg", label: "Spice Plantation Visit" },
        ],
      },
      {
        day: 2,
        title: "Mattupetty & Top Station Route",
        route: "Highland Lakes & Mountain Vistas",
        stay: "MUNNAR 3★ HOTEL (WITH POOL)",
        subtitle: "After breakfast, proceed for a full-day sightseeing tour towards Mattupetty & Top Station.",
        activities: [
          "Flower Garden & Photo Point",
          "Elephant Park & Mattupetty Tea Factory",
          "Mattupetty Dam & Sunmoon Valley Boating Point",
          "Shooting Point & Wild Elephant Arrival Spot",
          "Echo Point natural acoustics experience",
          "Kundala Dam reservoir",
          "Yellapatty Vegetable Farm View Point",
          "Top Station high peak viewpoint",
          "Overnight stay in Munnar",
        ],
        images: [
          { url: "/locations/munnar.jpg", label: "Mattupetty Dam & Lake" },
          { url: "/locations/munnar.jpg", label: "Kundala Dam" },
          { url: "/locations/munnar.jpg", label: "Top Station View Point" },
        ],
      },
      {
        day: 3,
        title: "Munnar Local Sightseeing → Departure",
        route: "Scenic Hills & Departure Transfer",
        stay: "DEPARTURE",
        subtitle: "Explore Munnar's picturesque hills before proceeding for your departure transfer.",
        activities: [
          "Munnar Flower Garden",
          "Signal Point & Idli Hills",
          "Lockhart View Point",
          "Gap Road Route (subject to weather & time availability)",
          "After sightseeing, proceed for comfortable drop-off!",
        ],
        images: [
          { url: "/locations/munnar.jpg", label: "Lockhart View Point" },
          { url: "/locations/munnar.jpg", label: "Munnar Tea Hills" },
        ],
      },
    ],
  },
  {
    id: "pkg-kerala-5d",
    title: "5 Days / 4 Nights Kerala Tour",
    duration: "4 Nights / 5 Days",
    price: "Custom Quote",
    vehicle: "Private AC Vehicle",
    badge: "Couples & Families Special",
    route: "Kochi → Munnar → Thekkady → Alleppey",
    subtitle: "Complete Kerala highlights: Tea estates, spice hills, and Alleppey Houseboat cruise.",
    inclusions: [
      "3-Star / 4-Star Hotel Accommodation in Munnar & Thekkady",
      "Private AC Vehicle for all transfers & sightseeing",
      "Alleppey sharing Houseboat Stay with traditional meals",
      "Driver & complete sightseeing as per itinerary",
      "Pickup from Kochi & drop-off at Kochi Airport/Station",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kochi → Munnar",
        route: "Arrival & Waterfall Drive",
        stay: "MUNNAR HOTEL / RESORT",
        subtitle: "Pickup from Kochi Airport / Railway Station and drive to the misty hills of Munnar.",
        activities: [
          "Pickup from Kochi Airport / Railway Station",
          "Drive to Munnar with en-route sightseeing",
          "Cheeyappara Waterfalls & Valara Waterfalls",
          "Spice Plantations Visit",
          "Hotel check-in & overnight stay in Munnar",
        ],
        images: [
          { url: "/locations/kochi.jpg", label: "Kochi Jewel Town" },
          { url: "/locations/cheeyappara.jpg", label: "Cheeyappara Waterfalls" },
          { url: "/locations/munnar.jpg", label: "Munnar Tea Estates" },
        ],
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        route: "Lakes & Tea Estates",
        stay: "MUNNAR HOTEL / RESORT",
        subtitle: "Full-day exploration of Munnar's iconic tea gardens and reservoirs.",
        activities: [
          "Mattupetty Dam visit & boat ride",
          "Echo Point natural acoustic experience",
          "Kundala Lake & Photo Point",
          "Guided stroll through Tea Gardens",
          "Return to hotel & overnight stay in Munnar",
        ],
        images: [
          { url: "/locations/munnar.jpg", label: "Mattupetty Lake" },
          { url: "/locations/munnar.jpg", label: "Tea Gardens Walk" },
        ],
      },
      {
        day: 3,
        title: "Munnar → Thekkady",
        route: "Spice Estates & Cultural Shows",
        stay: "THEKKADY HOTEL / RESORT",
        subtitle: "Travel to Thekkady spice sanctuary with optional Kathakali & Kalaripayattu cultural shows.",
        activities: [
          "Scenic hill drive from Munnar to Thekkady",
          "Hotel check-in at Thekkady",
          "Optional Kathakali & Kalaripayattu martial arts shows",
          "Optional Periyar Lake boating & wildlife activities",
          "Overnight stay in Thekkady",
        ],
        images: [
          { url: "/locations/thekkady.jpg", label: "Thekkady Sanctuary" },
          { url: "/locations/thekkady.jpg", label: "Wildlife Boating" },
        ],
      },
      {
        day: 4,
        title: "Thekkady → Alleppey",
        route: "Houseboat Check-in & Backwater Cruise",
        stay: "ALLEPPEY HOUSEBOAT",
        subtitle: "Breakfast & checkout, drive to Alleppey jetty for a memorable houseboat cruise.",
        activities: [
          "Breakfast & checkout from Thekkady",
          "Drive to Alleppey & check-in to Kerala Houseboat",
          "Enjoy Backwater Cruise & Village Views",
          "Traditional Kerala Lunch & Sunset Views",
          "Overnight stay in Alleppey Houseboat",
        ],
        images: [
          { url: "/locations/alleppey.jpg", label: "Alleppey Backwaters" },
          { url: "/locations/alleppey.jpg", label: "Sunset Cruise" },
        ],
      },
      {
        day: 5,
        title: "Alleppey → Kochi Departure",
        route: "Houseboat Checkout & Drop",
        stay: "DEPARTURE",
        subtitle: "Morning breakfast on houseboat followed by transfer to Kochi Airport / Railway Station.",
        activities: [
          "Morning houseboat checkout",
          "Transfer to Kochi Airport / Railway Station",
          "End of the Kerala trip with beautiful memories!",
        ],
        images: [
          { url: "/locations/kochi.jpg", label: "Fort Kochi Heritage" },
        ],
      },
    ],
  },
];

// Package Inclusions Data
const packageInclusions = [
  {
    title: "Hotel Stay",
    desc: "Clean, comfortable 3-Star / 4-Star handpicked hotels and luxury resort accommodations",
    icon: "bed",
  },
  {
    title: "Private Vehicle",
    desc: "Exclusive AC Sedan / SUV for all transfers and sightseeing throughout your tour",
    icon: "directions_car",
  },
  {
    title: "Experienced Driver",
    desc: "Professional, polite local driver fluent in English & Hindi with expert route knowledge",
    icon: "badge",
  },
  {
    title: "Sightseeing",
    desc: "Complete daily sightseeing entry & route coverage as per itinerary",
    icon: "travel_explore",
  },
  {
    title: "Airport / Railway Pickup & Drop",
    desc: "Hassle-free arrival pickup and departure drop-off",
    icon: "connecting_airports",
  },
];

export default function Home() {
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  const currentPkg = allPackages[selectedPkgIndex];

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
    const text = `Hi Tripora! I am interested in the *${currentPkg.title} (${currentPkg.duration})* package.%0A%0A*Name:* ${formState.name || "Guest"}%0A*Phone:* ${formState.phone}%0A*Travel Date:* ${formState.travelDate || "TBD"}%0A*Guests:* ${formState.guests}%0A*Notes:* ${formState.notes || "None"}`;
    return `https://wa.me/919656464124?text=${text}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section id="overview" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-10 md:py-12 px-margin-mobile md:px-margin-desktop">
          {/* Background Image with Dark Atmospheric Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/locations/alleppey.jpg"
              alt="Alleppey Houseboat Kerala Backwaters"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30"></div>
          </div>

          <div className="relative z-10 max-w-container-max-width mx-auto text-center text-white w-full">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 bg-secondary-container/20 backdrop-blur-md border border-secondary-container/40 text-secondary-container px-3 py-1 rounded-full mb-3 font-sans text-[11px] uppercase tracking-[0.18em] font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Official 7 Days Kerala Signature Package</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 leading-none">
              Kerala <span className="text-secondary-container italic font-serif font-normal">TOUR PACKAGES</span>
            </h1>

            {/* Tagline from Brochure */}
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-emerald-200/90 font-light italic mb-4">
              God's Own Country Awaits You
            </p>

            <p className="max-w-xl mx-auto text-white/80 font-sans text-xs sm:text-sm mb-6 leading-relaxed">
              Experience the flagship 7-Day Kerala circuit from waterfalls to backwaters &amp; beaches, plus short getaway packages crafted for couples and families.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
              <a
                href="#itinerary"
                className="bg-tertiary hover:bg-tertiary-hover text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Explore 7-Day Plan &amp; Packages</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </a>

              <a
                href="#contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-emerald-400 text-sm">calendar_month</span>
                <span>Check Availability</span>
              </a>
            </div>

            {/* Core 5 Service Pillars Grid from Brochure Page 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-6 border-t border-white/15 max-w-4xl mx-auto">
              {corePillars.map((pillar, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-left hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined text-secondary-container text-xl mb-1">{pillar.icon}</span>
                  <h4 className="font-sans font-bold text-[11px] uppercase text-white tracking-wider mb-0.5">{pillar.title}</h4>
                  <p className="font-sans text-[10px] text-white/70 leading-snug">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Slogan */}
            <p className="mt-4 font-serif italic text-white/60 text-xs tracking-wide">
              "One Journey, Endless Memories"
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: DESTINATION SPOTLIGHTS */}
        {/* ========================================================================= */}
        <section className="py-10 md:py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-container-max-width mx-auto">
            <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
              <span className="text-tertiary font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                Featured Destinations
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-primary font-bold mt-1">
                Discover the Magic of Kerala
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1.5">
                Iconic destinations woven seamlessly into our curated tour packages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {destinationSpotlights.map((dest, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden shadow-sm bg-white border border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-36 sm:h-40 relative overflow-hidden">
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-tertiary text-xs">location_on</span>
                      <span className="font-sans text-[10px] font-bold text-primary uppercase">{dest.name}</span>
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="font-display text-base font-bold text-primary mb-1">{dest.title}</h3>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-snug line-clamp-2">{dest.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: ALL PACKAGES & DETAILED ITINERARY SWITCHER */}
        {/* ========================================================================= */}
        <section id="itinerary" className="py-10 md:py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-primary/10">
          <div className="max-w-container-max-width mx-auto">
            
            {/* Section Header */}
            <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
              <span className="text-tertiary font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                Curated Packages
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-primary font-bold mt-1">
                Select Your Kerala Holiday Package
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1.5">
                Our signature 7-Day Plan is featured first. Click any package below to inspect day-by-day itineraries and book.
              </p>
            </div>

            {/* 3 Package Cards Selection Grid (7 Day Plan First) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-10">
              {allPackages.map((pkg, idx) => {
                const isSelected = selectedPkgIndex === idx;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPkgIndex(idx);
                      setActiveDay(1);
                    }}
                    className={`rounded-xl p-4 sm:p-5 border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-lg scale-[1.01]"
                        : "bg-white text-primary border-primary/15 hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isSelected ? "bg-tertiary text-white" : "bg-primary/10 text-primary"
                        }`}>
                          {pkg.badge}
                        </span>
                        <span className={`font-sans text-[11px] font-bold ${isSelected ? "text-secondary-container" : "text-tertiary"}`}>
                          {pkg.duration}
                        </span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold mb-1.5">{pkg.title}</h3>
                      <p className={`font-sans text-[11px] mb-3 line-clamp-2 ${isSelected ? "text-white/80" : "text-on-surface-variant"}`}>
                        {pkg.route}
                      </p>

                      <div className={`p-2.5 rounded-lg mb-3 text-[11px] font-sans font-semibold ${
                        isSelected ? "bg-white/10 text-white" : "bg-surface text-primary border border-primary/10"
                      }`}>
                        💰 {pkg.price}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-current/15 flex items-center justify-between font-sans text-[11px] font-bold uppercase tracking-wider">
                      <span>{isSelected ? "Active Package" : "View Itinerary"}</span>
                      <span className="material-symbols-outlined text-sm">
                        {isSelected ? "check_circle" : "arrow_forward"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Package Detailed Banner & Day Switcher */}
            <div className="bg-white rounded-2xl border border-primary/10 shadow-md p-4 sm:p-6 md:p-8">
              
              {/* Active Package Banner */}
              <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-5 border-b border-primary/10 gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-tertiary text-white font-sans text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      {currentPkg.duration}
                    </span>
                    <span className="bg-primary/10 text-primary font-sans text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                      {currentPkg.vehicle}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                    {currentPkg.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-primary/80 mt-0.5">
                    "{currentPkg.subtitle}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="bg-surface-container px-3.5 py-2 rounded-xl border border-primary/10">
                    <p className="text-[9px] uppercase font-bold text-outline">Package Status</p>
                    <p className="text-xs sm:text-sm font-bold text-primary">{currentPkg.price}</p>
                  </div>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Package Inclusions Highlights */}
              <div className="bg-surface p-3.5 sm:p-4 rounded-xl border border-primary/10 mb-6">
                <h4 className="font-display text-xs font-bold text-primary mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-base">inventory_2</span>
                  <span>Package Inclusions</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 font-sans text-[11px]">
                  {currentPkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-1.5 bg-white p-2.5 rounded-lg border border-primary/5">
                      <span className="material-symbols-outlined text-emerald-600 text-sm flex-shrink-0 mt-0.5">check_circle</span>
                      <span className="text-on-surface-variant font-medium leading-snug">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Selector Tabs for Active Package */}
              <div className="flex overflow-x-auto no-scrollbar gap-1.5 mb-6 pb-1 justify-start sm:justify-center">
                {currentPkg.itinerary.map((dayItem) => (
                  <button
                    key={dayItem.day}
                    onClick={() => setActiveDay(dayItem.day)}
                    className={`px-4 py-2 rounded-lg font-sans text-[11px] font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
                      activeDay === dayItem.day
                        ? "bg-primary text-white shadow-sm scale-105"
                        : "bg-surface text-primary border border-primary/10 hover:bg-surface-container"
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
                  <div key={currentDay.day} className="space-y-5 animate-fadeIn">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-3 border-b border-primary/10 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-tertiary text-white font-sans text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                            DAY {currentDay.day}
                          </span>
                          <span className="text-outline text-[11px] font-sans uppercase font-bold tracking-wider">
                            {currentDay.route}
                          </span>
                        </div>
                        <h4 className="font-display text-xl font-bold text-primary">
                          {currentDay.title}
                        </h4>
                      </div>

                      <div className="bg-surface-container px-3 py-1.5 rounded-lg border border-primary/10 flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-sm">hotel</span>
                        <div>
                          <p className="text-[9px] uppercase font-bold text-outline">Overnight Accommodation</p>
                          <p className="text-[11px] font-bold text-primary">{currentDay.stay}</p>
                        </div>
                      </div>
                    </div>

                    <p className="font-serif italic text-xs sm:text-sm text-primary/80 leading-relaxed">
                      "{currentDay.subtitle}"
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Left Activities List */}
                      <div className="lg:col-span-7">
                        <h5 className="font-display text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-tertiary text-base">checklist</span>
                          <span>Attractions &amp; Sightseeing</span>
                        </h5>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-sans text-[11px]">
                          {currentDay.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-surface/60 border border-primary/5 hover:bg-surface transition-colors">
                              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-on-surface-variant font-medium leading-snug">{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Photo Gallery */}
                      <div className="lg:col-span-5">
                        <h5 className="font-display text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-tertiary text-base">collections</span>
                          <span>Day Highlights</span>
                        </h5>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentDay.images.map((img, i) => (
                            <div key={i} className="group relative h-24 sm:h-28 rounded-lg overflow-hidden border border-primary/10">
                              <img
                                src={img.url}
                                alt={img.label}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                                <span className="text-white font-sans text-[11px] font-bold tracking-wide">{img.label}</span>
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

        {/* ========================================================================= */}
        {/* SECTION 4: KERALA EXPERIENCE HIGHLIGHTS */}
        {/* ========================================================================= */}
        <section id="highlights" className="py-10 md:py-12 bg-primary text-white">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-6 md:mb-8">
              <span className="text-secondary-container font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                EXPERIENCE MUNNAR &amp; KERALA WITH TRIPORA
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Explore More. <span className="text-secondary-container italic font-serif font-normal">WORRY LESS.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Scenic Hills", desc: "Breathtaking views & cool highland climate", icon: "landscape" },
                { title: "Spice & Nature", desc: "The land of aromatic spices and wild sanctuaries", icon: "forest" },
                { title: "Backwater Bliss", desc: "Peaceful backwaters, lagoons, and lakes", icon: "water" },
                { title: "Memorable Moments", desc: "Unforgettable experiences to cherish forever", icon: "sentiment_satisfied" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-secondary-container text-2xl mb-2">{item.icon}</span>
                  <h3 className="font-display text-base font-bold text-white mb-0.5">{item.title}</h3>
                  <p className="font-sans text-[11px] text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 text-center border-t border-white/10">
              <p className="font-serif italic text-base sm:text-lg text-emerald-200">
                "Kerala is not just a destination, it's an emotion."
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: PACKAGE INCLUSIONS */}
        {/* ========================================================================= */}
        <section id="inclusions" className="py-10 md:py-12 px-margin-mobile md:px-margin-desktop bg-surface border-b border-primary/10">
          <div className="max-w-container-max-width mx-auto">
            <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
              <span className="text-tertiary font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                Worry-Free Travel
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-primary font-bold mt-1">
                Standard Package Inclusions
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1.5">
                Everything required for an effortless, comfortable Kerala holiday is included.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packageInclusions.map((inc, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-primary/10 shadow-xs flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary flex-shrink-0">
                    <span className="material-symbols-outlined text-xl">{inc.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary mb-0.5">{inc.title}</h3>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-snug">{inc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: CONTACT / BOOKING SECTION */}
        {/* ========================================================================= */}
        <section id="contact" className="py-10 md:py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-container-max-width mx-auto">
            <div className="bg-primary text-white rounded-2xl p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Contact Info */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-secondary-container font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                  CONTACT / BOOKING
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                  Let's plan your perfect <span className="text-secondary-container italic font-serif">Kerala getaway!</span>
                </h2>
                <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
                  Have questions about custom dates, hotel upgrades, or private vehicle preferences? Connect directly with our Kerala travel experts.
                </p>

                <div className="space-y-3 pt-3 border-t border-white/15 font-sans text-xs">
                  <a
                    href="tel:+919656464124"
                    className="flex items-center gap-3 text-white hover:text-secondary-container transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <span className="material-symbols-outlined text-secondary-container text-base">call</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/60 uppercase font-bold">Phone / Call Us</p>
                      <p className="font-bold text-sm">+91 96564 64124</p>
                    </div>
                  </a>

                  <a
                    href="mailto:tripora68@gmail.com"
                    className="flex items-center gap-3 text-white hover:text-secondary-container transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <span className="material-symbols-outlined text-secondary-container text-base">mail</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/60 uppercase font-bold">Email Us</p>
                      <p className="font-bold text-sm">tripora68@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/tripora.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-secondary-container transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <span className="material-symbols-outlined text-secondary-container text-base">photo_camera</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/60 uppercase font-bold">Instagram</p>
                      <p className="font-bold text-sm">tripora.in</p>
                    </div>
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Scenic Beauty", "Unique Experiences", "Unforgettable Journey", "Happy Memories"].map((badge, idx) => (
                    <span key={idx} className="bg-white/10 text-white text-[10px] font-sans px-2.5 py-0.5 rounded-full border border-white/10">
                      ✨ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Booking / WhatsApp Form */}
              <div className="lg:col-span-6 bg-white text-on-surface rounded-xl p-5 sm:p-6 shadow-md">
                <h3 className="font-display text-xl font-bold text-primary mb-1">
                  Request Package Quote
                </h3>
                <p className="font-sans text-[11px] text-on-surface-variant mb-4">
                  Fill in your details to receive an instant WhatsApp itinerary quote and custom pricing.
                </p>

                {submitted ? (
                  <div className="text-center py-6 space-y-3">
                    <span className="material-symbols-outlined text-emerald-600 text-4xl">check_circle</span>
                    <h4 className="font-display text-lg font-bold text-primary">Inquiry Submitted!</h4>
                    <p className="font-sans text-xs text-on-surface-variant">
                      Thank you, {formState.name}! We will contact you immediately via phone / WhatsApp.
                    </p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 text-white font-sans text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>Continue on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="block font-bold text-primary mb-0.5 uppercase tracking-wider text-[9px]">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-primary/20 focus:outline-none focus:border-tertiary text-xs"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-primary mb-0.5 uppercase tracking-wider text-[9px]">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-primary/20 focus:outline-none focus:border-tertiary text-xs"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-primary mb-0.5 uppercase tracking-wider text-[9px]">Travel Date</label>
                        <input
                          type="date"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-primary/20 focus:outline-none focus:border-tertiary text-xs"
                          value={formState.travelDate}
                          onChange={(e) => setFormState({ ...formState, travelDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-primary mb-0.5 uppercase tracking-wider text-[9px]">Select Package</label>
                      <select
                        className="w-full px-3.5 py-2.5 rounded-lg border border-primary/20 focus:outline-none focus:border-tertiary text-xs bg-white"
                        value={formState.selectedPackage}
                        onChange={(e) => setFormState({ ...formState, selectedPackage: e.target.value })}
                      >
                        <option>7 Days of Kerala (6 Nights / 7 Days - Signature Package)</option>
                        <option>Munnar Escape (2 Nights / 3 Days - ₹16,500 for 2)</option>
                        <option>5 Days / 4 Nights Kerala Tour (Kochi, Munnar, Thekkady, Alleppey)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-primary mb-0.5 uppercase tracking-wider text-[9px]">Special Requests / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Any preferred hotel category, meal requirements, or custom pickups..."
                        className="w-full px-3.5 py-2 rounded-lg border border-primary/20 focus:outline-none focus:border-tertiary text-xs"
                        value={formState.notes}
                        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="pt-1 space-y-2">
                      <button
                        type="submit"
                        className="w-full bg-tertiary hover:bg-tertiary-hover text-white font-bold py-2.5 rounded-lg uppercase tracking-wider text-[11px] transition-colors shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <span>Send Booking Inquiry</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg uppercase tracking-wider text-[11px] transition-colors shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        <span>Instant WhatsApp Booking</span>
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
