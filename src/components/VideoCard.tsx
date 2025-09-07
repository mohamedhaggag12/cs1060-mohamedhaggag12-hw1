import React from 'react';
import { ExternalLink, Clock, User } from 'lucide-react';
import { formatDuration } from '../utils/youtube';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    duration?: number;
    publishedAt: string;
  };
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const handleVideoClick = () => {
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  const formatPublishedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative group cursor-pointer" onClick={handleVideoClick}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-orange-600 transition-colors">
          {video.title}
        </h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <User className="w-4 h-4 mr-1" />
          <span className="truncate">{video.channelTitle}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span>{formatPublishedDate(video.publishedAt)}</span>
          {video.duration && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDuration(video.duration)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};