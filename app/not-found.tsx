import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Tripora",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      {/* Decorative number */}
      <p
        className="select-none font-playfair text-[120px] leading-none font-semibold text-primary-container opacity-30 sm:text-[180px]"
        aria-hidden="true"
      >
        404
      </p>

      {/* Headline */}
      <h1 className="font-playfair mt-[-1.5rem] text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Lost in the backwaters?
      </h1>

      {/* Body copy */}
      <p className="font-manrope mt-4 max-w-md text-base leading-relaxed text-on-surface-variant">
        The page you&apos;re looking for has drifted away like morning mist on a
        Kerala houseboat. Let&apos;s guide you back.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="font-manrope mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold tracking-wide text-on-primary transition-opacity hover:opacity-90"
      >
        Return Home
      </Link>
    </main>
  );
}
