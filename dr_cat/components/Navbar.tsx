"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [navbarState, setNavbarState] = useState({
    isScrolled: false,
    isCompressed: false,
    scrollDirection: null as 'up' | 'down' | null
  })

  const lastScrollY = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollThreshold = 30
    const compressionThreshold = 80
    const directionSensitivity = 3

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Determine scroll direction with sensitivity
    const scrollDiff = currentScrollY - lastScrollY.current
    let scrollDirection = navbarState.scrollDirection

    if (Math.abs(scrollDiff) > directionSensitivity) {
      scrollDirection = scrollDiff > 0 ? 'down' : 'up'
    }

    // Calculate states
    const isScrolled = currentScrollY > scrollThreshold
    const isCompressed = currentScrollY > compressionThreshold && scrollDirection === 'down'

    // Update state immediately
    setNavbarState({
      isScrolled,
      isCompressed,
      scrollDirection
    })

    // Debounce for edge cases
    scrollTimeoutRef.current = setTimeout(() => {
      if (currentScrollY <= 20) {
        setNavbarState(prev => ({
          ...prev,
          isScrolled: false,
          isCompressed: false,
          scrollDirection: null
        }))
      }
    }, 150)

    lastScrollY.current = currentScrollY
  }, [navbarState.scrollDirection])

  useEffect(() => {
    // Throttled scroll handler for performance
    let rafId: number | null = null

    const throttledScrollHandler = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll()
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', throttledScrollHandler, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
      if (rafId) cancelAnimationFrame(rafId)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [handleScroll])

  const handleNavClick = (sectionId: string) => {
    console.log("[v0] Navigation clicked:", sectionId)

    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    } else {
      console.log("[v0] Element not found:", sectionId)
    }
  }

  const handleMobileNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    handleNavClick(sectionId)
  }

  const { isScrolled, isCompressed, scrollDirection } = navbarState

  const getNavbarClasses = () => {
    return isCompressed ? "navbar-compressed" : "navbar-scrolled"
  }

  const getLogoClasses = () => {
    return isCompressed ? "logo-compressed" : "logo-normal"
  }

  const getButtonClasses = () => {
    return isCompressed ? "button-compressed" : "button-normal"
  }

  const getNavLinksClasses = () => {
    return isCompressed ? "nav-links-hidden" : "nav-links-visible"
  }

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`liquid-glass fixed top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full md:flex transition-shadow duration-300 ease-out ${getNavbarClasses()} ${
          isScrolled ? "shadow-lg" : "shadow-none"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateX(-50%)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          left: "50%",
        }}
      >
        <button
          className={`z-50 flex items-center justify-center gap-2 ${getLogoClasses()}`}
          onClick={() => handleNavClick("home")}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Dr</span>
          </div>
          <span className="text-white font-semibold">DR.CAT</span>
        </button>

        <div className={`absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-white/70 hover:text-white md:flex md:space-x-2 ${getNavLinksClasses()}`}>
          <button
            className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <span className="relative z-20">Home</span>
          </button>
          <button
            className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={() => handleNavClick("about")}
          >
            <span className="relative z-20">About</span>
          </button>
          <button
            className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={() => handleNavClick("services")}
          >
            <span className="relative z-20">Services</span>
          </button>
          <button
            className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={() => handleNavClick("results")}
          >
            <span className="relative z-20">Results</span>
          </button>
          <button
            className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={() => handleNavClick("testimonials")}
          >
            <span className="relative z-20">Testimonials</span>
          </button>
          <button
            className="relative px-4 py-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            onClick={() => handleNavClick("blog")}
          >
            <span className="relative z-20">Blog</span>
          </button>
        </div>

        <div className={`flex items-center gap-3 ${getButtonClasses()}`}>
          <button className="btn-smooth rounded-lg font-medium relative cursor-pointer inline-block text-center px-4 py-2 text-sm border bg-gradient-to-r from-red-800 to-red-700 border-red-600/30 text-white hover:from-red-700 hover:to-red-600">
            Book Now
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`liquid-glass fixed top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full md:hidden px-4 py-3 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-none"
        }`}
        style={{
          left: "1rem",
          right: "1rem",
          width: "calc(100% - 2rem)",
        }}
      >
        <button className="flex items-center justify-center gap-2" onClick={() => handleNavClick("home")}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <span className="text-white font-bold text-xs">Dr</span>
          </div>
          <span className="text-white font-semibold">DR.CAT</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 transition-colors hover:bg-white/10"
          aria-label="Toggle menu"
          style={{ background: "rgba(255, 255, 255, 0.05)" }}
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div
            className="absolute top-24 left-4 right-4 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("home")}
                className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                Home
              </button>
              <button
                onClick={() => handleMobileNavClick("about")}
                className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                About
              </button>
              <button
                onClick={() => handleMobileNavClick("services")}
                className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                Services
              </button>
              <button
                onClick={() => handleMobileNavClick("results")}
                className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                Results
              </button>
              <button
                onClick={() => handleMobileNavClick("testimonials")}
                className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleMobileNavClick("blog")}
                className="text-left px-4 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                Blog
              </button>
              <div className="border-t border-white/20 pt-4 mt-4 flex flex-col space-y-3">
                <button className="btn-smooth px-4 py-3 text-lg font-bold text-center rounded-lg border bg-gradient-to-r from-red-600 to-red-500 border-red-400/30 text-white">
                  Book Consultation
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}