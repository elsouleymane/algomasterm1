'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Code2, Zap, BookOpen, Award, TrendingUp, Database, Cpu, GitBranch, Network, Search, BarChart, ArrowRight } from 'lucide-react'
import { Lesson } from '@/lib/supabase'

interface LessonTimelineProps {
  lessons: Lesson[]
}

const getIconForLesson = (lesson: Lesson) => {
  const title = lesson.title.toLowerCase()

  if (title.includes('recherche') || title.includes('tri')) return Search
  if (title.includes('graphe') || title.includes('arbre')) return Network
  if (title.includes('complexité') || title.includes('analyse')) return BarChart
  if (title.includes('récursivité') || title.includes('récursif')) return GitBranch
  if (title.includes('structure') || title.includes('données')) return Database
  if (title.includes('algorithmique') || title.includes('algo')) return Cpu

  return Code2
}

const getWeekColor = (weekNumber: number | null) => {
  if (!weekNumber) return 'from-gray-400 to-gray-600'

  const colors = [
    'from-cyan-400 to-blue-600',
    'from-blue-400 to-purple-600',
    'from-purple-400 to-pink-600',
    'from-pink-400 to-red-600',
    'from-red-400 to-orange-600',
    'from-orange-400 to-yellow-600',
    'from-yellow-400 to-green-600',
    'from-green-400 to-teal-600',
    'from-teal-400 to-cyan-600',
  ]

  return colors[(weekNumber - 1) % colors.length]
}

const calculateMasteryScore = (lesson: Lesson) => {
  let score = 0

  if (lesson.journal_reflexif && lesson.journal_reflexif.length > 100) score += 3
  if (lesson.synthese_personnelle && lesson.synthese_personnelle.length > 100) score += 3
  if (lesson.application_pratique && lesson.application_pratique.length > 100) score += 2
  if (lesson.maitrise_bien && lesson.maitrise_bien.length > 50) score += 1
  if (lesson.strategie_progression && lesson.strategie_progression.length > 50) score += 1

  return Math.min(score, 10)
}

export default function LessonTimeline({ lessons }: LessonTimelineProps) {
  if (lessons.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-md mx-auto"
        >
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <h3 className="text-2xl font-bold mb-4">Aucune leçon disponible</h3>
          <p className="text-gray-400">
            Les leçons seront ajoutées au fur et à mesure de votre progression dans le cours d&apos;algorithmique.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {lessons.map((lesson, index) => {
          const IconComponent = getIconForLesson(lesson)
          const weekColor = getWeekColor(lesson.week_number)
          const masteryScore = calculateMasteryScore(lesson)

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/lessons/${lesson.slug}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative group cursor-pointer h-full"
                >
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${weekColor} flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {lesson.week_number && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${weekColor} text-white`}>
                            S{lesson.week_number}
                          </span>
                        )}
                        {lesson.date && (
                          <span className="text-xs text-gray-500">
                            {new Date(lesson.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {lesson.title}
                    </h3>

                    {lesson.journal_reflexif && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-grow">
                        {lesson.journal_reflexif}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lesson.synthese_personnelle && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                          Synthèse
                        </span>
                      )}
                      {lesson.application_pratique && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                          Application
                        </span>
                      )}
                      {lesson.strategie_progression && (
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                          Stratégie
                        </span>
                      )}
                    </div>

                    {masteryScore > 0 && (
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Maîtrise</span>
                          <span className="text-xs font-bold text-cyan-400">{masteryScore}/10</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${weekColor}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${masteryScore * 10}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Voir les détails</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{lessons.length}</div>
            <div className="text-xs text-gray-400">Leçons</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {lessons.filter(l => calculateMasteryScore(l) >= 7).length}
            </div>
            <div className="text-xs text-gray-400">Maîtrisées</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {lessons.filter(l => {
                const score = calculateMasteryScore(l)
                return score > 0 && score < 7
              }).length}
            </div>
            <div className="text-xs text-gray-400">En cours</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
