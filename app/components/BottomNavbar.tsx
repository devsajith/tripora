"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  // Hide mobile bottom navbar on specific full details pages if needed
  if (pathname.includes("/destinations/")) {
    return null;
  }

  const items = [
    { id: "home", label: "Home", href: "/", icon: "home", isPage: pathname === "/" },
    { id: "packages", label: "Packages", href: "/packages", icon: "inventory_2", isPage: pathname === "/packages" },
    { id: "destinations", label: "Places", href: "/#destinations", icon: "explore", isPage: false },
    { id: "about", label: "About", href: "/#about", icon: "info", isPage: false },
    { id: "contact", label: "Enquire", href: "/#contact", icon: "chat", isPage: false, isAction: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(10,46,38,0.08)] pb-safe">
      <div className="flex justify-around items-center px-3 py-2">
        {items.map((item) => {
          const isActive = item.isPage;
          if (item.isAction) {
            return (
              <a
                key={item.id}
                href="https://wa.me/919656464124?text=Hi%20Tripora!%20I%20am%20interested%20in%20a%20Kerala%20Tour%20Package."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-emerald-800 text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>WhatsApp</span>
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-emerald-800 font-extrabold"
                  : "text-primary/70 hover:text-emerald-800"
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
