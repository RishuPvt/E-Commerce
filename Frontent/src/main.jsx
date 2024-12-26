import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{ UsercontextProvider} from './context/Usercontext.jsx'
import { CartProvider } from './context/Caetcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <UsercontextProvider>
    
    <App />

    </UsercontextProvider>
    </CartProvider>
    
  </StrictMode>,
)
