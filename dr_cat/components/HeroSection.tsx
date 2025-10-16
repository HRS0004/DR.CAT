"use client"

import FlowerAnimation from "./FlowerAnimation"
import AnimatedHeroText from "./AnimatedHeroText"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen px-6 sm:px-12 lg:px-20 pt-20">
      {/* Flower Animation - Fixed Position Throughout Website */}
      <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-76 scale-[1.10]">
        <FlowerAnimation />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 h-full min-h-screen items-center">
        {/* Left Half - Hero Content */}
        <div className="flex flex-col justify-center space-y-8">
          <AnimatedHeroText
            text="Redefining Beauty. Restoring Confidence."
            className="heading-primary drop-shadow-2xl text-left"
          />

          <p className="body-large text-white/80 max-w-xl text-left">
            Experience world-class cosmetic surgery with Dr. Catherine Anderson.
            Our personalized approach ensures natural-looking results that enhance
            your unique beauty while boosting your confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button className="btn-smooth rounded-lg font-normal relative cursor-pointer inline-block text-center px-16 py-8 text-2xl border bg-gradient-to-r from-red-800 to-red-700 border-red-600/30 text-white hover:from-red-700 hover:to-red-600">
              Book Consultation
            </button>
            <button className="btn-smooth rounded-lg font-normal relative cursor-pointer inline-block text-center px-16 py-8 text-2xl border border-white/30 text-white hover:bg-white/10">
              View Our Work
            </button>
          </div>
        </div>

        {/* Right Half - Reserved for Flower Animation */}
        <div className="hidden lg:block"></div>
      </div>
    </section>
  )
}
