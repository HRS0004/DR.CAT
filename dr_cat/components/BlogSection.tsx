"use client"

import { useState, useRef } from 'react';

export default function BlogSection() {
  const blogPosts = [
    {
      title: "5 Signs It's Time to See a Trichologist",
      excerpt:
        "Understanding when professional hair and scalp care can make a difference in your confidence and health.",
      readTime: "5 min read",
      category: "Hair Health",
      image: "/professional-trichologist-consultation.jpg",
    },
    {
      title: "Understanding Hair Loss in Women",
      excerpt: "Comprehensive guide to female pattern hair loss, causes, and modern treatment options available.",
      readTime: "8 min read",
      category: "Education",
      image: "/woman-hair-loss-education.jpg",
    },
    {
      title: "Post-Surgery Recovery Tips",
      excerpt: "Essential guidelines for optimal healing and achieving the best possible results from your procedure.",
      readTime: "6 min read",
      category: "Recovery",
      image: "/post-surgery-recovery-care.jpg",
    },
  ]

  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const rotateContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
      setIsTransitioning(false);
    }, 1500);
  };

  const displayedPosts = blogPosts.slice(currentIndex).concat(blogPosts.slice(0, currentIndex));

  return (
    <section id="blog" className="py-12 px-5 sm:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6 text-balance">Learn & Explore</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
            Stay informed with expert insights, treatment guides, and the latest advances in cosmetic medicine and hair
            restoration.
          </p>
        </div>

        {/* Bento grid with irregular spans */}
        <div ref={contentRef} className={`grid grid-cols-3 gap-6 items-stretch transition-all duration-300 ${isTransitioning ? 'backdrop-blur-[5px] opacity-70' : ''}`}>
          {displayedPosts.map((post, index) => (
            <article
              key={`${post.title}-${currentIndex}`}
              className={`group liquid-glass relative overflow-hidden rounded-2xl p-0 ${
                index === 0 ? 'col-span-2 row-span-2' :
                index === 1 ? 'col-span-1 row-span-2' :
                'col-span-3'
              }`}
            >
              <div className="flex flex-row items-start h-full">
                <div className={`h-full flex-shrink-0 overflow-hidden rounded-l-2xl ${index === 0 ? 'w-1/3' : 'w-40'}`}>
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className={`p-2 h-auto ${index === 0 ? 'w-2/3' : 'flex-1'}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">{post.category}</span>
                    <span className="text-white/50">•</span>
                    <span className="text-xs text-white/50">{post.readTime}</span>
                  </div>
                  <h3 className={`font-semibold text-white mb-0.5 group-hover:text-blue-200 transition-colors ${
                    index === 0 ? 'text-2xl' : 'text-xl'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-white/70 leading-relaxed mb-1 line-clamp-4 ${
                    index === 0 ? 'text-lg' : ''
                  }`}>{post.excerpt}</p>
                  <button className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>

              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={rotateContent}
            disabled={isTransitioning}
            className={`glow-button btn-smooth group relative disabled:bg-gray-600 disabled:cursor-not-allied text-white py-3 px-8 rounded-full font-semibold overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl border border-white ${
              isTransitioning ? 'loading' : ''
            }`}
            style={{ backgroundColor: '#1F2633' }}
          >
            <span className="relative z-10">
              {isTransitioning ? 'Loading...' : 'Show New Content'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}