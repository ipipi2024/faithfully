"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/dashboard/products" },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <ThemeToggle />
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64" style={{ background: 'var(--card-bg)', borderRight: '1px solid var(--card-border)' }}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-4" style={{ background: 'var(--muted)', borderBottom: '1px solid var(--card-border)' }}>
            <h1 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm rounded-md transition-colors"
                  style={{
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--foreground)',
                  }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = 'var(--muted)')}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4" style={{ borderTop: '1px solid var(--card-border)' }}>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>{session?.user?.name}</p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="text-sm transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <div className="py-6 px-8">{children}</div>
      </div>
    </div>
  );
}
