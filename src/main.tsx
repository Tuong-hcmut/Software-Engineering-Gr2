import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import { AuthProvider } from './context/AuthContext.tsx'
import i18n from './i18n.ts'
import MyRouter from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <MyRouter />
        </AuthProvider>
    </I18nextProvider>
  </StrictMode>,
)
