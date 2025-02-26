"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb66_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb66_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-bl from-amber-500/5 via-white/0 to-transparent opacity-70" />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-medium mb-8 border border-amber-200">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Web3 Automation Platform
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1]">
              Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">blockchain</span> workflows seamlessly
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              Build powerful automation between Web3 and traditional services. 
              No-code platform for the decentralized future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
              <button className="px-8 py-4 rounded-lg bg-amber-500 text-white hover:bg-amber-400 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20" onClick={() => router.push("/signup")}>
                Start Free Trial
              </button>
              <button className="group px-8 py-4 rounded-lg bg-white backdrop-blur-sm border border-gray-200 text-gray-600 hover:border-amber-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                View Examples
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <div className="relative h-[500px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl transform rotate-2 opacity-70" />
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-gray-400 text-sm">Workflow Builder</div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center px-4">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 mr-3" />
                      <div className="text-gray-600 text-sm">ETH Smart Contract → Discord</div>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-amber-500 text-xs">ETH</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-gray-300 rounded mb-1"></div>
                          <div className="h-2 w-16 bg-gray-300/50 rounded"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-20 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                          <span className="text-amber-400 text-xs">event</span>
                        </div>
                        <div className="h-6 w-24 rounded bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Transfer()</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">→</div>
                      <div className="h-10 flex-1 rounded-lg bg-gray-100 border border-gray-200 flex items-center px-4">
                        <span className="text-gray-400 text-sm">Send Discord Message</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: "Smart Triggers",
              desc: "Connect smart contracts, wallets, and DeFi protocols. Trigger automations on any blockchain event.",
              icon: "⚡",
              highlight: "New",
              stats: "500k+ triggers"
            },
            {
              title: "Cross-Chain Ready",
              desc: "Seamlessly integrate with Ethereum, Solana, and more. One workflow, multiple chains.",
              icon: "🔗",
              highlight: "Popular",
              stats: "10+ chains"
            },
            {
              title: "No-Code Builder",
              desc: "Build complex Web3 automations with our visual editor. No coding required.",
              icon: "✨",
              highlight: "Beta",
              stats: "1000+ users"
            }
          ].map((feature, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-gray-50/80 backdrop-blur-xl border border-gray-200 hover:border-amber-200 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-100">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/10">
                  {feature.icon}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {feature.highlight}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {feature.desc}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">{feature.stats}</span>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </main>

      <footer className="border-t border-gray-200 mt-20 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-8">
              {["Documentation", "Templates", "API"].map((item, i) => (
                <a key={i} href="#" className="text-gray-600 hover:text-amber-600 text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 Dezap. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
