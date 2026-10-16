"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { initialReviews, ReviewItem } from "@/data/reviews";
import {
  getApprovedReviews,
  createReview,
  likeReview,
} from "@/lib/reviews-service";
import CustomPackageSelect from "./CustomPackageSelect";

const AVAILABLE_PACKAGES = [
  "7 Days of Kerala (Signature Package)",
  "Munnar Escape (2N / 3D)",
  "5 Days / 4 Nights Kerala Tour",
  "Custom Kerala Tour Itinerary",
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("helpful");

  // Lightbox State
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Expanded review comment state (for read more / less)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Helpful likes state (tracking liked review IDs)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Streamlined "Write Review" Modal State (Zero Burden to Travelers)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    name: "",
    city: "",
    rating: 5,
    packageTitle: AVAILABLE_PACKAGES[0],
    comment: "",
  });
  const [selectedPhotoFiles, setSelectedPhotoFiles] = useState<File[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load reviews from Supabase on mount and check for direct write link
  useEffect(() => {
    let isMounted = true;

    // 1. Instant optimistic restore from session cache if available
    try {
      const cached = typeof window !== "undefined" ? sessionStorage.getItem("tripora_cached_reviews") : null;
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
          setIsLoading(false);
        }
      }
    } catch {
      // Fallback to network fetch
    }

    // 2. Fetch fresh live data from Supabase (stale-while-revalidate)
    async function loadReviews() {
      const data = await getApprovedReviews();
      if (isMounted) {
        setReviews(data);
        setIsLoading(false);
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("tripora_cached_reviews", JSON.stringify(data));
          }
        } catch {}
      }
    }
    loadReviews();

    // Check if user landed on #write-review or ?review=true
    if (typeof window !== "undefined") {
      if (
        window.location.hash === "#write-review" ||
        window.location.search.includes("review=true")
      ) {
        setIsModalOpen(true);
      }

      const handleHashChange = () => {
        if (window.location.hash === "#write-review") {
          setIsModalOpen(true);
        }
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => {
        isMounted = false;
        window.removeEventListener("hashchange", handleHashChange);
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic aggregate statistics calculated from real reviews
  const totalReviewsCount = reviews.length;
  const displayedReviewsCount = reviews.length;
  const avgRating =
    totalReviewsCount > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount
        ).toFixed(1)
      : "5.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage =
      totalReviewsCount > 0
        ? Math.round((count / totalReviewsCount) * 100)
        : 0;
    return { stars, count, percentage };
  });

  // Filter & Search logic
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (activeFilter === "photos") {
      result = result.filter((r) => r.photos && r.photos.length > 0);
    } else if (activeFilter === "5-star") {
      result = result.filter((r) => r.rating === 5);
    } else if (activeFilter === "4-star") {
      result = result.filter((r) => r.rating === 4);
    } else if (activeFilter === "houseboat") {
      result = result.filter(
        (r) =>
          r.comment.toLowerCase().includes("houseboat") ||
          r.comment.toLowerCase().includes("alleppey") ||
          r.packageTitle.toLowerCase().includes("signature")
      );
    } else if (activeFilter === "munnar") {
      result = result.filter(
        (r) =>
          r.packageTitle.toLowerCase().includes("munnar") ||
          r.comment.toLowerCase().includes("munnar")
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.comment.toLowerCase().includes(q) ||
          r.authorName.toLowerCase().includes(q) ||
          r.packageTitle.toLowerCase().includes(q)
      );
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "helpful") {
      result.sort((a, b) => (b.likes + (likedMap[b.id] ? 1 : 0)) - (a.likes + (likedMap[a.id] ? 1 : 0)));
    }

    return result;
  }, [reviews, activeFilter, searchQuery, sortBy, likedMap]);

  // Handlers
  const handleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    likeReview(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedPhotoFiles((prev) => [...prev, ...files].slice(0, 4));
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewPhotos((prev) => [...prev, ...newUrls].slice(0, 4));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await createReview(
      {
        authorName: newReviewForm.name,
        authorCity: newReviewForm.city,
        rating: newReviewForm.rating,
        packageTitle: newReviewForm.packageTitle,
        comment: newReviewForm.comment,
      },
      selectedPhotoFiles
    );

    setIsSubmitting(false);

    if (result.success && result.review) {
      setReviews((prev) => [result.review!, ...prev]);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        setNewReviewForm({
          name: "",
          city: "",
          rating: 5,
          packageTitle: AVAILABLE_PACKAGES[0],
          comment: "",
        });
        setPreviewPhotos([]);
        setSelectedPhotoFiles([]);
      }, 2200);
    } else {
      setSubmitError(result.error || "Unable to save review. Please check your connection.");
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
    <section id="reviews" className="py-16 sm:py-20 md:py-24 px-4 sm:px-8 lg:px-12 bg-surface">
      {/* Schema.org Structured Data for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Tripora",
            url: "https://tripora68.in",
            telephone: "+919656464124",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: totalReviewsCount.toString(),
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 reveal-up">
          <span className="text-emerald-800 font-sans text-[11px] uppercase tracking-[0.25em] font-bold block mb-2 bg-emerald-100/70 py-1 px-4 rounded-full w-fit mx-auto border border-emerald-800/20">
            AUTHENTIC TRAVELER STORIES
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            Guest Reviews &amp; <span className="text-emerald-700 font-script font-normal text-4xl sm:text-5xl md:text-6xl">Memories</span>
          </h2>
          <p className="text-on-surface-variant font-sans text-xs sm:text-sm mt-3 leading-relaxed">
            Real stories, unedited photos, and genuine feedback from travelers who explored Kerala with Tripora.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* GOOGLE-STYLE SCORECARD & SUMMARY */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-900/10 mb-10 reveal-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Big Score & Trust Badges */}
            <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start justify-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-sans text-5xl sm:text-6xl font-extrabold text-primary tracking-tight">
                  {avgRating}
                </span>
                <span className="text-gray-400 font-sans text-xl font-bold">/ 5.0</span>
              </div>

              {/* Star graphics */}
              <div className="flex items-center gap-1 text-amber-400 text-2xl mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`material-symbols-outlined !text-2xl ${
                      s <= Math.round(Number(avgRating))
                        ? "fill-current text-amber-400"
                        : "text-gray-200"
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>

              <p className="font-sans text-xs text-on-surface-variant font-medium mb-4">
                {totalReviewsCount > 0 ? (
                  <>
                    Based on <strong className="text-primary font-bold">{totalReviewsCount} guest review{totalReviewsCount > 1 ? "s" : ""}</strong>
                  </>
                ) : (
                  <>Verified Kerala traveler feedback</>
                )}
              </p>

              {/* Trust Signals */}
              <div className="flex flex-col gap-2 w-full max-w-xs text-left mb-6 font-sans text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-800/15">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span className="font-semibold">100% Verified Guest Bookings</span>
                </div>
                <div className="flex items-center gap-2 text-primary/80 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200">
                  <span className="material-symbols-outlined text-base">recommend</span>
                  <span>98% of travelers recommend Tripora</span>
                </div>
              </div>

              {/* Write Review CTA Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">rate_review</span>
                <span>Share Your Experience</span>
              </button>
            </div>

            {/* Right Col: Rating Breakdown Bars */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-2.5">
              <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                Rating Breakdown
              </h3>
              {ratingDistribution.map((tier) => (
                <div
                  key={tier.stars}
                  onClick={() => setActiveFilter(tier.stars === 5 ? "5-star" : tier.stars === 4 ? "4-star" : "all")}
                  className="flex items-center gap-3 group cursor-pointer"
                  title={`Filter by ${tier.stars} stars`}
                >
                  <span className="font-sans text-xs font-bold text-primary w-12 flex items-center gap-1 flex-shrink-0 group-hover:text-emerald-700">
                    <span>{tier.stars}</span>
                    <span className="material-symbols-outlined text-xs text-amber-400 fill-current">star</span>
                  </span>

                  <div className="flex-grow h-3 bg-gray-100 rounded-full overflow-hidden relative border border-gray-200/50">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full transition-all duration-700 group-hover:brightness-110"
                      style={{ width: `${tier.percentage}%` }}
                    />
                  </div>

                  <div className="w-16 text-right flex items-center justify-end gap-1.5 flex-shrink-0 font-sans text-[11px] text-gray-500">
                    <span className="font-bold text-primary group-hover:text-emerald-700">{tier.count}</span>
                    <span className="text-gray-400">({tier.percentage}%)</span>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex flex-wrap items-center gap-2 text-[11px] font-sans text-gray-500">
                <span className="font-bold text-primary">Popular trip highlights mentioned:</span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">Houseboat</span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">Driver &amp; Cab</span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">Munnar Tea</span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">Authentic Food</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILTER CHIPS, SEARCH & SORT BAR */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          {/* Simple Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {[
              { id: "all", label: `All Reviews (${displayedReviewsCount})` },
              { id: "photos", label: "📷 With Photos" },
              { id: "5-star", label: "★ 5 Stars" },
              { id: "4-star", label: "★ 4 Stars" },
              { id: "houseboat", label: "Houseboat & Backwaters" },
              { id: "munnar", label: "Munnar Tours" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`font-sans text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  activeFilter === tab.id
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-white text-on-surface-variant border border-gray-200 hover:border-emerald-700 hover:text-emerald-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow md:w-56">
              <span className="material-symbols-outlined text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-sans focus:outline-none focus:border-emerald-700"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs font-sans text-on-surface-variant focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="helpful">Most Helpful</option>
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REVIEWS GRID */}
        {/* ========================================================================= */}
        {isLoading && reviews.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-11 h-11 rounded-full bg-emerald-100/60" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded-md w-1/3" />
                      <div className="h-3 bg-gray-100 rounded-md w-1/4" />
                    </div>
                  </div>
                  <div className="h-6 w-24 bg-emerald-50 rounded-full" />
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-amber-100 rounded-full" />
                  ))}
                </div>
                <div className="space-y-2 pt-1">
                  <div className="h-3.5 bg-gray-100 rounded w-full" />
                  <div className="h-3.5 bg-gray-100 rounded w-5/6" />
                  <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-emerald-900/10 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">rate_review</span>
            </div>
            <h3 className="font-sans text-lg font-bold text-primary mb-1">
              Be the First to Review
            </h3>
            <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto mb-6 leading-relaxed">
              Have you explored Kerala with Tripora? Share your memories, rate your chauffeur, and inspire fellow travelers!
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-sans text-xs uppercase tracking-wider font-bold px-7 py-3 rounded-full transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">rate_review</span>
              <span>Write First Review</span>
            </button>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">rate_review</span>
            <p className="font-sans text-sm font-bold text-primary mb-1">No reviews match your filter</p>
            <p className="font-sans text-xs text-gray-500 mb-4">Try clearing filters or search queries.</p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="font-sans text-xs font-bold text-emerald-800 underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => {
              const isLiked = Boolean(likedMap[rev.id]);
              const displayLikes = rev.likes + (isLiked ? 1 : 0);
              const isExpanded = Boolean(expandedIds[rev.id]);
              const isLongText = rev.comment.length > 220;

              const initials = rev.authorName
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <article
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow border border-gray-200/80 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Avatar, Name, City, Verified Tag */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-900 font-bold font-sans text-sm flex items-center justify-center flex-shrink-0 border border-emerald-900/10 shadow-xs">
                          {initials}
                        </div>
                        <div>
                          <h3 className="font-sans text-sm font-bold text-primary leading-tight">
                            {rev.authorName}
                          </h3>
                          <p className="font-sans text-[11px] text-gray-500">
                            {rev.authorCity} • <span className="text-gray-400">{rev.createdAt}</span>
                          </p>
                        </div>
                      </div>

                      {/* Verified Booking Tag */}
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-800/20 flex-shrink-0">
                        <span className="material-symbols-outlined text-xs fill-current">verified</span>
                        <span>Verified Guest</span>
                      </span>
                    </div>

                    {/* Stars + Package Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined !text-lg ${
                              i < rev.rating ? "text-amber-400 fill-current" : "text-gray-200"
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 font-sans text-[10px] text-emerald-900 bg-emerald-50/60 px-2 py-0.5 rounded-md border border-emerald-900/10">
                        <span className="material-symbols-outlined text-xs text-emerald-700">travel_explore</span>
                        <span className="font-semibold truncate max-w-[200px]">{rev.packageTitle}</span>
                      </div>
                    </div>

                    {/* Review Body (Flows naturally without headline burden) */}
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                      {isLongText && !isExpanded ? `${rev.comment.slice(0, 220)}...` : rev.comment}
                      {isLongText && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(rev.id)}
                          className="ml-1 text-emerald-800 font-bold hover:underline inline-block"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>

                    {/* Traveler Photos Gallery */}
                    {rev.photos && rev.photos.length > 0 && (
                      <div className="mb-4">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">photo_camera</span>
                          <span>Trip Photos ({rev.photos.length})</span>
                        </p>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                          {rev.photos.map((imgUrl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActivePhoto(imgUrl)}
                              className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 group cursor-pointer hover:border-emerald-700 transition-colors shadow-xs"
                            >
                              <Image
                                fill
                                src={imgUrl}
                                alt={`Trip photo from ${rev.authorName}`}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="80px"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm drop-shadow-md">
                                  zoom_in
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Host / Owner Response Bubble */}
                    {rev.ownerReply && (
                      <div className="mt-3 bg-surface rounded-2xl p-3.5 border-l-4 border-emerald-700 border border-gray-100 font-sans text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-emerald-900 text-[11px]">Response from Tripora (Host)</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Owner</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{rev.ownerReply.repliedAt}</span>
                        </div>
                        <p className="text-gray-600 text-[11px] leading-relaxed italic">
                          &ldquo;{rev.ownerReply.text}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Date & Helpful button */}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-sans">
                    <div className="text-[11px] text-gray-500">
                      {rev.travelDate ? (
                        <>Traveled in <strong className="text-gray-700">{rev.travelDate}</strong></>
                      ) : (
                        <span className="text-emerald-800 font-medium">Kerala Tour Experience</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLike(rev.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                        isLiked
                          ? "bg-emerald-100 text-emerald-900"
                          : "text-gray-500 hover:text-emerald-800 hover:bg-gray-100"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isLiked ? "thumb_up" : "thumb_up_off_alt"}
                      </span>
                      <span>Helpful ({displayLikes})</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Booking Reassurance */}
        <div className="mt-12 text-center bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-900/50 shadow-lg">
          <div className="text-center sm:text-left">
            <h3 className="font-sans text-lg font-bold text-white mb-1">
              Ready to craft your own Kerala story?
            </h3>
            <p className="font-sans text-xs text-white/80">
              Connect directly with our Kerala travel experts for custom packages and instant WhatsApp quotes.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <a
              href="https://wa.me/919656464124?text=Hi%20Tripora!%20I%20would%20like%20to%20request%20a%20custom%20Kerala%20tour%20itinerary."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-full transition-all shadow-xs inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Request Custom Itinerary</span>
            </a>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-sans text-xs uppercase tracking-wider font-bold px-5 py-3 rounded-full border border-white/20 transition-colors"
            >
              Write a Review
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PHOTO LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[65vh] flex items-center justify-center">
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-300 font-bold text-xs uppercase tracking-widest flex items-center gap-1 z-10 cursor-pointer"
            >
              <span>Close</span>
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                fill
                src={activePhoto}
                alt="Traveler captured photograph"
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 85vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STREAMLINED "WRITE A REVIEW" MODAL (Zero Customer Burden) */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative my-8 animate-fade-in-up">
            
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 cursor-pointer w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            {submitSuccess ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-primary">
                  Review Posted!
                </h3>
                <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Thank you for sharing your experience! Your review is now published on our guest wall.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Thank you for choosing Tripora</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-emerald-800 font-sans text-[10px] uppercase tracking-widest font-bold">
                    30-SECOND REVIEW
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-primary mt-1">
                    How Was Your Trip?
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Leave a quick rating and comment about your Kerala experience.
                  </p>
                </div>

                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm flex-shrink-0">error</span>
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans text-xs">
                  
                  {/* Step 1: Star Rating */}
                  <div className="bg-surface p-4 rounded-2xl border border-emerald-900/10 text-center">
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                      Rate Your Experience
                    </label>
                    <div className="flex items-center justify-center gap-2 my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                          className="cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                        >
                          <span
                            className={`material-symbols-outlined !text-3xl ${
                              star <= (hoverRating || newReviewForm.rating)
                                ? "text-amber-400 fill-current drop-shadow-xs"
                                : "text-gray-300"
                            }`}
                          >
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="font-sans text-xs font-bold text-emerald-800 mt-1">
                      {getRatingLabel(hoverRating || newReviewForm.rating)}
                    </p>
                  </div>

                  {/* Step 2: Name & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={newReviewForm.name}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                        City (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bangalore"
                        value={newReviewForm.city}
                        onChange={(e) => setNewReviewForm({ ...newReviewForm, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                      />
                    </div>
                  </div>

                  {/* Step 3: Package Traveled */}
                  <CustomPackageSelect
                    value={newReviewForm.packageTitle}
                    onChange={(val) =>
                      setNewReviewForm({ ...newReviewForm, packageTitle: val })
                    }
                    label="Tour Package"
                  />

                  {/* Step 4: Review Comments */}
                  <div>
                    <label className="block font-bold text-primary mb-1 uppercase tracking-wider text-[9px]">
                      Your Review *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your experience (cab &amp; driver, hotels, houseboat, sightseeing, food...)"
                      value={newReviewForm.comment}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-700 text-xs bg-surface"
                    />
                  </div>

                  {/* Step 5: Optional Photos */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block font-bold text-primary uppercase tracking-wider text-[9px]">
                        Add Trip Photos (Optional)
                      </label>
                      <span className="text-[10px] text-gray-400">Up to 4 images</span>
                    </div>

                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-800/20 hover:bg-emerald-100 transition-colors font-bold text-[11px]">
                      <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                      <span>Attach Photos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Previews */}
                    {previewPhotos.length > 0 && (
                      <div className="flex gap-2 mt-2.5">
                        {previewPhotos.map((url, i) => (
                          <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-xs">
                            <Image fill src={url} alt="Uploaded preview" className="object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-800/60 text-white font-sans text-xs uppercase tracking-wider font-bold py-3.5 rounded-full transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Publishing Review...</span>
                        </>
                      ) : (
                        <>
                          <span>Post Review</span>
                          <span className="material-symbols-outlined text-sm">send</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
