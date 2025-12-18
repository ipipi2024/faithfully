"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <p style={{ color: 'var(--muted-foreground)' }}>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <ThemeToggle />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--foreground)' }}>Our Products</h1>

        {products.length === 0 ? (
          <div className="rounded-lg shadow-md p-12 text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
              >
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{product.name}</h2>
                  <p className="line-clamp-3" style={{ color: 'var(--muted-foreground)' }}>{product.description}</p>
                  <p className="mt-4 font-medium" style={{ color: 'var(--primary)' }}>View details →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
