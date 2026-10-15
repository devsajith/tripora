import { supabase, isSupabaseConfigured } from "./supabase";
import { initialReviews, ReviewItem } from "@/data/reviews";

export interface SupabaseReviewRow {
  id: string;
  author_name: string;
  author_city: string;
  rating: number;
  package_title: string;
  comment: string;
  photos?: string[];
  verified_booking: boolean;
  likes: number;
  status: "pending" | "approved" | "rejected";
  owner_reply_text?: string | null;
  owner_reply_at?: string | null;
  created_at: string;
}

export function formatTimeAgo(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    if (diffMonths < 12) return `${diffMonths} mo${diffMonths > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  } catch {
    return "Recently";
  }
}

export function mapRowToReviewItem(row: SupabaseReviewRow): ReviewItem {
  return {
    id: row.id,
    authorName: row.author_name,
    authorCity: row.author_city || "Verified Guest",
    rating: row.rating,
    packageTitle: row.package_title,
    comment: row.comment,
    photos: row.photos && row.photos.length > 0 ? row.photos : undefined,
    verifiedBooking: row.verified_booking ?? true,
    likes: row.likes ?? 1,
    createdAt: formatTimeAgo(row.created_at),
    travelDate: new Date(row.created_at).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    }),
    ownerReply: row.owner_reply_text
      ? {
          text: row.owner_reply_text,
          repliedAt: row.owner_reply_at || "Host response",
        }
      : undefined,
  };
}

/**
 * Fetch approved reviews from Supabase with graceful fallback
 */
export async function getApprovedReviews(): Promise<ReviewItem[]> {
  if (!isSupabaseConfigured) {
    return initialReviews;
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch reviews warning:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((row) => mapRowToReviewItem(row as SupabaseReviewRow));
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
}

/**
 * Upload an array of files to Supabase Storage 'review-photos' bucket
 */
export async function uploadReviewPhotos(files: File[]): Promise<string[]> {
  if (!isSupabaseConfigured || files.length === 0) return [];

  const uploadedUrls: string[] = [];

  for (const file of files) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `reviews/${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from("review-photos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from("review-photos")
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          uploadedUrls.push(publicData.publicUrl);
        }
      } else if (error) {
        console.warn("Photo upload warning:", error.message);
      }
    } catch (err) {
      console.error("Photo upload error:", err);
    }
  }

  return uploadedUrls;
}

/**
 * Insert a new review into Supabase
 */
export async function createReview(
  params: {
    authorName: string;
    authorCity?: string;
    rating: number;
    packageTitle: string;
    comment: string;
  },
  photoFiles?: File[]
): Promise<{ success: boolean; review?: ReviewItem; error?: string }> {
  try {
    let photoUrls: string[] = [];
    if (photoFiles && photoFiles.length > 0) {
      photoUrls = await uploadReviewPhotos(photoFiles);
    }

    if (!isSupabaseConfigured) {
      // Offline fallback: generate mock review item
      const mockItem: ReviewItem = {
        id: `offline-rev-${Date.now()}`,
        authorName: params.authorName,
        authorCity: params.authorCity?.trim() || "Verified Guest",
        rating: params.rating,
        packageTitle: params.packageTitle,
        comment: params.comment,
        photos: photoUrls.length > 0 ? photoUrls : undefined,
        verifiedBooking: true,
        likes: 1,
        createdAt: "Just now",
        ownerReply: {
          text: `Thank you ${params.authorName}! Our team at Tripora truly appreciates your review.`,
          repliedAt: "Host response",
        },
      };
      return { success: true, review: mockItem };
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          author_name: params.authorName,
          author_city: params.authorCity?.trim() || "Verified Guest",
          rating: params.rating,
          package_title: params.packageTitle,
          comment: params.comment,
          photos: photoUrls,
          verified_booking: true,
          status: "approved", // auto-publish, can be edited/unapproved in Supabase dashboard
          likes: 1,
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      review: mapRowToReviewItem(data as SupabaseReviewRow),
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit review" };
  }
}

/**
 * Increment likes counter in Supabase
 */
export async function likeReview(reviewId: string): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    // If it's a valid uuid (from Supabase)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(reviewId)) {
      const { data } = await supabase
        .from("reviews")
        .select("likes")
        .eq("id", reviewId)
        .single();

      if (data) {
        await supabase
          .from("reviews")
          .update({ likes: (data.likes || 0) + 1 })
          .eq("id", reviewId);
      }
    }
  } catch (err) {
    console.warn("Could not increment like in Supabase:", err);
  }
}
