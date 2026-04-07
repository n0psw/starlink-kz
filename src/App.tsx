import TopBanner from './components/TopBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import UseCases from './components/UseCases'
import Features from './components/Features'
import Installation from './components/Installation'
import Services from './components/Services'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden max-w-full">
      <TopBanner />
      <Header />
      <Hero />
      <Installation />
      <Services />
      <UseCases />
      <Features />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
