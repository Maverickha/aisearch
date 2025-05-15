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
      <div className="space-y-10 mt-6">
        {Object.entries(grouped).map(([category, groupTools]) => (
          <section 
            key={category} 
            id={`section-${category}`}
            className="scroll-mt-24"
          >
            <h3 className="text-lg font-bold mb-4 pl-4 md:pl-0">
              <span className="mr-2">📌</span>
              {category}
            </h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 px-4 md:px-0">
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
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6 px-4 md:px-0">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}

export default React.memo(ToolGrid); 