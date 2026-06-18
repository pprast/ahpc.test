import type { ReactNode } from 'react'
import Header from './Header'

export default function PageLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {children}
      </main>
    </div>
  )
}
