'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Brain, Code2, Zap, BookOpen, Award, TrendingUp, Database, Cpu, GitBranch, Network, Search, BarChart } from 'lucide-react'
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
    'from-green-500 to-green-700',
    'from-orange-400 to-orange-600',
    'from-green-400 to-emerald-600',
    'from-amber-400 to-orange-600',
    'from-emerald-400 to-green-600',
    'from-orange-500 to-amber-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-teal-400 to-green-600',
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
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-400" />
          <h3 className="text-2xl font-bold mb-4">Aucune leçon disponible</h3>
          <p className="text-gray-400">
            Les leçons seront ajoutées au fur et à mesure de votre progression dans le cours d&apos;algorithmique.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-green-500 via-orange-500 to-green-500 opacity-20" />
        <motion.div
          className="absolute top-0 w-full h-32 bg-gradient-to-b from-green-400 to-transparent"
          animate={{
            y: ['0%', '800%', '0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="space-y-16">
        {lessons.map((lesson, index) => {
          const IconComponent = getIconForLesson(lesson)
          const isLeft = index % 2 === 0
          const weekColor = getWeekColor(lesson.week_number)
          const masteryScore = calculateMasteryScore(lesson)

          const hasSubstantialContent =
            (lesson.journal_reflexif && lesson.journal_reflexif.length > 50) ||
            (lesson.synthese_personnelle && lesson.synthese_personnelle.length > 50)

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className="w-5/12">
                <Link href={`/lessons/${lesson.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: isLeft ? 5 : -5 }}
                    className="relative group cursor-pointer"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${weekColor} rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                      whileHover={{ scale: 1.1 }}
                    />

                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {lesson.week_number && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${weekColor}`}>
                              Semaine {lesson.week_number}
                            </span>
                          )}
                          {hasSubstantialContent && (
                            <span className="text-2xl">📝</span>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          {lesson.date && (
                            <span className="text-xs text-gray-400">
                              {new Date(lesson.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          {masteryScore > 0 && (
                            <span className="text-sm font-bold text-green-400 mt-1">
                              Maîtrise: {masteryScore}/10
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                        {lesson.title}
                      </h3>

                      {lesson.journal_reflexif && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {lesson.journal_reflexif}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        {lesson.maitrise_bien && (
                          <div className="flex items-start space-x-2">
                            <span className="text-green-400 text-sm">✓</span>
                            <p className="text-xs text-gray-400 line-clamp-1">
                              {lesson.maitrise_bien}
                            </p>
                          </div>
                        )}

                        {lesson.a_ameliorer && (
                          <div className="flex items-start space-x-2">
                            <span className="text-orange-400 text-sm">→</span>
                            <p className="text-xs text-gray-400 line-clamp-1">
                              {lesson.a_ameliorer}
                            </p>
                          </div>
                        )}
                      </div>

                      {masteryScore > 0 && (
                        <div className="mt-4">
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${weekColor}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${masteryScore * 10}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {lesson.synthese_personnelle && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            💡 Synthèse
                          </span>
                        )}
                        {lesson.application_pratique && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            🛠️ Application
                          </span>
                        )}
                        {lesson.strategie_progression && (
                          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                            📈 Stratégie
                          </span>
                        )}
                      </div>

                      <motion.div
                        className="mt-4 flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          x: isLeft ? [0, 10, 0] : [0, -10, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <span className="text-sm font-semibold">
                          {isLeft ? 'Voir détails →' : '← Voir détails'}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </div>

              <div className="w-2/12 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-500 mb-2 font-bold"
                >
                  #{index + 1}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${weekColor} flex items-center justify-center shadow-lg cursor-pointer`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <IconComponent className="w-8 h-8 text-white" />

                  {index < 2 && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="mt-2 w-0.5 h-8 bg-gradient-to-b from-green-500 to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                />
              </div>

              <div className="w-5/12"></div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex justify-center mt-16"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-8 py-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{lessons.length}</div>
              <div className="text-xs text-gray-400">Leçons</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {lessons.filter(l => {
                  const score = calculateMasteryScore(l)
                  return score >= 7
                }).length}
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
        </div>
      </motion.div>
    </div>
  )
}
