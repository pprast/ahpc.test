import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import { useAuthStore } from '../../store/authStore'
import { mockTests, mockAttempts } from '../../lib/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { BookOpen, Users, TrendingUp, Plus, Eye } from 'lucide-react'

export default function TeacherDashboard() {
  const user = useAuthStore(s => s.user)
  const avgScore = mockAttempts.length > 0 ? Math.round(mockAttempts.reduce((sum, a) => sum + a.score, 0) / mockAttempts.length) : 0
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Кабинет преподавателя</h1>
          <p className="text-slate-500 mt-1">{user?.full_name}</p>
        </div>
        <Button className="bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2" asChild>
          <Link to="/teacher/create-test"><Plus className="h-4 w-4" /> Создать тест</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatsCard title="Тестов создано" value={mockTests.length} icon={<BookOpen className="h-6 w-6" />} iconBg="bg-blue-50 text-blue-600" />
        <StatsCard title="Попыток сдано" value={mockAttempts.length} icon={<Users className="h-6 w-6" />} iconBg="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Средний балл" value={`${avgScore}%`} icon={<TrendingUp className="h-6 w-6" />} iconBg="bg-amber-50 text-amber-600" />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle className="text-base">Мои тесты</CardTitle></CardHeader>
        <CardContent>
          <div className="divide-y">
            {mockTests.map(test => (
              <div key={test.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900">{test.title}</p>
                    <Badge className={test.is_active ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-slate-100 text-slate-500'}>
                      {test.is_active ? 'Активный' : 'Неактивный'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{test.subject?.name} · {test.time_limit} мин · Порог: {test.pass_score}%</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/teacher/test/${test.id}/results`} className="gap-1 flex items-center">
                    <Eye className="h-3.5 w-3.5" /> Результаты
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
