import { useTranslation } from 'react-i18next'

const TopBanner = () => {
  const { t } = useTranslation()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full h-[36px] md:h-[40px] bg-gray-900/95 flex items-center">
      <div className="container mx-auto px-3 md:px-4 text-center">
        <a
          href="https://starlink.com/residential?referral=RC-DF-9022618-47748-56"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-xs sm:text-sm md:text-base font-semibold hover:opacity-80 transition-opacity inline-block leading-tight"
        >
          {t('topBanner.orderLink')}
        </a>
      </div>
    </div>
  )
}

export default TopBanner

