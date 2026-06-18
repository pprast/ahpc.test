import type { ReactNode } from 'react'
import Header from './Header'

export default function PageLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main className={`max-w-6xl mx-auto px-5 py-8 ${className}`}>
        {children}
      </main>
    </div>
  )
}
