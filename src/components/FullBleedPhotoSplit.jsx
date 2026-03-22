import React, { useState } from 'react'
import ImageLightbox from './ImageLightbox'

const cellClass =
  'relative m-0 p-0 overflow-hidden h-[42vw] max-h-[560px] min-h-[200px] sm:min-h-[240px] md:min-h-[280px]'

const splitImgClass =
  'absolute inset-0 m-0 p-0 border-0 w-full h-full object-cover cursor-pointer'

/**
 * Two images in one full-viewport row, no gap, no outer margin/padding.
 * Default: left 2/3, right 1/3. With invertLayout: left 1/3, right 2/3.
 */
const FullBleedPhotoSplit = ({
  leftSrc,
  rightSrc,
  leftAlt = '',
  rightAlt = '',
  invertLayout = false,
}) => {
  const [lightbox, setLightbox] = useState(null) // { src, alt } | null

  const openLeft = () => setLightbox({ src: leftSrc, alt: leftAlt || 'Photo' })
  const openRight = () => setLightbox({ src: rightSrc, alt: rightAlt || 'Photo' })

  const imgKeyHandlers = (open) => ({
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    },
  })

  return (
    <>
      <div
        className="m-0 p-0 max-w-none overflow-x-clip grid grid-cols-3 gap-0"
        style={{ width: '100vw', margin: 0, padding: 0 }}
      >
        {invertLayout ? (
          <>
            <div className={`col-span-1 ${cellClass}`}>
              <img
                src={leftSrc}
                alt={leftAlt}
                className={splitImgClass}
                loading="lazy"
                decoding="async"
                role="button"
                tabIndex={0}
                aria-label={leftAlt ? `View full size: ${leftAlt}` : 'View full size'}
                onClick={openLeft}
                {...imgKeyHandlers(openLeft)}
              />
            </div>
            <div className={`col-span-2 ${cellClass}`}>
              <img
                src={rightSrc}
                alt={rightAlt}
                className={splitImgClass}
                loading="lazy"
                decoding="async"
                role="button"
                tabIndex={0}
                aria-label={rightAlt ? `View full size: ${rightAlt}` : 'View full size'}
                onClick={openRight}
                {...imgKeyHandlers(openRight)}
              />
            </div>
          </>
        ) : (
          <>
            <div className={`col-span-2 ${cellClass}`}>
              <img
                src={leftSrc}
                alt={leftAlt}
                className={splitImgClass}
                loading="lazy"
                decoding="async"
                role="button"
                tabIndex={0}
                aria-label={leftAlt ? `View full size: ${leftAlt}` : 'View full size'}
                onClick={openLeft}
                {...imgKeyHandlers(openLeft)}
              />
            </div>
            <div className={`col-span-1 ${cellClass}`}>
              <img
                src={rightSrc}
                alt={rightAlt}
                className={splitImgClass}
                loading="lazy"
                decoding="async"
                role="button"
                tabIndex={0}
                aria-label={rightAlt ? `View full size: ${rightAlt}` : 'View full size'}
                onClick={openRight}
                {...imgKeyHandlers(openRight)}
              />
            </div>
          </>
        )}
      </div>
      <ImageLightbox
        isOpen={!!lightbox}
        src={lightbox?.src}
        alt={lightbox?.alt ?? ''}
        onClose={() => setLightbox(null)}
      />
    </>
  )
}

export default FullBleedPhotoSplit
