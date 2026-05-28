# Kingsent Entertainment Platform

A premium entertainment website for selling movies and DJ content with a dark cinematic theme, gold/red neon accents, and a Netflix-style experience.

## Features

✅ **Movie Marketplace**
- Browse and search movies by category
- Trending and new releases
- Movie details with trailers and descriptions
- Secure purchase system
- Stream and download after purchase

✅ **User Authentication**
- Email/username registration
- Secure login
- Password recovery
- Personal dashboard
- Purchase history

✅ **DJ Entertainment**
- DJ mixes and playlists
- Event videos
- Upcoming shows
- Photo gallery

✅ **Payment Integration**
- M-Pesa Daraja integration
- Instant payment confirmation
- Purchase receipts
- Payment history

✅ **Admin Dashboard**
- Upload and manage movies
- User management
- Sales analytics
- Download analytics

✅ **Mobile Responsive**
- Fully responsive design
- Mobile-optimized UI
- Touch-friendly navigation

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- M-Pesa Daraja credentials

### Setup

1. Clone the repository
```bash
git clone https://github.com/Janewaithera/kingsent-entertainment.git
cd kingsent-entertainment
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the development server
```bash
npm start
```

The application will run on `http://localhost:5173` (frontend) and `http://localhost:5000` (backend).

## M-Pesa Configuration

To enable M-Pesa payments:

1. Go to [M-Pesa Daraja](https://developer.safaricom.co.ke/)
2. Create an app and get your credentials
3. Add to `.env`:
   - `MPESA_CONSUMER_KEY`
   - `MPESA_CONSUMER_SECRET`
   - `MPESA_BUSINESS_SHORT_CODE`
   - `MPESA_PASSKEY`

## Project Structure

```
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components
│   ├── styles/        # CSS files
│   ├── utils/         # Utility functions
│   └── App.jsx        # Main app component
├── backend/
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   └── server.js      # Express server
└── public/            # Static assets
```

## License

MIT
