"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  createdAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back button */}
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="p-8">
              {product.images.length > 0 ? (
                <div>
                  <div className="mb-4">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-4">
                      {product.images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`flex-1 ${
                            selectedImage === idx
                              ? "ring-2 ring-blue-500"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${idx + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500">
                  Added on {new Date(product.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section - Optional */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More Products
          </h2>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View all products →
          </Link>
        </div>
      </div>
    </div>
  );
}
