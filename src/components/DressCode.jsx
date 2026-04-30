import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const category1Ref = useRef(null)
  
  // State for tooltip visibility
  const [activeTooltip, setActiveTooltip] = useState(null)
  
  // Neutral palette requested for dress code swatches
  const CREAM = '#F5F0E8'
  const BEIGE = '#D8C3A5'
  const GRAY = '#8B8F97'
  const BLACK = '#000000'
  const NAVY = '#1F2A44'
  const WHITE = '#FFFFFF'

  // Color swatches for guests shown in one horizontal row
  const guestColors = [
    CREAM,
    BEIGE,
    GRAY,
    BLACK,
    NAVY,
    WHITE
  ]

  // Color name mappings
  const colorNames = {
    [CREAM]: 'Cream',
    [BEIGE]: 'Beige',
    [GRAY]: 'Gray',
    [BLACK]: 'Black',
    [NAVY]: 'Navy',
    [WHITE]: 'White'
  }

  useEffect(() => {
    // Dress Code Title animation
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Combined dress code block animation
    if (category1Ref.current) {
      const category1Container = category1Ref.current
      const flexContainer = category1Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category1Image = flexContainer.querySelector('.dresscode-image-container')
        const category1Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
        if (category1Image) {
          gsap.set(category1Image, { opacity: 0, x: -30 })
        }
        if (category1Content) {
          gsap.set(category1Content, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: category1Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category1Image) {
              gsap.to(category1Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category1Content) {
              gsap.to(category1Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          trigger.vars.trigger === category1Ref.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="relative pb-16 sm:pb-20 md:pb-24">
      {/* Dress Code Title */}
      <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16">
        <div>
          {/* Single Flower 1 Image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/single-flower-1.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize dress-code-title-text"
            >
              Dress Code
            </span>
          </h3>
          {/* General Dress Code Description */}
          <p className="text-base sm:text-lg font-albert font-thin italic dress-code-description">
            {dresscode.mainDressCode?.description || "Formal attire with these colors on our special day."}
          </p>
        </div>
      </div>

      {/* Dress Code Content */}
      {dresscode.sections && dresscode.sections[0] && (
        <div ref={category1Ref} className="transition-opacity duration-500 ease-in-out">
          <div className="flex flex-col gap-6 md:gap-8 items-start">
            <div className="w-full flex flex-col text-left">
              <div className="text-lg sm:text-xl md:text-2xl font-boska text-burgundy-dark mb-2">
                {dresscode.sections[0].title}
              </div>
              {dresscode.sections[0].description && (
                <p className="text-sm sm:text-base font-albert font-thin italic text-burgundy-dark mb-4">
                  {dresscode.sections[0].description}
                </p>
              )}

              {dresscode.sections[1] && (
                <>
                  <div className="text-lg sm:text-xl md:text-2xl font-boska text-burgundy-dark mb-2">
                    {dresscode.sections[1].title}
                  </div>
                  <p className="text-sm sm:text-base font-albert font-thin italic text-burgundy-dark mb-4">
                    {dresscode.sections[1].shortDescription || dresscode.sections[1].description}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="w-full relative dresscode-image-container mb-6">
            <img
              src="/assets/images/dresscode/dresscode.png"
              alt="Dress code palette guide"
              className="w-full h-auto object-contain rounded"
            />
          </div>

          {/* Landscape swatches under combined dress code */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {guestColors.map((color, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveTooltip(`guests-${index}`)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === `guests-${index}` ? null : `guests-${index}`)}
              >
                <div
                  className="w-7 h-7 sm:w-9 sm:h-9 border border-gray-300 rounded cursor-pointer"
                  style={{ backgroundColor: color }}
                />
                {activeTooltip === `guests-${index}` && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-burgundy-dark text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none color-swatch-tooltip" style={{ position: 'absolute' }}>
                    {colorNames[color]}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-burgundy-dark"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DressCode
