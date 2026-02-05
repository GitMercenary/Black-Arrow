/**
 * Cookie Management Utilities
 * GDPR/PECR compliant cookie handling for UK, UAE, and India markets
 */

export interface CookieOptions {
  expires?: number | Date; // Days or Date object
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Set a cookie with options
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof window === 'undefined') return;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Handle expiration
  if (options.expires) {
    let expiresDate: Date;
    if (typeof options.expires === 'number') {
      expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
    } else {
      expiresDate = options.expires;
    }
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  // Add other options
  if (options.path) cookieString += `; path=${options.path}`;
  if (options.domain) cookieString += `; domain=${options.domain}`;
  if (options.secure) cookieString += '; secure';
  if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie by name
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

/**
 * Remove a cookie by name
 */
export function removeCookie(name: string, options: CookieOptions = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
}

/**
 * Check if user has consented to cookies
 */
export function hasConsentedToCookies(): boolean {
  const consent = getCookie('bat-cookie-consent');
  return consent === 'accepted';
}

/**
 * Set cookie consent status
 */
export function setConsentStatus(accepted: boolean): void {
  setCookie('bat-cookie-consent', accepted ? 'accepted' : 'rejected', {
    expires: 365, // 1 year
    path: '/',
    sameSite: 'Lax',
  });
}

/**
 * Check if consent choice has been made
 */
export function hasConsentChoice(): boolean {
  const consent = getCookie('bat-cookie-consent');
  return consent !== null;
}

/**
 * Cookie categories for granular consent
 */
export interface CookiePreferences {
  necessary: boolean; // Always true, can't be disabled
  analytics: boolean; // Microsoft Clarity, Google Analytics
  marketing: boolean; // Conversion tracking, retargeting
  functional: boolean; // Chat, region preference
}

const COOKIE_PREFERENCES_KEY = 'bat-cookie-preferences';

/**
 * Get cookie preferences
 */
export function getCookiePreferences(): CookiePreferences {
  const saved = getCookie(COOKIE_PREFERENCES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // Fall back to defaults if parsing fails
    }
  }

  // Defaults: only necessary cookies enabled
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  };
}

/**
 * Save cookie preferences
 */
export function saveCookiePreferences(preferences: CookiePreferences): void {
  setCookie(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences), {
    expires: 365,
    path: '/',
    sameSite: 'Lax',
  });

  // Also set the simple consent flag
  const hasConsented =
    preferences.analytics || preferences.marketing || preferences.functional;
  setConsentStatus(hasConsented);
}
