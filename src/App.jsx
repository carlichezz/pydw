import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <h1>Mi App React en Cloudflare</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Clics: {count}
        </button>
        <p>¡Desplegada en Cloudflare Pages! 🚀</p>
      </div>
    </div>
  )
}

export default App