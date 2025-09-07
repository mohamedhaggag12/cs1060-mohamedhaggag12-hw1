# YouTube Meal Companion

A beautiful React app that recommends YouTube videos based on your meal duration and viewing preferences.

## Features

- **Meal Duration Matching**: Select preset meal times or set custom duration
- **Content Categories**: Choose from Comedy, Gaming, Music, Educational, Tech, Movies, TV Shows, and Food
- **Smart Filtering**: Videos are filtered to match your available time
- **Beautiful UI**: Modern design with smooth animations and responsive layout
- **Direct YouTube Links**: Click any video to open it in a new tab

## Setup

1. **Get a YouTube Data API v3 key:**
   - Visit [Google Developers Console](https://developers.google.com/youtube/v3/getting-started)
   - Create a new project or select existing one
   - **Enable YouTube Data API v3** by visiting the [API Library](https://console.developers.google.com/apis/library/youtube.googleapis.com) and clicking "Enable"
   - Create credentials (API key)
   - Restrict the key to YouTube Data API v3
   
   **Important**: If you get a 403 error saying "YouTube Data API v3 has not been used", you need to enable the API first. Visit the link in the error message or go to the API Library in your Google Cloud Console.

2. **Configure the API key:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your API key:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

3. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```

## Usage

1. **Set your meal duration** - Choose a preset (Quick Snack, Light Meal, Full Meal, Feast) or enter custom minutes
2. **Select content categories** - Pick what type of videos you want to watch
3. **Browse recommendations** - The app will find videos that fit your timeframe
4. **Click to watch** - Videos open directly in YouTube

## How It Works

The app uses YouTube's duration categories:
- **Short** (up to 4 minutes): Perfect for quick snacks
- **Medium** (4-20 minutes): Great for regular meals  
- **Long** (20+ minutes): Ideal for extended dining

Videos are further filtered to match your specific meal duration, ensuring you get content that fits perfectly with your available time.

## Technologies Used

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- YouTube Data API v3
- Vite for development and building