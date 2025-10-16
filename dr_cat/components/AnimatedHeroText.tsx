"use client"

import { useEffect, useRef } from "react"

interface AnimatedHeroTextProps {
  text: string | string[]
  className?: string
}

export default function AnimatedHeroText({ text, className = "" }: AnimatedHeroTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Handle both string and array inputs
    const textString = Array.isArray(text) ? text.join(' ') : text

    // Split text into words for staggered animation
    const words = textString.split(' ')

    // Create word spans with immediate styling to prevent FOUT
    textRef.current.innerHTML = words
      .map((word: string, index: number) =>
        `<span class="word" style="
          --delay: ${index * 0.1}s;
          font-variation-settings: 'wght' 170;
          color: hsl(347, 7%, 29%);
          display: inline-block;
          margin-right: 0.3em;
          opacity: 0;
          animation: wordReveal 2s ease-out var(--delay) forwards;
        ">${word}</span>`
      )
      .join('')

    // Make text visible after setup
    if (textRef.current) {
      textRef.current.style.visibility = 'visible'
    }

  }, [text])

  return (
    <>
      <style jsx>{`
        @keyframes wordReveal {
          0% {
            font-variation-settings: 'wght' 170;
            color: hsl(347, 7%, 29%);
            opacity: 0;
          }
          100% {
            font-variation-settings: 'wght' 300;
            color: hsl(347, 77%, 49%);
            opacity: 1;
          }
        }

        .animated-hero-text {
          font-variation-settings: 'wght' 170;
          line-height: 0.8;
          color: hsl(347, 7%, 29%);
          will-change: font-variation-settings, color;
          visibility: hidden;
        }

        .animated-hero-text.loaded {
          visibility: visible;
        }

        .word {
          transition: all 0.3s ease;
        }

        .word:hover {
          font-variation-settings: 'wght' 400 !important;
          color: hsl(347, 90%, 60%) !important;
        }
      `}</style>

      <h1
        ref={textRef}
        className={`animated-hero-text loaded ${className}`}
        style={{
          fontVariationSettings: "'wght' 170",
          visibility: 'hidden',
        }}
      >
        {text}
      </h1>
    </>
  )
}