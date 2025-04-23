import { useEffect, useRef, useState } from 'react'
import './AnimatedLoader2.css'

export default function AnimatedLoader2({ frameFolder, finalImage, onFinish }) {
  const [currentFrame, setCurrentFrame] = useState(1)
  const [totalFrames, setTotalFrames] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [hideRing, setHideRing] = useState(false)
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

  // 播放控制逻辑
  useEffect(() => {
    if (started && !finished && totalFrames > 0) {
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
              }, 2000)
            }, 500) // 最后一帧停留 0.5 秒
            return prev
          } else {
            return prev
          }
        })
      }, 150)
    }

    return () => clearInterval(intervalRef.current)
  }, [started, finished, totalFrames, onFinish])

  return (
    <div className="animation-container">
      {/* 提示文字 */}
      {!started && !finished && (
        <div className="prompt-text">Click on Blue Ring</div>
      )}

      {/* 隐形按钮 + 可视化提示圈 */}
      {!started && !finished && (
        <>
          <button
            className="click-button"
            onClick={() => {
              setStarted(true)
              setHideRing(true)
            }}
          >
            {/* Invisible button */}
          </button>

          <div className={`interaction-ring-2 ${hideRing ? 'fade-out' : ''}`}></div>
        </>
      )}

      {/* 帧图 */}
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

      {/* 猫图淡入 + 最后一帧淡出 */}
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
