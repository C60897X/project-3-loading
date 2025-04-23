import { useState } from 'react'
import Gallery from './components/Gallery'
import Overlay from './components/Overlay'
import InteractiveImage from './components/InteractiveImage'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)

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
