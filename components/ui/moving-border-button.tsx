'use client'

import React, { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

type MovingBorderButtonProps<T extends React.ElementType> = {
  borderRadius?: string
  children: React.ReactNode
  as?: T
  containerClassName?: string
  borderClassName?: string
  duration?: number
  className?: string
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style'>

export function MovingBorderButton<T extends React.ElementType = 'button'>(
  props: MovingBorderButtonProps<T>
) {
  const {
    borderRadius = '1.75rem',
    children,
    as,
    containerClassName,
    borderClassName,
    duration,
    className,
    ...otherProps
  } = props
  const Component = (as ?? 'button') as React.ElementType

  return (
    <Component
      className={cn(
        'relative overflow-hidden bg-transparent p-px text-xl',
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              'h-20 w-20 bg-[radial-gradient(#10b981_40%,transparent_60%)] opacity-[0.8]',
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center border border-emerald-900/10 bg-white/75 text-sm text-foreground antialiased backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-white',
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  )
}

type MovingBorderProps = React.SVGProps<SVGSVGElement> & {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
}

export function MovingBorder({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement | null>(null)
  const progress = useMotionValue<number>(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength()
    if (length) {
      const pxPerMillisecond = length / duration
      progress.set((time * pxPerMillisecond) % length)
    }
  })

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x)
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y)
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
