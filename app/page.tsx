"use client"
import confetti from "canvas-confetti";
import QuotesDisplayer from "@/components/quotes";
import QUOTES from "@/data/quotes";


export default function CelebrationPage() {
    const handleTouch = (event: React.MouseEvent<HTMLDivElement>) => {
        confetti({
            // particleCount: 150,
            spread: 360,
            startVelocity: 20,
            origin: {x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight},
        })
    }

    return (
        <div
            className="min-h-[100dvh] h-[100dvh] bg flex-col flex items-center justify-center p-8"
            onClick={handleTouch}
        >
            <div className="flex-2 flex flex-col justify-end pb-20">
                <div className="text-gray-700 text-7xl font-bold text-center select-none font-londrina-outline">
                    Click Anywhere to Celebrate!
                </div>
            </div>
            <div className="flex-1 h-[40%] max-h-[40%] min-h-[40%]">
                <QuotesDisplayer quotes={QUOTES}/>
            </div>
        </div>
    )
}
