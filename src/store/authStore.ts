import { create } from 'zustand'
import { db, initDb } from '../lib/db'

interface Profile {
  id: string
  full_name: string
  role: 'student' | 'teacher' | 'admin'
  group_id: string | null
  avatar_url: string | null
  email?: string
}

interface AuthState {
  user: Profile | null
  isLoading: boolean
  setUser: (user: Profile | null) => void
  setLoading: (loading: boolean) => void
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string, role: 'student' | 'teacher', groupId?: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  loadSession: () => Promise<void>
}

function toProfile(u: ReturnType<typeof db.getUserById>): Profile | null {
  if (!u) return null
  return { id: u.id, full_name: u.full_name, role: u.role, group_id: u.group_id, avatar_url: null, email: u.email }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),

  signIn: async (email, password) => {
    const stored = db.findUser(email, password)
    if (!stored) return { error: 'Неверный email или пароль' }
    db.setSession(stored.id)
    set({ user: toProfile(stored) })
    return { error: null }
  },

  signUp: async (email, password, fullName, role, groupId) => {
    try {
      const id = `u-${Date.now()}`
      db.createUser({ id, email, password, full_name: fullName, role, group_id: groupId || null })
      db.setSession(id)
      set({ user: { id, full_name: fullName, role, group_id: groupId || null, avatar_url: null, email } })
      return { error: null }
    } catch (e: any) {
      return { error: e.message }
    }
  },

  signOut: async () => {
    db.setSession(null)
    set({ user: null })
  },

  loadSession: async () => {
    initDb()
    const userId = db.getSession()
    if (userId) {
      const stored = db.getUserById(userId)
      if (stored) {
        set({ user: toProfile(stored), isLoading: false })
        return
      }
    }
    set({ isLoading: false })
  },
}))
