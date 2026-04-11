import { useState } from 'react'

function GuestManager({ guests, onSave }) {
  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '' })

  const addGuest = () => {
    if (!newGuest.name) return
    const updatedGuests = [...guests, {
      id: Date.now(),
      ...newGuest,
      invitationSent: false,
      confirmed: false,
      uniqueLink: `https://tu-boda.com/invite/${Math.random().toString(36).substr(2, 8)}`
    }]
    onSave(updatedGuests)
    setNewGuest({ name: '', email: '', phone: '' })
  }

  const deleteGuest = (id) => {
    if (window.confirm('¿Eliminar este invitado?')) {
      const updatedGuests = guests.filter(g => g.id !== id)
      onSave(updatedGuests)
    }
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(guests, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', 'invitados.json')
    linkElement.click()
  }

  return (
    <div className="guest-manager">
      <div className="guest-actions">
        <button onClick={exportToJSON} className="export-btn">
          📥 Exportar a JSON
        </button>
      </div>

      <div className="add-guest-form">
        <h3>Agregar Nuevo Invitado</h3>
        <input 
          type="text" 
          placeholder="Nombre completo"
          value={newGuest.name}
          onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={newGuest.email}
          onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
        />
        <input 
          type="tel" 
          placeholder="Teléfono"
          value={newGuest.phone}
          onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
        />
        <button onClick={addGuest}>➕ Agregar Invitado</button>
      </div>

      <div className="guests-list">
        <h3>Lista de Invitados ({guests.length})</h3>
        <div className="guests-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {guests.map(guest => (
                <tr key={guest.id}>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>{guest.phone}</td>
                  <td>
                    {guest.invitationSent ? (
                      <span className="badge sent">✅ Enviada</span>
                    ) : (
                      <span className="badge pending">⏳ Pendiente</span>
                    )}
                    {guest.confirmed && <span className="badge confirmed">🎉 Confirmado</span>}
                  </td>
                  <td>
                    <button onClick={() => deleteGuest(guest.id)} className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GuestManager