import React, { useState, useEffect } from 'react';
import { Youtube, Utensils } from 'lucide-react';
import { MealTimeSelector } from './components/MealTimeSelector';
import { CategorySelector } from './components/CategorySelector';
import { VideoRecommendations } from './components/VideoRecommendations';
import { useYouTubeSearch } from './hooks/useYouTubeSearch';

function App() {
  const [mealMinutes, setMealMinutes] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Comedy']);
  const { videos, loading, error, searchForVideos } = useYouTubeSearch();

  useEffect(() => {
    if (selectedCategories.length > 0) {
      searchForVideos(selectedCategories, mealMinutes);
    }
  }, [selectedCategories, mealMinutes, searchForVideos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Utensils className="w-8 h-8 text-orange-500" />
              <Youtube className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meal Companion</h1>
              <p className="text-gray-600">Perfect videos for your dining experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MealTimeSelector
              mealMinutes={mealMinutes}
              onMealTimeChange={setMealMinutes}
            />
            
            <CategorySelector
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
          </div>

          {/* Video Recommendations */}
          <VideoRecommendations
            videos={videos}
            loading={loading}
            error={error}
            mealMinutes={mealMinutes}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">Powered by YouTube Data API v3</p>
            <p className="text-sm">
              Need an API key? Visit{' '}
              <a 
                href="https://developers.google.com/youtube/v3/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 underline"
              >
                Google Developers Console
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;