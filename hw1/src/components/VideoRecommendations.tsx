import React from 'react';
import { VideoCard } from './VideoCard';
import { Loader2, AlertCircle } from 'lucide-react';

interface VideoRecommendationsProps {
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration?: number;
    publishedAt: string;
  }>;
  loading: boolean;
  error: string | null;
  mealMinutes: number;
}

export const VideoRecommendations: React.FC<VideoRecommendationsProps> = ({
  videos,
  loading,
  error,
  mealMinutes
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
        <p className="text-gray-600">Finding perfect videos for your meal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
          <p className="text-amber-800 text-sm">
            <strong>Need a YouTube API key?</strong> Get one from the{' '}
            <a 
              href="https://developers.google.com/youtube/v3/getting-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-700 underline hover:text-amber-900"
            >
              Google Developers Console
            </a>{' '}
            and add it to your environment variables as VITE_YOUTUBE_API_KEY.
          </p>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-600 mb-4">Select your meal time and preferences to get started!</p>
      </div>
    );
  }

  const totalDuration = videos.reduce((sum, video) => sum + (video.duration || 0), 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Perfect for your {mealMinutes}-minute meal
        </h2>
        <p className="text-gray-600">
          Found {videos.length} videos • Total duration: ~{totalMinutes} minutes
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};