const Footer = () => {
  const baseUrl = import.meta.env.BASE_URL || '/'

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: '#030508',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(14,165,233,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 text-center">

            {/* Contacts */}
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-4"
                style={{ color: '#334155' }}
              >
                Контакты
              </p>
              <a
                href="tel:+77007006613"
                className="block text-sm mb-2 transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
              >
                +7 700 700 6613
              </a>
              <a
                href="tel:+77019444441"
                className="block text-sm mb-2 transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
              >
                +7 701 944 4441
              </a>
              <a
                href="https://wa.me/77007006613"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors"
                style={{ color: '#64748b' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#38bdf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
              >
                WhatsApp
              </a>
            </div>

            {/* Divider — vertical on md */}
            <div
              className="hidden md:block w-px h-20 self-center"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />

            {/* Location */}
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-4"
                style={{ color: '#334155' }}
              >
                Локация
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#64748b' }}>
                Оскемен, Риддер, Алтай, Алматы,<br />
                Алматинская область, Талдыкорган, Кокшетау
              </p>
              <a
                href="https://2gis.kz/ust-kamenogorsk/firm/70000001095035295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-1 transition-opacity opacity-30 hover:opacity-70"
                aria-label="2ГИС"
                title="2ГИС"
              >
                <img
                  src={`${baseUrl}2gis.svg`}
                  alt="2ГИС"
                  className="h-6 w-6"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          className="mt-12 pt-6 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-[11px]" style={{ color: '#1e293b' }}>
            © {new Date().getFullYear()} Starlink KZ. Официальный дилер.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
