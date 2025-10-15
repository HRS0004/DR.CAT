"use client"

import FlowerAnimation from "./FlowerAnimation"
import AnimatedHeroText from "./AnimatedHeroText"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen px-6 sm:px-12 lg:px-20 pt-32">
      {/* Flower Animation - Fixed Position Throughout Website */}
      <FlowerAnimation />

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
            <button className="btn-smooth rounded-lg font-medium relative cursor-pointer inline-block text-center px-8 py-4 text-lg border bg-gradient-to-r from-red-800 to-red-700 border-red-600/30 text-white hover:from-red-700 hover:to-red-600">
              Book Consultation
            </button>
            <button className="btn-smooth rounded-lg font-medium relative cursor-pointer inline-block text-center px-8 py-4 text-lg border border-white/30 text-white hover:bg-white/10">
              View Our Work
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-left">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-white mb-1">2000+</div>
              <div className="text-sm text-white/60">Happy Patients</div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-white/60">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Right Half - Reserved for Flower Animation */}
        <div className="hidden lg:block"></div>
      </div>
    </section>
  )
}
