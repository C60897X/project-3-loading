import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader6.css'

export default function AnimatedLoader6({ finalImage = `${import.meta.env.BASE_URL}images/cat6.jpg`, onFinish }) {
  const frameCount = 10
  const frameDuration = 150 // ms
  const [frameIndex, setFrameIndex] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [hideUI, setHideUI] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const animationInterval = useRef(null)
  const stopTimeout = useRef(null)

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      clearTimeout(stopTimeout.current)
      stopTimeout.current = setTimeout(() => setIsMoving(false), 200)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 控制逐帧动画
  useEffect(() => {
    if (isMoving && frameIndex < frameCount - 1 && !showFinal) {
      if (!animationInterval.current) {
        animationInterval.current = setInterval(() => {
          setFrameIndex((prev) => {
            if (prev < frameCount - 1) return prev + 1
            clearInterval(animationInterval.current)
            animationInterval.current = null
            return prev
          })
        }, frameDuration)
      }
    } else {
      clearInterval(animationInterval.current)
      animationInterval.current = null
    }
  }, [isMoving, frameIndex, showFinal])

  // 最后一帧后触发 UI 隐藏和猫图显示
  useEffect(() => {
    if (frameIndex === frameCount - 1 && !showFinal) {
      setHideUI(true)
      setTimeout(() => {
        setShowFinal(true)
        if (onFinish) onFinish()
      }, 1500)
    }
  }, [frameIndex, onFinish, showFinal])

  return (
    <div className="animation-container" style={{ cursor: 'none' }}>
      {/* 当前帧图像 */}
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

      {/* 自定义鼠标、提示、ring */}
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
          {!isMoving && (
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

      {/* 猫图淡入 */}
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
