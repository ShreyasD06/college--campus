"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

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

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(data.sort((a: College, b: College) => b.rating - a.rating));
      } finally {
        setLoading(false);
      }
    };

    loadColleges();
  }, []);

  const highestRated = colleges[0] || null;
  const bestPlacement = colleges.length > 0 ? colleges.reduce((max, c) =>
    parseInt(c.placements) > parseInt(max.placements) ? c : max
  ) : null;
  const lowestFees = colleges.length > 0 ? colleges.reduce((min, c) =>
    c.fees < min.fees ? c : min
  ) : null;

  if (loading)
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin text-4xl">⏳</div>
        <p className="mt-4 text-gray-600">Loading colleges...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">Compare Colleges</h1>
          <p className="text-purple-100 text-lg">
            Compare fees, ratings, and placements side by side
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm font-medium">Total Colleges</p>
            <p className="text-3xl font-bold mt-2">{colleges.length}</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm font-medium">Highest Rated</p>
            <p className="text-2xl font-bold mt-2">{highestRated?.name}</p>
            <p className="text-yellow-700 font-bold">⭐ {highestRated?.rating}</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm font-medium">Best Placement</p>
            <p className="text-2xl font-bold mt-2">{bestPlacement?.name}</p>
            <p className="text-green-700 font-bold">🎓 {bestPlacement?.placements}</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-md">
            <p className="text-gray-600 text-sm font-medium">Lowest Fees</p>
            <p className="text-2xl font-bold mt-2">{lowestFees?.name}</p>
            <p className="text-blue-700 font-bold">₹{lowestFees?.fees}</p>
          </div>
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <th className="p-4 text-left font-bold">College</th>
                  <th className="p-4 text-left font-bold">Location</th>
                  <th className="p-4 text-center font-bold">Rating</th>
                  <th className="p-4 text-center font-bold">Fees</th>
                  <th className="p-4 text-center font-bold">Placement</th>
                  <th className="p-4 text-center font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr
                    key={college.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      college.id === highestRated?.id ? "bg-yellow-50" : ""
                    } ${college.id === bestPlacement?.id ? "bg-green-50" : ""} ${
                      college.id === lowestFees?.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="p-4 font-bold">{college.name}</td>
                    <td className="p-4">{college.location}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full font-bold ${
                          college.id === highestRated?.id
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-100"
                        }`}
                      >
                        ⭐ {college.rating}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full font-bold ${
                          college.id === lowestFees?.id
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-100"
                        }`}
                      >
                        ₹{college.fees}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full font-bold ${
                          college.id === bestPlacement?.id
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-100"
                        }`}
                      >
                        {college.placements}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/college/${college.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {colleges.map((college) => (
            <Link key={college.id} href={`/college/${college.id}`}>
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
                    {college.image ? (
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      "🎓"
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{college.name}</h3>
                    <p className="text-gray-600 text-sm">📍 {college.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-yellow-100 p-2 rounded">
                    <p className="text-xs text-gray-600">Rating</p>
                    <p className="font-bold">⭐ {college.rating}</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded">
                    <p className="text-xs text-gray-600">Fees</p>
                    <p className="font-bold">₹{college.fees}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded">
                    <p className="text-xs text-gray-600">Package</p>
                    <p className="font-bold">{college.placements}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
        >
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}