import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { GraduationCap, UserPlus } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import type { Role } from '../types'

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex bg-[#1E40AF] rounded-xl p-3 mb-4"><GraduationCap className="h-8 w-8 text-white" /></div>
          <h1 className="text-2xl font-bold text-slate-900">Регистрация</h1>
          <p className="text-slate-500 text-sm mt-1">Создайте аккаунт для доступа к TestCenter</p>
        </div>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Новый аккаунт</CardTitle>
            <CardDescription>Заполните все поля</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label>ФИО</Label>
                <Input placeholder="Иванов Иван Иванович" {...register('full_name')} />
                {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="user@avpk.kz" {...register('email')} />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Роль</Label>
                <Select defaultValue="student" onValueChange={v => setValue('role', v as Role)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Студент</SelectItem>
                    <SelectItem value="teacher">Преподаватель</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Пароль</Label>
                <Input type="password" placeholder="••••••••" {...register('password')} />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Подтверждение пароля</Label>
                <Input type="password" placeholder="••••••••" {...register('confirm_password')} />
                {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2 mt-2">
                <UserPlus className="h-4 w-4" /> Зарегистрироваться
              </Button>
            </form>
            <p className="text-center text-sm text-slate-500 mt-6">
              Уже есть аккаунт? <Link to="/login" className="text-[#1E40AF] font-medium hover:underline">Войти</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
