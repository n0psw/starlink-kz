import { useTranslation } from 'react-i18next'

const TopBanner = () => {
  const { t } = useTranslation()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full h-[36px] md:h-[40px] bg-white/90 border-b border-slate-200/70 flex items-center backdrop-blur">
      <div className="container mx-auto px-3 md:px-4 text-center">
        <a
          href="https://starlink.com/residential?referral=RC-DF-9969955-68149-78"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-900 text-xs sm:text-sm md:text-base font-semibold hover:text-accent transition-colors inline-block leading-tight"
        >
          {t('topBanner.orderLink')}
        </a>
      </div>
    </div>
  )
}

export default TopBanner

