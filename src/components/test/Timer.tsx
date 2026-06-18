import { useEffect, useState, useCallback } from 'react'
import { Badge } from '../ui/badge'
import { Clock } from 'lucide-react'

export default function Timer({ totalSeconds, onExpire }: { totalSeconds: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const expire = useCallback(onExpire, [onExpire])

  useEffect(() => {
    if (remaining <= 0) { expire(); return }
    const t = setInterval(() => setRemaining(r => r - 1), 1000)
    return () => clearInterval(t)
  }, [remaining, expire])

  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  const urgent = remaining < 60

  return (
    <Badge className={`text-sm px-3 py-1.5 gap-1.5 font-mono ${urgent ? 'bg-red-500 text-white animate-pulse' : 'bg-[#1E40AF] text-white'}`}>
      <Clock className="h-3.5 w-3.5" />
      {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </Badge>
  )
}
