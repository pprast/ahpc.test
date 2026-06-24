import { useState, useEffect } from 'react'
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
import { db } from '../lib/db'
import type { Group } from '../types'

const schema = z.object({
  full_name: z.string().min(3, 'Введите полное имя'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
  confirm_password: z.string(),
  role: z.enum(['student', 'teacher'] as const),
  group_id: z.string().optional(),
}).refine(d => d.password === d.confirm_password, { message: 'Пароли не совпадают', path: ['confirm_password'] })

type Form = z.infer<typeof schema>

export default function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema), defaultValues: { role: 'student' },
  })

  useEffect(() => {
    setGroups(db.getGroups())
  }, [])

  const onSubmit = async (data: Form) => {
    setError(null)
    setLoading(true)
    const { error: signUpError } = await signUp(data.email, data.password, data.full_name, data.role, data.group_id)
    setLoading(false)
    if (signUpError) {
      setError(signUpError)
      return
    }
    navigate(data.role === 'student' ? '/student/dashboard' : '/teacher/dashboard')
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
                <Select defaultValue="student" onValueChange={v => { setValue('role', v as 'student' | 'teacher'); setSelectedRole(v as 'student' | 'teacher') }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Студент</SelectItem>
                    <SelectItem value="teacher">Преподаватель</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedRole === 'student' && (
                <div className="space-y-1.5">
                  <Label>Группа</Label>
                  <Select onValueChange={v => setValue('group_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Выберите группу" /></SelectTrigger>
                    <SelectContent>
                      {groups.map(g => <SelectItem key={g.id} value={g.id}>{g.name} — {g.specialty}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
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
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2 mt-2">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                Зарегистрироваться
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
