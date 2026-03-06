'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Save,
} from 'lucide-react'
import { getCurrentUser, signOut } from '@/lib/supabase-auth'
import {
  fetchLessons,
  fetchProfile,
  createLesson,
  updateLesson,
  deleteLesson,
  updateProfile,
  type Lesson,
  type Profile,
} from '@/lib/supabase'
import { LessonModal } from '@/components/LessonModal'
import type { LessonFormData } from '@/lib/transformers'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    github_url: '',
    linkedin_url: '',
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push('/admin/login')
          return
        }
        await loadData()
      } catch {
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      const [lessonsData, profileData] = await Promise.all([
        fetchLessons(),
        fetchProfile(),
      ])
      setLessons(lessonsData)
      setProfile(profileData)
      if (profileData) {
        setProfileForm({
          name: profileData.name || '',
          title: profileData.title || '',
          bio: profileData.bio || '',
          email: profileData.email || '',
          github_url: profileData.github_url || '',
          linkedin_url: profileData.linkedin_url || '',
        })
      }
    } catch (error) {
      console.error('Erreur chargement:', error)
      toast.error('Erreur de chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  const handleSaveLesson = async (data: LessonFormData) => {
    try {
      if (editingLesson) {
        await updateLesson(editingLesson.id, data)
        toast.success('Leçon mise à jour !')
      } else {
        await createLesson(data)
        toast.success('Leçon ajoutée !')
      }
      setShowModal(false)
      setEditingLesson(null)
      await loadData()
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const handleDeleteLesson = async (id: string) => {
    if (!confirm('Supprimer cette leçon ?')) return
    try {
      await deleteLesson(id)
      toast.success('Leçon supprimée')
      await loadData()
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profileForm)
      toast.success('Profil mis à jour !')
      setEditingProfile(false)
      await loadData()
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la mise à jour du profil')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/80">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Administration
            </h1>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 border border-white/10 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Profil</h2>
              <button
                onClick={() => editingProfile ? handleSaveProfile() : setEditingProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl transition-colors"
              >
                {editingProfile ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {editingProfile ? 'Sauvegarder' : 'Modifier'}
              </button>
            </div>

            {editingProfile ? (
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="Nom"
                />
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="Titre"
                />
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white md:col-span-2"
                  placeholder="Bio"
                  rows={3}
                />
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="Email"
                />
                <input
                  type="url"
                  value={profileForm.github_url}
                  onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  placeholder="GitHub URL"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-semibold">{profile?.name}</p>
                <p className="text-cyan-400">{profile?.title}</p>
                <p className="text-gray-400">{profile?.bio}</p>
              </div>
            )}
          </motion.div>

          {/* Lessons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                Leçons ({lessons.length})
              </h2>
              <button
                onClick={() => { setEditingLesson(null); setShowModal(true) }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <h3 className="font-bold">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">
                      {lesson.week_number ? `Semaine ${lesson.week_number}` : ''} • {new Date(lesson.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingLesson(lesson); setShowModal(true) }}
                      className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {lessons.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune leçon. Cliquez sur &quot;Ajouter&quot; pour commencer.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {showModal && (
          <LessonModal
            lesson={editingLesson}
            onClose={() => { setShowModal(false); setEditingLesson(null) }}
            onSave={handleSaveLesson}
          />
        )}
      </div>
    </>
  )
}
