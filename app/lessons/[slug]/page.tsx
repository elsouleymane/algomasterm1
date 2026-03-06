'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Edit3, FileText, Home, Share2, BookOpen, ClipboardCheck, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { fetchLessons, fetchLessonBySlug, fetchProfile, fetchFinalAssessment, type Lesson, type Profile, type FinalAssessment } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import ProfilePhoto from '@/components/ProfilePhoto'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [finalAssessment, setFinalAssessment] = useState<FinalAssessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBilan, setShowBilan] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const slug = params.slug as string
        const [lessonsData, lessonData, profileData, bilanData] = await Promise.all([
          fetchLessons(),
          fetchLessonBySlug(slug),
          fetchProfile(),
          fetchFinalAssessment(),
        ])

        setLessons(lessonsData)
        setSelectedLesson(lessonData)
        setProfile(profileData)
        setFinalAssessment(bilanData)
      } catch (error) {
        console.error('Erreur chargement:', error)
        toast.error('Leçon introuvable')
        try {
          const lessonsData = await fetchLessons()
          if (lessonsData.length > 0) {
            router.push(`/lessons/${lessonsData[0].slug}`)
          }
        } catch {
          // Ignore
        }
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.slug, router])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Lien copié dans le presse-papier !')
    } catch {
      toast.error('Erreur lors de la copie du lien')
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
      <CustomCursor />
      <ModernBackground />

      <div className="relative min-h-screen text-white">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {profile?.photo_url && (
                  <ProfilePhoto
                    photoUrl={profile.photo_url}
                    name={profile.name}
                    size="small"
                  />
                )}
                <div>
                  <h1 className="text-xl font-bold">AlgoMaster Portfolio</h1>
                  <p className="text-xs text-gray-400">{profile?.title}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Afficher/masquer la navigation des leçons"
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors md:hidden"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">Accueil</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-64px)]">
          {/* Vertical sidebar navigation */}
          <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-white/10 backdrop-blur-xl bg-slate-950/40 flex-shrink-0 hidden md:block`}>
            <div className="w-72 p-4">
              {/* Vertical tabs */}
              <div className="flex flex-col gap-2 mb-6">
                <button
                  onClick={() => setShowBilan(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-left transition-all ${
                    !showBilan
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  <span>Leçons</span>
                </button>
                <button
                  onClick={() => setShowBilan(true)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-left transition-all ${
                    showBilan
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ClipboardCheck className="w-5 h-5 flex-shrink-0" />
                  <span>Bilan Final</span>
                </button>
              </div>

              {!showBilan && (
                <>
                  <div className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-3">
                    Navigation des leçons
                  </div>
                  <div className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                    {lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.slug}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${selectedLesson?.id === lesson.id ? 'text-cyan-400' : 'text-gray-600'}`} />
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Mobile lesson selector */}
          <div className="md:hidden px-4 pt-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowBilan(false)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  !showBilan
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-400 bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Leçons</span>
              </button>
              <button
                onClick={() => setShowBilan(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  showBilan
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 bg-white/5'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Bilan</span>
              </button>
            </div>
            {!showBilan && (
              <div className="overflow-x-auto mb-4">
                <div className="flex gap-2 min-w-max pb-2">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.slug}`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        selectedLesson?.id === lesson.id
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {lesson.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main content area */}
          <main className="flex-1 min-w-0">
            <div className="p-6 lg:p-8 max-w-5xl">
              <AnimatePresence mode="wait">
                {!showBilan ? (
                  <motion.div
                    key="lessons"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {selectedLesson && (
                      <motion.div
                        key={selectedLesson.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="mb-8">
                          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <h2 className="text-3xl font-bold text-cyan-400 mb-3">
                                {selectedLesson.title}
                              </h2>
                              <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(selectedLesson.date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </span>
                                {selectedLesson.week_number && (
                                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">
                                    Semaine {selectedLesson.week_number}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl transition-colors text-sm"
                              >
                                <Share2 className="w-4 h-4" />
                                <span className="hidden lg:inline">Partager</span>
                              </button>
                              <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-colors text-sm"
                              >
                                <Edit3 className="w-4 h-4" />
                                <span className="hidden lg:inline">Modifier</span>
                              </Link>
                            </div>
                          </div>
                          <div className="h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/30 to-transparent" />
                        </div>

                        <div className="space-y-8">
                          <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-bold">1</span>
                              Journal d&apos;apprentissage réflexif
                            </h3>
                            <MarkdownRenderer content={selectedLesson.journal_reflexif} />
                          </div>

                          <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">2</span>
                              Synthèse personnelle des concepts clés
                            </h3>
                            <MarkdownRenderer content={selectedLesson.synthese_personnelle} />
                          </div>

                          <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">3</span>
                              Application pratique dans mon contexte
                            </h3>
                            <MarkdownRenderer content={selectedLesson.application_pratique} />
                          </div>

                          <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">4</span>
                              Auto-évaluation et méta-cognition
                            </h3>

                            <div className="space-y-4">
                              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                                <h4 className="font-bold text-green-400 mb-3 text-sm uppercase tracking-wider">
                                  ✓ Ce que je maîtrise bien
                                </h4>
                                <MarkdownRenderer content={selectedLesson.maitrise_bien} />
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
                                  <h4 className="font-bold text-orange-400 mb-3 text-sm uppercase tracking-wider">
                                    → Ce que je dois améliorer
                                  </h4>
                                  <MarkdownRenderer content={selectedLesson.a_ameliorer} />
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                                  <h4 className="font-bold text-blue-400 mb-3 text-sm uppercase tracking-wider">
                                    ↑ Stratégie pour progresser
                                  </h4>
                                  <MarkdownRenderer content={selectedLesson.strategie_progression} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {lessons.length === 0 && (
                      <div className="text-center py-20">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                        <p className="text-gray-400">Aucune leçon disponible pour le moment</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="bilan"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Bilan final du semestre
                      </h2>
                      <p className="text-gray-400 mb-4">
                        Réflexion globale sur l&apos;ensemble du cours
                      </p>
                      <div className="h-px bg-gradient-to-r from-purple-500/50 via-pink-500/30 to-transparent" />
                    </div>

                    {finalAssessment && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass rounded-2xl p-6">
                          <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold">1</span>
                            Ce que j&apos;ai le plus appris
                          </h3>
                          <MarkdownRenderer content={finalAssessment.appris_plus} />
                        </div>

                        <div className="glass rounded-2xl p-6">
                          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm font-bold">2</span>
                            Compétences réutilisables
                          </h3>
                          <MarkdownRenderer content={finalAssessment.competences_reutilisables} />
                        </div>

                        <div className="glass rounded-2xl p-6">
                          <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-sm font-bold">3</span>
                            Mon plus grand défi
                          </h3>
                          <MarkdownRenderer content={finalAssessment.plus_grand_defi} />
                        </div>

                        <div className="glass rounded-2xl p-6">
                          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-sm font-bold">4</span>
                            Prochaines étapes
                          </h3>
                          <MarkdownRenderer content={finalAssessment.prochaines_etapes} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
