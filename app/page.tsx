"use client"

import { useState } from "react"
import { useEffect } from "react"
import { InputForm } from "@/components/InputForm"
import { SummaryCard } from "@/components/SummaryCard"
import { KeyPoints } from "@/components/KeyPoints"
import { Quiz } from "@/components/Quiz"
import { Loader } from "@/components/Loader"
import { RecentSearches } from "@/components/RecentSearches"
import { GenerateResponse, GenerateRequestInput } from "@/types"
import { getHistory, saveToHistory, HistoryItem } from "@/lib/storage"

export default function Home() {
  const [data, setData] = useState<GenerateResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleGenerate = async (input: GenerateRequestInput) => {
    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Generation failed")
      }

      const result = await response.json()
      setData(result)
      
      // Save full result to history
      saveToHistory(input, result)
      setHistory(getHistory())
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleHistorySelect = (item: HistoryItem) => {
    setData(item.output)
    // Optional: could also set the form state if needed
  }

  return (
    <main className="min-h-screen py-12 px-6 flex flex-col items-center gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          AI Tutor
        </h1>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        
        {!isLoading && !data && (
          <RecentSearches history={history} onSelect={handleHistorySelect} />
        )}
      </div>

      {error && (
        <div className="w-full max-w-xl p-6 bg-red-50 text-red-700 rounded-3xl font-bold text-center">
          {error}
        </div>
      )}

      {/* Single column results for maximum simplicity */}
      {(isLoading || data) && (
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isLoading ? (
            <Loader />
          ) : data && (
            <>
              <SummaryCard 
                summary={data.summary} 
                simplified={data.simplified_summary} 
              />
              <KeyPoints points={data.key_points} />
              <Quiz questions={data.quiz} />
            </>
          )}
        </div>
      )}
    </main>
  )
}
