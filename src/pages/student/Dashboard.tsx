import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import TestCard from '../../components/test/TestCard'
import { useAuthStore } from '../../store/authStore'
import { mockAttempts, mockCertificates, mockTests } from '../../lib/mockData'
import { ArrowRight } from 'lucide-react'
import { formatDate, getGrade } from '../../lib/utils'

export default function StudentDashboard() {
  const user = useAuthStore(s => s.user)
  const firstName = user?.full_name?.split(' ')[1] || user?.full_name || 'Студент'
  const avgScore = mockAttempts.length > 0
    ? Math.round(mockAttempts.reduce((sum, a) => sum + a.score, 0) / mockAttempts.length)
    : 0

  return (
    <PageLayout>
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Личный кабинет</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">
          Здравствуйте, {firstName}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatsCard label="Ср. балл" value={`${avgScore}%`} accent />
        <StatsCard label="Пройдено тестов" value={mockAttempts.length} />
        <StatsCard label="Сертификатов" value={mockCertificates.length} />
        <StatsCard label="Успешно сдано" value={mockAttempts.filter(a => a.passed).length} />
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Tests */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-[#111827] text-base">Доступные тесты</h2>
            <Link to="/student/tests" className="flex items-center gap-1 text-sm text-[#C8410A] hover:underline">
              Все тесты <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockTests.slice(0, 3).map(test => <TestCard key={test.id} test={test} attemptCount={0} />)}
          </div>
        </div>

        {/* Recent results */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-[#111827] text-base">Результаты</h2>
            <Link to="/student/results" className="flex items-center gap-1 text-sm text-[#C8410A] hover:underline">
              История <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {mockAttempts.map(attempt => (
              <div key={attempt.id} className="bg-white border border-[#DDE1E7] rounded-lg p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate leading-snug">{attempt.test?.title}</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">{formatDate(attempt.finished_at || attempt.started_at)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-mono font-bold text-xl leading-none ${
                      attempt.score >= 90 ? 'text-[#1A7A4A]'
                      : attempt.score >= 60 ? 'text-[#C8410A]'
                      : 'text-[#C8190A]'
                    }`}>{attempt.score}%</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">{getGrade(attempt.score)}</p>
                  </div>
                </div>
                <div className="mt-3 h-1 bg-[#F0F2F5] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      attempt.score >= 90 ? 'bg-[#1A7A4A]'
                      : attempt.score >= 60 ? 'bg-[#C8410A]'
                      : 'bg-[#C8190A]'
                    }`}
                    style={{ width: `${attempt.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
