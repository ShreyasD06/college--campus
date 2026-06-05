"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import {
  FiSearch,
  FiMapPin,
  FiDollarSign,
  FiStar,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";

async function getColleges(
  search = "",
  location = "",
  minRating = 0,
  maxFees = Infinity,
  sort = ""
) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (location) params.append("location", location);
  if (minRating > 0) params.append("minRating", minRating.toString());
  if (maxFees < Infinity) params.append("maxFees", maxFees.toString());
  if (sort) params.append("sort", sort);

  const res = await fetch(`/api/colleges?${params.toString()}`, {
    cache: "no-store",
  });

  return res.json();
}

async function getStats() {
  const colleges = await getColleges();
  if (colleges.length === 0)
    return {
      total: 0,
      avgRating: 0,
      maxPlacement: "0 LPA",
      avgFees: 0,
      locations: [],
    };

  const totalColleges = colleges.length;
  const avgRating = (
    colleges.reduce((sum: number, c: any) => sum + c.rating, 0) / totalColleges
  ).toFixed(1);
  const maxPlacement = colleges.reduce(
    (max: string, c: any) => {
      const maxVal = parseInt(max.split(' ')[0] || '0');
      const cVal = parseInt(c.placements.split(' ')[0] || '0');
      return cVal > maxVal ? c.placements : max;
    },
    '0 LPA'
  );
  const avgFees = (
    colleges.reduce((sum: number, c: any) => sum + c.fees, 0) / totalColleges
  ).toFixed(0);
  const locations = [...new Set(colleges.map((c: any) => c.location))];

  return {
    total: totalColleges,
    avgRating,
    maxPlacement,
    avgFees,
    locations,
  };
}

export default function Home() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getColleges(
          search,
          location,
          minRating ? parseFloat(minRating) : 0,
          maxFees ? parseFloat(maxFees) : Infinity,
          sort
        );
        const statsData = await getStats();
        setColleges(data);
        setStats(statsData);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, [search, location, minRating, maxFees, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            🧭 College Compass
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Find and compare engineering colleges. Make smarter decisions.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-lg max-w-2xl">
            <div className="flex gap-2 items-center">
              <FiSearch className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search colleges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {stats && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Quick Stats</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <StatCard
              icon={<FiBookOpen />}
              label="Total Colleges"
              value={stats.total}
              color="blue"
            />
            <StatCard
              icon={<FiStar />}
              label="Average Rating"
              value={`${stats.avgRating}/5`}
              color="yellow"
            />
            <StatCard
              icon={<FiAward />}
              label="Best Package"
              value={stats.maxPlacement}
              color="green"
            />
            <StatCard
              icon={<FiDollarSign />}
              label="Avg Fees"
              value={`₹${stats.avgFees}`}
              color="purple"
            />
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md mx-4 my-8">
        <h2 className="text-2xl font-bold mb-4">Filters & Sorting</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {stats?.locations && stats.locations.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
              >
                <option value="">All Locations</option>
                {stats.locations.map((loc: string) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Min Rating
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="0.0"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Max Fees</label>
            <input
              type="number"
              placeholder="₹"
              value={maxFees}
              onChange={(e) => setMaxFees(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
            >
              <option value="">Default</option>
              <option value="ratingDesc">Highest Rating</option>
              <option value="feesAsc">Lowest Fees</option>
              <option value="placementDesc">Best Placement</option>
            </select>
          </div>
        </div>
      </section>

      {/* Colleges Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Featured Colleges ({colleges.length})
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">⏳</div>
            <p className="mt-4 text-gray-600">Loading colleges...</p>
          </div>
        ) : colleges.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No colleges found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <Link key={college.id} href={`/college/${college.id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition h-full overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                    {college.image ? (
                      <img
                        src={college.image}
                        alt={college.name}
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold flex-1">{college.name}</h3>
                      <div className="bg-yellow-100 px-2 py-1 rounded text-sm font-bold text-yellow-800">
                        ⭐ {college.rating}
                      </div>
                    </div>

                    <p className="text-gray-600 flex items-center gap-1 mb-2">
                      <FiMapPin size={16} />
                      {college.location}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                      <p className="flex items-center gap-1">
                        <FiDollarSign size={14} />
                        ₹{college.fees}
                      </p>
                      <p className="flex items-center gap-1">
                        <FiAward size={14} />
                        {college.placements}
                      </p>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                      {college.overview}
                    </p>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore more?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Compare colleges side by side or save your favorites
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/compare"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Compare Colleges
            </Link>
            <Link
              href="/favorites"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              View Favorites ❤️
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}