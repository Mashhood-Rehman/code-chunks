'use client'

import React, { useEffect, useState } from 'react'

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-radial from-gray-800 to-transparent opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white z-10">Welcome to My Landing Page</h1>
      </div>
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white opacity-20 animate-pulse"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}













































































    'use client'

    import React, { useEffect, useRef } from 'react'

    const PARTICLE_SIZE = 4
    const PARTICLE_SPACING = 20
    const WAVE_SPEED = 0.1

    interface Particle {
    x: number
    y: number
    baseY: number
    }

    export default function Component() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const animationFrameRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles()
        }

        const initParticles = () => {
        particlesRef.current = []
        for (let x = 0; x < canvas.width; x += PARTICLE_SPACING) {
            for (let y = 0; y < canvas.height; y += PARTICLE_SPACING) {
            particlesRef.current.push({ x, y, baseY: y })
            }
        }
        }

        const animate = () => {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const { x: mouseX, y: mouseY } = mouseRef.current

        particlesRef.current.forEach((particle) => {
            const dx = mouseX - particle.x
            const dy = mouseY - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 200

            if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx)
            const force = (1 - distance / maxDistance) * 20
            particle.y = particle.baseY + Math.sin(angle) * force
            } else {
            particle.y += (particle.baseY - particle.y) * WAVE_SPEED
            }

            ctx.fillStyle = 'white'
            ctx.fillRect(particle.x, particle.y, PARTICLE_SIZE, PARTICLE_SIZE)
        })

        animationFrameRef.current = requestAnimationFrame(animate)
        }

        const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current = { x: event.clientX, y: event.clientY }
        }

        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('mousemove', handleMouseMove)

        resizeCanvas()
        animate()

        return () => {
        window.removeEventListener('resize', resizeCanvas)
        window.removeEventListener('mousemove', handleMouseMove)
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
        }
        }
    }, [])

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white z-10 text-center px-4">
            Welcome to the<br />Dynamic Particle Grid
            </h1>
        </div>
        </div>
    )
    }