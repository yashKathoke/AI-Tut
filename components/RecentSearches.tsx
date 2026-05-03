"use client"

import { HistoryItem } from "@/lib/storage"
import { History, Zap } from "lucide-react"

interface RecentSearchesProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

export function RecentSearches({ history, onSelect }: RecentSearchesProps) {
  if (history.length === 0) return null

  return (
    <div className="w-full max-w-xl animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center gap-2 mb-4 ml-1">
        <History size={16} className="text-gray-400" />
        <span className="text-xs font-black text-gray-400 tracking-widest uppercase">
          Stored Knowledge
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {history.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(item)}
            className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95 group shadow-sm shadow-black/5"
          >
            <Zap size={14} className="text-amber-400 fill-amber-400" />
            <span>{item.input.topic}</span>
            <span className="text-xs text-gray-300 font-medium group-hover:text-blue-300">
              Grade {item.input.grade}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
