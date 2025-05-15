import React from 'react';

interface CategoryButtonsProps {
  selected: string;
  onSelect: (category: string) => void;
  disabled: boolean;
}

const categories = [
  { id: '전체', emoji: '🔍' },
  { id: '범용', emoji: '🤖' },
  { id: '글쓰기', emoji: '✍️' },
  { id: '이미지', emoji: '🎨' },
  { id: '영상', emoji: '🎬' },
  { id: '생산성', emoji: '⚡' },
  { id: '개발', emoji: '💻' }
];

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ selected, onSelect, disabled }) => {
  return (
    <div className="sticky top-0 z-50 bg-white py-4 shadow-sm">
      <div className="flex flex-wrap gap-2 justify-center max-w-5xl mx-auto">
        {categories.map(({ id, emoji }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            disabled={disabled}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1
              ${selected === id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <span>{emoji}</span>
            <span>{id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons; 