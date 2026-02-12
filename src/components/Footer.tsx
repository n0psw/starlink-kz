const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-8 md:py-10 lg:py-16">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-12 text-center">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Контакты</p>
              <a
                href="tel:+77007006613"
                className="block text-slate-700 hover:text-accent transition-colors mb-2"
              >
                +7 700 700 6613
              </a>
              <a
                href="tel:+77019444441"
                className="block text-slate-700 hover:text-accent transition-colors mb-2"
              >
                +7 701 944 4441
              </a>
              <a
                href="https://wa.me/77007006613"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-700 hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
            </div>

            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Локация</p>
              <p className="text-slate-700">Оскемен, Риддер, Алтай, Алматы, Кокшетау</p>
              <a
                href="https://2gis.kz/ust-kamenogorsk/firm/70000001095035295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-2 transition-opacity hover:opacity-80"
                aria-label="2ГИС"
                title="2ГИС"
              >
                <img src="/2gis.svg" alt="2ГИС" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

