import TopBanner from './components/TopBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import OrderOptions from './components/OrderOptions'
import UseCases from './components/UseCases'
import Features from './components/Features'
import Installation from './components/Installation'
import Services from './components/Services'
import ConnectionSchemes from './components/ConnectionSchemes'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden max-w-full">
      <TopBanner />
      <Header />
      <Hero />
      <OrderOptions />
      <Installation />
      <Services />
      <UseCases />
      <Features />
      <ConnectionSchemes />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
