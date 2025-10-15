"use client"

import { useState, useEffect } from "react"

export default function ResultsSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const results = [
    {
      title: "Hair Restoration - 6 Months",
      description: "Natural regrowth achieved through advanced follicular restoration techniques.",
      beforeImage: "/before-hair-loss-treatment.jpg",
      afterImage: "/after-hair-restoration-success.jpg",
    },
    {
      title: "Facial Enhancement - 3 Months",
      description: "Subtle refinement enhancing natural beauty and facial harmony.",
      beforeImage: "/before-facial-cosmetic-procedure.jpg",
      afterImage: "/after-facial-enhancement-results.jpg",
    },
    {
      title: "Skin Rejuvenation - 4 Months",
      description: "Comprehensive skin renewal through advanced non-surgical treatments.",
      beforeImage: "/before-skin-treatment-aging.jpg",
      afterImage: "/after-skin-rejuvenation-results.jpg",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % results.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [results.length])

  return (
    <section id="results" className="py-24 px-5 sm:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-primary text-white mb-6 text-balance drop-shadow-2xl text-center">See the Transformation</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
            Every story is unique. Explore the real results achieved by our patients through personalized care and
            advanced techniques.
          </p>
        </div>

        <div className="relative">
          <div className="liquid-glass overflow-hidden rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <h3 className="text-sm font-light text-blue-300 uppercase tracking-wider">Before</h3>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative">
                  {results.map((result, index) => (
                    <img
                      key={`before-${index}`}
                      src={result.beforeImage || "/placeholder.svg?height=400&width=600&query=before treatment"}
                      alt="Before treatment"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        activeSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-light text-blue-300 uppercase tracking-wider">After</h3>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative">
                  {results.map((result, index) => (
                    <img
                      key={`after-${index}`}
                      src={result.afterImage || "/placeholder.svg?height=400&width=600&query=after treatment results"}
                      alt="After treatment"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        activeSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-8 pb-8">
              <div className="relative min-h-[80px]">
                {results.map((result, index) => (
                  <div
                    key={`content-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      activeSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <h3 className="text-2xl font-light text-white mb-2">{result.title}</h3>
                    <p className="text-white/70">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {results.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "bg-blue-400" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
