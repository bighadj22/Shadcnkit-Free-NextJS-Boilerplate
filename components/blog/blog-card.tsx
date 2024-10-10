"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { ReactNode } from 'react'

export default function BlogCard({ title, description, image, isArabic = false }: {
  title: ReactNode,
  description: ReactNode,
  image: string,
  isArabic?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setMousePosition({ x, y })
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="relative w-full h-[450px] rounded-2xl border border-border hover:cursor-pointer overflow-hidden bg-card text-card-foreground shadow-lg flex flex-col"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--card-foreground), 0.1), transparent 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10 p-4 flex flex-col h-full">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 flex-shrink-0">
          <Image
            src={image}
            alt="Blog thumbnail"
            fill
            className="object-cover object-center"
          />
        </div>
        <motion.h3 
          className={`text-lg font-bold mb-2 ${isArabic ? 'text-right font-arabic' : 'text-left'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          dir={isArabic ? 'rtl' : 'ltr'}
          style={{ textAlign: isArabic ? 'right' : 'left' }}
        >
          {title}
        </motion.h3>
        <motion.div 
          className={`text-sm text-muted-foreground mb-3 overflow-hidden flex-grow ${isArabic ? 'text-right font-arabic' : 'text-left'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          dir={isArabic ? 'rtl' : 'ltr'}
          style={{ textAlign: isArabic ? 'right' : 'left' }}
        >
          <div className="line-clamp-3">{description}</div>
        </motion.div>
        <motion.div 
          className="flex items-center mt-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Image
            src="/blog/me.svg"
            alt="Bilal Mansouri"
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
          <div>
            <p className="font-semibold text-sm">Bilal Mansouri</p>
            <p className="text-xs text-muted-foreground">Indie Maker and Founder of Shadcnkit</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}