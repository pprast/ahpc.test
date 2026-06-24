import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { GraduationCap, LogIn } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})
type Form = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: Form) => {
    setError(null)
    setLoading(true)
    const { error: signInError } = await signIn(data.email, data.password)
    setLoading(false)
    if (signInError) {
      setError('Неверный email или пароль')
      return
    }
    const user = useAuthStore.getState().user
    if (user?.role === 'student') navigate('/student/dashboard')
    else if (user?.role === 'teacher') navigate('/teacher/dashboard')
    else navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex bg-[#1E40AF] rounded-xl p-3 mb-4"><GraduationCap className="h-8 w-8 text-white" /></div>
          <h1 className="text-2xl font-bold text-slate-900">TestCenter</h1>
          <p className="text-slate-500 text-sm mt-1">Актюбинский высший политехнический колледж</p>
        </div>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>Введите ваши учётные данные</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="student@avpk.kz" {...register('email')} />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Пароль</Label>
                <Input type="password" placeholder="••••••••" {...register('password')} />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Войти
              </Button>
            </form>
            <p className="text-center text-sm text-slate-500 mt-6">
              Нет аккаунта? <Link to="/register" className="text-[#1E40AF] font-medium hover:underline">Зарегистрироваться</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
