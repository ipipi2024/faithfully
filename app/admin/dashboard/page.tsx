"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    loading: true,
  });

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalProducts: data.data?.length || 0,
          loading: false,
        });
      })
      .catch(() => {
        setStats((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Products Card */}
        <div className="overflow-hidden shadow rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--primary)' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: 'var(--muted-foreground)' }}>
                    Total Products
                  </dt>
                  <dd className="text-3xl font-semibold" style={{ color: 'var(--foreground)' }}>
                    {stats.loading ? "..." : stats.totalProducts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="px-5 py-3" style={{ background: 'var(--muted)' }}>
            <Link
              href="/admin/dashboard/products"
              className="text-sm font-medium"
              style={{ color: 'var(--primary)' }}
            >
              View all
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>Quick Actions</h2>
        <div className="shadow rounded-lg p-6" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
          <Link
            href="/admin/dashboard/products/new"
            className="inline-flex items-center px-4 py-2 border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all"
            style={{ background: 'var(--primary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--primary)')}
          >
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
}
