"use client";

import { useEffect, useState } from "react";
import { URL, WEBHOOK_URL } from "../../constants/url";
import { Box, PlayCircle, PauseCircle, Webhook, Calendar, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface TriggerType {
  id: string;
  name: string;
  image: string;
}

interface Trigger {
  id: string;
  type: TriggerType;
  zapId: string;
}

interface ActionType {
  id: string;
  name: string;
  image: string;
}

interface Action {
  id: string;
  type: ActionType;
}

interface Zap {
  id: string;
  name: string;
  active: boolean;
  trigger: Trigger;
  actions: Action[];
  createdAt: string;
}

export default function ZapsPage() {
  const [zaps, setZaps] = useState<Zap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZaps = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log("token", token);
        const response = await fetch(`${URL}/api/v1/zap`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        console.log("data", data);
        setZaps(data.zaps || []);
      } catch (error) {
        console.error("Error fetching zaps:", error);
        setError("Failed to load zaps");
      } finally {
        setLoading(false);
      }
    };

    fetchZaps();
    console.log("fetching zaps");
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your zaps...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const toggleZapStatus = async (zapId: string, currentStatus: boolean) => {
    // Implement toggle functionality
    console.log("Toggling zap status:", zapId, !currentStatus);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-gray-900">Your Zaps</h1>
          <Link
            href="/newTrigger"
            className="px-6 py-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-colors font-medium"
          >
            Create Zap
          </Link>
        </div>

        <div className="grid gap-4">
          {zaps.map((zap) => (
            <div
              key={zap.id}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-amber-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={zap.trigger.type.image}
                          alt={zap.trigger.type.name}
                          className="w-6 h-6"
                        />
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                      {zap.actions.map((action, index) => (
                        <div key={action.id} className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <img
                              src={action.type.image}
                              alt={action.type.name}
                              className="w-6 h-6"
                            />
                          </div>
                          {index < zap.actions.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-500 transition-colors">
                        {zap.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {formatDate(zap.createdAt)}
                    </div>
                    {zap.trigger.type.name === "Webhook" && (
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                        <Webhook className="w-4 h-4" />
                        <span className="font-mono text-xs">
                          {`${WEBHOOK_URL}/hooks/catch/1/${zap.trigger.zapId}`}
                        </span>
                        <button
                          onClick={() => navigator.clipboard.writeText(`${URL}/api/v1/zap/1/${zap.trigger.zapId}`)}
                          className="text-amber-500 hover:text-amber-600"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/zaps/${zap.id}`}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-amber-500"
                  >
                    <Box className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleZapStatus(zap.id, zap.active);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      zap.active 
                        ? "bg-amber-50 text-amber-500" 
                        : "hover:bg-gray-100 text-gray-400"
                    }`}
                  >
                    {zap.active ? (
                      <PauseCircle className="w-5 h-5" />
                    ) : (
                      <PlayCircle className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {zaps.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Zaps Yet</h3>
            <p className="text-gray-500 mb-6">Create your first automation to get started</p>
            <Link
              href="/newTrigger"
              className="px-6 py-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-colors font-medium"
            >
              Create Your First Zap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
