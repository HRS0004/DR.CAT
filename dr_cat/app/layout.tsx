import type React from "react"
import type { Metadata } from "next"
import { Crimson_Text, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import LoadingScreen from "@/components/LoadingScreen"

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson-text",
  weight: ["400", "600", "700"],
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Elite Medical Aesthetics - Hair Restoration & Cosmetic Surgery",
  description:
    "Transform your confidence with our advanced hair restoration and cosmetic surgery procedures. Expert trichologists and surgeons delivering natural, lasting results.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${crimsonText.variable} ${poppins.variable} antialiased`}>
        <LoadingScreen />
        <Suspense>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
