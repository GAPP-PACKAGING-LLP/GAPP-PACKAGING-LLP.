import React from 'react';
import { useCMS } from '../../context/CMSContext';

export interface BrandLogoProps {
  /**
   * Layout variant:
   * - 'full': Complete official logo (Symbol + "GAPP PACKAGING" + "Focus On Quality")
   * - 'icon': Just the official interlocking symbol
   * - 'card': Full official logo framed in a clean white container
   */
  variant?: 'full' | 'icon' | 'card';
  /**
   * Theme: 'light' (standard) or 'dark' (for dark navy/black containers like Footer)
   */
  theme?: 'light' | 'dark';
  /**
   * Custom CSS classes for sizing and spacing
   */
  className?: string;
  /**
   * Explicit height in px or string (optional)
   */
  height?: number | string;
  /**
   * Custom image source override
   */
  src?: string;
  /**
   * Accessibility title/alt text
   */
  alt?: string;
  /**
   * Element ID
   */
  id?: string;
}

/**
 * Central Brand Logo Component for GAPP PACKAGING LLP.
 * Dynamically reflects logo uploads made in the CMS, while preserving the exact 1:1 original logo vector artwork fallback.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = 'h-11 sm:h-13 w-auto',
  height,
  src: srcOverride,
  alt,
  id = 'gapp-brand-logo',
}) => {
  const { settings } = useCMS();
  const isDark = theme === 'dark';

  let logoSrc = '/logo.svg';

  if (srcOverride) {
    logoSrc = srcOverride;
  } else if (variant === 'icon') {
    logoSrc = settings?.faviconUrl || '/logo-icon.svg';
  } else if (variant === 'card') {
    logoSrc = '/logo-card.svg';
  } else if (isDark) {
    logoSrc = settings?.logoDarkUrl || settings?.logoUrl || '/logo-dark.svg';
  } else {
    logoSrc = settings?.logoUrl || '/logo.svg';
  }

  const altText = alt || `${settings?.companyName || 'GAPP Packaging LLP'} - Corrugated Box Manufacturer Mandideep, Bhopal`;
  const styleObj = height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined;

  const fallbackSrc = isDark ? '/logo-dark.svg' : (variant === 'icon' ? '/logo-icon.svg' : '/logo.svg');

  return (
    <img
      id={id}
      src={logoSrc}
      alt={altText}
      style={styleObj}
      className={`object-contain transition-opacity duration-200 select-none ${className}`}
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target && target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
    />
  );
};

/**
 * Re-usable standalone Brand Mark (Icon Only)
 */
export const BrandMark: React.FC<{
  size?: number;
  className?: string;
  isDark?: boolean;
}> = ({ size = 40, className = '', isDark = false }) => {
  return (
    <BrandLogo
      variant="icon"
      theme={isDark ? 'dark' : 'light'}
      height={size}
      className={`w-auto shrink-0 ${className}`}
      alt="GAPP Packaging Brand Mark"
    />
  );
};
