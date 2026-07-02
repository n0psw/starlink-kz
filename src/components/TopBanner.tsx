import { useTranslation } from 'react-i18next'

const TopBanner = () => {
  const { t } = useTranslation()

  return (
    <div
      data-top-banner="true"
      className="fixed top-0 left-0 right-0 z-[60] w-full h-[30px] md:h-[36px] flex items-center backdrop-blur-md"
      style={{
        background: 'rgba(5, 8, 16, 0.92)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container mx-auto px-3 md:px-4 text-center">
        <a
          href="https://starlink.com/residential?referral=RC-DF-13176434-89342-1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] sm:text-xs md:text-sm font-medium transition-colors inline-block leading-tight"
          style={{ color: '#94a3b8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
          onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
        >
          {t('topBanner.orderLink')}
        </a>
      </div>
    </div>
  )
}

export default TopBanner
