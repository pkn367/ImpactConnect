import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getToken, setToken, clearToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [registrations, setRegistrations] = useState([]) // event ids this user joined
  const [ready, setReady] = useState(false)

  const loadRegistrations = useCallback(async () => {
    try {
      setRegistrations(await api.getMyRegistrations())
    } catch {
      setRegistrations([])
    }
  }, [])

  // On first load: if a token is saved, ask the server who it belongs to.
  useEffect(() => {
    async function restore() {
      if (!getToken()) {
        setReady(true)
        return
      }
      try {
        const { user } = await api.me()
        setUser(user)
        await loadRegistrations()
      } catch {
        clearToken()
      }
      setReady(true)
    }
    restore()
  }, [loadRegistrations])

  const register = useCallback(async (form) => {
    try {
      const { token, user } = await api.register(form)
      setToken(token)
      setUser(user)
      setRegistrations([])
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }, [])

  const login = useCallback(
    async (form) => {
      try {
        const { token, user } = await api.login(form)
        setToken(token)
        setUser(user)
        await loadRegistrations()
        return { ok: true }
      } catch (err) {
        return { ok: false, error: err.message }
      }
    },
    [loadRegistrations]
  )

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
    setRegistrations([])
  }, [])

  const toggleRegistration = useCallback(
    async (eventId) => {
      if (!user) return { ok: false, error: 'Please log in first.' }
      try {
        const updated = await api.toggleRegistration(eventId)
        setRegistrations((prev) =>
          updated.isRegistered
            ? [...new Set([...prev, eventId])]
            : prev.filter((id) => id !== eventId)
        )
        return { ok: true, event: updated }
      } catch (err) {
        return { ok: false, error: err.message }
      }
    },
    [user]
  )

  const value = {
    user,
    ready,
    isAuthenticated: !!user,
    registrations,
    register,
    login,
    logout,
    toggleRegistration,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
