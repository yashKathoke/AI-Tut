import { Loader2 } from "lucide-react"

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-20 w-full animate-in fade-in duration-500">
      <div className="relative">
        {/* Decorative outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-50 opacity-20 scale-150"></div>
        <Loader2 className="text-blue-600 animate-spin" size={48} strokeWidth={2.5} />
      </div>
      <p className="mt-8 text-gray-400 font-black tracking-widest text-xs uppercase animate-pulse">
        Generating your guide...
      </p>
    </div>
  )
}
