"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 1. Intersection Observer for scroll-triggered reveal animations
  useEffect(() => {
    const selector = [
      ".reveal-on-scroll",
      ".reveal-up",
      ".reveal-down",
      ".reveal-from-left",
      ".reveal-from-right",
      ".reveal-scale",
      ".reveal-rotate",
      ".reveal-blur",
    ].join(", ");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "250px 0px 100px 0px",
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);
      const viewportThreshold = window.innerHeight * 1.35;
      elements.forEach((el) => {
        // If already in or near viewport on mount, activate immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportThreshold) {
          el.classList.add("reveal-active");
        } else {
          observer.observe(el);
        }
      });
    };

    // Run immediately and queue with requestAnimationFrame
    observeElements();
    requestAnimationFrame(observeElements);
    const timeoutId = setTimeout(observeElements, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  // 1.5 Reliable hash scrolling on route navigation & page load
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToTargetHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Attempt immediately and with slight delay after DOM hydration
    scrollToTargetHash();
    const timer = setTimeout(scrollToTargetHash, 200);
    window.addEventListener("hashchange", scrollToTargetHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToTargetHash);
    };
  }, [pathname]);

  // 2. Scroll Progress & Scroll-to-Top Button Listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const progress = (currentScroll / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          }

          setShowScrollTop(currentScroll > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Dynamic Reading Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-teal-400 via-emerald-600 to-amber-300 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(20,97,78,0.5)]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-20 sm:bottom-8 right-5 sm:right-8 z-40 w-11 h-11 rounded-full bg-emerald-900/90 hover:bg-emerald-800 text-white backdrop-blur-md shadow-xl border border-emerald-700/40 flex items-center justify-center transition-all duration-300 group cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-xl transition-transform duration-200 group-hover:-translate-y-0.5 text-amber-300">
          keyboard_arrow_up
        </span>
      </button>
    </>
  );
}
