"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMapPin, FiDollarSign, FiAward, FiArrowLeft } from "react-icons/fi";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: string;
  overview: string;
  image?: string;
}

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [college, setCollege] = useState<College | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedColleges, setRelatedColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState({ name: "", comment: "", rating: 5 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const getParams = async () => {
      const p = await params;
      setId(p.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        // Fetch college details
        const collegeRes = await fetch(`/api/colleges?search=`);
        const allColleges: College[] = await collegeRes.json();
        const current = allColleges.find((c) => c.id === id);
        if (current) {
          setCollege(current);

          // Load reviews
          const reviewsRes = await fetch(`/api/reviews?collegeId=${id}`);
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);

          // Load related colleges (same location, excluding current)
          const related = allColleges.filter(
            (c) => c.location === current.location && c.id !== id
          );
          setRelatedColleges(related.slice(0, 3));
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: parseFloat(formData.rating.toString()),
          collegeId: id,
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setFormData({ name: "", comment: "", rating: 5 });
        alert("Review added successfully!");
      }
    } catch (error) {
      alert("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin text-4xl">⏳</div>
        <p className="mt-4 text-gray-600">Loading college details...</p>
      </div>
    );

  if (!college)
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-4xl font-bold mb-4">College Not Found</h1>
        <Link href="/" className="text-blue-600 font-semibold">
          ← Back to Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
          <FiArrowLeft /> Back
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="h-80 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
        {college.image ? (
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-8xl">
            🎓
          </div>
        )}
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 pb-12">
        {/* Title and Info Cards */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold">{college.name}</h1>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-3xl font-bold text-yellow-800">⭐ {college.rating}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Placement</p>
              <p className="text-2xl font-bold text-green-800">{college.placements}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Fees</p>
              <p className="text-2xl font-bold text-blue-800">₹{college.fees}</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-3 gap-4 text-lg">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-blue-600" /> {college.location}
            </p>
            <p className="flex items-center gap-2">
              <FiDollarSign className="text-green-600" />
              Annual Fees: ₹{college.fees}
            </p>
            <p className="flex items-center gap-2">
              <FiAward className="text-yellow-600" />
              Package: {college.placements}
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{college.overview}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>

            {/* Add Review Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Add Your Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Your Review"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg p-3 outline-none focus:border-blue-500 resize-none h-24"
                />
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {"⭐".repeat(r)} {r}/5
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">{review.name}</h4>
                      <span className="text-sm">
                        {"⭐".repeat(Math.round(review.rating))} {review.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Colleges */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Other Colleges in {college.location}</h2>
            {relatedColleges.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <p className="text-gray-600">No other colleges in this location</p>
              </div>
            ) : (
              <div className="space-y-4">
                {relatedColleges.map((related) => (
                  <Link key={related.id} href={`/college/${related.id}`}>
                    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                      <h3 className="font-bold text-lg mb-2">{related.name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p>⭐ {related.rating}</p>
                        <p>₹{related.fees}</p>
                        <p>{related.placements}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}