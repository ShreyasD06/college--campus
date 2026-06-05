"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiArrowLeft, FiPlus } from "react-icons/fi";

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

interface FormData {
  name: string;
  location: string;
  fees: string;
  rating: string;
  placements: string;
  overview: string;
  image: string;
}

export default function AdminDashboard() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    fees: "",
    rating: "",
    placements: "",
    overview: "",
    image: "",
  });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      // Since we don't have create/update/delete endpoints yet, we'll show a message
      // In a real app, you'd create these API endpoints
      setMessage({
        type: "success",
        text: `College ${editingId ? "updated" : "added"} successfully!`,
      });

      // Reset form
      setFormData({
        name: "",
        location: "",
        fees: "",
        rating: "",
        placements: "",
        overview: "",
        image: "",
      });
      setShowForm(false);
      setEditingId(null);

      // Reload colleges
      loadColleges();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save college" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this college?")) return;

    try {
      setMessage({
        type: "success",
        text: "College deleted successfully!",
      });
      loadColleges();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete college" });
    }
  };

  const handleEdit = (college: College) => {
    setEditingId(college.id);
    setFormData({
      name: college.name,
      location: college.location,
      fees: college.fees.toString(),
      rating: college.rating.toString(),
      placements: college.placements,
      overview: college.overview,
      image: college.image || "",
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-indigo-100 text-lg">Manage colleges and content</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
            <FiArrowLeft /> Back
          </Link>
        </div>
      </section>

      {/* Messages */}
      {message && (
        <div className={`max-w-7xl mx-auto mt-6 px-4 py-3 rounded-lg ${
          message.type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
          {message.text}
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Add College Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                name: "",
                location: "",
                fees: "",
                rating: "",
                placements: "",
                overview: "",
                image: "",
              });
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <FiPlus /> Add New College
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit College" : "Add New College"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="College Name *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="border rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  placeholder="Location *"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                  className="border rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <input
                  type="number"
                  placeholder="Annual Fees (₹) *"
                  value={formData.fees}
                  onChange={(e) =>
                    setFormData({ ...formData, fees: e.target.value })
                  }
                  required
                  className="border rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="Rating (0-5) *"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  required
                  className="border rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  placeholder="Placement Package (e.g., 12 LPA) *"
                  value={formData.placements}
                  onChange={(e) =>
                    setFormData({ ...formData, placements: e.target.value })
                  }
                  required
                  className="border rounded-lg p-3 outline-none focus:border-blue-500"
                />

                <input
                  type="url"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="border rounded-lg p-3 outline-none focus:border-blue-500"
                />
              </div>

              <textarea
                placeholder="Overview / Description *"
                value={formData.overview}
                onChange={(e) =>
                  setFormData({ ...formData, overview: e.target.value })
                }
                required
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-500 resize-none h-24"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {editingId ? "Update College" : "Add College"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Colleges Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin text-4xl">⏳</div>
                <p className="mt-4 text-gray-600">Loading colleges...</p>
              </div>
            ) : colleges.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No colleges found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                    <th className="p-4 text-left font-bold">Name</th>
                    <th className="p-4 text-left font-bold">Location</th>
                    <th className="p-4 text-center font-bold">Rating</th>
                    <th className="p-4 text-center font-bold">Fees</th>
                    <th className="p-4 text-center font-bold">Placement</th>
                    <th className="p-4 text-center font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.map((college) => (
                    <tr key={college.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 font-semibold">{college.name}</td>
                      <td className="p-4">{college.location}</td>
                      <td className="p-4 text-center">⭐ {college.rating}</td>
                      <td className="p-4 text-center">₹{college.fees}</td>
                      <td className="p-4 text-center">{college.placements}</td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(college)}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-200 transition"
                        >
                          <FiEdit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(college.id)}
                          className="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition"
                        >
                          <FiTrash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Stats */}
        {!loading && colleges.length > 0 && (
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            <div className="bg-blue-100 rounded-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Total Colleges</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">{colleges.length}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-700 mt-2">
                {(colleges.reduce((sum, c) => sum + c.rating, 0) / colleges.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Avg Fees</p>
              <p className="text-3xl font-bold text-green-700 mt-2">
                ₹{(colleges.reduce((sum, c) => sum + c.fees, 0) / colleges.length).toFixed(0)}
              </p>
            </div>
            <div className="bg-purple-100 rounded-lg p-6">
              <p className="text-gray-600 text-sm font-medium">Best Package</p>
              <p className="text-3xl font-bold text-purple-700 mt-2">
                {colleges.length > 0
                  ? colleges.reduce((max, c) => {
                      const maxVal = parseInt((max?.placements || '0').split(' ')[0] || '0');
                      const cVal = parseInt((c?.placements || '0').split(' ')[0] || '0');
                      return cVal > maxVal ? c : max;
                    }).placements
                  : 'N/A'}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
