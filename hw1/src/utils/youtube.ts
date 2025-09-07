import { YouTubeSearchResponse, VideoDetails } from '../types/youtube';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (
  query: string,
  duration: 'short' | 'medium' | 'long' = 'medium',
  maxResults: number = 12
): Promise<YouTubeSearchResponse> => {
  if (!API_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    videoDuration: duration,
    maxResults: maxResults.toString(),
    key: API_KEY,
    order: 'relevance',
    videoDefinition: 'any',
    videoEmbeddable: 'true'
  });

  const response = await fetch(`${BASE_URL}/search?${params}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || response.statusText || 'Unknown error';
    throw new Error(`YouTube API error (${response.status}): ${errorMessage}`);
  }

  return response.json();
};

export const getVideoDetails = async (videoIds: string[]): Promise<VideoDetails[]> => {
  if (!API_KEY || videoIds.length === 0) {
    return [];
  }

  const params = new URLSearchParams({
    part: 'contentDetails,snippet',
    id: videoIds.join(','),
    key: API_KEY
  });

  const response = await fetch(`${BASE_URL}/videos?${params}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || response.statusText || 'Unknown error';
    throw new Error(`YouTube API error (${response.status}): ${errorMessage}`);
  }

  const data = await response.json();
  return data.items;
};

export const parseDuration = (duration: string): number => {
  // Parse ISO 8601 duration (PT4M13S) to seconds
  const match = duration.match(/PT(\d+M)?(\d+S)?/);
  if (!match) return 0;
  
  const minutes = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
  const seconds = match[2] ? parseInt(match[2].slice(0, -1)) : 0;
  
  return minutes * 60 + seconds;
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getDurationCategory = (mealMinutes: number): 'short' | 'medium' | 'long' => {
  if (mealMinutes <= 4) return 'short'; // Up to 4 minutes
  if (mealMinutes <= 20) return 'medium'; // 4-20 minutes  
  return 'long'; // 20+ minutes
};