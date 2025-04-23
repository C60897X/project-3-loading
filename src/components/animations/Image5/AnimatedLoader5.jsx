import { useEffect, useState, useRef } from 'react'
import './AnimatedLoader5.css'

export default function AnimatedLoader5({ finalImage = `${import.meta.env.BASE_URL}images/cat5.jpg`, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPhase, setAutoPhase] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const soundRef = useRef(null)

  const inputSequence = ['w', 'o', 'r', 'k']
  const imageSequence = ['start', 'w', 'o', 'r', 'k', '1', '2']

  useEffect(() => {
    soundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/sound5.wav`)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (autoPhase || showFinal) return
      const expectedKey = inputSequence[currentIndex]
      if (e.key.toLowerCase() === expectedKey) {
        setCurrentIndex((prev) => prev + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, autoPhase, showFinal])

  useEffect(() => {
    if (currentIndex === 4) {
      setAutoPhase(true)
      setTimeout(() => {
        setCurrentIndex(5)
        soundRef.current?.play().catch(() => {})
      }, 400) // k → 1.jpg
      setTimeout(() => setCurrentIndex(6), 650) // 1.jpg → 2.jpg
      setTimeout(() => {
        setShowFinal(true)
        if (onFinish) onFinish()
      }, 1200)
    }
  }, [currentIndex, onFinish])

  return (
    <div className="animation-container">
      {!showFinal && (
        <>
          {imageSequence.map((name, index) => (
            <img
              key={name}
              src={`${import.meta.env.BASE_URL}images/5/${name}.jpg`}
              alt={name}
              className={`frame-img5 ${currentIndex === index ? 'visible' : 'hidden'}`}
            />
          ))}
          {currentIndex < 4 && <div className="interaction-ring-5 pulse-5"></div>}
          <div className="prompt-text-5">It's time to work! Type: "Worktime"</div>
        </>
      )}
      {showFinal && (
        <img src={finalImage} alt="cat 5" className="animated-image fade-in-5" />
      )}
    </div>
  )
}
