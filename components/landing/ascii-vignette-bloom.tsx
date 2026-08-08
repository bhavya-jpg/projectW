'use client'

import { useEffect, useRef } from 'react'

export function AsciiVignetteBloomBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let startTime = performance.now()

    // Config parameters
    const cellSize = 16
    const bgBlur = 12
    const bgOpacity = 0.9
    const vignetteIntensity = 0.45
    const bloomIntensity = 0.25
    const animSpeed = 1.0
    const animIntensity = 0.6

    // Offscreen canvas for procedural background sampling
    const sourceCanvas = document.createElement('canvas')
    const sourceCtx = sourceCanvas.getContext('2d')

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      const width = rect?.width || window.innerWidth
      const height = rect?.height || window.innerHeight

      canvas.width = width
      canvas.height = height

      sourceCanvas.width = width
      sourceCanvas.height = height

      if (sourceCtx) {
        // Draw procedural source image aligned with site color scheme (deep espresso/charcoal base with warm cream & violet ambient glows)
        const grad = sourceCtx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          0,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.75
        )
        grad.addColorStop(0, '#1c1917') // warm dark espresso
        grad.addColorStop(0.35, '#121016') // deep violet charcoal
        grad.addColorStop(0.7, '#0c0c0e')
        grad.addColorStop(1, '#080808')

        sourceCtx.fillStyle = grad
        sourceCtx.fillRect(0, 0, width, height)

        // Accent ambient glowing orbs matching site's BackgroundGlow palette
        // Violet orb
        sourceCtx.fillStyle = 'rgba(139, 92, 246, 0.15)'
        sourceCtx.beginPath()
        sourceCtx.arc(width * 0.25, height * 0.35, 260, 0, Math.PI * 2)
        sourceCtx.fill()

        // Rose / Warm Coral orb
        sourceCtx.fillStyle = 'rgba(244, 63, 94, 0.12)'
        sourceCtx.beginPath()
        sourceCtx.arc(width * 0.75, height * 0.65, 280, 0, Math.PI * 2)
        sourceCtx.fill()

        // Warm Cream highlight orb
        sourceCtx.fillStyle = 'rgba(244, 244, 240, 0.08)'
        sourceCtx.beginPath()
        sourceCtx.arc(width * 0.5, height * 0.5, 320, 0, Math.PI * 2)
        sourceCtx.fill()
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001 * animSpeed
      const width = canvas.width
      const height = canvas.height

      if (width === 0 || height === 0) return

      // 1. Base dark background
      ctx.fillStyle = '#0c0c0c'
      ctx.fillRect(0, 0, width, height)

      // Blurred ambient source layer
      if (bgOpacity > 0 && sourceCanvas.width > 0) {
        ctx.save()
        ctx.globalAlpha = bgOpacity
        ctx.filter = `blur(${bgBlur}px) brightness(1.05) contrast(1.1)`
        ctx.drawImage(sourceCanvas, 0, 0)
        ctx.restore()
      }

      // 2 & 3. Mosaic rendering with site-matched HSL palette
      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)

      ctx.save()
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize
          const y = r * cellSize

          // Center of cell
          const cx = x + cellSize / 2
          const cy = y + cellSize / 2

          // Wave animation offset
          const distFromCenter = Math.hypot(cx - width / 2, cy - height / 2)
          const wave = Math.sin(elapsed * 1.8 + distFromCenter * 0.007) * animIntensity

          const normX = cx / width
          const normY = cy / height

          // Site color palette (shifting between warm amber/cream 35-45 deg and subtle violet 260-280 deg)
          const hueBlend = Math.sin(elapsed * 0.8 + normX * 2 + normY * 2)
          const baseHue = hueBlend > 0 ? 38 + hueBlend * 12 : 265 + hueBlend * 15
          const saturation = hueBlend > 0 ? 25 : 35

          // Luminance calculation
          const baseLum = 10 + Math.cos(elapsed * 1.4 + normY * 3.5 + wave) * 6 + Math.max(0, 18 - distFromCenter * 0.025)

          // Size of mosaic tile based on luminance
          const sizeFactor = Math.min(1, Math.max(0.25, (baseLum / 22) + wave * 0.18))
          const drawSize = (cellSize - 1) * sizeFactor

          ctx.fillStyle = `hsl(${baseHue}, ${saturation}%, ${Math.min(75, Math.max(8, baseLum))}%)`
          ctx.fillRect(
            cx - drawSize / 2,
            cy - drawSize / 2,
            drawSize,
            drawSize
          )
        }
      }
      ctx.restore()

      // 5. Vignette Layer
      if (vignetteIntensity > 0) {
        ctx.save()
        const radGrad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.25,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.75
        )
        radGrad.addColorStop(0, 'rgba(0,0,0,0)')
        radGrad.addColorStop(1, `rgba(12,12,12,${vignetteIntensity})`)

        ctx.fillStyle = radGrad
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // 5. Bloom Layer
      if (bloomIntensity > 0) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = bloomIntensity
        ctx.filter = 'blur(18px) brightness(1.25)'
        ctx.drawImage(canvas, 0, 0)
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none size-full z-0 opacity-80"
      aria-hidden="true"
    />
  )
}
