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
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION */}
        {/* ========================================================================= */}
        <section id="overview" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-12 pb-20 px-margin-mobile md:px-margin-desktop bg-emerald-950">
          {/* Background Image with Dark Atmospheric Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/locations/alleppey.jpg"
              alt="Alleppey Houseboat Kerala Backwaters"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/40"></div>
          </div>

          <div className="relative z-10 max-w-container-max-width mx-auto text-center text-white w-full">
            {/* Cursive Accent */}
            <span className="font-script text-4xl sm:text-6xl text-amber-300 block mb-1 drop-shadow-md">
              Journey To
            </span>

            {/* Main Hero Headline */}
            <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 uppercase leading-none text-white drop-shadow-lg">
              NATURE'S BEST
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto text-white/90 font-sans text-xs sm:text-base mb-8 leading-relaxed font-light">
              Discover stunning Kerala destinations and create memories that last a lifetime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
              <a
                href="#itinerary"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Explore Packages</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>

              <a
                href="#contact"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-sans text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-full transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-amber-300 text-sm">calendar_month</span>
                <span>Check Availability</span>
              </a>
            </div>

            {/* Floating Filter Search Pill Bar */}
            <div className="-mb-24 relative z-20 max-w-4xl mx-auto bg-white text-on-surface rounded-3xl p-3 sm:p-4 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 text-left">
              <div className="w-full md:w-1/3 px-4 py-1.5 md:border-r border-gray-200">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Location</p>
                <select className="bg-transparent font-sans text-xs font-bold text-primary focus:outline-none w-full cursor-pointer mt-0.5">
                  <option>Select location</option>
                  <option>Munnar Highlands</option>
                  <option>Alleppey Backwaters</option>
                  <option>Thekkady Wild Spices</option>
                  <option>Kumarakom Lagoon</option>
                  <option>Trivandrum Coast</option>
                  <option>Fort Kochi</option>
                </select>
              </div>

              <div className="w-full md:w-1/3 px-4 py-1.5 md:border-r border-gray-200">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Theme / Package</p>
                <select className="bg-transparent font-sans text-xs font-bold text-primary focus:outline-none w-full cursor-pointer mt-0.5">
                  <option>Select theme</option>
                  <option>7 Days God's Own Country (Priority #1)</option>
                  <option>Munnar Escape (3D/2N - ₹16,500)</option>
                  <option>5 Days / 4 Nights Kerala Tour</option>
                </select>
              </div>

              <div className="w-full md:w-1/3 px-4 py-1.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Travelers</p>
                  <select className="bg-transparent font-sans text-xs font-bold text-primary focus:outline-none cursor-pointer mt-0.5">
                    <option>2 Adults</option>
                    <option>Family (2 Adults + 2 Kids)</option>
                    <option>Group / Custom</option>
                  </select>
                </div>

                <a
                  href="#itinerary"
                  className="w-11 h-11 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 flex-shrink-0"
                  title="Search Packages"
                >
                  <span className="material-symbols-outlined text-xl">search</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: PLAN YOUR TRIP IN 3 EASY STEPS */}
        {/* ========================================================================= */}
        <section className="pt-28 pb-16 px-margin-mobile md:px-margin-desktop bg-surface">
          <div className="max-w-container-max-width mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
              <div>
                <h2 className="font-sans text-3xl sm:text-4xl font-bold text-primary">
                  Plan Your Trip <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">in 3 Easy Steps</span>
                </h2>
                <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1">
                  Simple steps to book your dream vacation.
                </p>
              </div>

              <a
                href="#itinerary"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-xs transition-colors"
              >
                View All
              </a>
            </div>

            {/* 3 Vertical Feature Cards with Gradients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 01 */}
              <div className="bg-gradient-to-b from-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-teal-600/30 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-white/95 text-teal-800 flex items-center justify-center mb-6 shadow-md">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <div>
                  <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white/25 block mb-1">01</span>
                  <h3 className="font-sans text-xl font-bold mb-2 text-white">Choose Destination</h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed mb-6">
                    Pick your favorite place from our handpicked list of Kerala highlights like Munnar, Alleppey &amp; Thekkady.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-bold text-teal-200 uppercase tracking-wider">
                  <span>Explore Locations</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>

              {/* Card 02 */}
              <div className="bg-gradient-to-b from-sky-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-sky-400/30 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-white/95 text-sky-800 flex items-center justify-center mb-6 shadow-md">
                  <span className="material-symbols-outlined text-2xl">payments</span>
                </div>
                <div>
                  <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white/25 block mb-1">02</span>
                  <h3 className="font-sans text-xl font-bold mb-2 text-white">Select Package</h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed mb-6">
                    Choose the ideal 7-Day, 3-Day or 5-Day itinerary for your budget, family size, and preferred travel dates.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-bold text-sky-200 uppercase tracking-wider">
                  <span>View Itineraries</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>

              {/* Card 03 */}
              <div className="bg-gradient-to-b from-emerald-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-700/30 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-white/95 text-emerald-800 flex items-center justify-center mb-6 shadow-md">
                  <span className="material-symbols-outlined text-2xl">luggage</span>
                </div>
                <div>
                  <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white/25 block mb-1">03</span>
                  <h3 className="font-sans text-xl font-bold mb-2 text-white">Enjoy Your Trip</h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed mb-6">
                    Pack your bags and get ready for an unforgettable Kerala journey with our dedicated AC vehicle &amp; driver.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-bold text-emerald-200 uppercase tracking-wider">
                  <span>Start Vacation</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: TRENDING DESTINATIONS */}
        {/* ========================================================================= */}
        <section id="destinations" className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-emerald-900/10 relative">
          <div className="max-w-container-max-width mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-emerald-700 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                Trending Destinations
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl text-primary font-bold mt-1">
                Handpicked Destinations <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">loved by travelers</span>
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1.5">
                Explore iconic Kerala spots woven seamlessly into our curated tour packages.
              </p>
            </div>

            {/* Showcase Grid: Badges + Featured Cutout Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
              {/* Left Column: 6 Feature Badges */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                    className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-900/10 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-2 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                    </div>
                    <span className="font-sans text-xs font-bold text-primary leading-snug">{badge.title}</span>
                  </div>
                ))}
              </div>

              {/* Right Column: Organic Cutout Showcase Image */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white h-72 sm:h-80 relative group">
                  <img
                    src="/locations/alleppey.jpg"
                    alt="Alleppey Backwaters Scenic View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="bg-emerald-800/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                      ⭐ Highlight Spotlight
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">Alleppey Luxury Houseboat Cruise</h3>
                    <p className="font-sans text-xs text-white/80">Experience sunset over palm-fringed backwater canals.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Spotlight Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationSpotlights.map((dest, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-emerald-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 relative overflow-hidden">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <span className="material-symbols-outlined text-emerald-700 text-xs">location_on</span>
                        <span className="font-sans text-[11px] font-bold text-primary uppercase">{dest.name}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-primary mb-1.5">{dest.title}</h3>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">{dest.desc}</p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 flex justify-between items-center text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <span>Included in Packages</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ALL PACKAGES & DETAILED ITINERARY SWITCHER */}
        {/* ========================================================================= */}
        <section id="itinerary" className="py-16 px-margin-mobile md:px-margin-desktop bg-surface border-y border-emerald-900/10">
          <div className="max-w-container-max-width mx-auto">
            
            {/* Section Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-emerald-700 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                Featured Packages
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl text-primary font-bold mt-1">
                Select Your Holiday <span className="text-emerald-700 font-script font-normal text-3xl sm:text-5xl">Package</span>
              </h2>
              <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-1.5">
                Our signature 7-Day Plan is featured first. Click any package below to inspect day-by-day itineraries and book.
              </p>
            </div>

            {/* Split Layout Container: Left Side Package List, Right Side Detailed Explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE: Package Selection List (Stacked Cards) */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="font-sans text-xs uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                  <span>Select Tour Package</span>
                </h3>

                {allPackages.map((pkg, idx) => {
                  const isSelected = selectedPkgIndex === idx;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPkgIndex(idx);
                        setActiveDay(1);
                      }}
                      className={`rounded-2xl p-3.5 sm:p-4 border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                        isSelected
                          ? "bg-emerald-900 text-white border-emerald-800 shadow-lg scale-[1.01]"
                          : "bg-white text-primary border-emerald-900/10 hover:border-emerald-700/40 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isSelected ? "bg-amber-400 text-emerald-950" : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {pkg.badge}
                          </span>
                          <span className={`font-sans text-xs font-bold ${isSelected ? "text-amber-300" : "text-emerald-800"}`}>
                            {pkg.duration}
                          </span>
                        </div>

                        <h4 className="font-sans text-base font-bold mb-1">{pkg.title}</h4>
                        <p className={`font-sans text-[11px] mb-2 line-clamp-1 ${isSelected ? "text-white/80" : "text-on-surface-variant"}`}>
                          {pkg.route}
                        </p>

                        <div className={`p-2 rounded-xl mb-2 text-xs font-sans font-bold ${
                          isSelected ? "bg-white/15 text-white" : "bg-emerald-50 text-emerald-900 border border-emerald-900/10"
                        }`}>
                          💰 {pkg.price}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-current/15 flex items-center justify-between font-sans text-[11px] font-bold uppercase tracking-wider">
                        <span>{isSelected ? "Selected Package" : "Select & Inspect"}</span>
                        <span className="material-symbols-outlined text-sm">
                          {isSelected ? "check_circle" : "arrow_forward"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT SIDE: Selected Package Detailed Explanation & Day Breakdown */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-emerald-900/10 shadow-md p-4 sm:p-5">
                
                {/* Active Package Banner */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-gray-100 gap-3 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="bg-emerald-800 text-white font-sans text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {currentPkg.duration}
                      </span>
                      <span className="bg-emerald-100 text-emerald-900 font-sans text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {currentPkg.vehicle}
                      </span>
                    </div>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-primary">
                      {currentPkg.title}
                    </h3>
                    <p className="font-serif italic text-xs text-primary/80 mt-0.5">
                      "{currentPkg.subtitle}"
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-900/10">
                      <p className="text-[8px] uppercase font-bold text-gray-400">Package Pricing</p>
                      <p className="text-xs font-bold text-emerald-900">{currentPkg.price}</p>
                    </div>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-[11px] uppercase tracking-wider font-bold px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>WhatsApp Book</span>
                    </a>
                  </div>
                </div>

                {/* Package Inclusions Highlights */}
                <div className="bg-surface p-3 rounded-xl border border-emerald-900/10 mb-4">
                  <h4 className="font-sans text-[11px] font-bold text-primary mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-700 text-sm">inventory_2</span>
                    <span>Package Inclusions</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-[11px]">
                    {currentPkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-gray-100">
                        <span className="material-symbols-outlined text-emerald-700 text-xs flex-shrink-0 mt-0.5">check_circle</span>
                        <span className="text-on-surface-variant font-medium leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day Selector Tabs for Active Package */}
                <div className="flex overflow-x-auto no-scrollbar gap-1.5 mb-4 pb-0.5 justify-start sm:justify-center">
                  {currentPkg.itinerary.map((dayItem) => (
                    <button
                      key={dayItem.day}
                      onClick={() => setActiveDay(dayItem.day)}
                      className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider flex-shrink-0 transition-all ${
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
                    <div key={currentDay.day} className="space-y-4 animate-fadeIn">
                      <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-2 border-b border-gray-100 gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="bg-emerald-800 text-white font-sans text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                              DAY {currentDay.day}
                            </span>
                            <span className="text-gray-400 text-[11px] font-sans uppercase font-bold tracking-wider">
                              {currentDay.route}
                            </span>
                          </div>
                          <h4 className="font-sans text-lg font-bold text-primary">
                            {currentDay.title}
                          </h4>
                        </div>

                        <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-900/10 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-emerald-700 text-sm">hotel</span>
                          <div>
                            <p className="text-[8px] uppercase font-bold text-gray-400">Overnight Accommodation</p>
                            <p className="text-[11px] font-bold text-emerald-900">{currentDay.stay}</p>
                          </div>
                        </div>
                      </div>

                      <p className="font-serif italic text-xs text-primary/80 leading-relaxed">
                        "{currentDay.subtitle}"
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                        {/* Left Activities List */}
                        <div className="lg:col-span-7">
                          <h5 className="font-sans text-xs font-bold text-primary mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-emerald-700 text-sm">checklist</span>
                            <span>Attractions &amp; Sightseeing</span>
                          </h5>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-sans text-[11px]">
                            {currentDay.activities.map((act, i) => (
                              <li key={i} className="flex items-start gap-1.5 p-2 rounded-lg bg-surface border border-gray-100 hover:bg-emerald-50 transition-colors">
                                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span className="text-on-surface-variant font-medium leading-snug">{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right Photo Gallery */}
                        <div className="lg:col-span-5">
                          <h5 className="font-sans text-xs font-bold text-primary mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-emerald-700 text-sm">collections</span>
                            <span>Day Highlights</span>
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currentDay.images.map((img, i) => (
                              <div key={i} className="group relative h-20 sm:h-24 rounded-xl overflow-hidden border border-gray-100 shadow-xs">
                                <img
                                  src={img.url}
                                  alt={img.label}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-2">
                                  <span className="text-white font-sans text-[10px] font-bold tracking-wide line-clamp-1">{img.label}</span>
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
        </div>
      </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CONTACT / BOOKING SECTION */}
        {/* ========================================================================= */}
        <section id="contact" className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-container-max-width mx-auto">
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-emerald-900/40">
              {/* Left Contact Info */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-amber-300 font-sans text-[11px] uppercase tracking-[0.2em] font-bold">
                  CONTACT / BOOKING
                </span>
                <h2 className="font-sans text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                  Let's plan your perfect <span className="text-amber-300 font-script font-normal text-4xl sm:text-6xl">Kerala getaway!</span>
                </h2>
                <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
                  Have questions about custom dates, hotel upgrades, or private vehicle preferences? Connect directly with our Kerala travel experts.
                </p>

                <div className="space-y-3 pt-4 border-t border-white/15 font-sans text-xs">
                  <a
                    href="tel:+919656464124"
                    className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <span className="material-symbols-outlined text-amber-300 text-lg">call</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/60 uppercase font-bold">Phone / Call Us</p>
                      <p className="font-bold text-sm">+91 96564 64124</p>
                    </div>
                  </a>

                  <a
                    href="mailto:tripora68@gmail.com"
                    className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <span className="material-symbols-outlined text-amber-300 text-lg">mail</span>
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
                    className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <span className="material-symbols-outlined text-amber-300 text-lg">photo_camera</span>
                    </div>
                    <div>
                      <p className="text-[9px] text-white/60 uppercase font-bold">Instagram</p>
                      <p className="font-bold text-sm">tripora.in</p>
                    </div>
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Scenic Beauty", "Unique Experiences", "Unforgettable Journey", "Happy Memories"].map((badge, idx) => (
                    <span key={idx} className="bg-white/10 text-white text-[10px] font-sans px-3 py-1 rounded-full border border-white/10">
                      ✨ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Booking / WhatsApp Form */}
              <div className="lg:col-span-6 bg-white text-on-surface rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="font-sans text-2xl font-bold text-primary mb-1">
                  Request Package Quote
                </h3>
                <p className="font-sans text-xs text-on-surface-variant mb-5">
                  Fill in your details to receive an instant WhatsApp itinerary quote and custom pricing.
                </p>

                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <span className="material-symbols-outlined text-emerald-600 text-5xl">check_circle</span>
                    <h4 className="font-sans text-xl font-bold text-primary">Inquiry Submitted!</h4>
                    <p className="font-sans text-xs text-on-surface-variant">
                      Thank you, {formState.name}! We will contact you immediately via phone / WhatsApp.
                    </p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-700 text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>Continue on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                    <div>
                      <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">Travel Date</label>
                        <input
                          type="date"
                          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                          value={formState.travelDate}
                          onChange={(e) => setFormState({ ...formState, travelDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">Select Package</label>
                      <select
                        className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface cursor-pointer"
                        value={formState.selectedPackage}
                        onChange={(e) => setFormState({ ...formState, selectedPackage: e.target.value })}
                      >
                        <option>7 Days of Kerala (6 Nights / 7 Days - Signature Package)</option>
                        <option>Munnar Escape (2 Nights / 3 Days - ₹16,500 for 2)</option>
                        <option>5 Days / 4 Nights Kerala Tour (Kochi, Munnar, Thekkady, Alleppey)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">Special Requests / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Any preferred hotel category, meal requirements, or custom pickups..."
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                        value={formState.notes}
                        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-full uppercase tracking-wider text-[11px] transition-colors shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Send Booking Inquiry</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                      </button>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-full uppercase tracking-wider text-[11px] transition-colors shadow-md flex items-center justify-center gap-2"
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
