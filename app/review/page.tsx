"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AVAILABLE_PACKAGES } from "@/data/reviews";
import { createReview } from "@/lib/reviews-service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReviewFormContent() {
  const searchParams = useSearchParams();
  const preselectedPkg = searchParams.get("package");

  // Attempt to match preselected package from query string
  const defaultPackage = AVAILABLE_PACKAGES.find(
    (pkg) =>
      preselectedPkg &&
      pkg.toLowerCase().includes(preselectedPkg.toLowerCase().replace(/-/g, " "))
  ) || AVAILABLE_PACKAGES[0];

  const [form, setForm] = useState({
    name: searchParams.get("name") || "",
    city: searchParams.get("city") || "",
    rating: 5,
    packageTitle: defaultPackage,
    comment: "",
  });

  const [selectedPhotoFiles, setSelectedPhotoFiles] = useState<File[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedPhotoFiles((prev) => [...prev, ...files].slice(0, 4));
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewPhotos((prev) => [...prev, ...newUrls].slice(0, 4));
  };

  const removePhoto = (index: number) => {
    setSelectedPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await createReview(
      {
        authorName: form.name,
        authorCity: form.city,
        rating: form.rating,
        packageTitle: form.packageTitle,
        comment: form.comment,
      },
      selectedPhotoFiles
    );

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
    } else {
      setSubmitError(result.error || "Unable to submit your review. Please try again.");
    }
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5:
        return "Excellent Experience";
      case 4:
        return "Very Good";
      case 3:
        return "Average";
      case 2:
        return "Below Average";
      case 1:
        return "Poor";
      default:
        return "Select Rating";
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {submitSuccess ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-900/10 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <span className="material-symbols-outlined !text-4xl">check_circle</span>
          </div>

          <span className="text-emerald-800 font-sans text-[11px] uppercase tracking-widest font-bold block mb-2">
            THANK YOU FOR CHOOSING TRIPORA
          </span>

          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-primary mb-3">
            Review Published!
          </h1>

          <p className="text-on-surface-variant font-sans text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-8">
            Thank you, <strong className="text-primary">{form.name}</strong>! Your review and Kerala travel memories have been saved and added to our guest wall.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#reviews"
              className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs uppercase tracking-wider font-bold px-8 py-3.5 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>View On Guest Wall</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto bg-surface hover:bg-gray-100 text-primary font-sans text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-full border border-gray-200 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-900/10 animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-emerald-800 font-sans text-[10px] uppercase tracking-[0.25em] font-bold block mb-2 bg-emerald-100/70 py-1 px-3.5 rounded-full w-fit mx-auto border border-emerald-800/15">
              GUEST FEEDBACK
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              Share Your Kerala <span className="text-emerald-700 font-script font-normal text-3xl sm:text-4xl md:text-5xl">Experience</span>
            </h1>
            <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
              We hope you had a magical journey! Rate your chauffeur, stays, and tour highlights in 30 seconds.
            </p>
          </div>

          {submitError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
            {/* Step 1: Star Rating */}
            <div className="bg-surface p-5 rounded-2xl border border-emerald-900/10 text-center">
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">
                Rate Your Overall Experience
              </label>

              <div className="flex items-center justify-center gap-2.5 my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setForm({ ...form, rating: star })}
                    className="cursor-pointer transition-transform hover:scale-125 focus:outline-none p-1"
                    title={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <span
                      className={`material-symbols-outlined !text-3xl sm:!text-4xl ${
                        star <= (hoverRating || form.rating)
                          ? "text-amber-400 fill-current drop-shadow-xs"
                          : "text-gray-300"
                      }`}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>

              <p className="font-sans text-xs font-bold text-emerald-800 mt-1.5">
                {getRatingLabel(hoverRating || form.rating)}
              </p>
            </div>

            {/* Step 2: Name & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                />
              </div>

              <div>
                <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                  Your City (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore, Karnataka"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                />
              </div>
            </div>

            {/* Step 3: Tour Package */}
            <div>
              <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                Tour Package Traveled
              </label>
              <select
                value={form.packageTitle}
                onChange={(e) => setForm({ ...form, packageTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface cursor-pointer"
              >
                {AVAILABLE_PACKAGES.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Review Comments */}
            <div>
              <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                Your Review *
              </label>
              <textarea
                rows={4}
                required
                placeholder="How was your chauffeur and vehicle? How were the hotels, houseboat, and scenic destinations? What stood out most?"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface leading-relaxed"
              />
            </div>

            {/* Step 5: Optional Photos */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-bold text-primary uppercase tracking-wider text-[9px]">
                  Add Trip Photos (Optional)
                </label>
                <span className="text-[10px] text-gray-400">Up to 4 images</span>
              </div>

              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-800/20 hover:bg-emerald-100 transition-colors font-bold text-xs">
                <span className="material-symbols-outlined text-base">add_photo_alternate</span>
                <span>Select Photos from Gallery</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {/* Thumbnails */}
              {previewPhotos.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-3">
                  {previewPhotos.map((url, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-xs group"
                    >
                      <Image fill src={url} alt="Uploaded preview" className="object-cover" unoptimized />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] cursor-pointer"
                        title="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white font-sans text-xs uppercase tracking-wider font-bold py-4 rounded-full transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed text-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Your Review...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Traveler Review</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ReviewPostingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center border border-gray-200">
              <span className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin inline-block mb-3" />
              <p className="text-xs text-gray-500 font-sans">Loading review form...</p>
            </div>
          }
        >
          <ReviewFormContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
