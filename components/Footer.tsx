'use client'

import Link from 'next/link'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil', href: '/' },
        { label: 'Leçons', href: '/lessons' },
        { label: 'À propos', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Portfolio', href: '/' },
        { label: 'Projets', href: '/#projects' },
        { label: 'Compétences', href: '/#skills' },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/elsouleymane',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:contact@example.com',
      label: 'Email',
    },
  ]

  return (
    <footer className="relative mt-20 bg-slate-950/80 border-t border-white/5">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-green-400 mb-3">
              AlgoMaster Portfolio
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Portfolio évolutif documentant mon parcours d&apos;apprentissage en algorithmique et Big Data Analytics.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-500 hover:text-green-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-3 text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs text-center md:text-left">
              © {currentYear} El adj Souleymane Nuhu. Tous droits réservés.
            </p>
            <p className="text-gray-600 text-xs">
              Propulsé par Next.js • Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
