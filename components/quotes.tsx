"use client"

import { useState, useEffect } from "react"

interface Quote {
    quotes: string
    author: string | null
}

interface QuotesDisplayerProps {
    quotes: Quote[]
    intervalMs?: number
}

export default function QuotesDisplayer({ quotes, intervalMs = 4000 }: QuotesDisplayerProps) {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (quotes.length <= 1) return

        const interval = setInterval(() => {
            setIsAnimating(true)

            setTimeout(() => {
                // Get random index that's different from current
                let newIndex
                do {
                    newIndex = Math.floor(Math.random() * quotes.length)
                } while (newIndex === currentQuoteIndex && quotes.length > 1)

                setCurrentQuoteIndex(newIndex)
                setIsAnimating(false)
            }, 300) // Half of the animation duration
        }, intervalMs)

        return () => clearInterval(interval)
    }, [quotes.length, currentQuoteIndex, intervalMs])

    if (!quotes.length) {
        return (
            <div className="quotes-container">
                <p>No quotes available</p>
            </div>
        )
    }

    const currentQuote = quotes[currentQuoteIndex]

    return (
        <div className="quotes-container font-londrina-solid opacity-70 select-none">
            <div className={`quote-wrapper ${isAnimating ? "animating" : ""}`}>
                <blockquote className="quote-text">"{currentQuote.quotes}"</blockquote>
                <cite className="quote-author">— {currentQuote.author || "Unknown"}</cite>
            </div>

            <style jsx>{`
        .quotes-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        .quote-wrapper {
          transform: translateX(0);
          opacity: 1;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quote-wrapper.animating {
          transform: translateX(100%);
          opacity: 0;
        }

        .quote-text {
          font-size: 1.5rem;
          line-height: 1.6;
          margin: 0 0 1rem 0;
          font-style: italic;
          color: #333;
        }

        .quote-author {
          font-size: 1rem;
          color: #666;
          font-style: normal;
          font-weight: 500;
        }

        /* Animation for new quotes coming in from left */
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

        /* Responsive design */
        @media (max-width: 768px) {
          .quotes-container {
            padding: 1rem;
          }
          
          .quote-text {
            font-size: 1.25rem;
          }
        }
      `}</style>
        </div>
    )
}
