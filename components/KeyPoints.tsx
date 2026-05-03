import { CheckCircle2 } from "lucide-react"

interface KeyPointsProps {
  points: string[]
}

export function KeyPoints({ points }: KeyPointsProps) {
  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <CheckCircle2 size={22} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Key Takeaways</h3>
      </div>

      <ul className="space-y-4">
        {points.map((point, index) => (
          <li 
            key={index}
            className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-emerald-100/50"
          >
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full text-sm font-black">
              {index + 1}
            </span>
            <p className="text-gray-700 font-semibold leading-relaxed">
              {point}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
