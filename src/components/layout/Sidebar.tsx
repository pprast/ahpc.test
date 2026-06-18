import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import {
  LayoutDashboard, BookOpen, ClipboardList, Award, Users,
  PlusSquare, Grid2x2, BookMarked
} from 'lucide-react'

const studentLinks = [
  { to: '/student/dashboard', icon: LayoutDashboard, label: 'Главная' },
  { to: '/student/tests', icon: BookOpen, label: 'Тесты' },
  { to: '/student/results', icon: ClipboardList, label: 'Результаты' },
  { to: '/student/certificates', icon: Award, label: 'Сертификаты' },
]

const teacherLinks = [
  { to: '/teacher/dashboard', icon: LayoutDashboard, label: 'Главная' },
  { to: '/teacher/create-test', icon: PlusSquare, label: 'Создать тест' },
  { to: '/teacher/students', icon: Users, label: 'Студенты' },
]

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Главная' },
  { to: '/admin/users', icon: Users, label: 'Пользователи' },
  { to: '/admin/groups', icon: Grid2x2, label: 'Группы' },
  { to: '/admin/subjects', icon: BookMarked, label: 'Предметы' },
]

export default function Sidebar() {
  const user = useAuthStore(s => s.user)
  if (!user) return null

  const links = user.role === 'student' ? studentLinks
    : user.role === 'teacher' ? teacherLinks
    : adminLinks

  return (
    <aside className="w-56 flex-shrink-0 hidden md:block">
      <nav className="sticky top-20 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#1E40AF] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
