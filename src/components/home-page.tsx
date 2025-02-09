"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const router = useRouter(); 
  const loginHandler = () => {
    router.push('/sign-in');
  };
  const signUpHandler = () => {
    router.push('/sign-up')
  };
  useEffect(() => {
    const video = document.querySelector("video")
    if (video) {
      video.addEventListener("loadeddata", () => setIsVideoLoaded(true))
    }
    return () => {
      if (video) {
        video.removeEventListener("loadeddata", () => setIsVideoLoaded(true))
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a2416] text-white">
      {/* Video Background with Loading State */}
      <div className="absolute inset-0 z-0">
        <div className={`transition-opacity duration-1000 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source
              src="https://videos.pexels.com/video-files/1448735/1448735-uhd_2732_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </div>
        {/* Loading state background */}
        <div
          className={`absolute inset-0 bg-[#1a2416] transition-opacity duration-1000 ${isVideoLoaded ? "opacity-0" : "opacity-100"}`}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="py-6 px-8 flex justify-between items-center backdrop-blur-sm bg-black/10">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3L4 9L12 15L20 9L12 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 15L12 21L20 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-light tracking-wider">FOODO-BAGGINS</span>
          </div>
          <Button 
          onClick={loginHandler}
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10 transition-colors">
            Login
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-8">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-extralight mb-6 leading-tight">Nature Meets Nutrition</h1>
            <p className="text-xl md:text-2xl font-light mb-10 text-white/80">
              Sustainable food tracking powered by nature and AI.
            </p>
            <Button
              onClick={signUpHandler}
              size="lg"
              className="bg-white/90 hover:bg-white text-[#1a2416] px-8 py-6 rounded-full text-lg transition-all hover:scale-105"
            >
              Begin Your Journey
            </Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 text-center text-sm text-white/60 backdrop-blur-sm bg-black/10">
          <p>&copy; 2025 Foodo-Baggins. Rooted in nature.</p>
        </footer>
      </div>
    </div>
  )
}

