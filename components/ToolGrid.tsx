import React from 'react';
import { Tool } from '../data/categories';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  showMessage?: boolean;
  selectedCategory: string;
}

function ToolGrid({ tools, showMessage = false, selectedCategory }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {showMessage
          ? '검색 결과가 없습니다. 다른 키워드로 검색해보세요.'
          : '카테고리를 선택하거나 검색어를 입력해보세요.'}
      </div>
    );
  }

  if (selectedCategory === '전체') {
    const grouped: Record<string, Tool[]> = {};
    tools.forEach((tool) => {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    });

    return (
      <div className="space-y-12 mt-8">
        {Object.entries(grouped).map(([category, groupTools]) => (
          <section 
            key={category} 
            id={`category-${category}`}
            className="scroll-mt-32 px-4 md:px-0"
          >
            <h3 className="text-xl font-bold mb-6 max-w-2xl mx-auto">
              {getCategoryEmoji(category)}
              {category}
            </h3>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 max-w-2xl mx-auto">
              {groupTools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8 px-4 md:px-0 max-w-2xl mx-auto">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    '범용': '🤖 ',
    '글쓰기': '✍️ ',
    '이미지': '🎨 ',
    '영상': '🎬 ',
    '생산성': '⚡ ',
    '개발': '💻 '
  };
  return emojiMap[category] || '🔍 ';
}

export default React.memo(ToolGrid); 