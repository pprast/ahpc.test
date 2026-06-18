import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { mockStudentProfile, mockTeacherProfile, mockAdminProfile } from '../../lib/mockData'
import { Search, MoreHorizontal, Plus } from 'lucide-react'

const allUsers = [
  { ...mockStudentProfile, email: 'aidar@avpk.kz', group: 'ИС-23' },
  { ...mockTeacherProfile, email: 'gulnar@avpk.kz', group: '—' },
  { ...mockAdminProfile, email: 'admin@avpk.kz', group: '—' },
  { id: 'u4', user_id: 'u4', full_name: 'Марат Сейтхан', role: 'student' as const, group_id: 'g1', email: 'marat@avpk.kz', group: 'ИС-23' },
  { id: 'u5', user_id: 'u5', full_name: 'Дана Ахметова', role: 'student' as const, group_id: 'g2', email: 'dana@avpk.kz', group: 'ПО-24' },
]

const roleLabel: Record<string, string> = { student: 'Студент', teacher: 'Преподаватель', admin: 'Администратор' }
const roleBadgeClass: Record<string, string> = {
  student: 'bg-[#F0F2F5] text-[#4B5563]',
  teacher: 'bg-[#FEF3EE] text-[#C8410A]',
  admin: 'bg-[#111827] text-white',
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const filtered = allUsers.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7] flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Администратор</p>
          <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">Пользователи</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#C8410A] text-white text-sm font-medium rounded hover:bg-[#A33508] transition-colors">
          <Plus className="h-3.5 w-3.5" /> Добавить
        </button>
      </div>

      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-[#DDE1E7] rounded bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C8410A] focus:ring-1 focus:ring-[#C8410A]"
        />
      </div>

      <div className="bg-white border border-[#DDE1E7] rounded-lg divide-y divide-[#DDE1E7]">
        {filtered.map(user => (
          <div key={user.id} className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#111827] text-white text-xs font-mono font-bold flex items-center justify-center uppercase flex-shrink-0">
                {user.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827]">{user.full_name}</p>
                <p className="text-xs text-[#9CA3AF]">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#9CA3AF] hidden sm:block font-mono">{user.group}</span>
              <span className={`text-[10px] font-medium px-2 py-1 rounded uppercase tracking-wider ${roleBadgeClass[user.role]}`}>
                {roleLabel[user.role]}
              </span>
              <button className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
