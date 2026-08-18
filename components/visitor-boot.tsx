'use client'

import { useEffect } from 'react'
import { getVisitorId } from '@/lib/visitor-id'

export function VisitorBoot() {
  useEffect(() => {
    getVisitorId()
  }, [])
  return null
}
