import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PricingPage from './pages/PricingPage'
import CreatePage from './pages/CreatePage'
import SuccessPage from './pages/SuccessPage'
import CancelPage from './pages/CancelPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  </BrowserRouter>
)
