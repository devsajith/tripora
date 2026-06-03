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
      title: "Vembanad Houseboat Sanctuary",
      loc: "Alleppey & Kumarakom, Kerala",
      price: "$4,200",
      dur: "7 Days",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG3rpAp0UctqMIYA8Dapv66TZl8l8e4LNTgeXqaCi0KG7EGWTeGwZhSk7WEMIl59V2K8FKHjqjoHTVoKvC6IyeAqv3BHVuQsMR2knQgLgOSZDIBwIrQAo1A1dKXGyuS7sLBre-j1T4RWunVhAA4pl5KrGjxBBpXOuU-0IOcCll6Tpa3zC0JSBI1ONEcYKm8RJbRRFLgyEMkuGtCQI5cfkSL5ZrrgQ7khkERLwOolFkFQ-mdNg-rOmlvajRFhIOHPKM50sg0qTSKIE",
      alt: "A serene landscape of the Kerala backwaters at dawn. A luxury wooden houseboat with thatched roof glides through calm waters, framed by leaning coconut palms.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Mist of Munnar Hills",
      loc: "Tea Estate Immersion, Kerala",
      price: "$3,800",
      dur: "5 Days",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9-tRLh1ZCHPXJ3DjzNGto_IHAcCxh6V-TN9WYbPeBZaLKd0s-lt58FqgFav5kmLG85EshJ3UdOZIRG_EPjd9P6CHavN3KtQILnuZ7iVQO-u02HAjjf_sj7eW0VjEYD0ljUBb8F3Lffr-3_QWptsAhD5wi15W7LCnn6D45Bc_1lsuYF7JJfaQPhD5gCDKKyQzUCfyS2VpEup-fA37pZp56uu7PgBdkKSXUSwGLCN4SnIuPBbyQdykcnn70XnvjC4OuU2Xw8ZbMQMI",
      alt: "A luxury hilltop resort in Munnar, Kerala, overlooking sprawling emerald green tea plantations shrouded in heavy morning fog.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Marari Coastal Shoreline",
      loc: "Private Coastal Villa, Marari, Kerala",
      price: "$6,500",
      dur: "10 Days",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHLaE3okzxsQHaqb9Mz75m6cJ9yzcdgsra8rfIXuiNGh_C6kZnNsyg-ldSrKa8d-F57-kk46EedVi2muCdXZ-k1M5nxT37PK-Q_Aoc6EnJQyY732FyQsSDqys9z-bVOZJBc56qpRPX5kJnclndaf5AiCAhSqR9a6mX5j8GUwIKjzOZi37UOgoJr6jgPbHIFbW7NUQKZa0p92cWKhhrKrlocpOJzXjLR6ddJF1SYj7aNPzBaGBKAE4Ogo13GtH0taHcW8hvd7PK5tM",
      alt: "A pristine beach in Marari, Kerala, featuring a minimalist luxury villa set amongst a grove of palm trees.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
  ],
  heritage: [
    {
      title: "Royal Rajasthan Palaces",
      loc: "Jaipur & Udaipur, Rajasthan",
      price: "$7,500",
      dur: "12 Days",
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
      alt: "The grand façade of a Rajasthani palace reflecting in a still pool at dusk, lit by thousands of golden oil lamps.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Imperial Deccan Kingdoms",
      loc: "Hampi & Mysore, Karnataka",
      price: "$5,800",
      dur: "8 Days",
      img: "https://images.unsplash.com/photo-1600100397918-a664e32d1e04?auto=format&fit=crop&q=80&w=800",
      alt: "Stone ruins of Hampi heritage structures at sunset, displaying intricate carvings and historic pillars under a golden sky.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Varanasi Spiritual Ghats",
      loc: "Sacred Ganges River, Uttar Pradesh",
      price: "$4,500",
      dur: "6 Days",
      img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
      alt: "A private boat on the Ganges at sunrise, with the ancient ghats of Varanasi silhouetted against a deep red and orange sky.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
  ],
  highlands: [
    {
      title: "Highlands of Ladakh",
      loc: "Leh & Ladakh Wilderness",
      price: "$6,200",
      dur: "9 Days",
      img: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800",
      alt: "A secluded luxury camp in the high-altitude desert of Ladakh, surrounded by jagged snow-capped peaks under a crystal clear night sky.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Wayanad Rainforest Enclave",
      loc: "Western Ghats, Wayanad, Kerala",
      price: "$3,500",
      dur: "6 Days",
      img: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=800",
      alt: "Stunning view of deep green rain forest and misty hills of Wayanad, Kerala from a luxury treehouse balcony.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
    {
      title: "Corbett Wildlife Trails",
      loc: "Jim Corbett Reserve, Uttarakhand",
      price: "$4,900",
      dur: "7 Days",
      img: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800",
      alt: "A luxury safari tent in the wilderness of Jim Corbett national park at sunrise, with forest mist and trees in the background.",
      link: "/destinations/ethereal-alpine-sanctuary",
    },
  ],
};

type EnclaveKey = keyof typeof enclavesData;

export default function Home() {
  const [activeTab, setActiveTab] = useState<EnclaveKey>("kerala");
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
              Quiet Luxury in India's Soul.<br />
              <span className="text-primary italic">Deeply Personal.</span>
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
              Experience hand-crafted luxury journeys across Kerala's serene backwaters and India's majestic heritage enclaves. Curated for those who seek the extraordinary.
            </p>

            {/* WhatsApp Contact CTA */}
            <div className="flex justify-center">
              <a
                href="https://wa.me/91484000000?text=Hello%20Tripora%2C%20I%20am%20interested%20in%20booking%20a%20luxury%20kerala%2Findia%20passage."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-container/60 hover:bg-surface-container border border-outline-variant/30 hover:border-secondary/50 px-8 py-4 rounded-full flex items-center gap-4 transition-all duration-300 active:scale-95 group shadow-2xl hover:shadow-[0_0_30px_rgba(233,195,73,0.15)]"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-surface transition-all duration-300">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.025-5.125-2.887-6.99C16.584 1.886 14.1 1.86 11.99 1.86c-5.437 0-9.862 4.414-9.866 9.865-.001 2.028.536 4.021 1.554 5.761l-1.018 3.719 3.826-1.002zm10.974-7.408c-.287-.144-1.702-.84-1.965-.936-.264-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-1.359-.684-2.283-1.2-3.102-2.604-.216-.369.216-.343.62-.746.362-.363.456-.528.456-.864 0-.336-.084-.624-.168-.864-.084-.24-.456-1.104-.624-1.512-.16-.389-.344-.336-.456-.336-.108 0-.24-.024-.384-.024s-.36.048-.552.264c-.192.216-.744.72-.744 1.76 0 1.04.756 2.04.864 2.184.108.144 1.488 2.28 3.6 3.192.504.216.896.348 1.2.444.504.16.96.137 1.32.083.4-.06 1.704-.696 1.944-1.368.24-.672.24-1.248.168-1.368-.072-.12-.264-.192-.552-.336z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[9px] text-secondary font-sans font-bold uppercase tracking-[0.2em] leading-none mb-1.5">
                    Concierge Desk
                  </span>
                  <span className="block text-sm font-sans font-bold text-white tracking-wider leading-none">
                    Contact via WhatsApp
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/70 text-lg ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </a>
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
                {(["kerala", "heritage", "highlands"] as EnclaveKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`font-sans text-label-md pb-2 hover:text-primary transition-all capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-primary text-primary"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {tab === "kerala" ? "Kerala Enclaves" : tab === "heritage" ? "Heritage India" : "Highlands & Wilds"}
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
                    Heritage Dining
                  </h4>
                  <p className="text-on-surface-variant max-w-md text-body-md">
                    Private culinary experiences featuring royal Indian recipes and Kerala spice fusions.
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
                    Bespoke India Transit
                  </h4>
                  <p className="text-on-surface-variant text-body-md">
                    Private jet charters and luxury chauffeur SUV transfers across Indian enclaves.
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
                  <p className="text-on-surface-variant text-body-md">
                    Authentic stays from Udaipur's lake palaces to private Kerala houseboats.
                  </p>
                </div>
              </div>

              {/* Bento 4: Wellness */}
              <div className="col-span-1 md:col-span-4 md:row-span-1 relative rounded-xl overflow-hidden group h-[200px] md:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="Ayurvedic spa wellness setup"
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 md:p-12">
                  <h4 className="font-headline text-headline-sm text-white mb-2">
                    Ayurvedic Rejuvenation
                  </h4>
                  <p className="text-on-surface-variant text-body-md">
                    Ancient therapies, botanical spice baths, and yoga in the Western Ghats.
                  </p>
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
