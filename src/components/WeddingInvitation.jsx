import { useState, useEffect } from 'react'

function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = useState({})
  
  const weddingDate = new Date('2026-05-16T16:00:00')
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = weddingDate - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="wedding-invitation">
      {/* Header con pareja */}
      <header className="wedding-header">
        <div className="header-badge">Save the Date</div>
        <h1 className="couple-names">
          <span className="name">Dario</span>
          <span className="ampersand">&</span>
          <span className="name">Patry</span>
        </h1>
        <div className="wedding-quote">
          "Y ahora permanecen la fe, la esperanza y el amor, estos tres; 
          pero el mayor de ellos es el amor"
        </div>
      </header>
      
      {/* Cuenta regresiva */}
      <section className="countdown-rustic">
        <h2>Contando los días</h2>
        <div className="countdown-timer">
          <div className="time-block">
            <span className="time-number">{timeLeft.days || 0}</span>
            <span className="time-label">Días</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{timeLeft.hours || 0}</span>
            <span className="time-label">Horas</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{timeLeft.minutes || 0}</span>
            <span className="time-label">Minutos</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-number">{timeLeft.seconds || 0}</span>
            <span className="time-label">Segundos</span>
          </div>
        </div>
      </section>
      
      {/* Ceremonia y recepción */}
      <section className="events-section">
        <div className="event-card">
          <div className="event-icon">⛪</div>
          <h3>Ceremonia Religiosa</h3>
          <p>Capilla de Nuestra Señora</p>
          <p>5:00 PM</p>
          <button className="map-link" onClick={() => window.open('https://maps.google.com', '_blank')}>
            Ver ubicación →
          </button>
        </div>
        
        <div className="event-divider">
          <span className="divider-flower">✿</span>
        </div>
        
        <div className="event-card">
          <div className="event-icon">🎉</div>
          <h3>Recepción</h3>
          <p>Hacienda Los Olivos</p>
          <p>7:00 PM</p>
          <button className="map-link" onClick={() => window.open('https://maps.google.com', '_blank')}>
            Ver ubicación →
          </button>
        </div>
      </section>
      
      {/* Dress code */}
      <section className="dresscode-section">
        <div className="dresscode-content">
          <span className="dresscode-icon">👗</span>
          <h3>Código de vestimenta</h3>
          <p>Elegante - Colores tierra, beige, verde olivo</p>
          <div className="color-palette">
            <div className="color" style={{backgroundColor: '#D4C5B2'}}></div>
            <div className="color" style={{backgroundColor: '#C2A878'}}></div>
            <div className="color" style={{backgroundColor: '#8B7355'}}></div>
            <div className="color" style={{backgroundColor: '#556B2F'}}></div>
          </div>
          <small>Por favor, evita vestir de blanco o negro</small>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="wedding-footer">
        <div className="footer-content">
          <p className="footer-greeting">Con mucho cariño,</p>
          <p className="footer-names">Dario & Patry</p>
          <div className="social-hashtag"></div>
          <p className="footer-thanks">¡Gracias por ser parte de este sueño!</p>
        </div>
      </footer>
    </div>
  )
}

export default WeddingInvitation