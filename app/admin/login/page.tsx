"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ThemeToggle from "../../components/ThemeToggle";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <ThemeToggle />
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
        <div>
          <h2 className="text-center text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded text-sm" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none"
                style={{
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--card-border)',
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none"
                style={{
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--card-border)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{
              background: loading ? 'var(--secondary)' : 'var(--primary)',
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = 'var(--primary-hover)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = 'var(--primary)')}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
