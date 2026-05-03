"use client"

import { useState } from "react"
import { Sparkles, Languages } from "lucide-react"

interface SummaryCardProps {
  summary: string
  simplified: string
}

export function SummaryCard({ summary, simplified }: SummaryCardProps) {
  const [isSimplified, setIsSimplified] = useState(false)

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Sparkles size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Lesson Overview</h3>
        </div>
        
        {/* Toggle between standard and simplified view */}
        <button
          onClick={() => setIsSimplified(!isSimplified)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold transition-all border border-transparent active:scale-95"
        >
          <Languages size={18} strokeWidth={2.5} />
          {isSimplified ? "SHOW DETAILED" : "EXPLAIN SIMPLY"}
        </button>
      </div>

      <div className="relative overflow-hidden min-h-[120px]">
        {/* Smooth transition between summaries */}
        <div className={`transition-all duration-500 transform ${isSimplified ? 'opacity-0 -translate-y-4 pointer-events-none absolute' : 'opacity-100 translate-y-0'}`}>
          <p className="text-gray-700 leading-relaxed font-medium text-lg">
            {summary}
          </p>
        </div>
        <div className={`transition-all duration-500 transform ${isSimplified ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
          <p className="text-blue-700 leading-relaxed font-bold text-lg bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
            {simplified}
          </p>
        </div>
      </div>
    </div>
  )
}
