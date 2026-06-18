import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronDown, LogOut, LayoutDashboard } from 'lucide-react'

export default function Header() {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => { setUser(null); navigate('/') }

  const getDashboardPath = () => {
    if (!user) return '/'
    return user.role === 'student' ? '/student/dashboard'
      : user.role === 'teacher' ? '/teacher/dashboard'
      : '/admin/dashboard'
  }

  const roleLabel: Record<string, string> = {
    student: 'Студент',
    teacher: 'Преподаватель',
    admin: 'Администратор',
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DDE1E7]">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-[#C8410A] rounded flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.9"/>
              <rect x="9" y="2" width="5" height="5" fill="white" opacity="0.6"/>
              <rect x="2" y="9" width="5" height="5" fill="white" opacity="0.6"/>
              <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-semibold text-[#111827] text-sm tracking-tight">TestCenter</span>
            <span className="text-[10px] text-[#9CA3AF] font-sans tracking-wide uppercase">АВПК</span>
          </div>
        </Link>

        {user ? (
          <div className="flex items-center gap-1">
            <Link
              to={getDashboardPath()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm text-[#4B5563] hover:bg-[#F0F2F5] hover:text-[#111827] transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:block">Кабинет</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded text-sm text-[#111827] hover:bg-[#F0F2F5] transition-colors outline-none">
                <div className="w-6 h-6 rounded bg-[#C8410A] text-white text-[10px] font-mono font-bold flex items-center justify-center uppercase">
                  {user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <span className="hidden sm:block font-medium max-w-32 truncate">{user.full_name.split(' ')[0]}</span>
                <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 border-[#DDE1E7] shadow-md rounded-lg">
                <div className="px-3 py-2.5">
                  <p className="text-sm font-medium text-[#111827] font-display">{user.full_name}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{roleLabel[user.role]}</p>
                </div>
                <DropdownMenuSeparator className="bg-[#DDE1E7]" />
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-[#C8190A] focus:text-[#C8190A] focus:bg-[#FEF2F2] cursor-pointer">
                  <LogOut className="h-3.5 w-3.5" /> Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 py-1.5 text-sm text-[#4B5563] hover:text-[#111827] transition-colors">
              Войти
            </Link>
            <Link to="/register" className="px-3.5 py-1.5 text-sm font-medium bg-[#C8410A] text-white rounded hover:bg-[#A33508] transition-colors">
              Начать →
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
