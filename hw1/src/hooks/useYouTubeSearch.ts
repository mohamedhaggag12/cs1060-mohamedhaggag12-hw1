import { useState, useCallback } from 'react';
import { searchVideos, getVideoDetails, parseDuration, getDurationCategory } from '../utils/youtube';
import { YouTubeVideo } from '../types/youtube';

const CATEGORY_QUERIES = {
  'Comedy': 'funny videos comedy stand up',
  'Gaming': 'gaming videos gameplay walkthrough',
  'Music': 'music videos songs artists',
  'Educational': 'educational videos learning tutorial',
  'Tech': 'technology tech reviews gadgets',
  'Movies': 'movie trailers films cinema',
  'TV Shows': 'tv shows series episodes clips',
  'Food': 'cooking recipes food review'
};

export const useYouTubeSearch = () => {
  const [videos, setVideos] = useState<Array<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration?: number;
    publishedAt: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchForVideos = useCallback(async (
    categories: string[],
    mealMinutes: number
  ) => {
    if (categories.length === 0 || mealMinutes <= 0) {
      setVideos([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const durationCategory = getDurationCategory(mealMinutes);
      const queries = categories.map(cat => CATEGORY_QUERIES[cat as keyof typeof CATEGORY_QUERIES]).filter(Boolean);
      const query = queries.join(' OR ');

      const searchResults = await searchVideos(query, durationCategory, 20);
      
      if (!searchResults.items || searchResults.items.length === 0) {
        setVideos([]);
        return;
      }

      // Get video details including duration
      const videoIds = searchResults.items.map(item => item.id.videoId);
      const videoDetails = await getVideoDetails(videoIds);

      // Combine search results with duration data
      const videosWithDuration = searchResults.items.map(video => {
        const details = videoDetails.find(d => d.id === video.id.videoId);
        const duration = details ? parseDuration(details.contentDetails.duration) : 0;
        
        return {
          id: video.id.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
          channelTitle: video.snippet.channelTitle,
          duration,
          publishedAt: video.snippet.publishedAt
        };
      });

      // Filter videos that are reasonably close to meal duration
      const targetSeconds = mealMinutes * 60;
      const filteredVideos = videosWithDuration
        .filter(video => {
          if (!video.duration) return true; // Include videos without duration data
          // Allow videos that are up to 50% longer or shorter than target
          const variance = targetSeconds * 0.5;
          return video.duration >= targetSeconds - variance && video.duration <= targetSeconds + variance * 2;
        })
        .slice(0, 12); // Limit to 12 videos

      setVideos(filteredVideos);
    } catch (err) {
      console.error('YouTube search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to search videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { videos, loading, error, searchForVideos };
};