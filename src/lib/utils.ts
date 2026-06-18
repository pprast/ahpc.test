import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date))
}

export function getGrade(score: number): string {
  if (score >= 90) return 'Отлично'
  if (score >= 75) return 'Хорошо'
  if (score >= 60) return 'Удовлетворительно'
  return 'Неудовлетворительно'
}

export function getGradeColor(score: number): string {
  if (score >= 90) return 'text-emerald-600'
  if (score >= 75) return 'text-blue-500'
  if (score >= 60) return 'text-amber-500'
  return 'text-red-500'
}
