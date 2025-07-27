/**
 * Utility functions for subdomain detection and routing
 */

/**
 * Get the current subdomain from the window location
 * @returns {string|null} The subdomain or null if none
 */
export const getSubdomain = () => {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // For local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return null;
  }
  
  // For production - check if we have a subdomain
  // Example: portal.drganeshcs.com -> parts = ['portal', 'drganeshcs', 'com']
  if (parts.length >= 3) {
    return parts[0];
  }
  
  return null;
};

/**
 * Check if the current URL is the portal subdomain
 * @returns {boolean} True if on portal subdomain
 */
export const isPortalSubdomain = () => {
  const subdomain = getSubdomain();
  return subdomain === 'portal';
};

/**
 * Get the main domain URL (without subdomain)
 * @returns {string} The main domain URL
 */
export const getMainDomainUrl = () => {
  if (typeof window === 'undefined') return '';
  
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  // For local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }
  
  // For production - remove subdomain
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    const mainDomain = parts.slice(1).join('.');
    return `${protocol}//${mainDomain}`;
  }
  
  return `${protocol}//${hostname}`;
};

/**
 * Get the portal subdomain URL
 * @returns {string} The portal subdomain URL
 */
export const getPortalUrl = () => {
  if (typeof window === 'undefined') return '';
  
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  // For local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}${port ? `:${port}` : ''}/#portal`;
  }
  
  // For production
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    const mainDomain = parts.slice(-2).join('.');
    return `${protocol}//portal.${mainDomain}`;
  }
  
  return `${protocol}//portal.${hostname}`;
};
