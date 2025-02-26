"use client";

import { useEffect, useState } from "react";
import { URL } from "../../../constants/url";
import { ArrowLeft, Webhook, Calendar } from "lucide-react";
import Link from "next/link";

export default function ZapDetailPage({ params }: { params: { id: string } }) {
  const [zap, setZap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZapDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${URL}:3000/api/v1/zap/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Zap not found');
        }

        const data = await response.json();
        if (!data.zap) {
          throw new Error('Zap not found');
        }
        setZap(data.zap);
      } catch (error) {
        console.error("Error fetching zap details:", error);
        setError(error instanceof Error ? error.message : "Failed to load zap details");
      } finally {
        setLoading(false);
      }
    };

    fetchZapDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading zap details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !zap) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/zaps"
            className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Zaps
          </Link>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error || "Zap not found"}
            </h3>
            <p className="text-gray-500 mb-6">
              The zap you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link
              href="/zaps"
              className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-colors"
            >
              View All Zaps
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/zaps"
          className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Zaps
        </Link>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{zap.name}</h1>
            <div className="flex items-center gap-2">
              {zap.trigger.type.name === "Webhook" ? (
                <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Webhook className="w-4 h-4 mr-1" />
                  Webhook ID: {zap.trigger.zapId}
                </div>
              ) : (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created {new Date(zap.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={zap.trigger.type.image}
                alt={zap.trigger.type.name}
                className="w-8 h-8"
              />
              <div>
                <h3 className="font-medium text-gray-900">Trigger</h3>
                <p className="text-gray-500">{zap.trigger.type.name}</p>
              </div>
            </div>

            {zap.actions.map((action: any, index: number) => (
              <div
                key={action.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={action.type.image}
                  alt={action.type.name}
                  className="w-8 h-8"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Action {index + 1}
                  </h3>
                  <p className="text-gray-500">{action.type.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
