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
    <nav
      className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-emerald-900/10 shadow-[0_-4px_24px_rgba(10,46,38,0.08)]"
      style={{ paddingBottom: "max(0.4rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="grid grid-cols-5 items-center max-w-lg mx-auto px-2 py-1.5">
        {items.map((item) => {
          const isActive = item.isPage;
          if (item.isAction) {
            return (
              <a
                key={item.id}
                href="https://wa.me/919656464124?text=Hi%20Tripora!%20I%20am%20interested%20in%20a%20Kerala%20Tour%20Package."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 group text-emerald-800"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-900 transition-colors">
                  <span className="material-symbols-outlined text-base">chat</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 mt-0.5">WhatsApp</span>
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? "text-emerald-800 font-extrabold"
                  : "text-primary/70 hover:text-emerald-800"
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isActive ? "bg-emerald-50 text-emerald-800" : ""
              }`}>
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? "font-bold text-emerald-800" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
