import React from 'react';
import { Clock, Coffee, Utensils, ChefHat } from 'lucide-react';

interface MealTimeSelectorProps {
  mealMinutes: number;
  onMealTimeChange: (minutes: number) => void;
}

const PRESET_MEALS = [
  { name: 'Quick Snack', minutes: 3, icon: Coffee },
  { name: 'Light Meal', minutes: 10, icon: Utensils },
  { name: 'Full Meal', minutes: 25, icon: ChefHat },
  { name: 'Feast', minutes: 45, icon: ChefHat }
];

export const MealTimeSelector: React.FC<MealTimeSelectorProps> = ({
  mealMinutes,
  onMealTimeChange
}) => {
  const [customTime, setCustomTime] = React.useState(mealMinutes);

  const handlePresetClick = (minutes: number) => {
    onMealTimeChange(minutes);
    setCustomTime(minutes);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCustomTime(value);
    onMealTimeChange(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">How long will you be eating?</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {PRESET_MEALS.map(({ name, minutes, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handlePresetClick(minutes)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              mealMinutes === minutes
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'
            }`}
          >
            <Icon className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs opacity-70">{minutes} min</div>
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="custom-time" className="block text-sm font-medium text-gray-700 mb-2">
          Or set custom time (minutes):
        </label>
        <input
          id="custom-time"
          type="number"
          min="1"
          max="120"
          value={customTime}
          onChange={handleCustomTimeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Enter minutes..."
        />
      </div>
    </div>
  );
};