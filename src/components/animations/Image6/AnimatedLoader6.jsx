import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader6.css'

export default function AnimatedLoader6({ finalImage = `${import.meta.env.BASE_URL}images/cat6.jpg`, onFinish }) {
  const frameCount = 10
  const frameDuration = 150 // ✅ 回到原设定的 150ms
  const [frameIndex, setFrameIndex] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [hideUI, setHideUI] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const animationFrame = useRef(null)
  const soundRef = useRef(null)
  const lastMoveTimeRef = useRef(Date.now())

  // 初始化音效
  useEffect(() => {
    soundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/sound6.wav`)
    soundRef.current.loop = true
  }, [])

  // 鼠标移动监听器
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      lastMoveTimeRef.current = Date.now()
      setIsMoving(true)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 控制动画逐帧播放
  useEffect(() => {
    let animationLoop

    const loop = () => {
      const now = Date.now()
      const timeSinceMove = now - lastMoveTimeRef.current

      if (frameIndex < frameCount - 1 && !showFinal) {
        if (timeSinceMove < 200) {
          // 鼠标刚刚移动过
          setFrameIndex((prev) => Math.min(prev + 1, frameCount - 1))
          soundRef.current?.play().catch(() => {})
        } else {
          soundRef.current?.pause()
        }
      }

      animationLoop = setTimeout(loop, frameDuration)
    }

    loop()

    return () => clearTimeout(animationLoop)
  }, [frameIndex, showFinal])

  // 播完后切换至猫图
  useEffect(() => {
    if (frameIndex === frameCount - 1 && !showFinal) {
      setHideUI(true)
      soundRef.current?.pause()
      setTimeout(() => {
        setShowFinal(true)
        if (onFinish) onFinish()
      }, 1500)
    }
  }, [frameIndex, onFinish, showFinal])

  return (
    <div className="animation-container" style={{ cursor: 'none' }}>
      {!showFinal && (
        <img
          src={`${import.meta.env.BASE_URL}images/6/${frameIndex + 1}.jpg`}
          alt={`frame ${frameIndex + 1}`}
          className="animated-image"
          style={{
            opacity: hideUI ? 0 : 1,
            transition: 'opacity 1.5s ease',
            zIndex: 2
          }}
        />
      )}

      {!showFinal && (
        <>
          <img
            src={`${import.meta.env.BASE_URL}images/6/mouse6.png`}
            alt="custom cursor"
            className="custom-cursor"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              opacity: hideUI ? 0 : 1,
              transition: 'opacity 1.5s ease'
            }}
          />
          <div
            className="prompt-text-6"
            style={{
              opacity: hideUI ? 0 : 1,
              transition: 'opacity 1.5s ease'
            }}
          >
            Move mouse around
          </div>
          {Date.now() - lastMoveTimeRef.current > 200 && (
            <div
              className="interaction-ring-6 pulse-6"
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                opacity: hideUI ? 0 : 1,
                transition: 'opacity 1.5s ease'
              }}
            ></div>
          )}
        </>
      )}

      {showFinal && (
        <img
          src={finalImage}
          alt="cat 6"
          className="animated-image"
          style={{
            opacity: 0,
            animation: 'fade-in-cat-6 1.5s forwards',
            zIndex: 1
          }}
        />
      )}
    </div>
  )
}
