import { useState } from 'react'
import InteractiveImage from './InteractiveImage'
import Overlay from './Overlay'

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const [showColophon, setShowColophon] = useState(false)

  return (
    <>
      <div className="gallery">
        <h1>Welcome to My Digital Pet World!</h1>
        <div className="about" onClick={() => setShowColophon(!showColophon)}>About</div>
        <div className={`colophon ${showColophon ? 'visible' : 'hidden'}`}>
          This project is a memoir of my cats, to whom I became allergic of and had to send to my friend. Photo credit: me and my friend. Sound credit: freesound.org. <br />
          This project is created by Celina Xie at Washington University in St. Louis, for Advanced Interaction Design in the Communication Design program at the Sam Fox School of Design & Visual Arts, spring 2025. Fonts used are Cabin Sketch designed by Impallari Type and Delius by Natalia Raices. All illustrations were done by Celina.
        </div>

        <div className="frame thumb-1">
          <img
            src={`${import.meta.env.BASE_URL}images/cat1.jpg`}
            alt="Cat 1"
            onClick={() =>
              setSelected({ image: `${import.meta.env.BASE_URL}images/cat1.jpg`, interactionType: 'hold', frameFolder: '1' })
            }
          />
        </div>

        <div className="frame thumb-2">
          <img
            src={`${import.meta.env.BASE_URL}images/cat2.jpg`}
            alt="Cat 2"
            onClick={() =>
              setSelected({ image: `${import.meta.env.BASE_URL}images/cat2.jpg`, interactionType: 'click', frameFolder: '2' })
            }
          />
        </div>

        <div className="frame thumb-3">
          <img
            src={`${import.meta.env.BASE_URL}images/cat3.jpg`}
            alt="Cat 3"
            onClick={() =>
              setSelected({ image: `${import.meta.env.BASE_URL}images/cat3.jpg`, interactionType: 'drag' })
            }
          />
        </div>

        <div className="frame thumb-4">
          <img
            src={`${import.meta.env.BASE_URL}images/cat4.jpg`}
            alt="Cat 4"
            onClick={() =>
              setSelected({ image: `${import.meta.env.BASE_URL}images/cat4.jpg`, interactionType: 'keyboard' })
            }
          />
        </div>

        <div className="frame thumb-5">
          <img
            src={`${import.meta.env.BASE_URL}images/cat5.jpg`}
            alt="Cat 5"
            onClick={() =>
              setSelected({ image: `${import.meta.env.BASE_URL}images/cat5.jpg`, interactionType: 'typing' })
            }
          />
        </div>

        <div className="frame thumb-6">
          <img
            src={`${import.meta.env.BASE_URL}images/cat6.jpg`}
            alt="Cat 6"
            onClick={() =>
              setSelected({ image: `${import.meta.env.BASE_URL}images/cat6.jpg`, interactionType: 'mouse', frameFolder: '6' })
            }
          />
        </div>
      </div>

      {selected && (
        <Overlay onClose={() => setSelected(null)}>
          <InteractiveImage
            image={selected.image}
            interactionType={selected.interactionType}
            frameFolder={selected.frameFolder}
            onClose={() => setSelected(null)}
          />
        </Overlay>
      )}
    </>
  )
}
