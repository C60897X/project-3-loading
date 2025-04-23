import './Overlay.css'

export default function Overlay({ children, onClose }) {
  return (
    <div className="overlay-backdrop">
      <div className="overlay-window">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="overlay-content">
          {children}
        </div>
      </div>
    </div>
  )
}
