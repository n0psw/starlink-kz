import Header from './components/Header'
import Hero from './components/Hero'
import UseCases from './components/UseCases'
import Benefits from './components/Benefits'
import Features from './components/Features'
import Setup from './components/Setup'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Guarantees from './components/Guarantees'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden max-w-full">
      <Header />
      <Hero />
      <UseCases />
      <Benefits />
      <Features />
      <Stats />
      <WhyUs />
      <Setup />
      <Testimonials />
      <Pricing />
      <Guarantees />
      <FAQ />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App

