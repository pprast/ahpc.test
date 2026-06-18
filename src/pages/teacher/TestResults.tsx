import { useParams } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { mockAttempts, mockTests } from '../../lib/mockData'
import { formatDate, getGrade } from '../../lib/utils'

export default function TeacherTestResults() {
  const { id } = useParams()
  const test = mockTests.find(t => t.id === id)
  const attempts = mockAttempts.filter(a => a.test_id === id)
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{test?.title || 'Результаты теста'}</h1>
        <p className="text-slate-500 mt-1">Результаты студентов</p>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle className="text-base">Все попытки</CardTitle></CardHeader>
        <CardContent>
          {attempts.length === 0 ? <p className="text-slate-400 text-center py-8">Попыток ещё нет</p> : (
            <div className="divide-y">
              {attempts.map(attempt => (
                <div key={attempt.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Студент #{attempt.student_id}</p>
                    <p className="text-xs text-slate-400">{formatDate(attempt.finished_at || attempt.started_at)} · Попытка #{attempt.attempt_number}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${attempt.score >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>{attempt.score}%</div>
                    <Badge className={attempt.passed ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}>
                      {attempt.passed ? getGrade(attempt.score) : 'Не сдан'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}
