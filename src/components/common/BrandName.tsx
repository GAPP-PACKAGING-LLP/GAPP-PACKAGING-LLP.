import React from 'react';

interface BrandNameProps {
  /**
   * Theme variant: 'light' (dark text for light backgrounds) or 'dark' (white text for dark navy/slate)
   */
  theme?: 'light' | 'dark';
  /**
   * Additional container CSS classes
   */
  className?: string;
  /**
   * Whether to include the 'LLP' suffix
   */
  includeSuffix?: boolean;
  /**
   * Whether to include the tagline below
   */
  showTagline?: boolean;
}

/**
 * Official Brand Name Component for GAPP Packaging LLP.
 * Implements the exact brand logo color identity:
 * - "GAPP": #008CE8 (Vibrant Industrial Blue)
 * - "PACKAGING": #262D38 (Charcoal Navy on light) / #FFFFFF (on dark)
 * - "LLP": #0E525B (Deep Petrol Teal on light) / #008CE8 (on dark)
 * 
 * Specifically colors ONLY the brand name to ensure it is the primary visual focus in text.
 */
export const BrandName: React.FC<BrandNameProps> = ({
  theme = 'light',
  className = '',
  includeSuffix = true,
  showTagline = false,
}) => {
  const isDark = theme === 'dark';

  return (
    <span className={`inline-flex flex-col align-baseline ${className}`}>
      <span className="font-extrabold tracking-tight select-none">
        <span className="text-[#008CE8]">GAPP</span>
        {' '}
        <span className={isDark ? 'text-white' : 'text-[#262D38]'}>PACKAGING</span>
        {includeSuffix && (
          <>
            {' '}
            <span className={isDark ? 'text-[#008CE8] font-bold' : 'text-[#0E525B] font-bold'}>LLP</span>
          </>
        )}
      </span>
      {showTagline && (
        <span className={`text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-0.5 ${
          isDark ? 'text-slate-300' : 'text-[#0E525B]'
        }`}>
          Focus On Quality
        </span>
      )}
    </span>
  );
};
