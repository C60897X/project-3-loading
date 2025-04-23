import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import Overlay from './components/Overlay'
import InteractiveImage from './components/InteractiveImage'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const base = import.meta.env.BASE_URL

    const preloadImages = (imagePaths) => {
      imagePaths.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    const preloadSounds = (soundPaths) => {
      soundPaths.forEach((src) => {
        const audio = new Audio()
        audio.src = src
      })
    }

    preloadImages([
      `${base}images/cat1.jpg`,
      `${base}images/cat2.jpg`,
      `${base}images/cat3.jpg`,
      `${base}images/cat4.jpg`,
      `${base}images/cat5.jpg`,
      `${base}images/cat6.jpg`,
      ...Array.from({ length: 7 }, (_, i) => `${base}images/1/${i + 1}.jpg`),
      ...Array.from({ length: 7 }, (_, i) => `${base}images/2/${i + 1}.jpg`),
      ...Array.from({ length: 10 }, (_, i) => `${base}images/6/${i + 1}.jpg`),
      `${base}images/4/right1.png`,
      `${base}images/4/right2.png`,
      `${base}images/4/down1.png`,
      `${base}images/4/down2.png`,
      `${base}images/5/start.jpg`,
      `${base}images/5/w.jpg`,
      `${base}images/5/o.jpg`,
      `${base}images/5/r.jpg`,
      `${base}images/5/k.jpg`,
      `${base}images/5/1.jpg`,
      `${base}images/5/2.jpg`,
      `${base}images/6/mouse6.png`,
      `${base}images/4/destination.png`,
      `${base}images/3/left.png`,
      `${base}images/3/right.png`,
      `${base}images/background_pattern.png`
    ])

    preloadSounds([
      `${base}sounds/sound1.wav`,
      `${base}sounds/sound2.wav`,
      `${base}sounds/sound3_left.mp3`,
      `${base}sounds/sound3_right.mp3`,
      `${base}sounds/sound4.wav`,
      `${base}sounds/sound5.wav`,
      `${base}sounds/sound6.wav`,
    ])
  }, [])

  return (
    <div className="app">
      <Gallery onSelectImage={setSelectedImage} />
      {selectedImage && (
        <Overlay onClose={() => setSelectedImage(null)}>
          <InteractiveImage image={selectedImage} />
        </Overlay>
      )}
    </div>
  )
}

export default App
