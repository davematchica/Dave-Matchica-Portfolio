import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#e2e8f0',
            border: '1px solid rgba(99,102,241,0.3)',
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.8rem',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)