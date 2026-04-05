import { useTranslation } from 'react-i18next'

const TopBanner = () => {
  const { t } = useTranslation()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full h-[36px] md:h-[40px] bg-[#06080E]/95 border-b border-white/[0.07] flex items-center backdrop-blur">
      <div className="container mx-auto px-3 md:px-4 text-center">
        <a
          href="https://starlink.com/residential?referral=RC-DF-11159619-27577-7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text)] text-xs sm:text-sm md:text-base font-semibold hover:text-accent transition-colors inline-block leading-tight"
        >
          {t('topBanner.orderLink')}
        </a>
      </div>
    </div>
  )
}

export default TopBanner
