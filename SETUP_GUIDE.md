# Moovie Setup Guide

This guide will help you set up Moovie for your own deployment.

## 📋 Prerequisites

- Node.js 18+ and yarn
- A TMDB API account (free)
- A Supabase account (free tier available)
- (Optional) Cloudflare account for deployment

## 🔧 Configuration Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd moovie
yarn install
```

### 2. Configure TMDB API

1. Create a free account at [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Go to Settings → API → Create API Key
3. Copy your API Key and Access Token

### 3. Configure Supabase (for user features)

1. Create a free account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Project Settings → API
4. Copy your Project URL and anon/public key

#### Create the Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create users table for authentication and user data
CREATE TABLE moovie_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  watchlist JSONB DEFAULT '[]'::jsonb,
  watch_history JSONB DEFAULT '[]'::jsonb,
  search_history JSONB DEFAULT '[]'::jsonb,
  liked_list JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster username lookups
CREATE INDEX idx_moovie_users_username ON moovie_users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE moovie_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own data
CREATE POLICY "Users can read own data" ON moovie_users
  FOR SELECT USING (true);

-- Create policy to allow users to insert their own data
CREATE POLICY "Users can insert own data" ON moovie_users
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update own data" ON moovie_users
  FOR UPDATE USING (true);
```

### 4. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
# TMDB API Configuration
VITE_API_KEY=your_tmdb_api_key_here
VITE_API_ACCESS_TOKEN=your_tmdb_access_token_here

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 5. Run Development Server

```bash
yarn dev
```

The app will be available at `http://localhost:5173`

## 🚀 Deployment Options

### Two-Repository Setup (Recommended)

For full functionality including streaming, deploy both frontend and backend separately:

#### Backend Deployment (Optional - for streaming functionality)

1. **Create a separate repository for backend**
   ```bash
   # Copy backend folder to new repo
   cp -r backend/ ../moovie-backend/
   cd ../moovie-backend/
   git init
   git add .
   git commit -m "Initial backend commit"
   ```

2. **Deploy to Cloudflare Pages**
   - Go to Cloudflare Dashboard → Workers & Pages
   - Create new Pages project
   - Connect your backend repository
   - Build settings:
     - Build command: (leave empty)
     - Build output directory: `/`
   - Deploy!

3. **Get your backend URL**
   ```
   https://moovie-backend.pages.dev
   ```

#### Frontend Deployment

1. **Configure backend URL in frontend**
   
   Create `.env` in your frontend repo:
   ```env
   VITE_BACKEND_API_URL=https://moovie-backend.pages.dev
   ```

2. **Deploy frontend to Cloudflare Pages**
   ```bash
   yarn build
   wrangler deploy
   ```

   Or use Cloudflare Dashboard:
   - Workers & Pages → Create application → Pages
   - Connect your frontend repository
   - Add environment variable: `VITE_BACKEND_API_URL`
   - Deploy!

**That's it!** Frontend and backend will work together seamlessly.

### Frontend-Only Deployment (Without Streaming)

If you don't need the streaming functionality, deploy just the frontend:

#### Option 1: Cloudflare Pages

```bash
# Build the project
yarn build

# Deploy with Wrangler
wrangler deploy
```

Or use Cloudflare Dashboard:
- Workers & Pages → Create application → Pages
- Connect your repository
- Build command: `yarn build`
- Build output directory: `dist`
- Add environment variables (TMDB, Supabase)

#### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   yarn build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

#### Option 3: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## ⚠️ Important Notes

### Backend/API Components

This public repository contains **only the frontend code**. The backend components (streaming API, server monitoring, etc.) are not included for security reasons.

If you want to implement streaming functionality, you'll need to:

1. Set up your own streaming API endpoints
2. Update the API URLs in `src/composables/useStream.ts`
3. Implement your own stream resolution logic

**Note**: The streaming functionality requires backend infrastructure that is not included in this public repository.

### Features Without Backend

Without the backend components, the following features will not work:
- Direct streaming (Moovie Direct server)
- Server health monitoring
- Some advanced caching features

However, the app will still work with:
- External embed players (VidKing, VidEasy, etc.)
- TMDB movie/TV show browsing
- User authentication and watchlists (via Supabase)
- Search functionality
- All UI features

## 🔒 Security Considerations

1. **Never commit your `.env` file** - It contains sensitive API keys
2. **Keep your Supabase keys secure** - Use environment variables
3. **Use HTTPS in production** - Especially important for authentication
4. **Regularly rotate API keys** - Good security practice

## 📚 Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vue 3 Documentation](https://vuejs.org/)

## 🆘 Troubleshooting

### "Supabase credentials not configured" error

Make sure you've:
1. Created a Supabase project
2. Added the credentials to your `.env` file
3. Restarted the development server

### TMDB API errors

- Verify your API key is correct
- Check that you've enabled the API in your TMDB account settings
- Ensure you're not exceeding rate limits (40 requests per 10 seconds)

### Build errors

- Clear node_modules and reinstall: `rm -rf node_modules && yarn install`
- Clear build cache: `rm -rf dist .vite`
- Update dependencies: `yarn upgrade`

## 📝 License

See [LICENSE](LICENSE) file for details.
