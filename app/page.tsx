'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { fetchLessons, fetchProfile, Profile, Lesson } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import ProfilePhoto from '@/components/ProfilePhoto'
import LessonTimeline from '@/components/LessonTimeline'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [profileData, lessonsData] = await Promise.all([
        fetchProfile(),
        fetchLessons()
      ])

      setProfile(profileData)
      setLessons(lessonsData)
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      toast.error('Erreur de connexion à la base de données')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-12 h-12 border-3 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <ModernBackground />

      <div className="relative min-h-screen text-white overflow-hidden">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-slate-950/70 border-b border-white/5"
        >
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">
                AlgoMaster
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium">
                À propos
              </Link>
              <Link href="/lessons" className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium">
                Leçons
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium">
                Contact
              </Link>
            </div>
          </nav>
        </motion.header>

        <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <ProfilePhoto
                  photoUrl={profile?.photo_url || '/images/profile.jpg'}
                  name={profile?.name || 'El adj Souleymane Nuhu'}
                  size="large"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {(profile?.name || 'El adj Souleymane Nuhu').split(' ').map((word, i, arr) => (
                    <span key={i} className="inline-block mr-2">
                      {i === arr.length - 1 ? (
                        <span className="text-green-400">{word}</span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 mb-8"
                >
                  <h2 className="text-xl md:text-2xl text-orange-400 font-medium">
                    {profile?.title || 'Étudiant Master 1 Big Data Analytics'}
                  </h2>

                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Disponible pour des opportunités</span>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    {profile?.bio || 'Passionné par l\'algorithmique, la data science et le développement full-stack. Je documente mon parcours d\'apprentissage à travers ce portfolio évolutif.'}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
                >
                  {[
                    { label: 'Leçons', value: lessons.length, color: 'text-green-400' },
                    {
                      label: 'Semaines',
                      value: lessons.length > 0 ? Math.max(...lessons.map(l => l.week_number || 0)) : 0,
                      color: 'text-orange-400'
                    },
                    {
                      label: 'Réflexions',
                      value: lessons.filter(l => l.journal_reflexif && l.journal_reflexif.length > 100).length,
                      color: 'text-green-400'
                    },
                    {
                      label: 'Synthèses',
                      value: lessons.filter(l => l.synthese_personnelle && l.synthese_personnelle.length > 50).length,
                      color: 'text-orange-400'
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/5 rounded-xl p-3 text-center"
                    >
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  <Link
                    href="/lessons"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm"
                  >
                    <span>Explorer les Leçons</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button className="px-6 py-3 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center space-x-2 text-sm text-gray-300">
                    <Download className="w-4 h-4" />
                    <span>Télécharger CV</span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex space-x-3"
                >
                  {[
                    { icon: Github, url: profile?.github_url || 'https://github.com/elsouleymane', label: 'GitHub' },
                    { icon: Linkedin, url: profile?.linkedin_url || '#', label: 'LinkedIn' },
                    { icon: Mail, url: `mailto:${profile?.email || 'contact@example.com'}`, label: 'Email' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      title={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 hover:text-green-400 transition-colors" />
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="lessons" className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Parcours d&apos;
                <span className="text-green-400">Apprentissage</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Découvrez mes réflexions, applications pratiques et auto-évaluations
                pour chaque leçon du cours d&apos;Algorithmique et Complexité
              </p>
            </motion.div>

            <LessonTimeline lessons={lessons} />
          </div>
        </section>

        <footer className="py-10 border-t border-white/5 bg-slate-950/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-500 text-sm">
                  © 2025 {profile?.name || 'El adj Souleymane Nuhu'} - Courses Portfolio
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Université Virtuelle de Côte d&apos;Ivoire (UVCI) | Master Big Data Analytics
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <span>Propulsé par</span>
                <span className="text-green-500 font-medium">Next.js</span>
                <span>•</span>
                <span className="text-green-500 font-medium">Supabase</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
