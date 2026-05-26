import { createClient } from '@supabase/supabase-js';

// NOTE: For public deployment, users need to configure their own Supabase instance
// Set these values in localStorage or provide them through environment variables
const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const DEFAULT_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export function getSupabaseClient() {
    if (typeof window === 'undefined') {
        if (!DEFAULT_SUPABASE_URL || !DEFAULT_SUPABASE_KEY) {
            throw new Error('Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
        }
        return createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_KEY);
    }
    
    let url = localStorage.getItem('supabase_url');
    let key = localStorage.getItem('supabase_key');
    
    if (!url || url === 'undefined' || url === 'null' || url.trim() === '') {
        url = DEFAULT_SUPABASE_URL;
    }
    if (!key || key === 'undefined' || key === 'null' || key.trim() === '') {
        key = DEFAULT_SUPABASE_KEY;
    }
    
    if (!url || !key) {
        throw new Error('Supabase credentials not configured. Please set up your Supabase instance and configure the credentials.');
    }
    
    return createClient(url, key);
}
