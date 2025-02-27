"use client"

import Link from "next/link";
import React, { useState } from "react";
import { URL } from "../../constants/url";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const [ email, setEmail ] = useState<string>("")  
  const [ password, setPassword ] = useState<string>("");
  const [ name, setName ] = useState<string>("");

  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const signUp = async(e: React.FormEvent) => { 
    e.preventDefault(); 

        const response = await fetch(`${URL}/api/v1/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: email,
            password,
            name
          })
        });

        if (!response.ok) {
          throw new Error(`Signup failed: ${response.status} ${response.statusText}`);
        }

        
        const data = await fetch(`${URL}/api/v1/user/signIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: email,
            password
          })
        });
    
        if (!data.ok) {
          throw new Error(`Signin failed: ${response.status} ${response.statusText}`);
        }
    
        const dataToken = await data.json();
        localStorage.setItem("token", dataToken.token);
        setIsAuthenticated(true);
        router.push("/");
        console.log("Signup successful:", data);
  }

  return (
    <div className="h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 flex">
      <div className="hidden lg:flex lg:w-1/2 relative p-12 items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb66_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb66_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 max-w-xl text-center">
          <div className="inline-flex items-center justify-center p-2 bg-amber-50 rounded-lg mb-6">
            <span className="text-amber-600 text-sm font-medium">🚀 No code automation</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Join the Next Generation</h1>
          <p className="text-gray-600 text-lg mb-8">Create your account and start building the future with Dezap.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="relative bg-gray-50 backdrop-blur-xl border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
              <p className="text-gray-600">Start your journey with Dezap</p>
            </div>

            <form className="space-y-4" onSubmit={signUp}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600" htmlFor="firstName">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="John"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600" htmlFor="lastName">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
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
                  className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity"
                type="submit"
              >
                Create account
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-amber-500 hover:text-amber-400 font-medium" onClick={() => router.push("/signin")}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
