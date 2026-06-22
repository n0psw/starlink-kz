import { useTranslation } from 'react-i18next'

const TopBanner = () => {
  const { t } = useTranslation()

  return (
    <div
      data-top-banner="true"
      className="fixed top-0 left-0 right-0 z-[60] w-full h-[30px] md:h-[36px] bg-white/88 border-b border-slate-200/80 flex items-center backdrop-blur"
    >
      <div className="container mx-auto px-3 md:px-4 text-center">
        <a
          href="https://starlink.com/residential?referral=RC-DF-12630214-52420-78"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] sm:text-xs md:text-sm text-slate-700 font-semibold hover:text-accent transition-colors inline-block leading-tight"
        >
          {t('topBanner.orderLink')}
        </a>
      </div>
    </div>
  )
}

export default TopBanner
