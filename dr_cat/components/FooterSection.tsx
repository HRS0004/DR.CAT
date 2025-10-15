"use client"

import React from "react";
import { cn } from "@/lib/utils";

const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: any;
  duration?: number;
  clockwise?: boolean;
}) => {
  return (
    <Tag
      className={cn(
        "relative flex rounded-full border border-slate-800 bg-black/20 content-center hover:bg-black/10 transition duration-500 dark:bg-slate-900",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white text-sm rounded-full",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
};

export default function FooterSection() {
  return (
    <footer className="bg-black text-white min-h-[60vh] flex flex-col">
      
      {/* Modern CTA Section - Proportionally sized and centered */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-8 mx-auto">
        <div className="relative inline-block rounded-[2rem] p-1">
          <HoverBorderGradient as="div" containerClassName="rounded-[2rem]">
            <div className="liquid-glass relative overflow-hidden rounded-[2rem] p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-white drop-shadow-2xl text-balance text-center">
                Transform Your Confidence Today
              </h2>
              <p className="text-sm lg:text-base text-white/80 mb-4 max-w-lg mx-auto leading-relaxed">
                Begin your journey to renewed confidence with personalized treatments designed just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="btn-smooth inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-800 to-red-700 px-6 py-2 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:bg-red-700">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Consultation
                </button>
                <button className="btn-smooth inline-flex items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur shadow-xl transition-all duration-300 hover:bg-gray-800">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </button>
              </div>
            </div>
          </HoverBorderGradient>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row gap-12 px-6 py-8 flex-1">
        {/* Left Section: Brand, Paragraph, Socials, Copyright */}
        <section className="flex flex-col flex-1 lg:w-1/3">
          {/* Brand Identity Block */}
          <div className="mb-4">
            <div className="mb-2">
              <span className="text-base font-light text-gray-300 block">Dr</span>
              <span className="text-2xl font-bold text-white">DR.CAT</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-base max-w-xs">
              Pioneering excellence in medical aesthetics and hair restoration. Where science meets artistry to restore your natural confidence and beauty.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mb-4 justify-start">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Copyright - Bottom aligned */}
          <div className="mt-auto text-[10px] text-gray-300 whitespace-nowrap">
            © 2025 DR.CAT. All rights reserved. | Medical License #MC-2025-001 | Board Certified Professionals
          </div>
        </section>

        {/* Middle Space for Future Logo */}
        <div className="hidden lg:block flex-1"></div>

        {/* Right Section: 3 Columns + Policies */}
        <nav className="flex flex-col flex-1 lg:w-2/3">
          {/* 3 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 text-sm">
            <div className="flex flex-col">
              <h3 className="font-semibold text-white mb-2">Treatments</h3>
              <ul className="space-y-1 flex-1">
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 block">Hair Restoration</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 block">Cosmetic Surgery</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 block">Non-Surgical</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 block">Trichology</a></li>
              </ul>
              <div className="mt-auto pt-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block text-left">Terms of Service</a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold text-white mb-2">Support</h3>
              <ul className="space-y-1 flex-1">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block">Patient Care</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block">Recovery Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block">Financing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block">Contact</a></li>
              </ul>
              <div className="mt-auto pt-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block text-left">Privacy Policy</a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold text-white mb-2">Company</h3>
              <ul className="space-y-1 flex-1">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 block">About Us</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors duration-300 block">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block">Safety</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block">Privacy</a></li>
              </ul>
              <div className="mt-auto pt-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 block text-left">Cookie Policy</a>
              </div>
            </div>
          </div>


        </nav>
      </div>

    </footer>
  )
}
