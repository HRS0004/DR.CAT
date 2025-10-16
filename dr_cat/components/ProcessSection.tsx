// ProcessSection.tsx

"use client"

import React from "react"

// Define types for the step and component props
interface Step {
    number: string;
    title: string;
    description: string;
}

interface ProcessStepProps {
    step: Step;
    isLast: boolean;
    romanNumeral: string; // <-- ADDED BACK
}

// A component to render the process step, used for duplication
const ProcessStep: React.FC<ProcessStepProps> = ({ step, isLast, romanNumeral }) => (
    // Card diameter is 480px.
    <div className="relative flex-shrink-0 flex flex-col items-center mr-40 ml-10">

        {/* --- NEW: BACKGROUND ROMAN NUMERAL --- */}
        <div
            className="absolute z-0 opacity-100 pointer-events-none"
            style={{
                // Set size and position to center it approximately behind the 480px card
                fontSize: '350px',
                lineHeight: '1',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                // Custom font and weight
                fontFamily: "Garamond, serif",
                fontWeight: 500, // Garamond Medium
        color: 'rgba(255, 255, 255, 0.1)', // Very subtle white color
        textShadow: '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)'
    }}
        >
            {romanNumeral}
        </div>
        
        {/* Circular Card - Diameter is 480px (z-index is default, which is > z-0) */}
        <div className="group liquid-glass relative w-[480px] h-[480px] rounded-full flex flex-col items-center justify-center text-center p-12 transition-all duration-300 z-10">
            <h3 className="text-3xl font-light text-white mb-6 leading-tight">
                {step.title}
            </h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-xs">
                {step.description}
            </p>
        </div>

        {/* Horizontal Arrow between cards */}
        {romanNumeral === "IV" ? (
            // Render a Dot/Endpoint after the last logical step ("Recovery")
            <div className="absolute top-1/2 left-[570px] transform -translate-y-1/2 z-10">
                <div
                    className="w-4 h-4 rounded-full bg-[#06B6D4]/80 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                    title="Process End"
                />
            </div>
        ) : (
            // Render the Arrow for steps I, II, and III
            <div className="absolute top-1/2 left-[570px] transform -translate-y-1/2 z-10">
                <svg
                    width="40"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className="text-[#06B6D4]/80"
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
    </div>
);


export default function ProcessSection() {
    // ADDED BACK romanNumerals
    const romanNumerals = ["I", "II", "III", "IV"]
    
    const steps: Step[] = [
        {
            number: "01",
            title: "Consultation",
            description:
                "Comprehensive assessment to understand your unique needs and goals.",
        },
        {
            number: "02",
            title: "Diagnosis",
            description:
                "Detailed analysis and creation of your personalized treatment plan.",
        },
        {
            number: "03",
            title: "Treatment",
            description:
                "Safe, advanced techniques delivered with precision and care.",
        },
        {
            number: "04",
            title: "Recovery",
            description:
                "Guided aftercare and ongoing support throughout your journey.",
        },
    ]

    // Duplicate the steps to enable seamless looping animation
    const doubledSteps = [...steps, ...steps];


    return (
        // Top padding is pt-[50px]. Removed horizontal padding to be applied to the header content only.
        <section id="process" className="pt-[50px] pb-[60px] overflow-hidden">

            {/* Header content needs to keep the horizontal padding and centering */}
            <div className="max-w-7xl mx-auto px-5 sm:px-20">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="heading-primary text-white mb-6 drop-shadow-2xl text-center">
                        How it works
                    </h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Our proven process ensures exceptional results through careful planning,
                        expert execution, and comprehensive care.
                    </p>
                </div>
            </div>

            {/* Process Steps - Animation Container (Now full width) */}
            {/* FIX: Replaced mt-5 with pt-5 (20px top padding) for explicit container size increase. */}
            <div className="relative overflow-hidden w-screen pt-5">
                {/* The inner container is responsible for the animation and is wide enough for doubledSteps */}
                {/* FIX: Removed conflicting ml-[-800px] margin */}
                <div className="flex flex-row flex-nowrap w-max animate-continuousScroll">
                    {doubledSteps.map((step, index) => (
                        <ProcessStep
                            key={index}
                            step={step}
                            romanNumeral={romanNumerals[index % steps.length]}
                            isLast={index === doubledSteps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
