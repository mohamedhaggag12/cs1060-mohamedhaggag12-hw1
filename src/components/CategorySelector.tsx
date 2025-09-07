import React from 'react';
import { Tag, Gamepad2, Music, BookOpen, Laugh, Zap, Film, Tv } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CATEGORIES = [
  { name: 'Comedy', query: 'funny videos comedy', icon: Laugh },
  { name: 'Gaming', query: 'gaming videos gameplay', icon: Gamepad2 },
  { name: 'Music', query: 'music videos songs', icon: Music },
  { name: 'Educational', query: 'educational videos learning', icon: BookOpen },
  { name: 'Tech', query: 'technology tech reviews', icon: Zap },
  { name: 'Movies', query: 'movie trailers films', icon: Film },
  { name: 'TV Shows', query: 'tv shows series episodes', icon: Tv },
  { name: 'Food', query: 'cooking recipes food', icon: Tag }
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategoryChange
}) => {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">What do you want to watch?</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleCategoryToggle(name)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              selectedCategories.includes(name)
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'
            }`}
          >
            <Icon className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">{name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};