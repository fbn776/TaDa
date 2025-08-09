"use client"

import {ShimmerButton} from "@/components/magicui/shimmer-button";

import confetti from "canvas-confetti";



export default function CelebrationPage() {
    const celebrateConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 200 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    const handleTouch = (event: React.MouseEvent<HTMLDivElement>) => {
        confetti({
            particleCount: 150,
            spread: 360,
            origin: { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight },
        })
    }

    return (
        <div
            className="min-h-screen bg flex items-center justify-center p-8"
            onClick={handleTouch}
        >
            <ShimmerButton onClick={() => {
                celebrateConfetti();
            }}
                           className="text-2xl px-10"
                           background="#5259f7"
            >
                Celebrate
            </ShimmerButton>
        </div>
    )
}
