"use client"
import confetti from "canvas-confetti";


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
            className="min-h-screen bg flex items-center justify-center p-8"
            onClick={handleTouch}
        >

            <div className="text-[#5259f7] text-2xl font-bold text-center opacity-20 select-none">
                Click Anywhere to Celebrate!
            </div>

            {/*<ShimmerButton onClick={() => {*/}
            {/*    celebrateConfetti();*/}
            {/*}}*/}
            {/*               className="text-2xl px-10"*/}
            {/*               background="#5259f7"*/}
            {/*>*/}
            {/*    Click Anywhere to Celebrate!*/}
            {/*</ShimmerButton>*/}
        </div>
    )
}
