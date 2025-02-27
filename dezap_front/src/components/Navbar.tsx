"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    logout();
    router.push("/signin");
  };

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: "/zaps", label: "Zaps" },
    { href: "/integration", label: "Integrations" },
    { href: "/newTrigger", label: "Workflows" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href={isAuthenticated ? "/zaps" : "/"} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold text-gray-900">Dezap</span>
            </Link>
            
            {isAuthenticated && (
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActivePath(link.href)
                        ? "text-amber-500"
                        : "text-gray-600 hover:text-amber-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-amber-200 hover:text-amber-500 transition-all"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link 
                  href="/signin"
                  className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-sm font-medium text-white hover:bg-amber-400 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
