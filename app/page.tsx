"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Sparkles } from "lucide-react"

export default function CelebrationPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const triggerConfetti = async () => {
    if (!isClient) return

    // Dynamic import to avoid SSR issues
    const confetti = (await import("canvas-confetti")).default

    // Multiple confetti bursts for extra celebration
    const duration = 3000
    const end = Date.now() + duration

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"]

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Big burst in the center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    })
  }

  const triggerFireworks = async () => {
    if (!isClient) return

    const confetti = (await import("canvas-confetti")).default

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"]

    // Fireworks effect
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      colors: colors,
    }

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-2 text-white">
            <Trophy className="h-12 w-12" />
            <Sparkles className="h-8 w-8 animate-pulse" />
            <Star className="h-10 w-10" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">YOU DID IT!</h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">Time to celebrate your amazing win! 🎉</p>
        </div>

        {/* Celebration Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={triggerConfetti}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-6 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              🎊 CONFETTI TIME! 🎊
            </Button>
            <Button
              onClick={triggerFireworks}
              size="lg"
              className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 text-xl px-8 py-6 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              🎆 FIREWORKS! 🎆
            </Button>
          </div>

          <p className="text-white/80 text-lg">Click the buttons above to celebrate! 🎉</p>
        </div>

        {/* Motivational Message */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">You're Absolutely Amazing! ✨</h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Every win deserves to be celebrated, no matter how big or small. You worked hard for this moment, and you
            should be proud of yourself!
          </p>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold text-white">🏆</div>
            <div className="text-white font-semibold">Champion</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold text-white">⭐</div>
            <div className="text-white font-semibold">Superstar</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <div className="text-3xl font-bold text-white">🎯</div>
            <div className="text-white font-semibold">Goal Crusher</div>
          </div>
        </div>
      </div>
    </div>
  )
}
