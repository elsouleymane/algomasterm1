import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// TYPES BASÉS SUR LE CAHIER DES CHARGES
// ============================================

export interface Lesson {
  id: string
  title: string
  slug: string
  date: string
  week_number: number | null

  journal_reflexif: string
  synthese_personnelle: string
  application_pratique: string

  maitrise_bien: string
  a_ameliorer: string
  strategie_progression: string

  created_at: string
  updated_at: string
}

export interface FinalAssessment {
  id: number
  appris_plus: string
  competences_reutilisables: string
  plus_grand_defi: string
  prochaines_etapes: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  email: string
  github_url: string
  linkedin_url: string
  photo_url: string
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
  updated_at: string
}

// ============================================
// FONCTIONS POUR LES LEÇONS
// ============================================

export const fetchLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('week_number', { ascending: true })
    .order('date', { ascending: true })

  if (error) throw error
  return data as Lesson[]
}

export const fetchLesson = async (id: string) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Lesson
}

export const createLesson = async (lesson: Partial<Lesson>) => {
  const { data, error } = await supabase
    .from('lessons')
    .insert([lesson])
    .select()
    .single()

  if (error) throw error
  return data as Lesson
}

export const updateLesson = async (id: string, lesson: Partial<Lesson>) => {
  const { data, error } = await supabase
    .from('lessons')
    .update(lesson)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Lesson
}

export const deleteLesson = async (id: string) => {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ============================================
// FONCTIONS POUR LE BILAN FINAL
// ============================================

export const fetchFinalAssessment = async () => {
  const { data, error } = await supabase
    .from('final_assessment')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) throw error
  return data as FinalAssessment
}

export const updateFinalAssessment = async (assessment: Partial<FinalAssessment>) => {
  const { data, error } = await supabase
    .from('final_assessment')
    .update(assessment)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data as FinalAssessment
}

// ============================================
// FONCTIONS POUR LE PROFIL
// ============================================

export const fetchProfile = async () => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) throw error
  return data as Profile
}

export const updateProfile = async (profile: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profile')
    .update(profile)
    .eq('id', 1)
    .select()
    .single()

  if (error) throw error
  return data as Profile
}

// ============================================
// STATISTIQUES
// ============================================

export const getTotalLessons = async () => {
  const { count, error } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count || 0
}

export const fetchLessonsPaginated = async (page: number, pageSize: number = 10) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await supabase
    .from('lessons')
    .select('*', { count: 'exact' })
    .order('week_number', { ascending: true })
    .order('date', { ascending: true })
    .range(from, to)

  if (error) throw error

  return {
    lessons: data as Lesson[],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
    currentPage: page
  }
}

export const fetchLessonBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Lesson
}

export const createContact = async (contact: Omit<Contact, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([contact])
    .select()
    .single()

  if (error) throw error
  return data as Contact
}

export const fetchContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Contact[]
}

export const markContactAsRead = async (id: string) => {
  const { data, error } = await supabase
    .from('contacts')
    .update({ status: 'read' })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Contact
}
