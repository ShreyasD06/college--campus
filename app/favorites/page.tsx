"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiTrash2, FiMapPin, FiDollarSign, FiAward } from "react-icons/fi";

interface Favorite {
  id: string;
  college: {
    id: string;
    name: string;
    location: string;
    fees: number;
    rating: number;
    placements: string;
    overview: string;
    image?: string;
  };
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await fetch("/api/favorites");
        const data = await res.json();
        setFavorites(data);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    try {
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      alert("Failed to remove favorite");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">❤️ My Favorite Colleges</h1>
          <p className="text-red-100 text-lg">
            {favorites.length} {favorites.length === 1 ? "college" : "colleges"} saved
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <p className="mt-4 text-gray-600">Loading favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-bold mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Start saving colleges to compare and shortlist them later.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Explore Colleges
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-red-400 to-red-600 overflow-hidden">
                  {favorite.college.image ? (
                    <img
                      src={favorite.college.image}
                      alt={favorite.college.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                      🎓
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold flex-1">
                      {favorite.college.name}
                    </h3>
                    <div className="bg-yellow-100 px-2 py-1 rounded text-sm font-bold text-yellow-800">
                      ⭐ {favorite.college.rating}
                    </div>
                  </div>

                  <p className="text-gray-600 flex items-center gap-1 mb-2">
                    <FiMapPin size={16} />
                    {favorite.college.location}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <p className="flex items-center gap-1">
                      <FiDollarSign size={14} />₹{favorite.college.fees}
                    </p>
                    <p className="flex items-center gap-1">
                      <FiAward size={14} />
                      {favorite.college.placements}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                    {favorite.college.overview}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/college/${favorite.college.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-center text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
                      aria-label="Remove favorite"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Links */}
        {favorites.length > 0 && (
          <div className="mt-12 text-center space-y-4">
            <Link
              href="/compare"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Compare Selected Colleges
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
