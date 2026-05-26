/**
 * API Configuration Utility
 * Handles API URL resolution for different environments
 */

/**
 * Get the backend API base URL
 * Priority:
 * 1. Environment variable (VITE_BACKEND_API_URL)
 * 2. Localhost detection (for local development)
 * 3. Same domain /api (for Cloudflare Pages Functions)
 */
export function getBackendApiUrl(): string {
  // Check if backend URL is explicitly set in environment
  const envBackendUrl = import.meta.env.VITE_BACKEND_API_URL;
  
  console.log('[API Config] Environment backend URL:', envBackendUrl);
  
  if (envBackendUrl) {
    // Remove trailing slash if present
    const cleanUrl = envBackendUrl.replace(/\/$/, '');
    console.log('[API Config] Using environment backend URL:', cleanUrl);
    return cleanUrl;
  }
  
  // Check if running on localhost (development mode)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    console.log('[API Config] Current hostname:', hostname);
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Local development - assume Express server on port 3000
      console.log('[API Config] Using local development backend: http://localhost:3000');
      return 'http://localhost:3000';
    }
  }
  
  // Production - use same domain (Cloudflare Pages Functions at /api/*)
  console.log('[API Config] Using same domain (relative paths)');
  return '';
}

/**
 * Build full API URL for cinestream endpoint
 * @param path - API path (e.g., '/api/cinestream' or '/api/cinestream/resolve')
 * @returns Full URL to the API endpoint
 */
export function buildApiUrl(path: string): string {
  const backendUrl = getBackendApiUrl();
  
  console.log('[API Config] Building API URL for path:', path);
  console.log('[API Config] Backend URL:', backendUrl);
  
  // If backend URL is set, prepend it
  if (backendUrl) {
    // Remove leading slash from path if present
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const fullUrl = `${backendUrl}${cleanPath}`;
    console.log('[API Config] Full URL:', fullUrl);
    return fullUrl;
  }
  
  // Otherwise, use relative path (same domain)
  console.log('[API Config] Using relative path:', path);
  return path;
}

/**
 * Check if running in local development mode
 */
export function isLocalDevelopment(): boolean {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

/**
 * Check if backend API is configured
 */
export function isBackendConfigured(): boolean {
  return !!import.meta.env.VITE_BACKEND_API_URL || isLocalDevelopment();
}
