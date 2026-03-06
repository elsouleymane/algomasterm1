import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export interface AuthUser {
  id: string
  email: string
  role?: string
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabaseAuth.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabaseAuth.auth.getUser()
  if (error) throw error
  return user
}

export const isAuthenticated = async () => {
  try {
    const user = await getCurrentUser()
    return !!user
  } catch {
    return false
  }
}

export const createAdminUser = async (email: string, password: string) => {
  const { data, error } = await supabaseAuth.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const uploadProfilePhoto = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `profile-${Date.now()}.${fileExt}`
  const filePath = `profiles/${fileName}`

  const { error } = await supabaseAuth.storage
    .from('photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) throw error

  const { data: { publicUrl } } = supabaseAuth.storage
    .from('photos')
    .getPublicUrl(filePath)

  return publicUrl
}

export const deletePhoto = async (photoUrl: string) => {
  const path = photoUrl.split('/photos/')[1]

  if (!path) return

  const { error } = await supabaseAuth.storage
    .from('photos')
    .remove([path])

  if (error) throw error
}
