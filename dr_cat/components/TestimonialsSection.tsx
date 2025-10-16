"use client"

import { useEffect, useRef, useState } from "react";
import styles from "./TestimonialSection.module.css";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const DATA: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Hair Restoration Patient",
    content:
      "I walked in nervous and walked out renewed. The care and results were beyond my expectations. For the first time in years, I feel confident looking in the mirror.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/e8830864f3b54d59b2bb76d09273f73e/07468160699f4c12a9beee7d80c42474?format=webp&width=800",
  },
  {
    name: "Priya K.",
    role: "Cosmetic Surgery Patient",
    content:
      "The personalized approach and attention to detail made all the difference. The results look so natural, and the recovery process was smoother than I anticipated.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/e8830864f3b54d59b2bb76d09273f73e/f240dcefe6994e0abca334eb877c6613?format=webp&width=800",
  },
  {
    name: "Maria L.",
    role: "Trichology Patient",
    content:
      "After struggling with hair loss for years, I finally found a solution that works. The team's expertise and compassionate care changed my life completely.",
    avatar: "https://cdn.builder.io/api/v1/image/assets/e8830864f3b54d59b2bb76d09273f73e/68dc7a9161354743b56bc064f89ea273?format=webp&width=800",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const autoRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const next = () => setIndex((i) => (i + 1) % DATA.length);
  const prev = () => setIndex((i) => (i - 1 + DATA.length) % DATA.length);

  useEffect(() => {
    autoRef.current = window.setInterval(next, 7000);
    return () => {
      if (autoRef.current) window.clearInterval(autoRef.current);
    };
  }, []);







  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="w-full">
            {/* Video Card */}
            <div className="mt-4 bg-card border border-border rounded-2xl overflow-hidden shadow-lg w-full">
              <video 
                className="block w-full h-auto aspect-video bg-muted" 
                controls 
                preload="metadata" 
                playsInline 
                poster="/placeholder.svg"
              >
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative inline-block w-full mt-4">
              <div className="relative">
                {DATA.map((item, i) => (
                  <div
                    key={i}
                    className={`${i === index ? 'inline-block' : 'hidden'}`}
                  >
                    <img 
                      className="w-6 h-6 mr-2 align-top inline-block" 
                      src="https://i.ibb.co/NjRgrmq/comma.png" 
                      alt="Quote" 
                    />
                    <p className="w-full pl-0 relative leading-relaxed text-foreground text-xl md:text-2xl lg:text-3xl font-normal max-w-[56ch]">
                      {item.content}
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="rounded-full text-center relative bg-gray-400 border-4 border-white w-14 h-14 overflow-hidden">
                        <img 
                          className="absolute top-0 left-0 w-full h-full object-cover" 
                          src={item.avatar} 
                          alt={item.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <span className="block font-bold text-foreground">{item.name}</span>
                        <span className="block text-muted-foreground">{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Updated Buttons with Exact Navbar "Book Now" Styling */}
              <div className="flex gap-3 mt-6">
                <button
                  aria-label="Previous"
                  className="testimonial-ctrl btn-smooth rounded-full font-medium relative cursor-pointer inline-flex items-center justify-center w-14 h-14 border bg-[#1F2633] border-[#1F2633] text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl active:scale-95"
                  onClick={prev}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  aria-label="Next"
                  className="testimonial-ctrl btn-smooth rounded-full font-medium relative cursor-pointer inline-flex items-center justify-center w-14 h-14 border bg-[#1F2633] border-[#1F2633] text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl active:scale-95"
                  onClick={next}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start gap-0 mt-0">
            <h2 className="text-6xl text-white mb-6 text-balance drop-shadow-2xl text-center">
              FIND OUT WHAT OUR CUSTOMERS SAY
            </h2>
            
            {/* Animated Circles */}
            <div className={styles.circleWrap}>
              <div className={styles.outCircle}>
                <div className={styles.rotate}>
                  <div className={styles.counterrotate}>
                    <div className={styles.inner} style={{ backgroundImage: `url(${DATA[0].avatar})` }} />
                  </div>
                </div>
              </div>

              <div className={styles.outCircle2}>
                <div className={styles.rotate2}>
                  <div className={styles.counterrotate2}>
                    <div className={styles.inner2} style={{ backgroundImage: `url(${DATA[1].avatar})` }} />
                  </div>
                </div>
              </div>

              <div className={styles.outCircle3}>
                <div className={styles.rotate3}>
                  <div className={styles.counterrotate3}>
                    <div className={styles.inner3} style={{ backgroundImage: `url(${DATA[2].avatar})` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
