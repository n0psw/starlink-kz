import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'

/**
 * Thin utility banner linking users to the official Starlink account / password reset page.
 * Rendered as a subtle strip — dark, minimal, non-intrusive.
 */
const StarlinkAccountBanner = () => {
  const { t } = useTranslation()

  return (
    <div
      className="w-full py-3 px-4 flex items-center justify-center gap-3 relative overflow-hidden"
      style={{
        background: 'rgba(14,165,233,0.04)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Subtle gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)',
        }}
      />

      <span
        className="text-[11px] md:text-xs font-medium tracking-wide relative z-10"
        style={{ color: '#475569' }}
      >
        {t('accountBanner.text')}
      </span>

      <a
        href="https://starlink.com/auth/forgot-password"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[11px] md:text-xs font-semibold transition-colors relative z-10 group"
        style={{ color: '#38bdf8' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#7dd3fc')}
        onMouseLeave={e => (e.currentTarget.style.color = '#38bdf8')}
      >
        {t('accountBanner.cta')}
        <ExternalLink
          size={10}
          className="opacity-60 group-hover:opacity-100 transition-opacity"
          strokeWidth={2.5}
        />
      </a>
    </div>
  )
}

export default StarlinkAccountBanner
