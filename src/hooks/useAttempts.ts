import { useEffect, useState } from 'react'
import { db } from '../lib/db'
import { useAuthStore } from '../store/authStore'
import type { Attempt } from '../types'

export function useAttempts() {
  const user = useAuthStore(s => s.user)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    setAttempts(db.getAttemptsByStudent(user.id))
    setLoading(false)
  }, [user?.id])

  return { attempts, loading }
}
