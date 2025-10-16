export default function ServicesSection() {
  const services = [
    {
      title: "Hair Restoration",
      description:
        "Advanced techniques to promote natural regrowth and restore density using cutting-edge technology and personalized treatment plans.",
      image: "/after-hair-restoration-success.jpg",
      features: ["FUE Hair Transplant", "PRP Therapy", "Scalp Micropigmentation"]
    },
    {
      title: "Cosmetic Surgery",
      description:
        "Precision procedures for facial and body enhancement with natural-looking results and minimal downtime.",
      image: "/after-facial-enhancement-results.jpg",
      features: ["Facelift", "Rhinoplasty", "Blepharoplasty"]
    },
    {
      title: "Non-Surgical Treatments",
      description:
        "Innovative therapies for healthier skin and hair including injectables, laser treatments, and regenerative medicine.",
      image: "/after-skin-rejuvenation-results.jpg",
      features: ["Botox & Fillers", "Laser Resurfacing", "Chemical Peels"]
    },
    {
      title: "Wellness & Recovery",
      description:
        "Holistic care for confidence and long-term results with comprehensive aftercare and support programs.",
      image: "/post-surgery-recovery-care.jpg",
      features: ["24/7 Support", "Recovery Planning", "Follow-up Care"]
    },
    {
      title: "Trichology Services",
      description: "Specialized scalp and hair analysis with customized treatment protocols for optimal hair health.",
      image: "/professional-trichologist-consultation.jpg",
      features: ["Scalp Analysis", "Hair Loss Assessment", "Treatment Plans"]
    },
    {
      title: "Consultation & Planning",
      description:
        "Comprehensive assessments and personalized treatment roadmaps tailored to your unique goals and needs.",
      image: "/woman-hair-loss-education.jpg",
      features: ["Initial Assessment", "Custom Planning", "Goal Setting"]
    },
  ]

  return (
    <section id="services" className="relative py-20 px-6 sm:px-8 lg:px-10 bg-gradient-to-br ...">
  <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 text-balance drop-shadow-2xl"
            style={{ fontFamily: 'Nunito Sans, sans-serif', color: '#e0004d' }}
          >
            Our Signature Treatments
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto text-pretty leading-relaxed">
            Comprehensive care combining advanced medical techniques with artistic vision to deliver natural, beautiful
            results that enhance your confidence and well-being.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(224,0,77,0.25)]"
              style={{
                backgroundImage: `url(${service.image || "/placeholder.jpg"})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:via-black/30 transition-all duration-500"></div>

              {/* Card Content */}
              <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end">
                {/* Service Number */}
                <div className="absolute top-4 right-4 text-white/60 font-mono text-sm font-light">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-light text-white mb-3 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="text-xs font-light text-white/80 uppercase tracking-wider mb-2">Key Services</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-xs sm:text-sm text-white/70">
                          <div
                            className="w-1 h-1 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: '#e0004d' }}
                          ></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Button */}
                  <button
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm bg-white/10 hover:bg-[#e0004d] hover:border-[#e0004d] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Learn More
                    <svg className="ml-2 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
