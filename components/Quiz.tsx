"use client"

import { useState } from "react"
import { HelpCircle, Check, X, ArrowRight } from "lucide-react"
import { QuizQuestion } from "@/types"

interface QuizProps {
  questions: QuizQuestion[]
}

export function Quiz({ questions }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentIdx]

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (!selectedOption) return
    
    setIsAnswered(true)
    if (selectedOption === currentQuestion.correct_answer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    return (
      <div className="w-full max-w-2xl bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles size={40} strokeWidth={2.5} />
        </div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Quiz Complete!</h3>
        <p className="text-gray-500 font-bold text-lg mb-8">
          You scored <span className="text-blue-600 text-2xl px-2">{score}</span> out of {questions.length}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all active:scale-95"
        >
          TRY ANOTHER TOPIC
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <HelpCircle size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Quick Quiz</h3>
        </div>
        <span className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-black text-gray-500 tracking-widest uppercase">
          Question {currentIdx + 1} / {questions.length}
        </span>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-800 leading-snug">
          {currentQuestion.question}
        </h4>
      </div>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option) => {
          const isCorrect = option === currentQuestion.correct_answer
          const isSelected = option === selectedOption
          
          let stateStyles = "bg-gray-50 border-transparent text-gray-700 hover:bg-gray-100"
          
          if (isAnswered) {
            if (isCorrect) stateStyles = "bg-emerald-50 border-emerald-200 text-emerald-700"
            else if (isSelected) stateStyles = "bg-red-50 border-red-200 text-red-700"
            else stateStyles = "bg-gray-50 border-transparent text-gray-400 opacity-50"
          } else if (isSelected) {
            stateStyles = "bg-blue-50 border-blue-200 text-blue-700 ring-4 ring-blue-500/5"
          }

          return (
            <button
              key={option}
              disabled={isAnswered}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between group ${stateStyles}`}
            >
              <span>{option}</span>
              {isAnswered && isCorrect && <Check size={20} strokeWidth={3} className="text-emerald-600" />}
              {isAnswered && isSelected && !isCorrect && <X size={20} strokeWidth={3} className="text-red-600" />}
            </button>
          )
        })}
      </div>

      {!isAnswered ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all disabled:opacity-30 active:scale-[0.98]"
        >
          SUBMIT ANSWER
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {currentIdx < questions.length - 1 ? (
            <>
              NEXT QUESTION <ArrowRight size={20} strokeWidth={3} />
            </>
          ) : (
            "SEE RESULTS"
          )}
        </button>
      )}
    </div>
  )
}

// Minimal utility icons for result screen
function Sparkles({ size, strokeWidth }: { size: number, strokeWidth: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  )
}
