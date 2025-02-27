"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { URL } from "../../constants/url";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const signin = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const response = await fetch(`${URL}/api/v1/user/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password
      })
    });

    if (!response.ok) {
      throw new Error(`Signin failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setIsAuthenticated(true);
    router.push("/");
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 flex">
      
      <div className="hidden lg:flex lg:w-1/2 relative p-12 items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb66_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb66_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 max-w-xl text-center">
          <div className="inline-flex items-center justify-center p-2 bg-amber-50 rounded-lg mb-6">
            <span className="text-amber-600 text-sm font-medium">🚀 No code automation</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Build Something People Want</h1>
          <p className="text-gray-600 text-lg mb-8">Join thousands of founders who are building the next big thing with Dezap.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl transform rotate-1 opacity-70" />
            <div className="relative bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-gray-600">Sign in to your Dezap account</p>
              </div>

              <form className="space-y-4" onSubmit={signin}>
                <div>
                  <label className="text-sm font-medium text-gray-600" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-200 bg-white text-amber-500 focus:ring-amber-500/20" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity"
                >
                  Sign in
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-medium" onClick={() => router.push("/signup")}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}