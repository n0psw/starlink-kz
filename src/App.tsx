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
import AdminPage from './components/AdminPage'

function App() {
  // Simple routing: /admin shows admin panel
  if (window.location.pathname === '/admin') {
    return <AdminPage />
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
