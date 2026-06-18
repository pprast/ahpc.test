import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuthStore } from '../store/authStore'
import { mockStudentProfile, mockTeacherProfile, mockAdminProfile } from '../lib/mockData'
import type { Profile } from '../types'
import { ArrowRight } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})
type Form = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const setUser = useAuthStore(s => s.setUser)
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) })

  const onSubmit = (_data: Form) => { setUser(mockStudentProfile); navigate('/student/dashboard') }

  const quickLogin = (profile: Profile) => {
    setUser(profile)
    const paths: Record<string, string> = { student: '/student/dashboard', teacher: '/teacher/dashboard', admin: '/admin/dashboard' }
    navigate(paths[profile.role])
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111827] flex-col justify-between p-10">
        <div>
          <div className="flex items-center gap-2.5 mb-16">
            <div className="w-7 h-7 bg-[#C8410A] rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.9"/>
                <rect x="9" y="2" width="5" height="5" fill="white" opacity="0.6"/>
                <rect x="2" y="9" width="5" height="5" fill="white" opacity="0.6"/>
                <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.3"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-white text-sm tracking-tight">TestCenter</span>
              <span className="text-[10px] text-[#6B7280] tracking-wider uppercase">АВПК</span>
            </div>
          </div>
          <h2 className="font-display font-bold text-white text-3xl leading-tight tracking-tight mb-4">
            Система аттестации<br />знаний колледжа
          </h2>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Актюбинский высший политехнический колледж
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#2D3748]">
          {[
            { v: '500+', l: 'студентов' },
            { v: '50+', l: 'тестов' },
            { v: '1000+', l: 'сертификатов' },
          ].map(s => (
            <div key={s.l}>
              <div className="font-mono font-bold text-xl text-[#C8410A]">{s.v}</div>
              <div className="text-xs text-[#6B7280] mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight mb-1">Вход в систему</h1>
            <p className="text-sm text-[#9CA3AF]">Введите ваши учётные данные</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wider">Email</Label>
              <Input
                type="email"
                placeholder="student@avpk.kz"
                className="border-[#DDE1E7] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:ring-[#C8410A] focus-visible:border-[#C8410A] rounded"
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-[#C8190A]">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wider">Пароль</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="border-[#DDE1E7] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus-visible:ring-[#C8410A] focus-visible:border-[#C8410A] rounded"
                {...register('password')}
              />
              {errors.password && <p className="text-xs text-[#C8190A]">{errors.password.message}</p>}
            </div>
            <button type="submit" className="flex items-center justify-between w-full px-4 py-2.5 bg-[#C8410A] text-white text-sm font-medium rounded hover:bg-[#A33508] transition-colors mt-2">
              <span>Войти</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#DDE1E7]"></div></div>
            <div className="relative flex justify-center">
              <span className="bg-[#FAFAFA] px-3 text-xs text-[#9CA3AF]">Демо-доступ</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8">
            {[
              { label: 'Студент', profile: mockStudentProfile },
              { label: 'Преподаватель', profile: mockTeacherProfile },
              { label: 'Администратор', profile: mockAdminProfile },
            ].map(({ label, profile }) => (
              <button
                key={label}
                onClick={() => quickLogin(profile)}
                className="px-2 py-2 text-xs font-medium text-[#4B5563] border border-[#DDE1E7] bg-white rounded hover:bg-[#F0F2F5] hover:border-[#C8410A] hover:text-[#C8410A] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-[#9CA3AF]">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-[#C8410A] hover:underline font-medium">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
