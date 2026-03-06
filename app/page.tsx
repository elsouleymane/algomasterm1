'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Github, Linkedin, Mail, Download, ExternalLink, BookOpen, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { fetchLessons, fetchProfile, Profile, Lesson } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import ProfilePhoto from '@/components/ProfilePhoto'
import LessonTimeline from '@/components/LessonTimeline'
import Footer from '@/components/Footer'
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <CustomCursor />
      <ModernBackground />

      <div className="relative min-h-screen text-white overflow-hidden">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
        >
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AlgoMaster
              </span>
            </motion.div>

            <div className="flex items-center gap-2">
              <Link href="/about" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all group">
                <User className="w-4 h-4 text-cyan-400" />
                <span className="hidden md:inline text-sm">À propos</span>
              </Link>
              <Link href="/lessons" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all group">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="hidden md:inline text-sm">Leçons</span>
              </Link>
              <Link href="/contact" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/20 transition-all group">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                <span className="hidden md:inline text-sm">Contact</span>
              </Link>
            </div>
          </nav>
        </motion.header>

        <section id="about" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="flex flex-col items-center text-center mb-10"
            >
              <ProfilePhoto
                photoUrl={profile?.photo_url || '/images/profile.jpg'}
                name={profile?.name || 'El adj Souleymane Nuhu'}
                size="large"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {(profile?.name || 'El adj Souleymane Nuhu').split(' ').map((word, i, arr) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {i === arr.length - 1 ? (
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl text-cyan-400 font-semibold mb-3"
              >
                {profile?.title || 'Étudiant Master 1 Big Data Analytics'}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-2 text-gray-400 mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Disponible pour des opportunités</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
              >
                {profile?.bio || 'Passionné par l\'algorithmique, la data science et le développement full-stack. Je documente mon parcours d\'apprentissage à travers ce portfolio évolutif.'}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex justify-center gap-4 mb-10"
            >
              {[
                { icon: Github, url: profile?.github_url || 'https://github.com/elsouleymane', label: 'GitHub' },
                { icon: Linkedin, url: profile?.linkedin_url || '#', label: 'LinkedIn' },
                { icon: Mail, url: `mailto:${profile?.email || 'contact@example.com'}`, label: 'Email' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center flex-wrap gap-4 mb-12"
            >
              <Link
                href="/lessons"
                className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explorer les Leçons</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="px-8 py-3 border-2 border-cyan-400/50 rounded-xl font-semibold hover:bg-cyan-400/10 transition-all duration-300 flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Télécharger CV</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex flex-wrap justify-around gap-6">
                {[
                  {
                    label: 'Leçons',
                    value: lessons.length,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    label: 'Semaines',
                    value: lessons.length > 0 ? Math.max(...lessons.map(l => l.week_number || 0)) : 0,
                    color: 'from-orange-500 to-amber-500'
                  },
                  {
                    label: 'Réflexions',
                    value: lessons.filter(l => l.journal_reflexif && l.journal_reflexif.length > 100).length,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    label: 'Synthèses',
                    value: lessons.filter(l => l.synthese_personnelle && l.synthese_personnelle.length > 50).length,
                    color: 'from-purple-500 to-pink-500'
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="text-center px-6"
                  >
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="lessons" className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Parcours d&apos;
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Apprentissage
                </span>
              </motion.h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4" />
              <p className="text-lg text-gray-400 max-w-2xl">
                Découvrez mes réflexions, applications pratiques et auto-évaluations
                pour chaque leçon du cours d&apos;Algorithmique et Complexité
              </p>
            </motion.div>

            <LessonTimeline lessons={lessons} />
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
