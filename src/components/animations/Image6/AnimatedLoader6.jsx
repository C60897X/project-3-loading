import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader6.css'

export default function AnimatedLoader6({ finalImage = `${import.meta.env.BASE_URL}images/cat6.jpg`, onFinish }) {
  const frameCount = 10
  const frameDuration = 200 // ⬅️ 从 150ms 改为 200ms
  const [frameIndex, setFrameIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [hideUI, setHideUI] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const animationTimeout = useRef(null)
  const stopTimeout = useRef(null)
  const soundRef = useRef(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const lastFrameTime = useRef(Date.now())

  // 初始化音效
  useEffect(() => {
    soundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/sound6.wav`)
    soundRef.current.loop = true
  }, [])

  // 鼠标移动触发动画逐帧控制（节奏限定）
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dx = Math.abs(e.clientX - lastMousePos.current.x)
      const dy = Math.abs(e.clientY - lastMousePos.current.y)

      setCursorPos({ x: e.clientX, y: e.clientY })
      lastMousePos.current = { x: e.clientX, y: e.clientY }

      const now = Date.now()
      if ((dx > 1 || dy > 1) && now - lastFrameTime.current >= frameDuration && frameIndex < frameCount - 1 && !showFinal) {
        lastFrameTime.current = now
        setFrameIndex((prev) => Math.min(prev + 1, frameCount - 1))
        soundRef.current?.play().catch(() => {})
        clearTimeout(stopTimeout.current)
        stopTimeout.current = setTimeout(() => soundRef.current?.pause(), 300)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [frameIndex, showFinal])

  // 最后一帧后触发 UI 隐藏和猫图显示
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
          {frameIndex < frameCount - 1 && (
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
