import React, { useRef, useEffect } from 'react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 선택된 카테고리로 스크롤
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const selectedButton = scrollContainerRef.current.querySelector(`[data-category="${selected}"]`);
    if (selectedButton) {
      const container = scrollContainerRef.current;
      const buttonRect = selectedButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const scrollLeft = buttonRect.left - containerRect.left - (containerRect.width - buttonRect.width) / 2;
      container.scrollTo({
        left: container.scrollLeft + scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [selected]);

  const handleCategoryClick = (id: string) => {
    onSelect(id);
    // 해당 섹션으로 스크롤
    const section = document.getElementById(`section-${id}`);
    if (section) {
      const yOffset = -80; // 상단 여백 조정
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white py-4 shadow-sm">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 px-4 md:px-0 md:justify-center max-w-5xl mx-auto"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {categories.map(({ id, emoji }) => (
          <button
            key={id}
            data-category={id}
            onClick={() => handleCategoryClick(id)}
            disabled={disabled}
            className={`
              flex-none
              px-4 py-2 
              rounded-full 
              text-sm 
              font-medium 
              transition-all
              duration-200
              flex items-center 
              gap-1
              ${selected === id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <span className="flex-shrink-0">{emoji}</span>
            <span className="whitespace-nowrap">{id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons; 