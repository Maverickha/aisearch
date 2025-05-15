import React, { useState, useCallback } from 'react';
import { fetchGeminiResponse } from '../utils/geminiSearch';
import { trackSearch } from '../utils/analytics';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!value.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetchGeminiResponse(value);
      if (response && !response.includes('죄송합니다')) {
        const toolName = extractToolName(response);
        if (toolName) {
          onSearch(toolName);
          trackSearch(value, 1);
        } else {
          trackSearch(value, 0);
        }
      } else {
        trackSearch(value, 0);
      }
    } catch (error) {
      console.error('검색 오류:', error);
      trackSearch(value, 0);
    } finally {
      setIsLoading(false);
    }
  }, [value, onSearch]);

  const extractToolName = (response: string): string | null => {
    const toolNameMatch = response.match(/🎯 추천 도구:\s*\n([^\n]+)/);
    return toolNameMatch ? toolNameMatch[1].trim() : null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="어떤 AI 도구를 찾으시나요?"
          className="w-full p-4 pr-24 text-gray-900 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              검색 중...
            </span>
          ) : (
            '검색'
          )}
        </button>
      </form>
    </div>
  );
};

export default React.memo(SearchBar); 