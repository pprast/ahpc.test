import { useEffect } from 'react'
import Router from './router'
import { useAuthStore } from './store/authStore'
import './index.css'

export default function App() {
  const { loadSession, isLoading } = useAuthStore()

  useEffect(() => {
    loadSession()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Загрузка...</p>
        </div>
      </div>
    )
  }

  return <Router />
}
