import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import TestCard from '../../components/test/TestCard'
import { useAuthStore } from '../../store/authStore'
import { mockAttempts, mockCertificates, mockTests } from '../../lib/mockData'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { BookOpen, Award, CheckCircle, Clock, ChevronRight, TrendingUp } from 'lucide-react'
import { formatDate, getGrade } from '../../lib/utils'

export default function StudentDashboard() {
  const user = useAuthStore(s => s.user)
  const avgScore = mockAttempts.length > 0 ? Math.round(mockAttempts.reduce((sum, a) => sum + a.score, 0) / mockAttempts.length) : 0

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Добро пожаловать, {user?.full_name?.split(' ')[1] || user?.full_name}!</h1>
        <p className="text-slate-500 mt-1">Ваш личный кабинет студента</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Пройдено тестов" value={mockAttempts.length} icon={<BookOpen className="h-6 w-6" />} iconBg="bg-blue-50 text-blue-600" />
        <StatsCard title="Средний балл" value={`${avgScore}%`} icon={<TrendingUp className="h-6 w-6" />} iconBg="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Сертификатов" value={mockCertificates.length} icon={<Award className="h-6 w-6" />} iconBg="bg-amber-50 text-amber-600" />
        <StatsCard title="Успешно сдано" value={mockAttempts.filter(a => a.passed).length} icon={<CheckCircle className="h-6 w-6" />} iconBg="bg-purple-50 text-purple-600" />
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Доступные тесты</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/tests" className="gap-1 flex items-center text-[#1E40AF]">Все тесты <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-4">
            {mockTests.slice(0, 2).map(test => <TestCard key={test.id} test={test} attemptCount={0} />)}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Последние результаты</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/results" className="gap-1 flex items-center text-[#1E40AF]">Все <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {mockAttempts.map(attempt => (
              <Card key={attempt.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{attempt.test?.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDate(attempt.finished_at || attempt.started_at)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-lg font-bold ${attempt.score >= 75 ? 'text-emerald-600' : attempt.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{attempt.score}%</div>
                      <Badge className={`text-xs ${attempt.passed ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}`}>
                        {attempt.passed ? 'Сдан' : 'Не сдан'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{getGrade(attempt.score)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
