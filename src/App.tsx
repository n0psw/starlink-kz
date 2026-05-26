import { lazy, Suspense } from 'react'
import TopBanner from './components/TopBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import OrderOptions from './components/OrderOptions'
import Features from './components/Features'
import Installation from './components/Installation'
import SatelliteMap from './components/SatelliteMap'
import ConnectionSchemes from './components/ConnectionSchemes'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const AdminPage = lazy(() => import('./components/AdminPage'))

function App() {
  // Simple routing: /admin shows admin panel
  if (window.location.pathname === '/admin') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Загрузка панели...</div>}>
        <AdminPage />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden max-w-full">
      <TopBanner />
      <Header />
      <Hero />
      <OrderOptions />
      <Installation />
      {/* <Services /> */}
      {/* <UseCases /> */}
      <Features />
      <SatelliteMap />
      <ConnectionSchemes />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
