export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product listings will be added here */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">Products coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
