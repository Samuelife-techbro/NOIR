// Parametric bottle — each fragrance passes its own colors.
export default function Bottle({ className, glass = '#14110E', cap = '#C9A24B', accent = '#C9A24B', mono = 'N' }) {
  const id = mono + Math.random().toString(36).slice(2, 7)
  return (
    <svg className={className} viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={`${mono} fragrance bottle`}>
      <defs>
        <linearGradient id={`glass${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={glass} stopOpacity="0.95" />
          <stop offset="50%" stopColor={glass} stopOpacity="0.98" />
          <stop offset="100%" stopColor="#0B0A09" />
        </linearGradient>
        <linearGradient id={`cap${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cap} stopOpacity="0.9" />
          <stop offset="50%" stopColor={cap} />
          <stop offset="100%" stopColor="#7A5E26" />
        </linearGradient>
        <linearGradient id={`shine${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EDE6D8" stopOpacity="0.2" />
          <stop offset="35%" stopColor="#EDE6D8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="78" y="6" width="44" height="40" rx="3" fill={`url(#cap${id})`} />
      <rect x="84" y="46" width="32" height="14" fill="#7A5E26" />
      <rect x="88" y="58" width="24" height="22" fill={`url(#glass${id})`} />
      <path d="M52 80 Q52 74 60 74 L140 74 Q148 74 148 80 L148 296 Q148 308 136 308 L64 308 Q52 308 52 296 Z" fill={`url(#glass${id})`} stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
      <path d="M62 88 L62 296 Q62 300 66 300 L78 300 L78 88 Z" fill={`url(#shine${id})`} />
      <rect x="74" y="150" width="52" height="86" rx="2" fill="#0B0A09" stroke={accent} strokeOpacity="0.45" strokeWidth="0.75" />
      <text x="100" y="190" textAnchor="middle" fill={accent} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="22" letterSpacing="2">{mono}</text>
      <text x="100" y="214" textAnchor="middle" fill="#A89F8E" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="3">PARFUM</text>
    </svg>
  )
}
