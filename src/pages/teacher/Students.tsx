import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { mockGroups, mockAttempts } from '../../lib/mockData'
import { Users, TrendingUp, CheckCircle } from 'lucide-react'

const mockStudents = [
  { id: 'u1', full_name: 'Айдар Нурланов', group_id: 'g1', email: 'aidar@avpk.kz' },
  { id: 'u4', full_name: 'Марат Сейтхан', group_id: 'g1', email: 'marat@avpk.kz' },
  { id: 'u5', full_name: 'Дана Ахметова', group_id: 'g2', email: 'dana@avpk.kz' },
  { id: 'u6', full_name: 'Алия Жаксыбекова', group_id: 'g1', email: 'aliya@avpk.kz' },
  { id: 'u7', full_name: 'Нурдаулет Сейтжан', group_id: 'g2', email: 'nurdaulet@avpk.kz' },
]

export default function TeacherStudents() {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Студенты</h1>
        <p className="text-slate-500 mt-1">Список студентов ваших групп</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-50 text-[#1E40AF] p-3 rounded-xl"><Users className="h-5 w-5" /></div>
            <div><p className="text-sm text-slate-500">Всего студентов</p><p className="text-2xl font-bold font-mono text-slate-900">{mockStudents.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-green-50 text-emerald-600 p-3 rounded-xl"><CheckCircle className="h-5 w-5" /></div>
            <div><p className="text-sm text-slate-500">Сдали тесты</p><p className="text-2xl font-bold font-mono text-slate-900">{mockAttempts.filter(a => a.passed).length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-50 text-amber-600 p-3 rounded-xl"><TrendingUp className="h-5 w-5" /></div>
            <div><p className="text-sm text-slate-500">Средний балл</p><p className="text-2xl font-bold font-mono text-slate-900">{mockAttempts.length > 0 ? Math.round(mockAttempts.reduce((s, a) => s + a.score, 0) / mockAttempts.length) : 0}%</p></div>
          </CardContent>
        </Card>
      </div>

      {mockGroups.map(group => {
        const students = mockStudents.filter(s => s.group_id === group.id)
        return (
          <Card key={group.id} className="border-0 shadow-sm mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {group.name}
                <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">{group.specialty}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {students.length === 0 ? (
                  <p className="text-sm text-slate-400 py-3">Студентов нет</p>
                ) : students.map(student => {
                  const attempts = mockAttempts.filter(a => a.student_id === student.id)
                  const avg = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length) : null
                  return (
                    <div key={student.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1E40AF] text-white text-xs font-bold flex items-center justify-center">
                          {student.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{student.full_name}</p>
                          <p className="text-xs text-slate-400">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {avg !== null ? (
                          <>
                            <p className={`font-mono font-bold text-lg ${avg >= 75 ? 'text-emerald-600' : avg >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{avg}%</p>
                            <p className="text-xs text-slate-400">{attempts.length} {attempts.length === 1 ? 'попытка' : 'попытки'}</p>
                          </>
                        ) : (
                          <p className="text-xs text-slate-400">Нет попыток</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </PageLayout>
  )
}
