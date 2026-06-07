"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [colleges, setColleges] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    location: "",
    fees: "",
    rating: "",
    placements: "",
    overview: "",
    image: "",
  });

  async function loadColleges() {
    try {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data);
    } catch (error) {
      console.error("Error loading colleges:", error);
    }
  }

  useEffect(() => {
    loadColleges();
  }, []);

  async function addCollege(e) {
    e.preventDefault();

    try {
      let res;

      if (form.id) {
        res = await fetch(`/api/admin/colleges/${form.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            location: form.location,
            fees: Number(form.fees),
            rating: Number(form.rating),
            placements: form.placements,
            overview: form.overview,
            image: form.image,
          }),
        });
      } else {
        res = await fetch("/api/admin/colleges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            location: form.location,
            fees: Number(form.fees),
            rating: Number(form.rating),
            placements: form.placements,
            overview: form.overview,
            image: form.image,
          }),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to save college");
      }

      setForm({
        id: "",
        name: "",
        location: "",
        fees: "",
        rating: "",
        placements: "",
        overview: "",
        image: "",
      });

      loadColleges();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function deleteCollege(id) {
    if (!confirm("Delete this college?")) return;

    try {
      const res = await fetch(`/api/admin/colleges/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      loadColleges();
    } catch (error) {
      console.error(error);
      alert("Could not delete college");
    }
  }

  function editCollege(college) {
    setForm({
      id: college.id,
      name: college.name,
      location: college.location,
      fees: String(college.fees),
      rating: String(college.rating),
      placements: college.placements,
      overview: college.overview,
      image: college.image || "",
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <form
        onSubmit={addCollege}
        className="bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {form.id ? "Edit College" : "Add New College"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="College Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            required
          />

          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Fees"
            value={form.fees}
            onChange={(e) =>
              setForm({ ...form, fees: e.target.value })
            }
            required
          />

          <input
            type="number"
            step="0.1"
            className="border p-2 rounded"
            placeholder="Rating"
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: e.target.value })
            }
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Placements"
            value={form.placements}
            onChange={(e) =>
              setForm({
                ...form,
                placements: e.target.value,
              })
            }
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />
        </div>

        <textarea
          className="border p-2 rounded w-full mt-4"
          rows="4"
          placeholder="Overview"
          value={form.overview}
          onChange={(e) =>
            setForm({
              ...form,
              overview: e.target.value,
            })
          }
          required
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {form.id ? "Update College" : "Add College"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Fees</th>
              <th className="p-3 border">Rating</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td className="p-3 border">
                  {college.name}
                </td>

                <td className="p-3 border">
                  {college.location}
                </td>

                <td className="p-3 border">
                  ₹{college.fees.toLocaleString()}
                </td>

                <td className="p-3 border">
                  ⭐ {college.rating}
                </td>

                <td className="p-3 border">
                  <button
                    onClick={() => editCollege(college)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCollege(college.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}