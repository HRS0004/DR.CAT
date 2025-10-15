"use client"

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
              <h2 className="heading-primary text-white mb-8 text-balance drop-shadow-2xl text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Meet DR.CAT</h2>
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
              <button className="inline-flex items-center justify-center rounded-2xl bg-[#e0004d] px-10 py-5 text-lg font-medium text-white transition-all hover:bg-[#e0004d]/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e0004d] focus:ring-offset-2 focus:ring-offset-transparent shadow-2xl font-sans transform duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
