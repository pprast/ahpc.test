import type { ReactNode } from 'react'
import { Card, CardContent } from '../ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  iconBg?: string
  subtitle?: string
}

export default function StatsCard({ title, value, icon, iconBg = 'bg-blue-50 text-blue-600', subtitle }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-xl ${iconBg}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
