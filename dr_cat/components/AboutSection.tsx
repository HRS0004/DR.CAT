"use client"

import AnimatedHeroText from "./AnimatedHeroText"

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative flex items-center">
            <div className="liquid-glass relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/professional-trichologist-consultation.jpg"
                alt="Professional Medical Consultation"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-10">
            <div>
              <AnimatedHeroText
                text="Meet DR.CAT"
                className="heading-primary drop-shadow-2xl text-center mb-12"
              />
              <p className="body-large text-white/80 mb-8 leading-relaxed">
                With decades of expertise in trichology and cosmetic procedures, our clinic specializes in helping women
                restore not just their hair, but their confidence. Our mission is to provide advanced, safe, and
                results-driven treatments in a welcoming, supportive environment.
              </p>
              <p className="body-large text-white/80 leading-relaxed">
                We combine cutting-edge medical technology with artistic vision to deliver natural, beautiful results
                that enhance your confidence and well-being through personalized care.
              </p>
            </div>

            <div className="pt-4">
              <button className="glow-button btn-smooth rounded-2xl font-normal relative cursor-pointer inline-block text-center px-10 py-5 text-lg border border-white text-white overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl font-sans" style={{ backgroundColor: '#1F2633' }}>
                <span className="relative z-10">
                  Schedule Consultation
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
