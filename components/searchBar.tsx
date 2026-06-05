"use client";

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    window.location.href = `/?search=${search}`;
  };

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="Search colleges..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-80"
      />

      <button
        onClick={handleSearch}
        className="border px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}