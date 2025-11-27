const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900/50">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-500 text-sm max-w-md mx-auto md:mx-0">
              Аренда и покупка высокоскоростного интернета Starlink по всему Казахстану
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 text-center md:text-left">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Контакты</p>
              <a
                href="tel:+77007006613"
                className="block text-white hover:text-accent transition-colors mb-2"
              >
                +7 700 700 6613
              </a>
              <a
                href="https://wa.me/77007006613"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Локация</p>
              <p className="text-white">Алматы, Казахстан</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

