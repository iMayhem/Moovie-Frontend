import { ref } from 'vue';
import { buildApiUrl } from '../utils/apiConfig';

interface PrefetchCache {
  [key: string]: {
    data: any;
    timestamp: number;
  };
}

const prefetchCache = ref<PrefetchCache>({});
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Prefetch stream data before user navigates to watch page
 * Priority 3: Prefetch Streams optimization
 */
export function usePrefetch() {
  const prefetchStream = async (
    mediaId: string | number,
    mediaType: 'movie' | 'tv' | 'anime',
    title?: string,
    year?: number,
    season?: number,
    episode?: number
  ) => {
    const cacheKey = `${mediaType}:${mediaId}:${season || 0}:${episode || 0}`;
    
    // Check if already cached and still valid
    const cached = prefetchCache.value[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`[Prefetch] Using cached data for ${cacheKey}`);
      return cached.data;
    }

    try {
      // Build the API URL
      let apiPath = `/api/cinestream?type=${mediaType}&id=${mediaId}`;
      
      if (title) apiPath += `&title=${encodeURIComponent(title)}`;
      if (year) apiPath += `&year=${year}`;
      if (mediaType === 'tv' && season && episode) {
        apiPath += `&season=${season}&episode=${episode}`;
      }

      // Use the API config utility to build the full URL
      const apiUrl = buildApiUrl(apiPath);

      console.log(`[Prefetch] Starting prefetch for ${cacheKey}`);
      
      // Fetch in background without blocking
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.warn(`[Prefetch] Failed to prefetch ${cacheKey}`);
        return null;
      }

      const data = await response.json();
      
      // Cache the result
      prefetchCache.value[cacheKey] = {
        data,
        timestamp: Date.now()
      };

      console.log(`[Prefetch] Successfully prefetched ${cacheKey} with ${data.options?.length || 0} options`);
      return data;
    } catch (error) {
      console.error(`[Prefetch] Error prefetching ${cacheKey}:`, error);
      return null;
    }
  };

  const getCachedStream = (
    mediaId: string | number,
    mediaType: 'movie' | 'tv' | 'anime',
    season?: number,
    episode?: number
  ) => {
    const cacheKey = `${mediaType}:${mediaId}:${season || 0}:${episode || 0}`;
    const cached = prefetchCache.value[cacheKey];
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`[Prefetch] Cache hit for ${cacheKey}`);
      return cached.data;
    }
    
    return null;
  };

  const clearCache = () => {
    prefetchCache.value = {};
  };

  return {
    prefetchStream,
    getCachedStream,
    clearCache
  };
}
