import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { GraduationCap, LogOut, User, LayoutDashboard } from 'lucide-react'

export default function Header() {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => { setUser(null); navigate('/') }

  const getDashboardPath = () => {
    if (!user) return '/'
    if (user.role === 'student') return '/student/dashboard'
    if (user.role === 'teacher') return '/teacher/dashboard'
    return '/admin/dashboard'
  }

  const initials = user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-[#1E40AF] rounded-lg p-1.5">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-[#1E40AF] text-sm leading-tight">TestCenter</div>
              <div className="text-xs text-slate-500 leading-tight">АВПК</div>
            </div>
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to={getDashboardPath()} className="gap-2 flex items-center">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:block">Кабинет</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pr-2 pl-3">
                    <span className="text-sm font-medium hidden sm:block">{user.full_name}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#1E40AF] text-white text-xs font-bold">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2"><User className="h-4 w-4" /> Профиль</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="gap-2 text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4" /> Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild><Link to="/login">Войти</Link></Button>
              <Button className="bg-[#1E40AF] hover:bg-[#1d3a9e]" asChild><Link to="/register">Регистрация</Link></Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
