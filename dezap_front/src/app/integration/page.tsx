"use client";

import redirectToSlack from "@/constants/SlackAuth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const integrations = [
  {
    name: "Slack",
    description: "Connect with Slack to send messages and notifications",
    icon: "https://w7.pngwing.com/pngs/345/302/png-transparent-chat-slack-slack-logo-social-media-icon-thumbnail.png",
    action: redirectToSlack,
    connected: false,
  },
  {
    name: "Gmail",
    description: "Connect with Gmail to send and receive emails",
    icon: "https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp",
    action: () => console.log("Gmail integration coming soon"),
    connected: false,
    comingSoon: true,
  },
  {
    name: "GitHub",
    description: "Connect with GitHub to automate your workflow",
    icon: "https://img.icons8.com/ios_filled/512/github.png",
    action: () => console.log("GitHub integration coming soon"),
    connected: false,
    comingSoon: true,
  }
];

export default function Integration() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link 
            href="/zaps"
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className={`bg-white rounded-xl border border-gray-200 p-6 hover:border-amber-200 transition-all ${
                integration.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                  <img
                    src={integration.icon}
                    alt={`${integration.name} icon`}
                    className="w-8 h-8"
                  />
                </div>
                {integration.connected && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Connected
                  </span>
                )}
                {integration.comingSoon && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {integration.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {integration.description}
              </p>
              <button
                onClick={integration.action}
                disabled={integration.comingSoon}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  integration.comingSoon
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-amber-500 text-white hover:bg-amber-400'
                }`}
              >
                {integration.connected ? 'Manage Connection' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}