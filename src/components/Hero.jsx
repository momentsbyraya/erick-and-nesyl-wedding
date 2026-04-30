import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple, venues, audio } from '../data'
import { themeConfig } from '../config/themeConfig'

const Hero = () => {
  const audioRef = useRef(null)
  
  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    // Format as MONTH.DD.YYYY (APRIL.07.2026)
    const monthUpper = month.toUpperCase() // Get month name in uppercase (APRIL)
    const dayFormatted = String(day).padStart(2, '0') // Ensure 2 digits (07)
    return `${monthUpper}.${dayFormatted}.${year}`
  }

  const venueName = venues.ceremony.name

  useEffect(() => {
    // Set initial hidden states
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })
    gsap.set(venueRef.current, { opacity: 0, y: 20 })

    // Create timeline for sequential animations (top → bottom: date/venue, then names)
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Date
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
    }

    // 2. Venue
    if (venueRef.current) {
      tl.to(venueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
    }

    // 3. Groom's name
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

    // 4. "AND"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 5. Bride's name
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

  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-burgundy-dark" style={{ height: '100vh' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audio.background}
        loop
      />

      {/* Slight bleed past edges + overflow-hidden hides subpixel gaps vs parent / next section */}
      <img
        src="/assets/images/prenup/TET04315.jpg"
        alt="Erick and Nesyl"
        className="absolute left-1/2 top-1/2 h-[102%] w-[102%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-[46%_18%] sm:object-[46%_22%] md:object-[46%_25%] lg:object-[46%_27%] xl:object-[46%_28%]"
        fetchPriority="high"
        decoding="async"
      />

      {/* Blurred burgundy overlay — pulled past top/left/right so no hairline shows */}
      <svg
        className="pointer-events-none absolute -top-2 left-1/2 z-10 h-[calc(16rem+16px)] w-[calc(100%+24px)] max-w-none -translate-x-1/2 sm:h-[calc(20rem+16px)] md:h-[calc(24rem+16px)] lg:h-[calc(28rem+20px)]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurTop">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(90, 30, 42, 1)" />
            <stop offset="12%" stopColor="rgba(90, 30, 42, 0.95)" />
            <stop offset="40%" stopColor="rgba(90, 30, 42, 0.7)" />
            <stop offset="70%" stopColor="rgba(90, 30, 42, 0.3)" />
            <stop offset="100%" stopColor="rgba(90, 30, 42, 0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#topGradient)" filter="url(#heroBlurTop)" />
      </svg>
      
      {/* Date and venue — top */}
      <div className="absolute top-0 left-0 right-0 pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p ref={dateRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-foglihten" style={{ color: '#F5F0E8', textShadow: '0 1px 3px rgba(0,0,0,0.45), 0 0 16px rgba(0,0,0,0.2)' }}>
            {formatDate()}
          </p>
          <p ref={venueRef} className="text-xs sm:text-sm md:text-base font-albert mt-2 sm:mt-3" style={{ color: '#F5F0E8', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
            {venueName}
          </p>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute -bottom-2 left-1/2 z-10 h-[calc(16rem+16px)] w-[calc(100%+24px)] max-w-none -translate-x-1/2 sm:h-[calc(20rem+16px)] md:h-[calc(24rem+16px)] lg:h-[calc(28rem+20px)]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurBottom">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(90, 30, 42, 0)" />
            <stop offset="30%" stopColor="rgba(90, 30, 42, 0.3)" />
            <stop offset="60%" stopColor="rgba(90, 30, 42, 0.7)" />
            <stop offset="88%" stopColor="rgba(90, 30, 42, 0.95)" />
            <stop offset="100%" stopColor="rgba(90, 30, 42, 1)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bottomGradient)" filter="url(#heroBlurBottom)" />
      </svg>

      {/* Couple names — bottom (extra bottom padding for play control) */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-12 md:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <div>
              <p ref={groomFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#F5F0E8', textShadow: '0 1px 3px rgba(0,0,0,0.45), 0 0 20px rgba(0,0,0,0.2)' }}>
                {couple.groom.firstName}
              </p>
              <p ref={groomLastNameRef} className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3" style={{ color: '#A68B6E', textShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                {couple.groom.lastName}
              </p>
            </div>
            <p ref={andRef} className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3" style={{ color: '#FFFFFF' }}>
              AND
            </p>
            <div>
              <p ref={brideFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#F5F0E8', textShadow: '0 1px 3px rgba(0,0,0,0.45), 0 0 20px rgba(0,0,0,0.2)' }}>
                {couple.bride.firstName}
              </p>
              <p ref={brideLastNameRef} className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3" style={{ color: '#A68B6E', textShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                {couple.bride.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
