import TopBanner from './components/TopBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import UseCases from './components/UseCases'
import Benefits from './components/Benefits'
import Features from './components/Features'
import Setup from './components/Setup'
import Installation from './components/Installation'
import CoverageMap from './components/CoverageMap'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden max-w-full">
      <TopBanner />
      <Header />
      <Hero />
      <UseCases />
      <div className="hidden" aria-hidden="true">
        <Benefits />
      </div>
      <Features />
      <div className="hidden" aria-hidden="true">
        <Stats />
      </div>
      <div className="hidden" aria-hidden="true">
        <WhyUs />
      </div>
      <div className="hidden" aria-hidden="true">
        <Setup />
      </div>
      <Installation />
      <div className="hidden" aria-hidden="true">
        <CoverageMap />
      </div>
      <div className="hidden" aria-hidden="true">
        <Testimonials />
      </div>
      <Pricing />
      {/* <Guarantees /> */}
      <div className="hidden" aria-hidden="true">
        <FAQ />
      </div>
      <div className="hidden" aria-hidden="true">
        <ContactForm />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App

