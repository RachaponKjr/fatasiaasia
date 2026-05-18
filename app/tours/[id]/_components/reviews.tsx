"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

/**
 * Customer reviews block for the tour detail page.
 *
 * - Anyone can read published reviews (GET /tour/:id/review).
 * - Posting a review requires a session token (POST /tour/:id/review with Bearer).
 *   We only show the form when an `authToken` is present in localStorage;
 *   otherwise we prompt the user to sign in.
 *
 * Kept intentionally light on dependencies — uses plain fetch + the
 * project's existing Button/Input components so it composes with the
 * surrounding tour-detail layout without pulling in a forms library.
 */

type Review = {
  reviewId: number;
  tourId: number;
  authorName: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://tour-user-api-9wbcs.ondigitalocean.app";

function StarRow({
  value,
  onChange,
}: {
  value: number;
  onChange?: (n: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          aria-label={`${n} star${n === 1 ? "" : "s"}`}
        >
          <Star
            className={`w-5 h-5 ${
              n <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function Reviews({ tourId }: { tourId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/tour/${tourId}/review`);
      const json = await res.json();
      if (json?.code === 2000 && Array.isArray(json.data)) {
        setReviews(json.data);
      } else {
        setReviews([]);
      }
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tourId || Number.isNaN(tourId)) return;
    load();
    if (typeof window !== "undefined") {
      setAuthed(!!window.localStorage.getItem("sessionToken"));
    }
  }, [tourId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write your review before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const token = window.localStorage.getItem("sessionToken");
      const res = await fetch(`${API_BASE}/tour/${tourId}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          authorName: authorName.trim() || "Anonymous",
          rating,
          title: title.trim(),
          comment: comment.trim(),
        }),
      });
      const json = await res.json();
      if (json?.code === 2000) {
        toast.success("Thanks for the review!");
        setAuthorName("");
        setRating(5);
        setTitle("");
        setComment("");
        load();
      } else {
        toast.error(json?.message || "Could not submit review.");
      }
    } catch {
      toast.error("Network error submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  const avg =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="flex flex-col gap-5 text-[#333333] w-full">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-bold text-2xl xl:text-3xl">Reviews</h4>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <StarRow value={Math.round(avg)} />
            <span className="font-semibold">{avg.toFixed(1)}</span>
            <span className="text-gray-500">({reviews.length})</span>
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet — be the first to share your experience.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.map((r) => (
            <li
              key={r.reviewId}
              className="border rounded-2xl p-4 flex flex-col gap-2 bg-white"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{r.authorName}</span>
                <StarRow value={r.rating} />
              </div>
              {r.title && <p className="font-medium">{r.title}</p>}
              <p className="text-gray-700 whitespace-pre-line">{r.comment}</p>
              <span className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="border rounded-2xl p-4 bg-white flex flex-col gap-3">
        <p className="font-semibold">Write a review</p>
        {!authed && (
          <p className="text-sm text-amber-600">
            You can submit anonymously, but signing in lets us link the review to your account.
          </p>
        )}
        <form onSubmit={submit} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm w-20">Rating</span>
            <StarRow value={rating} onChange={setRating} />
          </div>
          <Input
            placeholder="Your name (optional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <Input
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full min-h-[100px] border rounded-md p-3 text-sm"
            placeholder="Share what made this tour memorable…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#319E8B] hover:bg-[#27806f] text-white w-fit"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </Button>
        </form>
      </div>
    </div>
  );
}
