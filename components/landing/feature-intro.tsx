'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Brain, Workflow, Zap, PhoneCall, TrendingUp } from 'lucide-react'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'
import { SERVICES } from '@/lib/config'

function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.35 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full min-h-[120px]">
      <motion.span
        className="font-sans text-6xl md:text-7xl text-foreground font-bold tracking-tight"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        AI
      </motion.span>
    </div>
  )
}

function LayoutAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ['grid-cols-2', 'grid-cols-3', 'grid-cols-1']

  return (
    <div className="h-full flex items-center justify-center min-h-[90px]">
      <motion.div
        className={`grid ${layouts[layout]} gap-1.5 w-full max-w-[140px]`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-foreground/20 dark:bg-white/20 rounded-md h-5 w-full"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function GlobalNetwork() {
  const [pulses] = useState([0, 1, 2, 3, 4])

  return (
    <div className="flex items-center justify-center h-full relative min-h-[120px]">
      <Globe className="w-14 h-14 md:w-16 md:h-16 text-foreground/80 dark:text-white/80 z-10" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-14 h-14 md:w-16 md:h-16 border-2 border-foreground/20 dark:border-white/30 rounded-full"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export function FeatureIntro() {
  const referralEngine = SERVICES.find((s) => s.title.includes('Referral')) || SERVICES[0]
  const crmSuite = SERVICES.find((s) => s.title.includes('CRM')) || SERVICES[1]
  const voiceAgents = SERVICES.find((s) => s.title.includes('Voice')) || SERVICES[2]
  const aiBrain = SERVICES.find((s) => s.title.includes('AI Brain')) || SERVICES[3]

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title={
            <>
              What we do.{' '}
              <span className="text-muted-foreground">End-to-end AI solutions.</span>
            </>
          }
        />
      </Reveal>

      {/* 4-Box Bento Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(210px,auto)]">
        
        {/* Box 1: AI Brain - Tall (2x2) */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-foreground/30 transition-colors cursor-pointer overflow-hidden group shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex-1 flex items-center justify-center py-4">
            <TypeTester />
          </div>
          <div className="mt-4">
            <h3 className="font-sans text-xl md:text-2xl text-foreground font-semibold flex items-center gap-2.5">
              <Brain className="w-6 h-6 text-primary shrink-0" />
              {aiBrain.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mt-2.5 leading-relaxed">
              {aiBrain.description}
            </p>
          </div>
        </motion.div>

        {/* Box 2: Smart CRM Suite - Standard (2x1) */}
        <motion.div
          className="md:col-span-2 bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-foreground/30 transition-colors cursor-pointer overflow-hidden group shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 0.99 }}
        >
          <div className="flex-1 flex items-center justify-center py-2">
            <LayoutAnimation />
          </div>
          <div className="mt-4">
            <h3 className="font-sans text-xl md:text-2xl text-foreground font-semibold flex items-center gap-2.5">
              <Workflow className="w-6 h-6 text-primary shrink-0" />
              {crmSuite.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mt-2.5 leading-relaxed">
              {crmSuite.description}
            </p>
          </div>
        </motion.div>

        {/* Box 3: Referral & Growth Engine - Standard (2x1) */}
        <motion.div
          className="md:col-span-2 bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-foreground/30 transition-colors cursor-pointer overflow-hidden group shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2.5 py-1">
            <div className="size-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div className="size-12 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground/70 shadow-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-sans text-xl md:text-2xl text-foreground font-semibold flex items-center gap-2.5">
              {referralEngine.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mt-2.5 leading-relaxed">
              {referralEngine.description}
            </p>
          </div>
        </motion.div>

        {/* Box 4: AI Voice Agents - Wide Banner (4x1) */}
        <motion.div
          className="md:col-span-4 bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-foreground/30 transition-colors cursor-pointer overflow-hidden group shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 0.99 }}
        >
          <div className="w-full md:w-1/3 flex items-center justify-center py-2">
            <GlobalNetwork />
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="font-sans text-xl md:text-2xl text-foreground font-semibold flex items-center gap-2.5">
              <PhoneCall className="w-6 h-6 text-primary shrink-0" />
              {voiceAgents.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mt-2.5 leading-relaxed">
              {voiceAgents.description}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}





