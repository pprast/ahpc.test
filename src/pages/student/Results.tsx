import { useLocation, Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { mockAttempts } from '../../lib/mockData'
import { formatDate, getGrade } from '../../lib/utils'
import { Award, CheckCircle, XCircle } from 'lucide-react'

export default function Results() {
  const location = useLocation()
  const latest = location.state as { score: number; testTitle: string; passed: boolean } | null
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">История результатов</h1>
        <p className="text-slate-500 mt-1">Все ваши попытки прохождения тестов</p>
      </div>
      {latest && (
        <Card className={`border-2 mb-6 ${latest.passed ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
          <CardContent className="p-6 flex items-center gap-4">
            {latest.passed ? <CheckCircle className="h-10 w-10 text-emerald-500 flex-shrink-0" /> : <XCircle className="h-10 w-10 text-red-500 flex-shrink-0" />}
            <div>
              <p className="font-semibold text-slate-900">{latest.testTitle}</p>
              <p className={`text-2xl font-bold ${latest.passed ? 'text-emerald-600' : 'text-red-600'}`}>{latest.score}% — {getGrade(latest.score)}</p>
              <p className="text-sm text-slate-500">{latest.passed ? 'Тест пройден успешно!' : 'Тест не пройден. Попробуйте ещё раз.'}</p>
            </div>
            {latest.passed && (
              <Button className="ml-auto gap-2 bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link to="/student/certificates"><Award className="h-4 w-4" /> Сертификат</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      <div className="space-y-4">
        {mockAttempts.map(attempt => (
          <Card key={attempt.id} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{attempt.test?.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{attempt.test?.subject?.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(attempt.finished_at || attempt.started_at)} · Попытка #{attempt.attempt_number}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${attempt.score >= 75 ? 'text-emerald-600' : attempt.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{attempt.score}%</div>
                  <p className="text-xs text-slate-500">{getGrade(attempt.score)}</p>
                  <Badge className={`mt-1 ${attempt.passed ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}`}>
                    {attempt.passed ? 'Сдан' : 'Не сдан'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
