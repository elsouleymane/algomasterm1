'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Mail,
  Send,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import ModernBackground from '@/components/ModernBackground'
import { createContact } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      await createContact(formData)

      setSent(true)
      toast.success('Message envoyé avec succès !')

      setTimeout(() => {
        setSent(false)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    } catch (error) {
      console.error('Erreur envoi:', error)
      toast.error('Erreur lors de l\'envoi du message. Réessayez.')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@example.com',
      href: 'mailto:contact@example.com',
      color: 'bg-green-500/10 text-green-400',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+225 XX XX XX XX XX',
      href: 'tel:+225XXXXXXXXXX',
      color: 'bg-orange-500/10 text-orange-400',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Côte d\'Ivoire',
      href: 'https://maps.google.com/?q=Cote+d+Ivoire',
      color: 'bg-green-500/10 text-green-400',
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/elsouleymane',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: '#',
    },
  ]

  return (
    <>
      <Toaster position="top-right" />
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
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">Contactez-moi</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Une question ? Un projet ? N&apos;hésitez pas à me contacter, je vous répondrai dans les plus brefs délais !
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-3 glass rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Send className="w-6 h-6 text-green-400" />
                  Envoyez un message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      placeholder="votre.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Sujet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      placeholder="Ex: Proposition de collaboration"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || sent}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : sent ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2 space-y-4"
              >
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="block glass rounded-xl p-5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${info.color} flex items-center justify-center flex-shrink-0`}>
                          <info.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{info.label}</p>
                          <p className="font-medium text-gray-300 text-sm">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="glass rounded-xl p-5"
                >
                  <h3 className="font-bold text-white mb-3 text-sm">Suivez-moi</h3>
                  <div className="flex gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                        title={social.label}
                      >
                        <social.icon className="w-5 h-5 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="glass rounded-xl p-5"
                >
                  <h3 className="font-bold text-white mb-3 text-sm">Disponibilité</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-400">Actuellement disponible</span>
                    </div>
                    <p className="text-gray-500">
                      Temps de réponse : <span className="text-green-400">24-48h</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
