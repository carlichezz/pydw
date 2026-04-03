import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showDetails, setShowDetails] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0)
  
  // Fecha de la boda (cámbiala por tu fecha)
  const weddingDate = new Date('2026-05-16T16:00:00')
  
  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date()
      const difference = weddingDate - today
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24))
      setDaysLeft(days > 0 ? days : 0)
    }
    
    calculateDaysLeft()
  }, [])
  
  return (
    <div className="wedding-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <p className="greeting">¡Nos Casamos!</p>
          <h1 className="names">Patricia & Dario</h1>
          <div className="date-badge">
            <span>16 de Mayo, 2026</span>
          </div>
        </div>
      </div>
      
      {/* Contador regresivo */}
      <div className="countdown-section">
        <div className="countdown-number">
          <span className="days-text">Faltan </span>
          <span className="days">{daysLeft}</span>
          <span className="days-text"> días</span>
        </div>
      </div>
      
      {/* Mapa y ubicación */}
      <div className="map-section">
        <h2>¿Cómo llegar?</h2>
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14679.6318773124!2d-82.38631170106464!3d23.100464558655563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd7156cdbe9eb7%3A0x6fa3651b36c1e781!2sPISCINA%20EL%20MORA&#39;O!5e0!3m2!1ses-419!2scu!4v1775242748878!5m2!1ses-419!2scu" 
            width="100%" 
            height="300" 
            style={{border: 0}}
            allowFullScreen=""
            loading="lazy"
            title="Mapa ubicación"
          ></iframe>
        </div>
        <button className="map-btn" onClick={() => window.open('https://maps.app.goo.gl/8GGMkMrXb8rDeYZm7', '_blank')}>
          Abrir en Google Maps 📍
        </button>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <p>✨ Los esperamos con mucho cariño ✨</p>
        <p> Patricia y Dario</p>
      </footer>
    </div>
  )
}

export default App