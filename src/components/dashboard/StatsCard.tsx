interface StatsCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

export default function StatsCard({ label, value, sub, accent }: StatsCardProps) {
  return (
    <div className="bg-white border border-[#DDE1E7] rounded-lg p-5">
      <p className="text-xs font-sans text-[#9CA3AF] uppercase tracking-wider mb-2">{label}</p>
      <p className={`font-mono text-3xl font-bold tracking-tight leading-none ${accent ? 'text-[#C8410A]' : 'text-[#111827]'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-[#9CA3AF] mt-1.5">{sub}</p>}
    </div>
  )
}
