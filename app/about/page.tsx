'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Code2,
  Brain,
  Sparkles,
  Target,
  Zap,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react'
import { fetchProfile, type Profile } from '@/lib/supabase'
import ModernBackground from '@/components/ModernBackground'
import CustomCursor from '@/components/CustomCursor'
import ProfilePhoto from '@/components/ProfilePhoto'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await fetchProfile()
      setProfile(data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
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
      <CustomCursor />
      <ModernBackground />

      <div className="relative min-h-screen text-white">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
        >
          <div className="container mx-auto px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </motion.header>

        <div className="pt-28 pb-20">
          <div className="container mx-auto px-6">
            {/* Horizontal profile banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-8 border border-white/10 mb-10"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ProfilePhoto
                    photoUrl={profile?.photo_url || '/images/profile.jpg'}
                    name={profile?.name || 'El adj Souleymane Nuhu'}
                    size="large"
                  />
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold mb-3"
                  >
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      {profile?.name || 'El adj Souleymane Nuhu'}
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-300 mb-4"
                  >
                    {profile?.title || 'Étudiant Master 1 Big Data Analytics'}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3 justify-center md:justify-start"
                  >
                    {(profile?.github_url || 'https://github.com/elsouleymane') && (
                      <a
                        href={profile?.github_url || 'https://github.com/elsouleymane'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {profile?.linkedin_url && (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {profile?.email && (
                      <a
                        href={`mailto:${profile.email}`}
                        className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-110"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Single column stacked sections */}
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold">À propos</h2>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {profile?.bio || "Passionné par la data science, l'algorithmique et le développement web. Je documente mon apprentissage à travers ce portfolio évolutif."}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Formation</h2>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-bold text-cyan-400 mb-1">
                      Master 1 Big Data Analytics
                    </h3>
                    <p className="text-gray-400 text-sm">UVCI - En cours</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="glass rounded-2xl p-8 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Objectifs</h2>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      {
                        icon: Sparkles,
                        text: 'Maîtriser les algorithmes et structures de données',
                      },
                      {
                        icon: Zap,
                        text: 'Créer des solutions data-driven innovantes',
                      },
                      {
                        icon: Award,
                        text: 'Devenir Data Engineer / Data Scientist',
                      },
                      {
                        icon: BookOpen,
                        text: 'Contribuer à des projets open source',
                      },
                    ].map((goal, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg border border-white/5"
                      >
                        <goal.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{goal.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Stack Technique</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Python',
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Node.js',
                    'SQL',
                    'MongoDB',
                    'Supabase',
                    'Pandas',
                    'NumPy',
                    'Tailwind CSS',
                    'Git',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="glass rounded-2xl p-10 border border-white/10 text-center"
              >
                <h2 className="text-3xl font-bold mb-3">
                  Collaborons ensemble ! 🚀
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Vous avez un projet data ou web ? Je suis ouvert aux opportunités et collaborations.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
                  >
                    Me contacter
                  </Link>
                  <Link
                    href="/lessons"
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    Voir mes leçons
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
