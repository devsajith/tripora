"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Data for enclaves
const enclavesData = {
  kerala: [
    {
      title: "Backwater Sanctuary",
      loc: "Alleppey & Kumarakom",
      price: "$4,200",
      dur: "7 Days",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG3rpAp0UctqMIYA8Dapv66TZl8l8e4LNTgeXqaCi0KG7EGWTeGwZhSk7WEMIl59V2K8FKHjqjoHTVoKvC6IyeAqv3BHVuQsMR2knQgLgOSZDIBwIrQAo1A1dKXGyuS7sLBre-j1T4RWunVhAA4pl5KrGjxBBpXOuU-0IOcCll6Tpa3zC0JSBI1ONEcYKm8RJbRRFLgyEMkuGtCQI5cfkSL5ZrrgQ7khkERLwOolFkFQ-mdNg-rOmlvajRFhIOHPKM50sg0qTSKIE",
      alt: "A serene landscape of the Kerala backwaters at dawn. A luxury wooden houseboat with thatched roof glides through calm waters, framed by leaning coconut palms.",
      link: "/destinations/ethereal-alpine-sanctuary", // Link to alpine for demo purposes
    },
    {
      title: "Mist of Munnar",
      loc: "Tea Estate Immersion",
      price: "$3,800",
      dur: "5 Days",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9-tRLh1ZCHPXJ3DjzNGto_IHAcCxh6V-TN9WYbPeBZaLKd0s-lt58FqgFav5kmLG85EshJ3UdOZIRG_EPjd9P6CHavN3KtQILnuZ7iVQO-u02HAjjf_sj7eW0VjEYD0ljUBb8F3Lffr-3_QWptsAhD5wi15W7LCnn6D45Bc_1lsuYF7JJfaQPhD5gCDKKyQzUCfyS2VpEup-fA37pZp56uu7PgBdkKSXUSwGLCN4SnIuPBbyQdykcnn70XnvjC4OuU2Xw8ZbMQMI",
      alt: "A luxury hilltop resort in Munnar, Kerala, overlooking sprawling emerald green tea plantations shrouded in heavy morning fog.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Arabian Shoreline",
      loc: "Private Coastal Retreat",
      price: "$6,500",
      dur: "10 Days",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHLaE3okzxsQHaqb9Mz75m6cJ9yzcdgsra8rfIXuiNGh_C6kZnNsyg-ldSrKa8d-F57-kk46EedVi2muCdXZ-k1M5nxT37PK-Q_Aoc6EnJQyY732FyQsSDqys9z-bVOZJBc56qpRPX5kJnclndaf5AiCAhSqR9a6mX5j8GUwIKjzOZi37UOgoJr6jgPbHIFbW7NUQKZa0p92cWKhhrKrlocpOJzXjLR6ddJF1SYj7aNPzBaGBKAE4Ogo13GtH0taHcW8hvd7PK5tM",
      alt: "A pristine beach in Marari, Kerala, featuring a minimalist luxury villa set amongst a grove of palm trees.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
  ],
  india: [
    {
      title: "Royal Rajasthan",
      loc: "Jaipur & Udaipur",
      price: "$7,500",
      dur: "12 Days",
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
      alt: "The grand façade of a Rajasthani palace reflecting in a still pool at dusk, lit by thousands of golden oil lamps.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Himalayan Ascent",
      loc: "Ladakh Highlands",
      price: "$6,200",
      dur: "9 Days",
      img: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800",
      alt: "A secluded luxury camp in the high-altitude desert of Ladakh, surrounded by jagged snow-capped peaks under a crystal clear night sky.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Ganges Ritual",
      loc: "Varanasi Heritage",
      price: "$4,500",
      dur: "6 Days",
      img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
      alt: "A private boat on the Ganges at sunrise, with the ancient ghats of Varanasi silhouetted against a deep red and orange sky.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
  ],
  international: [
    {
      title: "Alpine Serenity",
      loc: "St. Moritz, Switzerland",
      price: "$12,000",
      dur: "8 Days",
      img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800",
      alt: "A modern black timber chalet nestled in the snowy Swiss Alps with glowing windows casting a warm light onto the pristine snow.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Amalfi Drape",
      loc: "Positano, Italy",
      price: "$15,500",
      dur: "10 Days",
      img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
      alt: "A panoramic view of the colorful houses of Positano clinging to the cliffs above a deep blue sea at twilight.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Kyoto Echo",
      loc: "Arashiyama, Japan",
      price: "$9,800",
      dur: "7 Days",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
      alt: "A minimalist Japanese Ryokan surrounded by a vibrant autumn forest of deep red maples, with a traditional stone path leading to a sliding paper door.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
  ],
};

type EnclaveKey = keyof typeof enclavesData;

export default function Home() {
  const [activeTab, setActiveTab] = useState<EnclaveKey>("kerala");
  const [searchDest, setSearchDest] = useState("");
  const [searchDates, setSearchDates] = useState("");
  const [preference, setPreference] = useState("Private Jet");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab: EnclaveKey) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="A breathtaking aerial view of a private tropical island villa at sunset. The turquoise water gently laps against the white sand shore while the sky is painted in deep reds, violets, and warm oranges."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbbu7lEyxbyU_7eN0K5FwP85ggvvdsaMKE0ZsgjZAjltaPLpTw-s50VJ0yrNCPh6jHvG0SlH_Ls-OWV-lWvIHbx3Ki0ACisA9QwSG_cjp6xfTesRMW-kpEd8LZ0MS_F1DwmTHoDJN8-UJqxrpEAg5vhXfbs9M7a2q1gk0XHTILsDIQAghEdgAJpzsnlA4AkI7X5yHl-q3TzdEsiBDqhG5mklDlARY1jYa9tJIPAr9Kg2JRHCazg2p77WmueFPtbRGgW6yula7gaSw"
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>

          <div className="relative z-10 max-w-container-max-width mx-auto px-margin-desktop text-center">
            <h1 className="font-display text-4xl sm:text-5xl md:text-display-lg text-white mb-6 leading-tight">
              Quiet Luxury.<br />
              <span className="text-primary italic">Deeply Personal.</span>
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
              Experience travel defined by heritage, exclusivity, and profound quietude. Curated for the few who understand that the ultimate luxury is silence.
            </p>

            {/* Quick Search Floating Bar */}
            <div className="glass-panel bg-surface/30 border border-white/10 p-2 rounded-xl md:rounded-full flex flex-col md:flex-row items-center max-w-4xl mx-auto gap-2 md:gap-0">
              <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full md:w-auto">
                <span className="material-symbols-outlined text-primary mr-3">
                  location_on
                </span>
                <div className="text-left w-full">
                  <span className="block text-[10px] text-label-sm uppercase tracking-widest text-on-surface-variant/60 font-semibold">
                    Destination
                  </span>
                  <input
                    className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-on-surface font-semibold w-full placeholder:text-on-surface/35 text-body-md"
                    placeholder="Where to go?"
                    type="text"
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full md:w-auto">
                <span className="material-symbols-outlined text-primary mr-3">
                  calendar_today
                </span>
                <div className="text-left w-full">
                  <span className="block text-[10px] text-label-sm uppercase tracking-widest text-on-surface-variant/60 font-semibold">
                    Timeline
                  </span>
                  <input
                    className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-on-surface font-semibold w-full placeholder:text-on-surface/35 text-body-md"
                    placeholder="Select dates"
                    type="text"
                    value={searchDates}
                    onChange={(e) => setSearchDates(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 flex items-center px-6 py-3 w-full md:w-auto">
                <span className="material-symbols-outlined text-primary mr-3">
                  flight_takeoff
                </span>
                <div className="text-left w-full">
                  <span className="block text-[10px] text-label-sm uppercase tracking-widest text-on-surface-variant/60 font-semibold">
                    Preference
                  </span>
                  <select
                    className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-on-surface font-semibold w-full cursor-pointer text-body-md"
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                  >
                    <option className="bg-surface text-on-surface">Private Jet</option>
                    <option className="bg-surface text-on-surface">First Class</option>
                    <option className="bg-surface text-on-surface">Yacht Charter</option>
                  </select>
                </div>
              </div>

              <Link
                href="/destinations/ethereal-alpine-sanctuary"
                className="bg-primary hover:bg-primary/90 text-on-primary font-sans text-label-md py-4 px-10 rounded-xl md:rounded-full transition-all active:scale-95 w-full md:w-auto text-center"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>

        {/* Curated Enclaves Section */}
        <section className="py-24 bg-surface" id="experiences">
          <div className="max-w-container-max-width mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div>
                <h2 className="font-headline text-3xl md:text-headline-lg text-white mb-4">
                  Curated Enclaves
                </h2>
                <p className="text-on-surface-variant text-body-lg max-w-xl">
                  Hand-selected journeys that prioritize architectural significance and cultural immersion.
                </p>
              </div>

              <div className="flex gap-8 border-b border-outline-variant/30 pb-2 w-full md:w-auto overflow-x-auto no-scrollbar whitespace-nowrap">
                {(["kerala", "india", "international"] as EnclaveKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`font-sans text-label-md pb-2 hover:text-primary transition-all capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-primary text-primary"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Content */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-gutter transition-all duration-300 ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {enclavesData[activeTab].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="group cursor-pointer block"
                >
                  <div className="relative h-[500px] overflow-hidden rounded-xl mb-6 bg-surface-container">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                      <span className="bg-primary-container text-on-primary-container px-3 py-1 text-[10px] text-label-sm font-semibold rounded-sm mb-3 inline-block uppercase tracking-wider">
                        {item.dur}
                      </span>
                      <h3 className="font-headline text-headline-sm text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <p className="text-on-surface-variant text-body-md">{item.loc}</p>
                    <span className="text-primary font-semibold text-body-md">
                      From {item.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Showcase (Bento Style) */}
        <section className="py-24 bg-surface-container-lowest" id="about">
          <div className="max-w-container-max-width mx-auto px-margin-desktop">
            <h2 className="font-headline text-3xl md:text-headline-lg text-white mb-16 text-center">
              The Tripora Way
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-gutter h-auto md:h-[800px] space-y-6 md:space-y-0">
              {/* Bento 1: Dining */}
              <div className="col-span-1 md:col-span-8 md:row-span-1 relative rounded-xl overflow-hidden group h-[300px] md:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Curated Dining setup"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByOyLgYNl78EWLS7vecxg2p98OLQPgX-Y31BlHWt-eoT7ueX7Im2vcsbRv3u1l0yYgtjAG5CsG2EYl5A0NGf68pFFzb271--f8QaRJ36xOvM3V3jgW9H4aTlPTaMxQS8y7qJOfXcI5H5t1EycCuT9Id1cWNqwsqbI2keXzMd7bP6BgopbrnlbRN86tAlmFz-FIYA81oi5mR7BjU0fA1YtL9gME2XQ9quSNIbtD47AZWlnDA9pdQxrchfAPUYYFKBBGBWCHJ4Y7tIM"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-12">
                  <h4 className="font-headline text-headline-sm text-white mb-2">
                    Curated Dining
                  </h4>
                  <p className="text-on-surface-variant max-w-md text-body-md">
                    Private chefs and heritage recipes in impossible locations.
                  </p>
                </div>
              </div>

              {/* Bento 2: Transit */}
              <div className="col-span-1 md:col-span-4 md:row-span-2 relative rounded-xl overflow-hidden group h-[400px] md:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Global aviation cabin"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdvSB3wZkcQCzqJkdyChwpkQDp0xgxUbKChDvUWeMN7AS2vjNvqYMc0aEnSPAeg_ObU9AfsTiwhw8LiY3c8gLpei1NT0cK3CWJNn6KfvllcEUoq1ZncDeM-hCzJOyofXn6H9QXFfkWzxSD6FFasQRL93dvEreVbdPerQ0OD-DfH6oc3WcRrGUeqkmLT-UK4SamDRPlii7MTzjQS-T2suiuGytoIJBVo6CQBqerpRMdp4xAIfSSH2StkVDY9O8IoSZ0lQjJW1KfWH4"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-12">
                  <h4 className="font-headline text-headline-sm text-white mb-2">
                    Global Transit
                  </h4>
                  <p className="text-on-surface-variant text-body-md">
                    Bespoke aviation logistics for the discerning nomad.
                  </p>
                </div>
              </div>

              {/* Bento 3: Heritage */}
              <div className="col-span-1 md:col-span-4 md:row-span-1 relative rounded-xl overflow-hidden group h-[200px] md:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Heritage Palace stay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-uQfga1qv1v35h0Q3NntTAV-VwfcwkfOM_LtS4fHU71cBWfSXVuHf3GBJXiaVUh8vVNHAITIzBN6LqtycUU6MaTn9aqN-AvBLYRg1ZPwKR9tz0fiw8Sjs3icfpX_5qww1kQynXTYAIx6ixM18VT810VT86Jf6TOJ9eML-y0YPf9Y3IXLaly64Fbd-aJbk3pA_bzvIlmhWscXD2i3E_G3mfrox-ERA5DM0V6YD85Mdbs-RnsVjUZb611vlRGBB0QI_bq24UtFa33U"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-12">
                  <h4 className="font-headline text-headline-sm text-white mb-2">
                    Heritage Stays
                  </h4>
                </div>
              </div>

              {/* Bento 4: Wellness */}
              <div className="col-span-1 md:col-span-4 md:row-span-1 relative rounded-xl overflow-hidden group h-[200px] md:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Swiss alpine wellness"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5sa-igsMxxtiTNIyGYo-F6N-xvie-QFPHOGJdo_pbDPqPfuB8xfBdh0tIDb8fzvjSTdt8LqrN_zMUjj7KU7tPmYV686-H63dJCebPxmbNOATiYNAYrg3tJAF9WrdjModyVnwNoX6-cU1GdSyr9hQeHH7A14itfE3ZWQum55LdU4gBOZU97Qi53yfJv6sa1opk6SrQs8bPqIr0ZnFdwylqNnRukzr1JYZqMjwsgyzVyEojyjp69wMRNMDRNmvNYqF24PUsNiyE3_o"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-12">
                  <h4 className="font-headline text-headline-sm text-white mb-2">
                    Soulful Wellness
                  </h4>
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
