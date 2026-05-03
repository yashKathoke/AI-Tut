"use client"

import { useState } from "react"
import { GenerateRequestInput } from "@/lib/validation"
import { ChevronDown, Loader2, Sparkles, BookOpen } from "lucide-react"

interface InputFormProps {
  onSubmit: (data: GenerateRequestInput) => void
  isLoading: boolean
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [topic, setTopic] = useState("")
  const [grade, setGrade] = useState("6")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation before firing the request
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }

    onSubmit({ topic, grade })
  }

  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-[900] text-gray-900 tracking-tight mb-2">
            Learning Portal
          </h2>
          <p className="text-gray-500 font-medium">
            Generate high-quality study materials instantly.
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
          <BookOpen size={28} strokeWidth={2.5} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label htmlFor="topic" className="block text-sm font-extrabold text-gray-700 ml-1">
            WHAT DO YOU WANT TO LEARN?
          </label>
          <div className="relative group">
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How black holes work"
              // Custom focus ring using a mix of border and ring-shadow for that premium feel
              className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-gray-900 font-semibold placeholder:text-gray-400 focus:bg-white focus:border-blue-500/20 focus:ring-8 focus:ring-blue-500/5 outline-none transition-all"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-500 font-bold ml-1">{error}</p>}
        </div>

        <div className="space-y-3">
          <label htmlFor="grade" className="block text-sm font-extrabold text-gray-700 ml-1">
            TARGET GRADE LEVEL
          </label>
          <div className="relative">
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              // native select styling is tricky, so we hide the arrow and use a Lucide icon
              className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-gray-900 font-semibold appearance-none focus:bg-white focus:border-blue-500/20 focus:ring-8 focus:ring-blue-500/5 outline-none transition-all cursor-pointer"
              disabled={isLoading}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                <option key={g} value={g.toString()}>
                  Grade {g} Student
                </option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronDown size={22} strokeWidth={3} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300 overflow-hidden relative group"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={24} strokeWidth={3} />
                <span>SYNCING...</span>
              </>
            ) : (
              <>
                <Sparkles size={22} strokeWidth={3} />
                <span>GENERATE GUIDE</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  )
}
