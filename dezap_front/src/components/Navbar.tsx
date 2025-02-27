"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold text-gray-900">Dezap</span>
            </Link>
            {isAuthenticated && (
              <Link 
                href="/newTrigger"
                className="text-gray-600 hover:text-amber-500 transition-colors"
              >
                Workflows
              </Link>
            )}
             {isAuthenticated && (
              <Link 
                href="/zaps"
                className="text-gray-600 hover:text-amber-500 transition-colors"
              >
                Zaps
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-amber-200 hover:text-amber-500 transition-all"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link 
                  href="/signin"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-colors"
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
