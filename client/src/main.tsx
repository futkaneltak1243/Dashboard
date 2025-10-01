import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./contexts/theme-context/ThemeContextProvider.tsx"
import { SidebarProvider } from './contexts/sidebar-context/SidebarContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SidebarProvider>
  </StrictMode>,
)
