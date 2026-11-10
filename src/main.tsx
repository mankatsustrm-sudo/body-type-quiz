import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy') => void
          selectionChanged: () => void
        }
      }
    }
  }
}

window.Telegram?.WebApp?.ready()
window.Telegram?.WebApp?.expand()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
