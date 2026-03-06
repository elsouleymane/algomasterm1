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
    large: { container: 'w-72 h-72 md:w-80 md:h-80', image: 320 }
  }

  const currentSize = sizes[size]

  return (
    <div className="relative flex items-center justify-center">
      <div className={`relative ${currentSize.container} p-1`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-orange-500 opacity-60" />

        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 ring-2 ring-white/10"
          whileHover={{ scale: 1.03 }}
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
        </motion.div>
      </div>
    </div>
  )
}
