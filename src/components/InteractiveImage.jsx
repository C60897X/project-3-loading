import { useState } from 'react'
import AnimatedLoader1 from './animations/Image1/AnimatedLoader1'
import AnimatedLoader2 from './animations/Image2/AnimatedLoader2'
import AnimatedLoader3 from './animations/Image3/AnimatedLoader3'
import AnimatedLoader4 from './animations/Image4/AnimatedLoader4'
import AnimatedLoader5 from './animations/Image5/AnimatedLoader5'
import AnimatedLoader6 from './animations/Image6/AnimatedLoader6'



import './InteractiveImage.css'

export default function InteractiveImage({ image, interactionType, frameFolder, onClose }) {
  const [showFinal, setShowFinal] = useState(false)

  const renderInteraction = () => {
    switch (interactionType) {
      case 'hold':
        return (
          <AnimatedLoader1
            frameFolder={frameFolder}
            finalImage={image}
            onFinish={() => setShowFinal(true)}
          />
        )
      case 'click':
        return (
          <AnimatedLoader2
            frameFolder={frameFolder}
            finalImage={image}
            onFinish={() => setShowFinal(true)}
          />
        )
      case 'drag':
        return (
          <AnimatedLoader3
            finalImage={image}
            onFinish={() => setShowFinal(true)}
          />
        )
      case 'keyboard':
        return (
          <AnimatedLoader4
            finalImage={image}
            onFinish={() => setShowFinal(true)}
          />
        )
      case 'typing':
        return (
          <AnimatedLoader5
            finalImage={image}
            onFinish={() => setShowFinal(true)}
          />
      )
      case 'mouse':
        return (
          <AnimatedLoader6
            finalImage={image}
            onFinish={() => setShowFinal(true)}
          />
      )

      default:
        return <p>Unknown interaction</p>
    }
  }

  return (
    <div className="interactive-image">
      {!showFinal ? renderInteraction() : (
        <>
          <img src={image} className="overlay-image" />
        </>
      )}
    </div>
  )
}
