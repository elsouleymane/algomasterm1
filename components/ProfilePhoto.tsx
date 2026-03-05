'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProfilePhotoProps {
  photoUrl: string
  name: string
  size?: 'small' | 'medium' | 'large'
}

export default function ProfilePhoto({ photoUrl, name, size = 'large' }: ProfilePhotoProps) {
  const sizes = {
    small: { container: 'w-32 h-32', image: 128 },
    medium: { container: 'w-48 h-48', image: 192 },
    large: { container: 'w-72 h-72 md:w-96 md:h-96', image: 384 }
  }

  const currentSize = sizes[size]

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full opacity-75"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div className={`relative ${currentSize.container} p-2`}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          <motion.rect
            x="2"
            y="2"
            width="96"
            height="96"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="2"
            rx="50"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{
              pathLength: 1,
              pathOffset: [0, -1],
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              pathOffset: {
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))',
            }}
          />
        </svg>

        <motion.div
          className="absolute inset-1 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px rgba(6,182,212,0.3)',
              '0 0 40px rgba(6,182,212,0.6)',
              '0 0 20px rgba(6,182,212,0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.1) 100%)',
          }}
        />

        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={photoUrl}
            alt={name}
            fill
            className="object-cover"
            priority
            sizes={`${currentSize.image}px`}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI * 2) / 8) * 150],
              y: [0, Math.sin((i * Math.PI * 2) / 8) * 150],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border border-cyan-500/20"
          animate={{
            scale: [1, 1.2 + index * 0.1],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
