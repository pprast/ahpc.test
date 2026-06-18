import { useEffect, useState, useCallback } from 'react'
import { Clock } from 'lucide-react'

export default function Timer({ totalSeconds, onExpire }: { totalSeconds: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const expire = useCallback(onExpire, [])

  useEffect(() => {
    if (remaining <= 0) { expire(); return }
    const t = setInterval(() => setRemaining(r => r - 1), 1000)
    return () => clearInterval(t)
  }, [remaining, expire])

  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  const urgent = remaining < 60

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
      urgent
        ? 'border-[#C8190A] bg-[#FEF2F2] text-[#C8190A]'
        : 'border-[#DDE1E7] bg-white text-[#111827]'
    }`}>
      <Clock className="h-3.5 w-3.5" />
      <span className={`font-mono text-sm font-bold ${urgent ? 'animate-pulse' : ''}`}>
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </span>
    </div>
  )
}
