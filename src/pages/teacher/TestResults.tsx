import { useParams } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import { mockAttempts, mockTests } from '../../lib/mockData'
import { formatDate, getGrade } from '../../lib/utils'

export default function TeacherTestResults() {
  const { id } = useParams()
  const test = mockTests.find(t => t.id === id)
  const attempts = mockAttempts.filter(a => a.test_id === id)

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Результаты теста</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">{test?.title || '—'}</h1>
      </div>

      <div className="border border-[#DDE1E7] rounded-lg bg-white divide-y divide-[#DDE1E7]">
        {attempts.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-[#9CA3AF]">Попыток ещё нет</div>
        ) : attempts.map(attempt => (
          <div key={attempt.id} className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#111827]">Студент #{attempt.student_id}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{formatDate(attempt.finished_at || attempt.started_at)} · Попытка #{attempt.attempt_number}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className={`font-mono font-bold text-2xl leading-none ${attempt.score >= 75 ? 'text-[#1A7A4A]' : 'text-[#C8190A]'}`}>{attempt.score}%</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{getGrade(attempt.score)}</p>
              </div>
              <div className={`w-1.5 h-8 rounded-full ${attempt.passed ? 'bg-[#1A7A4A]' : 'bg-[#E8EAED]'}`} />
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
