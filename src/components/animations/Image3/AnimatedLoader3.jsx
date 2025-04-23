import { useRef, useState, useEffect } from 'react'
import './AnimatedLoader3.css'

export default function AnimatedLoader3({ finalImage, onFinish }) {
  const [leftLocked, setLeftLocked] = useState(false)
  const [rightLocked, setRightLocked] = useState(false)
  const [showLeftRing, setShowLeftRing] = useState(true)
  const [showRightRing, setShowRightRing] = useState(true)
  const [hideUI, setHideUI] = useState(false)

  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const leftZoneRef = useRef(null)
  const rightZoneRef = useRef(null)

  const soundLeftRef = useRef(null)
  const soundRightRef = useRef(null)

  const [dragging, setDragging] = useState(null)

  useEffect(() => {
    soundLeftRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/sound3_left.mp3`)
    soundRightRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/sound3_right.mp3`)
  }, [])

  useEffect(() => {
    if (leftLocked && rightLocked) {
      setHideUI(true)
      setTimeout(() => {
        if (onFinish) onFinish()
      }, 2000)
    }
  }, [leftLocked, rightLocked, onFinish])

  const handleMouseDown = (side, e) => {
    e.preventDefault()
    if ((side === 'left' && leftLocked) || (side === 'right' && rightLocked)) return

    if (side === 'left') setShowLeftRing(false)
    if (side === 'right') setShowRightRing(false)

    const ref = side === 'left' ? leftRef : rightRef
    const element = ref.current

    setDragging({
      side,
      offsetX: e.clientX - element.offsetLeft,
      offsetY: e.clientY - element.offsetTop,
    })
  }

  const handleMouseMove = (e) => {
    if (!dragging) return
    const ref = dragging.side === 'left' ? leftRef : rightRef
    const element = ref.current
    if (!element) return

    const newLeft = e.clientX - dragging.offsetX
    const newTop = e.clientY - dragging.offsetY

    element.style.left = `${newLeft}px`
    element.style.top = `${newTop}px`
  }

  const handleMouseUp = () => {
    if (!dragging) return

    const ref = dragging.side === 'left' ? leftRef : rightRef
    const zoneRef = dragging.side === 'left' ? leftZoneRef : rightZoneRef
    const lockSetter = dragging.side === 'left' ? setLeftLocked : setRightLocked
    const ringReset = dragging.side === 'left' ? setShowLeftRing : setShowRightRing
    const soundToPlay = dragging.side === 'left' ? soundLeftRef.current : soundRightRef.current

    const el = ref.current
    const zone = zoneRef.current
    if (!el || !zone) return

    const elCenterX = el.offsetLeft + el.offsetWidth / 2
    const elCenterY = el.offsetTop + el.offsetHeight / 2

    const zoneX = zone.offsetLeft
    const zoneY = zone.offsetTop
    const zoneWidth = zone.offsetWidth
    const zoneHeight = zone.offsetHeight

    const inZone =
      elCenterX >= zoneX &&
      elCenterX <= zoneX + zoneWidth &&
      elCenterY >= zoneY &&
      elCenterY <= zoneY + zoneHeight

    if (inZone) {
      el.classList.add('locked')
      lockSetter(true)
      ringReset(false)
      soundToPlay?.play().catch(() => {})
    } else {
      ringReset(true)
    }

    setDragging(null)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  return (
    <div className="animation-container">
      <div className={`prompt-text ${hideUI ? 'fade-out-fast' : ''}`}>Drag Cats into Place</div>
      <div className={`drop-zone left-zone ${hideUI ? 'fade-out-fast' : ''}`} ref={leftZoneRef}></div>
      <div className={`drop-zone right-zone ${hideUI ? 'fade-out-fast' : ''}`} ref={rightZoneRef}></div>

      <div
        className={`draggable-container left ${leftLocked ? 'locked' : ''} ${hideUI ? 'fade-out-fast' : ''}`}
        ref={leftRef}
        onMouseDown={(e) => {
          if (!leftLocked) handleMouseDown('left', e)
        }}
      >
        {!leftLocked && showLeftRing && <div className="interaction-ring-3 ring-left-3 pulse-3"></div>}
        <img src={`${import.meta.env.BASE_URL}images/3/left.png`} alt="left" draggable={false} />
      </div>

      <div
        className={`draggable-container right ${rightLocked ? 'locked' : ''} ${hideUI ? 'fade-out-fast' : ''}`}
        ref={rightRef}
        onMouseDown={(e) => {
          if (!rightLocked) handleMouseDown('right', e)
        }}
      >
        {!rightLocked && showRightRing && <div className="interaction-ring-3 ring-right-3 pulse-3"></div>}
        <img src={`${import.meta.env.BASE_URL}images/3/right.png`} alt="right" draggable={false} />
      </div>

      {leftLocked && rightLocked && (
        <img
          src={finalImage}
          className="animated-image fade-in-3"
          alt="cat 3"
        />
      )}
    </div>
  )
}
