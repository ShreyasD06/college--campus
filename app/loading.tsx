export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl animate-spin mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
        <p className="text-gray-600 mt-2">Please wait while we fetch the content</p>
      </div>
    </div>
  );
}
