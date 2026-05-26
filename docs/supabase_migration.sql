-- Migration to add watch_history and search_history columns to moovie_users table
-- Run this in your Supabase SQL Editor

-- Add watch_history column (stores array of viewed items)
ALTER TABLE moovie_users 
ADD COLUMN IF NOT EXISTS watch_history JSONB DEFAULT '[]'::jsonb;

-- Add search_history column (stores array of search terms)
ALTER TABLE moovie_users 
ADD COLUMN IF NOT EXISTS search_history JSONB DEFAULT '[]'::jsonb;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_moovie_users_watch_history ON moovie_users USING GIN (watch_history);
CREATE INDEX IF NOT EXISTS idx_moovie_users_search_history ON moovie_users USING GIN (search_history);

-- Update existing users to have empty arrays if they have NULL values
UPDATE moovie_users 
SET watch_history = '[]'::jsonb 
WHERE watch_history IS NULL;

UPDATE moovie_users 
SET search_history = '[]'::jsonb 
WHERE search_history IS NULL;
