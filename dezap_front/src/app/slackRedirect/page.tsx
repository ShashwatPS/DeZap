"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { URL } from "@/constants/url";
import { useAuth } from "@/context/AuthContext";

const SlackRedirect = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const getTokens = async (code: string, userToken: string) => {
    console.log(userToken)
    try {
      const data = await fetch(`${URL}/api/v1/user/slack/callback?code=${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": userToken,
        },
      });

      if (!data.ok) {
        const errorData = await data.json();
        throw new Error(errorData.message || "Failed to connect to Slack");
      }

      const dataToken = await data.json();
      console.log("Slack connection successful:", dataToken);
      router.push("/integration");
    } catch (error) {
      console.error("Error fetching slack tokens:", error);
      setError("Failed to connect to Slack");
      setTimeout(() => router.push("/integration"), 3000);
    }
  };

  const effectRan = useRef(false);
  

  useEffect(() => {
    if (!token) return; 
  
    if (effectRan.current) return;
    effectRan.current = true;
  
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
  
    if (code) {
      getTokens(code, token);
    } else {
      setError("No authorization code received from Slack");
      router.push("/integration");
    }
  }, [token, router]); 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          {error ? (
            <div className="text-red-500 mb-4">{error}</div>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Connecting to Slack...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlackRedirect;
