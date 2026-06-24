import { useEffect, useState } from 'react'
import { db } from '../lib/db'
import type { Test } from '../types'

export function useTests(activeOnly = true) {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTests(db.getTests(activeOnly))
    setLoading(false)
  }, [activeOnly])

  return { tests, loading }
}
