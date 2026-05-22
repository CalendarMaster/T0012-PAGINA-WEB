export default function LoadingLoop({ label = 'Cargando', compact = false }) {
  return (
    <div className={`mi-loader${compact ? ' is-compact' : ''}`} role="status" aria-live="polite" aria-label={label}>
      <div className="mi-loader-svg-wrap">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <g>
            <path
              className="animate-draw-path"
              fill="none"
              stroke="currentColor"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M 190 530 L 190 230 A 65 65 0 0 1 320 230 L 320 460 A 65 65 0 0 0 450 460 L 450 230 A 65 65 0 0 1 580 230 L 580 460 A 65 65 0 0 0 710 460 L 710 320"
            />
            <circle className="animate-dot" cx="710" cy="175" r="20" fill="currentColor" />

            <g className="animate-text-reveal">
              <text
                x="400"
                y="640"
                fontFamily="var(--font-primary)"
                fontStyle="italic"
                fontSize="44"
                textAnchor="middle"
                letterSpacing="5"
              >
                <tspan fill="var(--orange)">m</tspan>
                <tspan fill="currentColor">odelo </tspan>
                <tspan fill="var(--orange)">i</tspan>
                <tspan fill="currentColor">ntegrado</tspan>
              </text>
              <text
                x="400"
                y="730"
                fontFamily="var(--font-primary)"
                fontWeight="600"
                fontSize="78"
                textAnchor="middle"
                letterSpacing="22"
                fill="currentColor"
                style={{ transform: 'translateX(11px)' }}
              >
                STUDIO
              </text>
            </g>
          </g>
        </svg>
      </div>
      <p className="mi-loader-label">{label}</p>
    </div>
  )
}