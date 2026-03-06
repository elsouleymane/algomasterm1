'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchLessons } from '@/lib/supabase'

export default function LessonsRedirect() {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      try {
        const lessons = await fetchLessons()
        if (lessons.length > 0) {
          router.push(`/lessons/${lessons[0].slug}`)
        }
      } catch {
        // If no lessons, stay on loading page
      }
    }
    redirect()
  }, [router])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
