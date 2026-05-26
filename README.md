# Moovie - Vue Movie Streaming Platform

A modern Vue.js movie streaming platform with a clean, responsive UI.

> **Note**: This is the public frontend repository. Backend/API components are not included for security reasons. See [SETUP_GUIDE.md](SETUP_GUIDE.md) for configuration instructions.

## ✨ Features

- 🎬 Browse movies and TV shows from TMDB
- 🔍 Advanced search functionality
- 📱 Fully responsive design (mobile & desktop)
- 🎨 Modern, clean UI with smooth animations
- 👤 User authentication and profiles
- 📋 Personal watchlists and watch history
- 🎭 Actor and cast information
- 🎞️ Trailer playback
- 🌐 Multiple streaming server options
- ⚡ Optimized performance with code splitting

## 📁 Project Structure

```
moovie-frontend/
├── src/                     # Vue 3 source code
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── routes/              # Vue Router configuration
│   ├── composables/         # Composable functions
│   ├── lib/                 # Utility libraries (auth, supabase)
│   └── assets/              # Styles and images
├── public/                  # Static assets
├── docs/                    # Documentation and screenshots
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── .env.example             # Environment variables template
└── SETUP_GUIDE.md           # Detailed setup instructions
```

> **Backend Note**: The `backend/` folder (containing API endpoints, server code, and sensitive credentials) is excluded from this public repository. See [SETUP_GUIDE.md](SETUP_GUIDE.md) for information about setting up your own backend infrastructure.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/))
- Supabase account (free at [supabase.com](https://supabase.com/))

### Installation

```bash
# Install dependencies
yarn install

# Copy environment template
cp .env.example .env

# Edit .env and add your API keys
# See SETUP_GUIDE.md for detailed instructions

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

📖 **For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **Vue Router** - Client-side routing
- **VueUse** - Collection of Vue composition utilities
- **Supabase** - Backend as a Service (authentication, database)
- **Artplayer** - HTML5 video player
- **Axios** - HTTP client
- **Swiper** - Touch slider
- **Lodash** - Utility library
- **TMDB API** - Movie and TV show data

## 🎯 Key Features Explained

### User Authentication
- Secure user registration and login
- Password hashing with SHA-256
- Session management with localStorage
- Powered by Supabase

### Watchlist & History
- Personal watchlists synced across devices
- Watch history tracking
- Search history
- All data stored in Supabase

### Streaming Options
- Multiple embed player options (VidKing, VidEasy, etc.)
- Automatic fallback between servers
- HLS streaming support
- Subtitle support

### Performance Optimizations
- Code splitting for faster load times
- Image lazy loading
- Aggressive caching strategies
- Minified and compressed assets
- Tree-shaking for smaller bundles

## 📁 Project Structure Details

### Components
- `cards/` - Tile and card components for movie/TV listings
- `detail/` - Detail page components (cast, seasons, trailer)
- `discover/` - Filter and discovery components

### Pages
- Home page
- Movie listing
- TV show listing
- Movie/TV detail pages
- Search results

### Composables
- `useStream.ts` - Stream resolution and playback

### Routes
- `/` - Home
- `/movies` - Movies
- `/tv` - TV Shows
- `/movie/:id` - Movie detail
- `/tv/:id` - TV detail
- `/search` - Search results

## 🎨 Styling

- SCSS with BEM methodology
- CSS variables for theming
- Responsive design with mobile-first approach

## 📦 Deployment

### Cloudflare Pages (Recommended)
```bash
yarn build
wrangler deploy
```

### Netlify
```bash
yarn build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
vercel
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed deployment instructions.

## ⚠️ Important Notes

### Backend Components Not Included

This public repository contains **only the frontend code**. The following backend components are **not included**:

- Streaming API endpoints (`/api/cinestream`)
- Server monitoring scripts
- Environment variables with sensitive credentials
- SSH keys and server access credentials

If you want full streaming functionality, you'll need to implement your own backend infrastructure or use the external embed players provided.

### What Works Without Backend

- ✅ Movie and TV show browsing (via TMDB API)
- ✅ User authentication and profiles (via Supabase)
- ✅ Watchlists and history (via Supabase)
- ✅ Search functionality
- ✅ External embed players (VidKing, VidEasy, etc.)
- ✅ All UI features

### What Requires Backend

- ❌ Direct streaming (Moovie Direct server)
- ❌ Custom stream resolution
- ❌ Server health monitoring

## 🔒 Security

- Never commit `.env` files
- Keep API keys secure
- Use environment variables for sensitive data
- Enable HTTPS in production
- Regularly update dependencies

## 📚 Documentation

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [docs/](docs/) - Additional documentation and screenshots

## 🧪 Testing

Run tests:
```bash
yarn test
```

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

**Version**: 1.0.0  
**Last Updated**: May 22, 2026
