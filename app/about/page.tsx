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
        <div className="w-12 h-12 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <ModernBackground />

      <div className="relative min-h-screen text-white">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-slate-950/70 border-b border-white/5"
        >
          <div className="container mx-auto px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>
        </motion.header>

        <div className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center mb-16"
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <ProfilePhoto
                  photoUrl={profile?.photo_url || '/images/profile.jpg'}
                  name={profile?.name || 'El adj Souleymane Nuhu'}
                  size="large"
                />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="text-green-400">
                  {profile?.name || 'El adj Souleymane Nuhu'}
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 mb-8 max-w-3xl"
              >
                {profile?.title || 'Étudiant Master 1 Big Data Analytics'}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                {(profile?.github_url || 'https://github.com/elsouleymane') && (
                  <a
                    href={profile?.github_url || 'https://github.com/elsouleymane'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-7 h-7 text-green-400" />
                  <h2 className="text-2xl font-bold">À propos</h2>
                </div>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {profile?.bio || "Passionné par la data science, l'algorithmique et le développement web. Je documente mon apprentissage à travers ce portfolio évolutif."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-7 h-7 text-orange-400" />
                  <h2 className="text-2xl font-bold">Formation</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-bold text-green-400 mb-1">
                      Master 1 Big Data Analytics
                    </h3>
                    <p className="text-gray-500 text-sm">UVCI - En cours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-7 h-7 text-green-400" />
                  <h2 className="text-2xl font-bold">Stack Technique</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                    <div
                      key={skill}
                      className="px-3 py-2 bg-green-500/5 border border-green-500/10 rounded-lg text-center text-sm font-medium text-gray-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-7 h-7 text-orange-400" />
                  <h2 className="text-2xl font-bold">Objectifs</h2>
                </div>
                <div className="space-y-3">
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
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <goal.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{goal.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-16 text-center"
            >
              <div className="glass rounded-2xl p-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  Collaborons ensemble !
                </h2>
                <p className="text-gray-400 mb-8">
                  Vous avez un projet data ou web ? Je suis ouvert aux opportunités et collaborations.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Me contacter
                  </Link>
                  <Link
                    href="/lessons"
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-lg font-medium transition-colors"
                  >
                    Voir mes leçons
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
