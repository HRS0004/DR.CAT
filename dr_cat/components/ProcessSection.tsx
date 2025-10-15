"use client"

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "Comprehensive assessment to understand your unique needs and goals.",
    },
    {
      number: "02",
      title: "Diagnosis",
      description: "Detailed analysis and creation of your personalized treatment plan.",
    },
    {
      number: "03",
      title: "Treatment",
      description: "Safe, advanced techniques delivered with precision and care.",
    },
    {
      number: "04",
      title: "Recovery",
      description: "Guided aftercare and ongoing support throughout your journey.",
    },
  ]

  return (
    <section id="process" className="py-24 px-5 sm:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-primary text-white mb-6 text-balance drop-shadow-2xl text-center">How It Works</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
            Our proven process ensures exceptional results through careful planning, expert execution, and comprehensive
            care.
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Round Tile */}
                <div className="group liquid-glass relative w-56 h-56 rounded-full flex flex-col items-center justify-center text-center p-8 transition-all duration-300">
                  <h3 className="text-xl font-light text-white mb-4 leading-tight">{step.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow between tiles (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                    <svg
                      width="32"
                      height="24"
                      viewBox="0 0 32 24"
                      fill="none"
                      className="text-blue-400/60"
                    >
                      <path
                        d="M20 6L26 12L20 18M26 12H6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Mobile arrow (below tile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-6">
                    <svg
                      width="24"
                      height="32"
                      viewBox="0 0 24 32"
                      fill="none"
                      className="text-blue-400/60"
                    >
                      <path
                        d="M6 20L12 26L18 20M12 26V6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
