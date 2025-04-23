import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader2.css'

export default function AnimatedLoader2({ frameFolder, finalImage, onFinish }) {
  const [currentFrame, setCurrentFrame] = useState(1)
  const [totalFrames, setTotalFrames] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [hideRing, setHideRing] = useState(false)
  const intervalRef = useRef(null)
  const soundRef = useRef(null)

  // 初始化音效
  useEffect(() => {
    soundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/sound2.wav`)
    soundRef.current.loop = true
  }, [])

  // 自動偵測幀數
  useEffect(() => {
    let index = 1
    const testImage = () => {
      const img = new Image()
      img.src = `${import.meta.env.BASE_URL}images/${frameFolder}/${index}.jpg`
      img.onload = () => {
        index++
        testImage()
      }
      img.onerror = () => {
        setTotalFrames(index - 1)
      }
    }
    testImage()
  }, [frameFolder])

  // 播放控制邏輯
  useEffect(() => {
    if (started && !finished && totalFrames > 0) {
      soundRef.current?.play().catch(() => {})
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev < totalFrames - 1) {
            return prev + 1
          } else if (prev === totalFrames - 1) {
            clearInterval(intervalRef.current)
            setCurrentFrame(totalFrames)

            setTimeout(() => {
              soundRef.current?.pause()
              setFinished(true)
              setTimeout(() => {
                if (onFinish) onFinish()
              }, 2000)
            }, 500)
            return prev
          } else {
            return prev
          }
        })
      }, 150)
    }

    return () => {
      clearInterval(intervalRef.current)
      soundRef.current?.pause()
    }
  }, [started, finished, totalFrames, onFinish])

  return (
    <div className="animation-container">
      {!started && !finished && (
        <div className="prompt-text">Click on Blue Ring</div>
      )}

      {!started && !finished && (
        <>
          <button
            className="click-button"
            onClick={() => {
              setStarted(true)
              setHideRing(true)
            }}
          ></button>
          <div className={`interaction-ring-2 ${hideRing ? 'fade-out' : ''}`}></div>
        </>
      )}

      {started && !finished &&
        Array.from({ length: totalFrames }).map((_, i) => (
          <img
            key={i}
            src={`${import.meta.env.BASE_URL}images/${frameFolder}/${i + 1}.jpg`}
            className="animated-image"
            style={{
              opacity: currentFrame === i + 1 ? 1 : 0,
              transition: 'opacity 0.15s linear',
              zIndex: totalFrames - i
            }}
            alt={`frame ${i + 1}`}
          />
        ))}

      {finished && (
        <>
          <img
            src={`${import.meta.env.BASE_URL}images/${frameFolder}/${totalFrames}.jpg`}
            className="animated-image"
            style={{
              opacity: 0,
              animation: 'fade-out-frame 2s forwards',
              zIndex: 2
            }}
            alt="last frame"
          />

          <img
            src={finalImage}
            className="animated-image"
            style={{
              opacity: 0,
              animation: 'fade-in-cat 2s forwards',
              zIndex: 1
            }}
            alt="final cat"
          />
        </>
      )}
    </div>
  )
} 
