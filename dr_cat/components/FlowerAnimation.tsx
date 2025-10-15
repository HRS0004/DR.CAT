"use client"

import { useEffect, useState } from "react"

export default function FlowerAnimation() {
  // Fixed scale with 30% increase
  const finalScale = 1.3

  // Generate 255 flower petals with exact SCSS spiral positioning
  const generatePetals = () => {
    const petals = []
    const numberOfPetals = 255
    const d = 0.5 // Base size (0.5em from SCSS)

    for (let i = 0; i < numberOfPetals; i++) {
      // Exact SCSS calculations: $r : $d/5 - $i*($d/10);
      const r = (d / 5) - (i * (d / 10))

      // Original SCSS uses $i directly (not converted to radians)
      // $x : $r*cos($i); $y : $r*sin($i);
      const x = r * Math.cos(i)
      const y = r * Math.sin(i)

      // Create red color to match background theme
      const red = 255
      const blue = 0
      const green = 100

      petals.push(
        <div
          key={i}
          className="flower-petal"
          style={{
            position: 'absolute',
            top: `${y}em`,
            left: `${x}em`,
            width: `${d * 6}em`,
            height: `${d * 6}em`,
            margin: `-${d / 2}em`,
            borderRadius: '100%',
            background: `rgba(${red}, ${blue}, ${green}, 0.5)`,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 0%, transparent 50%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")
            `,
            boxShadow: `0 4px 12px rgba(${red}, ${blue}, ${green}, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)`,
            animation: 'flowerPulse 12s ease infinite',
            backfaceVisibility: 'hidden',
            animationDelay: `${(i * 0.02)}s`,
          }}
        />
      )
    }
    return petals
  }

  return (
    <>
      {/* Add keyframes to CSS */}
      <style jsx>{`
        @keyframes flowerPulse {
          50% {
            transform: scale(0.125);
          }
        }

        @keyframes flowerRotate {
          to {
            transform: rotate(360deg);
          }
        }

        .flower-container {
          animation: flowerRotate 60s linear infinite;
        }
      `}</style>

      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: '50%',
          left: '75%',
          transform: `translate(-50%, -50%) scale(${finalScale})`,
        }}
      >
        <div
          className="flower-container"
          style={{
            position: 'absolute',
            top: '45%',
            left: '45%',
          }}
        >
          {generatePetals()}
        </div>
      </div>
    </>
  )
}