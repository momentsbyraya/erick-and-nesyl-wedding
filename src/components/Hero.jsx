import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Play, Pause } from 'lucide-react'
import { couple } from '../data'
import { venues } from '../data'
import { themeConfig } from '../config/themeConfig'

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)
  const playButtonRef = useRef(null)

  const formatDate = () => {
    const { month, day, year } = couple.wedding
    return `${month} ${day}, ${year}`
  }

  const venueName = venues.ceremony.name

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    // Set initial hidden states
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })
    gsap.set(venueRef.current, { opacity: 0, y: 20 })
    gsap.set(playButtonRef.current, { opacity: 0, scale: 0.8 })

    // Create timeline for sequential animations
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Groom's name
    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(groomLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 2. "AND"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 3. Bride's name
    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(brideLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 4. Date
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 5. Venue
    if (venueRef.current) {
      tl.to(venueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
    }

    // 6. Play button
    if (playButtonRef.current) {
      tl.to(playButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2")
    }
  }, [])

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/music/When I Say I Love You.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <img 
        src="/assets/images/prenup/prenup-1.png" 
        alt="Hero"
        className="w-full h-full object-cover"
      />
      
      {/* Text Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Couple Names - Styled */}
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
            {/* Groom's Name */}
            <div>
              <p ref={groomFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#CC5500' }}>
                {couple.groom.firstName}
              </p>
              <p ref={groomLastNameRef} className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3" style={{ color: themeConfig.text.light }}>
                {couple.groom.lastName}
              </p>
            </div>
            <p ref={andRef} className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3" style={{ color: '#000000' }}>
              AND
            </p>
            {/* Bride's Name */}
            <div>
              <p ref={brideFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#CC5500' }}>
                {couple.bride.firstName}
              </p>
              <p ref={brideLastNameRef} className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3" style={{ color: themeConfig.text.light }}>
                {couple.bride.lastName}
              </p>
            </div>
          </div>

          {/* Date and Venue - Plain Text */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <p ref={dateRef} className="text-sm sm:text-base md:text-lg font-albert" style={{ color: '#000000' }}>
              {formatDate()}
            </p>
            <p ref={venueRef} className="text-xs sm:text-sm md:text-base font-albert" style={{ color: themeConfig.text.lightBlack }}>
              {venueName}
            </p>
          </div>

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <button 
              ref={playButtonRef}
              onClick={togglePlayPause}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 flex items-center justify-center shadow-lg"
            >
              {isPlaying ? (
                <Pause size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#CC5500]" fill="#CC5500" />
              ) : (
                <Play size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#CC5500] ml-1" fill="#CC5500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
