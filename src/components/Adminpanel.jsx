import { useState, useEffect } from 'react'
import GuestManager from './GuestManager'
import InvitationGenerator from './InvitationGenerator'
import './AdminPanel.css'

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('guests')
  const [guests, setGuests] = useState([])

  // Cargar invitados del JSON
  useEffect(() => {
    fetch('/guests.json')
      .then(response => response.json())
      .then(data => setGuests(data))
      .catch(error => console.error('Error cargando invitados:', error))
  }, [])

  // Guardar invitados
  const saveGuests = (updatedGuests) => {
    setGuests(updatedGuests)
    localStorage.setItem('guests', JSON.stringify(updatedGuests))
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>💍 Panel de la Novia</h1>
        <button className="logout-btn" onClick={() => window.location.reload()}>
          Cerrar sesión
        </button>
      </header>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'guests' ? 'active' : ''} 
          onClick={() => setActiveTab('guests')}
        >
          📋 Lista de Invitados
        </button>
        <button 
          className={activeTab === 'send' ? 'active' : ''} 
          onClick={() => setActiveTab('send')}
        >
          ✉️ Enviar Invitaciones
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''} 
          onClick={() => setActiveTab('stats')}
        >
          📊 Estadísticas
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'guests' && (
          <GuestManager guests={guests} onSave={saveGuests} />
        )}
        {activeTab === 'send' && (
          <InvitationGenerator guests={guests} onUpdate={saveGuests} />
        )}
        {activeTab === 'stats' && (
          <div className="stats-panel">
            <h2>Estadísticas de Invitados</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Invitados</h3>
                <p className="stat-number">{guests.length}</p>
              </div>
              <div className="stat-card">
                <h3>Invitaciones Enviadas</h3>
                <p className="stat-number">{guests.filter(g => g.invitationSent).length}</p>
              </div>
              <div className="stat-card">
                <h3>Confirmados</h3>
                <p className="stat-number">{guests.filter(g => g.confirmed).length}</p>
              </div>
              <div className="stat-card">
                <h3>Pendientes</h3>
                <p className="stat-number">{guests.filter(g => !g.invitationSent).length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel