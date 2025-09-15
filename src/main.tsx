import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { DeviceProvider } from './contexts/DeviceContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </DeviceProvider>
  </StrictMode>,
)
