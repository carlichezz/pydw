import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({})
  const [showForm, setShowForm] = useState(false)
  
  // Fecha de la boda (cámbiala)
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
  
  // Abrir invitación con animación
  if (!isOpen) {
    return (
      <div className="invitation-cover">
        <div className="cover-content">
          <div className="floral-decoration">✿</div>
          <p className="cover-subtitle">Nos casamos</p>
          <h1 className="cover-names">Dario & Patry</h1>
          <div className="cover-line"></div>
          <p className="cover-date">16 de Mayo, 2026</p>
          <button className="open-invitation" onClick={() => setIsOpen(true)}>
            Abrir invitación
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="wedding-invitation">
      {/* Header con pareja */}
      <header className="wedding-header">
        <div className="header-badge">Save the Date</div>
        <h1 className="couple-names">
          <span className="name">Dario</span>
          <span className="ampersand">&</span>
          <span className="name">Patricia</span>
        </h1>
        <div className="wedding-quote">
          "Y ahora permanecen la fe, la esperanza y el amor, estos tres; 
          pero el mayor de ellos es el amor"
        </div>
      </header>
      
      {/* Cuenta regresiva estilo rústico */}
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
      
      {/* Historia de amor */}
      <section className="love-story">
        <h2>Nuestra historia</h2>
        <div className="story-timeline">
          <div className="story-milestone">
            <div className="milestone-year">2018</div>
            <p>Nos conocimos en un café</p>
          </div>
          <div className="story-milestone">
            <div className="milestone-year">2021</div>
            <p>Primer viaje juntos</p>
          </div>
          <div className="story-milestone">
            <div className="milestone-year">2024</div>
            <p>El día que dije que sí</p>
          </div>
        </div>
      </section>
      
      {/* RSVP - Formulario elegante */}
      <section className="rsvp-elegant">
        <div className="rsvp-container">
          <h2>Confirma tu asistencia</h2>
          <p>Por favor confirma antes del 20 de agosto</p>
          
          {!showForm ? (
            <button className="rsvp-button" onClick={() => setShowForm(true)}>
              Confirmar asistencia
            </button>
          ) : (
            <form className="elegant-form" onSubmit={(e) => {
              e.preventDefault()
              alert('✨ ¡Gracias por confirmar! Te esperamos ✨')
              setShowForm(false)
            }}>
              <input type="text" placeholder="Nombre completo" required />
              <input type="email" placeholder="Correo electrónico" required />
              <select required>
                <option value="">¿Acompañante?</option>
                <option value="si">Asistiré con acompañante</option>
                <option value="no">Asistiré solo(a)</option>
              </select>
              <select required>
                <option value="">Restricciones alimenticias</option>
                <option value="ninguna">Ninguna</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="celiaco">Celíaco</option>
              </select>
              <textarea placeholder="Mensaje para los novios (opcional)"></textarea>
              <button type="submit" className="submit-rsvp">Enviar confirmación</button>
            </form>
          )}
        </div>
      </section>
      
      {/* Galería de momentos */}
      <section className="memory-gallery">
        <h2>Galería de momentos</h2>
        <div className="gallery-rustic">
          <div className="gallery-photo photo-1"></div>
          <div className="gallery-photo photo-2"></div>
          <div className="gallery-photo photo-3"></div>
          <div className="gallery-photo photo-4"></div>
        </div>
      </section>
      
      {/* Lista de regalos */}
      <section className="gifts-rustic">
        <div className="gifts-content">
          <h2>Lista de regalos</h2>
          <p>Tu presencia es nuestro mejor regalo,</p>
          <p>pero si deseas contribuir a nuestro nuevo hogar:</p>
          
          <div className="gift-options">
            <div className="gift-option">
              <span className="gift-emoji">🏠</span>
              <h4>Mesa de dinero</h4>
              <p>Disponible en la recepción</p>
            </div>
            <div className="gift-option">
              <span className="gift-emoji">🎁</span>
              <h4>Amazon Wishlist</h4>
              <button onClick={() => window.open('#', '_blank')}>Ver lista →</button>
            </div>
            <div className="gift-option">
              <span className="gift-emoji">💳</span>
              <h4>Transferencia</h4>
              <p>CLABE: 1234 5678 9012 3456 78</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cierre romántico */}
      <footer className="wedding-footer">
        <div className="footer-content">
          <p className="footer-greeting">Con mucho cariño,</p>
          <p className="footer-names">Dario & Patricia</p>
          <p className="footer-thanks">¡Gracias por ser parte de este sueño!</p>
        </div>
      </footer>
    </div>
  )
}

export default App