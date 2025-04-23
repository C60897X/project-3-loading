import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader4.css'

export default function AnimatedLoader4({ finalImage = '/images/cat4.jpg', onFinish }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction, setDirection] = useState(null) // 'right' | 'down'
  const [frameIndex, setFrameIndex] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const intervalRef = useRef(null)
  const containerRef = useRef(null)

  const rightFrames = ['/images/4/right1.png', '/images/4/right2.png']
  const downFrames = ['/images/4/down1.png', '/images/4/down2.png']

  const maxX = 450
  const maxY = 220

  const moveSpeed = 10 // px per tick
  const frameSpeed = 200 // ms per frame

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showFinal) return

      if (e.key === 'ArrowRight' && position.x < maxX) {
        setDirection('right')
        setIsPressed(true)
      } else if (e.key === 'ArrowDown' && position.x >= maxX && position.y < maxY) {
        setDirection('down')
        setIsPressed(true)
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setIsPressed(false)
        setDirection(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [position, showFinal])

  useEffect(() => {
    if (isPressed && direction) {
      intervalRef.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % 2)
        setPosition((prev) => {
          const next = { ...prev }
          if (direction === 'right' && prev.x < maxX) next.x += moveSpeed
          if (direction === 'down' && prev.y < maxY) next.y += moveSpeed
          return next
        })
      }, frameSpeed)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPressed, direction])

  useEffect(() => {
    if (position.x >= maxX && position.y >= maxY) {
      setTimeout(() => setShowFinal(true), 300)
    }
  }, [position])

  const currentFrame = (() => {
    if (direction === 'down') {
      return downFrames[frameIndex % downFrames.length]
    } else if (direction === 'right') {
      return rightFrames[frameIndex % rightFrames.length]
    } else {
      // 当没有按键按下时，根据位置判断停在的方向帧
      if (position.x >= maxX && position.y < maxY) {
        return downFrames[0] // 停在下移起始帧
      } else {
        return rightFrames[0] // 停在右移起始帧
      }
    }
  })()
  

  const showRing = !isPressed && !showFinal && (position.x < maxX || position.y < maxY)

  return (
    <div className="animation-container">
      {!showFinal && (
        <>
          <img
            src="/images/4/destination.png"
            alt="destination"
            className="destination-marker"
          />
          <div
            ref={containerRef}
            className="move-box"
            style={{ width: '200px', height: '200px', transform: `translate(${position.x}px, ${position.y}px)` }}>
            {showRing && <div className="interaction-ring-4 pulse-4"></div>}
            <img src={currentFrame} alt="frame" className="frame-img" />
          </div>
          <div className="prompt-text-4">
            {position.x < maxX
              ? 'Get to the cup! Press and Hold → arrow key'
              : position.y < maxY
              ? 'Get to the cup! Press and hold ↓ arrow key'
              : ''}
          </div>
        </>
      )}
      {showFinal && (
        <img src={finalImage} alt="cat 4" className="animated-image fade-in-4" />
      )}
    </div>
  )
}
