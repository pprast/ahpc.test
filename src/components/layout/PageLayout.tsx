import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useAuthStore } from '../../store/authStore'

export default function PageLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  const user = useAuthStore(s => s.user)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <div className="flex gap-8">
            <Sidebar />
            <main className={`flex-1 min-w-0 ${className}`}>
              {children}
            </main>
          </div>
        ) : (
          <main className={`${className}`}>{children}</main>
        )}
      </div>
    </div>
  )
}
