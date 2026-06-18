import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useAuthStore } from '../store/authStore'
import type { Role } from '../types'
import { ArrowRight } from 'lucide-react'

const schema = z.object({
  full_name: z.string().min(3, 'Введите полное имя'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
  confirm_password: z.string(),
  role: z.enum(['student', 'teacher', 'admin'] as const),
}).refine(d => d.password === d.confirm_password, { message: 'Пароли не совпадают', path: ['confirm_password'] })

type Form = z.infer<typeof schema>

export default function Register() {
  const navigate = useNavigate()
  const setUser = useAuthStore(s => s.setUser)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema), defaultValues: { role: 'student' },
  })

  const onSubmit = (data: Form) => {
    setUser({ id: 'new', user_id: 'new', full_name: data.full_name, role: data.role as Role })
    const paths: Record<string, string> = { student: '/student/dashboard', teacher: '/teacher/dashboard', admin: '/admin/dashboard' }
    navigate(paths[data.role])
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-[#C8410A] rounded flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.9"/>
              <rect x="9" y="2" width="5" height="5" fill="white" opacity="0.6"/>
              <rect x="2" y="9" width="5" height="5" fill="white" opacity="0.6"/>
              <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-[#111827] text-sm">TestCenter</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight mb-1">Регистрация</h1>
          <p className="text-sm text-[#9CA3AF]">Создайте аккаунт для доступа к платформе</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { name: 'full_name', label: 'ФИО', placeholder: 'Иванов Иван Иванович', type: 'text' },
            { name: 'email', label: 'Email', placeholder: 'user@avpk.kz', type: 'email' },
            { name: 'password', label: 'Пароль', placeholder: '••••••••', type: 'password' },
            { name: 'confirm_password', label: 'Подтверждение', placeholder: '••••••••', type: 'password' },
          ].map(field => (
            <div key={field.name} className="space-y-1.5">
              <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wider">{field.label}</Label>
              <Input
                type={field.type}
                placeholder={field.placeholder}
                className="border-[#DDE1E7] bg-white focus-visible:ring-[#C8410A] focus-visible:border-[#C8410A] rounded"
                {...register(field.name as keyof Form)}
              />
              {errors[field.name as keyof typeof errors] && (
                <p className="text-xs text-[#C8190A]">{errors[field.name as keyof typeof errors]?.message as string}</p>
              )}
            </div>
          ))}

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-[#4B5563] uppercase tracking-wider">Роль</Label>
            <Select defaultValue="student" onValueChange={v => setValue('role', v as Role)}>
              <SelectTrigger className="border-[#DDE1E7] bg-white focus:ring-[#C8410A] rounded">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Студент</SelectItem>
                <SelectItem value="teacher">Преподаватель</SelectItem>
                <SelectItem value="admin">Администратор</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button type="submit" className="flex items-center justify-between w-full px-4 py-2.5 bg-[#C8410A] text-white text-sm font-medium rounded hover:bg-[#A33508] transition-colors mt-2">
            <span>Зарегистрироваться</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center text-sm text-[#9CA3AF] mt-6">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-[#C8410A] hover:underline font-medium">Войти</Link>
        </p>
      </div>
    </div>
  )
}
