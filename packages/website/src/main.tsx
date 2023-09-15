import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './styles/tailwind.css'
import './styles/preflight.css'
import './styles/global.css'
import '@lowcode-packages/material'
import '@lowcode-packages/material/index.css'
import '@lowcode-packages/material/animation.css'
import axios from 'axios'
import { message } from 'antd'
import './i18n'

message.config({
  top: 80,
  duration: 1,
  rtl: true
})
window.axios = axios
window.enableClick = true

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
