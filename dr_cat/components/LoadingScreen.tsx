"use client"

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsVisible(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Animated Background matching the main theme */}
      <div
        className="fixed inset-0 w-full h-full z-0 breathing-background"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(40, 40, 40, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(60, 60, 60, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(40, 40, 40, 0.25) 0%, transparent 50%),
            linear-gradient(135deg, rgba(40, 40, 40, 0.1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(60, 60, 60, 0.1) 100%)
          `,
          backgroundSize: '160% 160%, 200% 200%, 140% 140%, 100% 100%'
        }}
      />

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 w-full h-full z-0 noise-overlay"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4
        }}
      />

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-light text-white tracking-tight">
            Elite Medical Aesthetics
          </h1>
          <p className="font-sans text-sm text-gray-300 mt-2 tracking-wide">
            HAIR RESTORATION & COSMETIC SURGERY
          </p>
        </div>

        {/* Animated Spinner */}
        <div className="relative mb-8">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-gray-400 to-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="font-sans text-gray-400 text-sm tracking-wide">
          Loading your experience...
        </p>
      </div>

      <style jsx>{`
        .loading-spinner {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .spinner-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid transparent;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }

        .spinner-ring:nth-child(1) {
          border-top: 2px solid rgba(255, 255, 255, 0.8);
          animation-duration: 1.5s;
        }

        .spinner-ring:nth-child(2) {
          border-right: 2px solid rgba(255, 255, 255, 0.6);
          animation-duration: 2s;
          animation-direction: reverse;
        }

        .spinner-ring:nth-child(3) {
          border-bottom: 2px solid rgba(255, 255, 255, 0.4);
          animation-duration: 2.5s;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .breathing-background {
          animation: breathe 6s ease-in-out infinite;
        }

        .noise-overlay {
          animation: noiseShift 5s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.7;
            filter: blur(0px);
          }
          50% {
            transform: scale(1.05) rotate(0.3deg);
            opacity: 0.9;
            filter: blur(0.5px);
          }
        }

        @keyframes noiseShift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1px, -0.5px); }
          50% { transform: translate(0.5px, -1px); }
          75% { transform: translate(-0.5px, 0.5px); }
        }
      `}</style>
    </div>
  )
}