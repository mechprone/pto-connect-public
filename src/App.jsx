import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import CreatePTOPage from './pages/CreatePTOPage'
import SuccessPage from './pages/SuccessPage'
import CancelPage from './pages/CancelPage'
import RSVPPage from './pages/RSVPPage'
import Header from './components/Header'
import RSVPHeader from './components/RSVPHeader'
import Footer from './components/Footer'

function AppContent() {
  const location = useLocation()
  const isRSVPPage = location.pathname.startsWith('/rsvp/')

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {isRSVPPage ? <RSVPHeader /> : <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/create" element={<CreatePTOPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/rsvp/:eventId" element={<RSVPPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
