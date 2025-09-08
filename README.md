# CS1060 - Homework 1: YouTube Meal Companion

## Contributors
- **Mohamed Mohamed**, GitHub: mohamedhaggag12, Harvard email: mmohamed@college.harvard.edu

## Project Links
- **Bolt Project**: https://bolt.new/~/sb1-epije8dz
- **GitHub Repository**: https://github.com/mohamedhaggag12/cs1060-mohamedhaggag12-hw1
- **Netlify Deployment**: https://mealcompanion.netlify.app

## Project Summary

### What I Worked On
I created a YouTube Meal Companion app - a React-based web application that recommends YouTube videos based on your meal duration and viewing preferences. The app allows users to:
- Select preset meal times (Quick Snack, Light Meal, Full Meal, Feast) or set custom duration
- Choose from multiple content categories (Comedy, Gaming, Music, Educational, Tech, Movies, TV Shows, Food)
- Get video recommendations that match their available time
- Click videos to open them directly in YouTube

### Technologies Used
- Bolt for development
- YouTube Data API v3 for video data
- Netlify for deployment

### Issues Encountered

**YouTube API Quota Limitation**: The main issue I encountered was hitting the YouTube Data API v3 daily quota limit (10,000 units per day). If multiple users are accessing the site, it can quickly exhaust the free tier quota, resulting in 403 "quota exceeded" errors.

**Workaround**: I documented this known limitation in the app and explained that it's a constraint of the free YouTube API tier, not a bug in the code. The quota resets daily at midnight PT (3am EST). For demonstration purposes, I'm happy to provide a video showing the application working if the quota isn't renewed when it's time to grade the assignment. 

**Deployment Configuration**: Initially had some challenges configuring Netlify to properly deploy the React TypeScript project, but resolved this by setting up the correct build commands and publish directory.

### Hours Spent
Approximately **2 hours** total, primarily focused on:
- Setting up GitHub repository and proper file organization
- Configuring Netlify deployment for the Bolt-generated React app
- Troubleshooting build settings and publish directory configuration
- Testing deployment and documenting the YouTube API quota limitation
- Ensuring smooth integration between Bolt.new, GitHub, and Netlify platforms

*Note: The core application development was done using Bolt.new's AI-assisted development platform.*

## Known Issues
- **YouTube API Quota**: The application may show a 403 quota error if the daily YouTube API limit (10,000 units) has been exceeded. The quota resets daily at midnight PT. This is a limitation of the free YouTube API tier, not a bug in the code.
- **Workaround**: If you encounter this error, please try again after the quota reset or the functionality can be demonstrated in the Bolt environment.

## How It Works

The app uses YouTube's duration categories:
- **Short** (up to 3 minutes): Perfect for quick snacks
- **Medium** (10+ minutes): Great for light meals  
- **Long** (25+ minutes): Ideal for full meals
-**fulltime** (40+  minutes): For having a feast

Videos are filtered to match your specific meal duration, ensuring you get content that fits perfectly with your available time.

## Features

- **Meal Duration Matching**: Select preset meal times or set custom duration
- **Content Categories**: Choose from Comedy, Gaming, Music, Educational, Tech, Movies, TV Shows, and Food
- **Smart Filtering**: Videos are filtered to match your available time
- **Beautiful UI**: Modern design with smooth animations and responsive layout
- **Direct YouTube Links**: Click any video to open it in a new tab
