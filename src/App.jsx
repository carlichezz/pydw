import { useState } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import AdminPanel from './components/AdminPanel'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleAdminAccess = (e) => {
    e.preventDefault()
    // Cambia esta contraseña por la que quieras
    if (password === 'novia2025') {
      setIsAdmin(true)
      setError('')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  if (isAdmin) {
    return <AdminPanel />
  }

  return (
    <div className="app-container">
      <WeddingInvitation />
      
      {/* Botón oculto para admin (triple click) */}
      <button 
        className="admin-secret-btn"
        onDoubleClick={() => document.querySelector('.admin-login').style.display = 'flex'}
      >
        👑
      </button>
      
      {/* Panel de login admin */}
      <div className="admin-login" style={{display: 'none'}}>
        <div className="admin-login-modal">
          <h2>Panel de Administración</h2>
          <form onSubmit={handleAdminAccess}>
            <input 
              type="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Acceder</button>
            {error && <p className="error">{error}</p>}
          </form>
          <button className="close-btn" onClick={() => document.querySelector('.admin-login').style.display = 'none'}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App