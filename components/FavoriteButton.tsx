"use client";

export default function FavoriteButton({
  collegeId,
}: {
  collegeId: string;
}) {
  async function addFavorite() {
    await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeId,
      }),
    });

    alert("Added to favorites ❤️");
  }

  return (
    <button
      onClick={addFavorite}
      className="mt-3 bg-red-500 text-white px-3 py-2 rounded"
    >
      ❤️ Save Favorite
    </button>
  );
}