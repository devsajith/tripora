"use client";

import { useState, useRef, useEffect } from "react";
import { AVAILABLE_PACKAGES } from "@/data/reviews";

interface CustomPackageSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const PACKAGE_METADATA: Record<string, { badge: string; icon: string }> = {
  "7 Days of Kerala (Signature Package)": {
    badge: "6N / 7D • Houseboat, Munnar & Alleppey",
    icon: "houseboat",
  },
  "Munnar Escape (2N / 3D)": {
    badge: "2N / 3D • Tea Plantations & Hills",
    icon: "landscape",
  },
  "5 Days / 4 Nights Kerala Tour": {
    badge: "4N / 5D • Kochi, Thekkady & Backwaters",
    icon: "explore",
  },
  "Custom Kerala Tour Itinerary": {
    badge: "Bespoke slow luxury experience",
    icon: "auto_awesome",
  },
};

export default function CustomPackageSelect({
  value,
  onChange,
  label = "Tour Package",
}: CustomPackageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedMeta = PACKAGE_METADATA[value] || {
    badge: "Kerala Tour",
    icon: "travel_explore",
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full px-4 py-3 rounded-2xl border text-xs bg-surface cursor-pointer flex items-center justify-between gap-3 text-left transition-all duration-200 ${
          isOpen
            ? "border-emerald-700 ring-2 ring-emerald-700/15 shadow-sm bg-white"
            : "border-gray-200 hover:border-emerald-600 hover:bg-white"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-800/10">
            <span className="material-symbols-outlined !text-base">
              {selectedMeta.icon}
            </span>
          </div>

          <div className="min-w-0 flex-grow">
            <p className="font-bold text-primary truncate leading-snug">
              {value || "Select Tour Package"}
            </p>
            <p className="text-[10px] text-gray-400 truncate">
              {selectedMeta.badge}
            </p>
          </div>
        </div>

        <span
          className={`material-symbols-outlined !text-lg text-emerald-800 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Custom Styled Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-xl border border-emerald-900/10 p-1.5 animate-scale-in origin-top backdrop-blur-xl max-h-72 overflow-y-auto no-scrollbar"
        >
          {AVAILABLE_PACKAGES.map((pkg) => {
            const isSelected = pkg === value;
            const meta = PACKAGE_METADATA[pkg] || {
              badge: "Kerala Tour",
              icon: "travel_explore",
            };

            return (
              <div
                key={pkg}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(pkg);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-800/15"
                    : "hover:bg-gray-50 text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${
                      isSelected
                        ? "bg-emerald-800 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span className="material-symbols-outlined !text-base">
                      {meta.icon}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-xs truncate ${
                        isSelected ? "font-bold text-emerald-900" : "font-medium text-gray-800"
                      }`}
                    >
                      {pkg}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {meta.badge}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <span className="material-symbols-outlined !text-base text-emerald-700 flex-shrink-0">
                    check
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
