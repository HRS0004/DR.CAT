import GradientBlinds from "@/components/GradientBlinds"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import ResultsSection from "@/components/ResultsSection"
import ProcessSection from "@/components/ProcessSection"
import BlogSection from "@/components/BlogSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import FooterSection from "@/components/FooterSection"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <Navbar />

      {/* Enhanced Animated Background with Breathing Effect */}
      <div
        className="fixed inset-0 w-full h-full z-0 breathing-background"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(40, 40, 40, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(60, 60, 60, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(40, 40, 40, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(40, 40, 40, 0.15) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(60, 60, 60, 0.15) 100%)
          `,
          backgroundSize: '160% 160%, 200% 200%, 140% 140%, 100% 100%'
        }}
      />

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 w-full h-full z-0 noise-overlay"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.6
        }}
      />

      {/* Content Sections */}
      <div className="relative z-10">
        <div id="hero-section">
          <HeroSection />
        </div>
        <div id="about-section">
          <AboutSection />
        </div>
        <div id="services-section">
          <ServicesSection />
        </div>
        <div id="results-section">
          <ResultsSection />
        </div>
        <div id="process-section">
          <ProcessSection />
        </div>
        <div id="testimonials-section">
          <TestimonialsSection />
        </div>
        <div id="blog-section">
          <BlogSection />
        </div>
        <div id="footer-section">
          <FooterSection />
        </div>
      </div>

    </main>
  )
}
