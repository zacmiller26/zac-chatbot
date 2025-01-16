'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface WaterfallProps {
  children: ReactNode | ReactNode[]
  className?: string
  stagger?: number
  yOffset?: number
  duration?: number
}

export default function Waterfall({
  children,
  className,
  stagger = 0.25,
  yOffset = 20,
  duration = 0.8,
  ...props
}: WaterfallProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: stagger
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration
      }
    }
  }

  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={cn('flex flex-wrap gap-6', className)}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
