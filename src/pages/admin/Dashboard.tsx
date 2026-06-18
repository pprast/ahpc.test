import PageLayout from '../../components/layout/PageLayout'
import StatsCard from '../../components/dashboard/StatsCard'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import { mockTests, mockAttempts, mockCertificates, mockGroups } from '../../lib/mockData'
import { Users, BookOpen, Award, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const passRate = mockAttempts.length > 0 ? Math.round((mockAttempts.filter(a => a.passed).length / mockAttempts.length) * 100) : 0
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Панель администратора</h1>
        <p className="text-slate-500 mt-1">Общая статистика по колледжу</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Пользователей" value="247" icon={<Users className="h-6 w-6" />} iconBg="bg-blue-50 text-blue-600" />
        <StatsCard title="Тестов" value={mockTests.length} icon={<BookOpen className="h-6 w-6" />} iconBg="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Сертификатов" value={mockCertificates.length} icon={<Award className="h-6 w-6" />} iconBg="bg-amber-50 text-amber-600" />
        <StatsCard title="Групп" value={mockGroups.length} icon={<BarChart3 className="h-6 w-6" />} iconBg="bg-purple-50 text-purple-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-base">Статистика тестов</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">Процент сдачи</span><span className="font-medium">{passRate}%</span></div>
              <Progress value={passRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-slate-600">Активных тестов</span><span className="font-medium">{mockTests.filter(t => t.is_active).length}/{mockTests.length}</span></div>
              <Progress value={(mockTests.filter(t => t.is_active).length / mockTests.length) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-base">Группы</CardTitle></CardHeader>
          <CardContent>
            <div className="divide-y">
              {mockGroups.map(group => (
                <div key={group.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div><p className="font-medium text-slate-900">{group.name}</p><p className="text-xs text-slate-500">{group.specialty}</p></div>
                  <span className="text-xs text-slate-400">Набор {group.year}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
