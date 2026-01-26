import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const { paymentMethods } = paymentMethodsData

  useEffect(() => {
    // Gift Registry animation
    if (giftRegistryRef.current) {
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: "top 80%",
        animation: gsap.fromTo(giftRegistryRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === giftRegistryRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Gift Registry Section */}
      <div className="relative gift-registry-section">
        <div ref={giftRegistryRef} className="text-center relative z-10">
          {/* Single Flower 2 Image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/single-flower-2.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none gift-registry-title-text"
              style={{ fontStyle: 'italic' }}
            >
              A notes on gifts...
            </span>
          </h3>
          <div className="w-full max-w-3xl mx-auto mb-4">
            <div className="w-full h-px bg-[#6B8FA3] opacity-40"></div>
          </div>
          <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed text-center">
            Our hearts are full, our joy is true,<br />
            This day is brighter shared with you.<br />
            If you wish to give as we begin,<br />
            A <strong>monetary gift</strong> would help us win<br />
            A life together, built with care,<br />
            With love—and thanks beyond compare.
          </p>
        </div>
      </div>

      {/* Gift Registry Modal */}
      {isGiftModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsGiftModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800 modal-methods-title">Methods</h3>
              <button
                onClick={() => setIsGiftModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {paymentMethods && paymentMethods.length > 0 && (
                <div className="flex items-center justify-center">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-center">
                      {/* BPI QR Code Image */}
                      {method.image && (
                        <div className="flex items-center justify-center">
                          <img 
                            src={method.image} 
                            alt="BPI QR Code" 
                            className="w-full max-w-md h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry
