import { useEffect, useState } from 'react'
import { db } from '../lib/db'
import { useAuthStore } from '../store/authStore'
import type { Certificate } from '../types'

export function useCertificates() {
  const user = useAuthStore(s => s.user)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    setCertificates(db.getCertificatesByStudent(user.id))
    setLoading(false)
  }, [user?.id])

  return { certificates, loading }
}
