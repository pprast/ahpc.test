import PageLayout from '../../components/layout/PageLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import { mockTests, mockAttempts, mockCertificates, mockGroups } from '../../lib/mockData'

export default function AdminDashboard() {
  const passRate = mockAttempts.length > 0 ? Math.round((mockAttempts.filter(a => a.passed).length / mockAttempts.length) * 100) : 0

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Администратор</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">Панель управления</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatsCard label="Пользователей" value="247" />
        <StatsCard label="Тестов" value={mockTests.length} />
        <StatsCard label="Сертификатов" value={mockCertificates.length} />
        <StatsCard label="Процент сдачи" value={`${passRate}%`} accent />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#DDE1E7] rounded-lg">
          <div className="px-5 py-4 border-b border-[#DDE1E7]">
            <h2 className="font-display font-semibold text-[#111827] text-sm">Статистика</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            {[
              { label: 'Процент сдачи', value: passRate },
              { label: 'Активных тестов', value: Math.round(mockTests.filter(t => t.is_active).length / mockTests.length * 100) },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[#4B5563]">{item.label}</span>
                  <span className="font-mono font-bold text-[#111827]">{item.value}%</span>
                </div>
                <div className="h-1.5 bg-[#F0F2F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8410A] rounded-full" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#DDE1E7] rounded-lg">
          <div className="px-5 py-4 border-b border-[#DDE1E7]">
            <h2 className="font-display font-semibold text-[#111827] text-sm">Группы</h2>
          </div>
          <div className="divide-y divide-[#DDE1E7]">
            {mockGroups.map(group => (
              <div key={group.id} className="px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#111827]">{group.name}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{group.specialty}</p>
                </div>
                <span className="font-mono text-xs text-[#9CA3AF]">{group.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
