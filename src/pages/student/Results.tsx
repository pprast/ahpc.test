import { useLocation, Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import { mockAttempts } from '../../lib/mockData'
import { formatDate, getGrade } from '../../lib/utils'
import { Award } from 'lucide-react'

export default function Results() {
  const location = useLocation()
  const latest = location.state as { score: number; testTitle: string; passed: boolean } | null

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Студент</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">История результатов</h1>
      </div>

      {latest && (
        <div className={`border rounded-lg p-6 mb-8 ${latest.passed ? 'border-[#1A7A4A]/30 bg-[#ECFBF1]' : 'border-[#C8190A]/30 bg-[#FEF2F2]'}`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#4B5563] mb-1">{latest.testTitle}</p>
              <div className="flex items-baseline gap-3">
                <span className={`font-mono font-bold text-4xl tracking-tight ${latest.passed ? 'text-[#1A7A4A]' : 'text-[#C8190A]'}`}>
                  {latest.score}%
                </span>
                <span className={`text-sm font-medium ${latest.passed ? 'text-[#1A7A4A]' : 'text-[#C8190A]'}`}>
                  {getGrade(latest.score)}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] mt-2">
                {latest.passed ? 'Тест успешно пройден' : 'Тест не пройден — попробуйте ещё раз'}
              </p>
            </div>
            {latest.passed && (
              <Link to="/student/certificates" className="flex items-center gap-2 px-4 py-2 bg-[#1A7A4A] text-white text-sm font-medium rounded hover:bg-[#156039] transition-colors whitespace-nowrap">
                <Award className="h-4 w-4" /> Сертификат
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {mockAttempts.map(attempt => (
          <div key={attempt.id} className="bg-white border border-[#DDE1E7] rounded-lg px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#111827] text-sm truncate">{attempt.test?.title}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {formatDate(attempt.finished_at || attempt.started_at)} · Попытка #{attempt.attempt_number}
              </p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="text-right">
                <p className={`font-mono font-bold text-2xl leading-none ${
                  attempt.score >= 90 ? 'text-[#1A7A4A]'
                  : attempt.score >= 60 ? 'text-[#C8410A]'
                  : 'text-[#C8190A]'
                }`}>{attempt.score}%</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{getGrade(attempt.score)}</p>
              </div>
              <div className={`w-2 h-8 rounded-full ${attempt.passed ? 'bg-[#1A7A4A]' : 'bg-[#E8EAED]'}`} />
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
