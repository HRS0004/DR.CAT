"use client"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Hair Restoration Patient",
      content:
        "I walked in nervous and walked out renewed. The care and results were beyond my expectations. For the first time in years, I feel confident looking in the mirror.",
      avatar: "/professional-woman-trader-headshot.jpg",
    },
    {
      name: "Priya K.",
      role: "Cosmetic Surgery Patient",
      content:
        "The personalized approach and attention to detail made all the difference. The results look so natural, and the recovery process was smoother than I anticipated.",
      avatar: "/professional-man-fund-manager-headshot.jpg",
    },
    {
      name: "Maria L.",
      role: "Trichology Patient",
      content:
        "After struggling with hair loss for years, I finally found a solution that works. The team's expertise and compassionate care changed my life completely.",
      avatar: "/young-professional-crypto-enthusiast-headshot.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-24 px-5 sm:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-primary text-white mb-6 text-balance drop-shadow-2xl text-center">What Our Patients Say</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
            Real stories from patients who have transformed their confidence through our personalized care and advanced
            treatments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="liquid-glass relative overflow-hidden rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border border-white/20"
                />
                <div className="ml-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/70">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-white/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/80">Watch patient transformation stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
