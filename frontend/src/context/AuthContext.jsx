import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) return setProfile(null)
    // phone and address are excluded here by column-level privileges
    // (see schema.sql sections 7 & 9) — only the owner or an admin can
    // read them, via RPC.
    const [{ data }, { data: phone }, { data: address }] = await Promise.all([
      supabase
        .from('profiles')
        .select(
          'id, username, full_name, specialty, license_no, bio, avatar_url, is_published, degree, years_experience, education, website, office_hours, accepts_new_patients, languages, services, insurance_accepted, payment_methods, age_groups, is_admin'
        )
        .eq('id', userId)
        .maybeSingle(),
      supabase.rpc('get_my_phone'),
      supabase.rpc('get_my_address'),
    ])
    setProfile(data ? { ...data, phone, address } : null)
  }, [])

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      loadProfile(data.session?.user?.id).finally(() => setLoading(false))
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      loadProfile(newSession?.user?.id)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [loadProfile])

  // --- Registration step 1: creates the account in auth.users -------------
  // The handle_new_user() trigger creates the profiles row with the username.
  const signUp = async ({ email, password, username, fullName, phone, address }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username: username.trim().toLowerCase(),
          full_name: fullName,
          phone,
          address,
        },
      },
    })
    if (error) throw error
    return data
  }

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  const refreshProfile = () => loadProfile(session?.user?.id)

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, profile, loading, signUp, signIn, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
