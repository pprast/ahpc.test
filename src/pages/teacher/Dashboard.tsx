import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import { useAuthStore } from '../../store/authStore'
import { mockTests, mockAttempts } from '../../lib/mockData'
import { Eye, Plus } from 'lucide-react'

export default function TeacherDashboard() {
  const user = useAuthStore(s => s.user)
  const avgScore = mockAttempts.length > 0 ? Math.round(mockAttempts.reduce((sum, a) => sum + a.score, 0) / mockAttempts.length) : 0

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7] flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Преподаватель</p>
          <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">{user?.full_name}</h1>
        </div>
        <Link to="/teacher/create-test" className="flex items-center gap-2 px-4 py-2 bg-[#C8410A] text-white text-sm font-medium rounded hover:bg-[#A33508] transition-colors">
          <Plus className="h-3.5 w-3.5" /> Создать тест
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <StatsCard label="Тестов создано" value={mockTests.length} />
        <StatsCard label="Попыток сдано" value={mockAttempts.length} />
        <StatsCard label="Средний балл" value={`${avgScore}%`} accent />
      </div>

      <div>
        <h2 className="font-display font-semibold text-[#111827] text-base mb-4">Мои тесты</h2>
        <div className="border border-[#DDE1E7] rounded-lg bg-white divide-y divide-[#DDE1E7]">
          {mockTests.map(test => (
            <div key={test.id} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[#111827] text-sm">{test.title}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    test.is_active ? 'bg-[#ECFBF1] text-[#1A7A4A]' : 'bg-[#F0F2F5] text-[#9CA3AF]'
                  }`}>
                    {test.is_active ? 'активный' : 'неактивный'}
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{test.subject?.name} · {test.time_limit} мин · порог {test.pass_score}%</p>
              </div>
              <Link
                to={`/teacher/test/${test.id}/results`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4B5563] border border-[#DDE1E7] rounded hover:bg-[#F0F2F5] transition-colors"
              >
                <Eye className="h-3.5 w-3.5" /> Результаты
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
