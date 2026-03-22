import React, { useState } from 'react'
import ImageLightbox from './ImageLightbox'

/**
 * Single photo spanning the viewport width; no margin/padding on the strip.
 */
const FullBleedPhoto = ({ src, alt = '' }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <div
        className="m-0 p-0 max-w-none overflow-x-clip"
        style={{ width: '100vw', margin: 0, padding: 0 }}
      >
        <img
          src={src}
          alt={alt}
          className="m-0 p-0 border-0 align-middle block h-auto max-w-none cursor-pointer"
          style={{ width: '100vw', margin: 0, padding: 0, display: 'block' }}
          loading="lazy"
          decoding="async"
          role="button"
          tabIndex={0}
          aria-label={alt ? `View full size: ${alt}` : 'View full size'}
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setLightboxOpen(true)
            }
          }}
        />
      </div>
      <ImageLightbox
        isOpen={lightboxOpen}
        src={src}
        alt={alt}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

export default FullBleedPhoto
