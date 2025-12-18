"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <p style={{ color: 'var(--muted-foreground)' }}>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--background)' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Product Not Found</h1>
        <Link
          href="/products"
          className="underline"
          style={{ color: 'var(--primary)' }}
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <ThemeToggle />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back button */}
        <Link
          href="/products"
          className="inline-flex items-center mb-8"
          style={{ color: 'var(--primary)' }}
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

        <div className="rounded-lg shadow-lg overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
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
                              ? "opacity-100"
                              : "opacity-60 hover:opacity-100"
                          }`}
                          style={selectedImage === idx ? { outline: `2px solid var(--primary)` } : {}}
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
                <div className="w-full h-96 rounded-lg flex items-center justify-center" style={{ background: 'var(--muted)' }}>
                  <p style={{ color: 'var(--muted-foreground)' }}>No image available</p>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                {product.name}
              </h1>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  Description
                </h2>
                <p className="leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--muted-foreground)' }}>
                  {product.description}
                </p>
              </div>

              <div className="pt-6" style={{ borderTop: '1px solid var(--card-border)' }}>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
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
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            More Products
          </h2>
          <Link
            href="/products"
            className="underline"
            style={{ color: 'var(--primary)' }}
          >
            View all products →
          </Link>
        </div>
      </div>
    </div>
  );
}
