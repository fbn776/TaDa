"use client"

import { useState, useEffect } from "react"
import {shuffleArray} from "@/lib/utils";

interface Quote {
    quotes: string
    author: string | null
}

interface QuotesDisplayerProps {
    quotes: Quote[]
    intervalMs?: number
}


export default function QuotesDisplayer({ quotes, intervalMs = 4000 }: QuotesDisplayerProps) {
    const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([])
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // Shuffle quotes only once (or when quotes array changes)
    useEffect(() => {
        if (quotes.length) {
            setShuffledQuotes(shuffleArray(quotes));
            setCurrentQuoteIndex(0);
        }
    }, [quotes])

    useEffect(() => {
        if (shuffledQuotes.length <= 1) return

        const interval = setInterval(() => {
            setIsAnimating(true)

            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) =>
                    prevIndex + 1 >= shuffledQuotes.length ? 0 : prevIndex + 1
                )
                setIsAnimating(false)
            }, 300) // Half of animation duration
        }, intervalMs)

        return () => clearInterval(interval)
    }, [shuffledQuotes, intervalMs])

    if (!shuffledQuotes.length) {
        return (
            <div className="quotes-container">
                <p>No quotes available</p>
            </div>
        )
    }

    const currentQuote = shuffledQuotes[currentQuoteIndex]

    return (
        <div className="quotes-container font-londrina-solid opacity-50 select-none max-sm:text-sm text-xl">
            <div className={`quote-wrapper ${isAnimating ? "animating" : ""}`}>
                <blockquote className="quote-text">“{currentQuote.quotes}”</blockquote>
                <cite className="quote-author max-sm:text-xs">— {currentQuote.author || "Unknown"}</cite>
            </div>

            <style jsx>{`
                .quotes-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 2rem;
                    text-align: right;
                    overflow: hidden;
                    position: relative;
                }

                .quote-wrapper {
                    transform: translateX(0);
                    opacity: 1;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .quote-wrapper.animating {
                    transform: translateX(100%);
                    opacity: 0;
                }

                .quote-text {
                    text-align: left;
                    line-height: 1.6;
                    margin: 0 0 0.1rem 0;
                    font-style: italic;
                    color: #333;
                }

                .quote-author {
                    color: #666;
                    font-style: normal;
                    font-weight: 500;
                }

                @keyframes slideInFromLeft {
                    from {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .quote-wrapper:not(.animating) {
                    animation: slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @media (max-width: 768px) {
                    .quotes-container {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    )
}
