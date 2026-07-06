export default function ProductError({ message }: { message?: string }) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border shadow-sm p-8">
      <div className="text-red-500 text-4xl mb-3">⚠️</div>
      <h3 className="text-lg font-bold text-slate-900">Failed to Load Products</h3>
      <p className="text-gray-500 max-w-sm mx-auto mt-1 text-sm">
        {message || "Platzi API Error"}
      </p>
    </div>
  );
}