"use client"

import {useEffect, useState} from "react"
import confetti from "canvas-confetti"
import {ShimmerButton} from "@/components/magicui/shimmer-button";

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
                origin: {x: 0},
                colors: colors,
            })
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: {x: 1},
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
            origin: {y: 0.6},
            colors: colors,
        })
    }

    const triggerFireworks = async () => {
        if (!isClient) return


        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"]

        const count = 200
        const defaults = {
            origin: {y: 0.5},
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
        <div
            className="min-h-screen bg flex items-center justify-center p-8"
        >
            <ShimmerButton onClick={() => {
                triggerFireworks()
            }}
                           className="text-2xl px-10"
                           background="#5259f7"
            >
                Celebrate
            </ShimmerButton>
        </div>
    )
}
