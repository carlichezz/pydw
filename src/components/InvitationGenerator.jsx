import { useState } from 'react'
import QRCode from 'qrcode'

function InvitationGenerator({ guests, onUpdate }) {
  const [generating, setGenerating] = useState(null)
  const [qrCodes, setQrCodes] = useState({})

  const generateQR = async (guestId, link) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(link, {
        width: 300,
        margin: 2,
        color: {
          dark: '#C2B280',
          light: '#FFFFFF'
        }
      })
      setQrCodes(prev => ({ ...prev, [guestId]: qrDataUrl }))
      return qrDataUrl
    } catch (err) {
      console.error('Error generando QR:', err)
    }
  }

  const sendInvitation = async (guest) => {
    setGenerating(guest.id)
    await generateQR(guest.id, guest.uniqueLink)
    
    const emailBody = `Hola ${guest.name},\n\n¡Estás invitado a nuestra boda!\n\nHaz click en el siguiente enlace para ver tu invitación personalizada:\n${guest.uniqueLink}\n\nEscanea el código QR adjunto para acceder rápidamente.\n\n¡Te esperamos!\n\nAlejandro & Valeria`
    
    alert(`📧 Invitación enviada a ${guest.email}\n\n${emailBody}`)
    
    onUpdate(guests.map(g => 
      g.id === guest.id ? { ...g, invitationSent: true } : g
    ))
    
    setGenerating(null)
  }

  return (
    <div className="invitation-generator">
      <div className="guests-invitation-list">
        <h3>Enviar Invitaciones Personalizadas</h3>
        <div className="invitation-grid">
          {guests.map(guest => (
            <div key={guest.id} className="invitation-card">
              <div className="guest-info">
                <h4>{guest.name}</h4>
                <p>📧 {guest.email}</p>
                <p>📱 {guest.phone}</p>
                <p className="invite-link">🔗 {guest.uniqueLink}</p>
              </div>
              
              <div className="invitation-actions">
                {!guest.invitationSent ? (
                  <>
                    <button 
                      onClick={() => generateQR(guest.id, guest.uniqueLink)}
                      className="qr-btn"
                    >
                      📱 Generar QR
                    </button>
                    <button 
                      onClick={() => sendInvitation(guest)}
                      className="send-btn"
                      disabled={generating === guest.id}
                    >
                      {generating === guest.id ? 'Enviando...' : '✉️ Enviar Invitación'}
                    </button>
                  </>
                ) : (
                  <div className="sent-badge">
                    ✅ Invitación enviada
                  </div>
                )}
              </div>
              
              {qrCodes[guest.id] && (
                <div className="qr-preview">
                  <img src={qrCodes[guest.id]} alt="QR Code" />
                  <button onClick={() => {
                    const link = document.createElement('a')
                    link.download = `qr_${guest.name}.png`
                    link.href = qrCodes[guest.id]
                    link.click()
                  }}>
                    Descargar QR
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvitationGenerator