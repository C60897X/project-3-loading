import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader1.css'

export default function AnimatedLoader1({ frameFolder, finalImage, onFinish }) {
  const [currentFrame, setCurrentFrame] = useState(1)
  const [totalFrames, setTotalFrames] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef(null)

  // 自动侦测帧数（.jpg）
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

  // 播放控制逻辑（最后一帧额外停留1秒）
  useEffect(() => {
    if (isPlaying && !finished && totalFrames > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev < totalFrames - 1) {
            return prev + 1
          } else if (prev === totalFrames - 1) {
            clearInterval(intervalRef.current)
            setCurrentFrame(totalFrames)

            setTimeout(() => {
              setFinished(true)
              setTimeout(() => {
                if (onFinish) onFinish()
              }, 1000) // 猫图停留 2 秒
            }, 500) // 最后一帧停留 1 秒

            return prev
          } else {
            return prev
          }
        })
      }, 150)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, finished, totalFrames, onFinish])

  return (
    <div className="animation-container">
      {/* 提示文字 */}
      {!finished && <div className="prompt-text">Hold Down on Food Bag</div>}

      {!finished && (
        <>
          <div
            className="invisible-button-1"
            onMouseDown={() => setIsPlaying(true)}
            onMouseUp={() => {
              setIsPlaying(false)
              clearInterval(intervalRef.current)
            }}
          ></div>

          {/* ⬇️ only show ring when NOT pressing */}
          {!isPlaying && <div className="interaction-ring-1"></div>}
        </>
      )}

      {/* 帧图 */}
      {!finished &&
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

      {/* 猫图 */}
      {finished && (
        <>
          {/* Last frame stays visible during transition */}
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

          {/* Final cat image fades in */}
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
