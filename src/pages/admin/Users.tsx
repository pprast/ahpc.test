import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { mockStudentProfile, mockTeacherProfile, mockAdminProfile } from '../../lib/mockData'
import { Search, MoreHorizontal } from 'lucide-react'

const allUsers = [
  { ...mockStudentProfile, email: 'aidar@avpk.kz', group: 'ИС-23' },
  { ...mockTeacherProfile, email: 'gulnar@avpk.kz', group: '—' },
  { ...mockAdminProfile, email: 'admin@avpk.kz', group: '—' },
  { id: 'u4', user_id: 'u4', full_name: 'Марат Сейтхан', role: 'student' as const, group_id: 'g1', email: 'marat@avpk.kz', group: 'ИС-23' },
  { id: 'u5', user_id: 'u5', full_name: 'Дана Ахметова', role: 'student' as const, group_id: 'g2', email: 'dana@avpk.kz', group: 'ПО-24' },
]

const roleLabel: Record<string, string> = { student: 'Студент', teacher: 'Преподаватель', admin: 'Администратор' }
const roleBadge: Record<string, string> = {
  student: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  teacher: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  admin: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const filtered = allUsers.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Пользователи</h1>
        <p className="text-slate-500 mt-1">Управление учётными записями</p>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Поиск по имени или email..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="bg-[#1E40AF] hover:bg-[#1d3a9e]">Добавить</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {filtered.map(user => (
              <div key={user.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1E40AF] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {user.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{user.full_name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 hidden sm:block">{user.group}</span>
                  <Badge className={roleBadge[user.role]}>{roleLabel[user.role]}</Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
