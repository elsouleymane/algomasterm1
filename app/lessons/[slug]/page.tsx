'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Edit3, FileText, Home, Share2 } from 'lucide-react'
import Link from 'next/link'
import { fetchLessons, fetchLessonBySlug, fetchProfile, fetchFinalAssessment, type Lesson, type Profile, type FinalAssessment } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
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
        <div className="w-12 h-12 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <ModernBackground />

      <div className="relative min-h-screen text-white">
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/70 border-b border-white/5">
          <div className="container mx-auto px-4 py-4">
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
                  <p className="text-sm text-gray-500">{profile?.title}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">Accueil</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-4 mb-6 border-b border-white/5">
            <button
              onClick={() => setShowBilan(false)}
              className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
                !showBilan
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              Leçons
            </button>
            <button
              onClick={() => setShowBilan(true)}
              className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
                showBilan
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              Bilan Final
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!showBilan ? (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-6 overflow-x-auto">
                  <div className="flex gap-2 min-w-max pb-2">
                    {lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.slug}`}
                        className={`px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-green-600 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {lesson.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {selectedLesson && (
                  <motion.div
                    key={selectedLesson.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass rounded-2xl p-8"
                  >
                    <div className="mb-8 pb-6 border-b border-white/5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-green-400 mb-4">
                            {selectedLesson.title}
                          </h2>
                          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(selectedLesson.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                            {selectedLesson.week_number && (
                              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                                Semaine {selectedLesson.week_number}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg transition-colors text-sm"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="hidden md:inline">Partager</span>
                          </button>
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors text-sm"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span className="hidden md:inline">Modifier</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b-2 border-green-500">
                        1. Journal d&apos;apprentissage réflexif
                      </h3>
                      <MarkdownRenderer content={selectedLesson.journal_reflexif} />
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b-2 border-green-500">
                        2. Synthèse personnelle des concepts clés
                      </h3>
                      <MarkdownRenderer content={selectedLesson.synthese_personnelle} />
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b-2 border-green-500">
                        3. Application pratique dans mon contexte
                      </h3>
                      <MarkdownRenderer content={selectedLesson.application_pratique} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b-2 border-green-500">
                        4. Auto-évaluation et méta-cognition
                      </h3>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-500/10 border border-green-500/10 rounded-xl p-5">
                          <h4 className="font-bold text-green-400 mb-3 text-sm">
                            Ce que je maîtrise bien :
                          </h4>
                          <MarkdownRenderer content={selectedLesson.maitrise_bien} />
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/10 rounded-xl p-5">
                          <h4 className="font-bold text-orange-400 mb-3 text-sm">
                            Ce que je dois améliorer :
                          </h4>
                          <MarkdownRenderer content={selectedLesson.a_ameliorer} />
                        </div>

                        <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-5">
                          <h4 className="font-bold text-green-300 mb-3 text-sm">
                            Stratégie pour progresser :
                          </h4>
                          <MarkdownRenderer content={selectedLesson.strategie_progression} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {lessons.length === 0 && (
                  <div className="text-center py-20">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-500">Aucune leçon disponible pour le moment</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="bilan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  Bilan final (à remplir en fin de semestre)
                </h2>
                <p className="text-gray-500 mb-8 text-sm">
                  Réflexion globale sur l&apos;ensemble du cours
                </p>

                {finalAssessment && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-3">
                        1. Ce que j&apos;ai le plus appris dans ce cours :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-5">
                        <MarkdownRenderer content={finalAssessment.appris_plus} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-3">
                        2. Les compétences que je peux réutiliser ailleurs :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-5">
                        <MarkdownRenderer content={finalAssessment.competences_reutilisables} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-3">
                        3. Mon plus grand défi :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-5">
                        <MarkdownRenderer content={finalAssessment.plus_grand_defi} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-3">
                        4. Mes prochaines étapes d&apos;apprentissage :
                      </h3>
                      <div className="bg-white/5 rounded-xl p-5">
                        <MarkdownRenderer content={finalAssessment.prochaines_etapes} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  )
}
