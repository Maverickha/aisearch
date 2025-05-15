import React, { useState, useCallback, useRef } from 'react';
import { fetchGeminiResponse } from '../utils/geminiSearch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(async () => {
    if (!value.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetchGeminiResponse(value);
      setResult(response);
    } catch (error) {
      console.error('검색 오류:', error);
      setResult('검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // 디바운스 처리
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      if (newValue.trim().length >= 2) {
        handleSearch();
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="당신의 상황을 입력하세요 (예: 영상 편집하고 싶어요)"
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
      </div>
      
      {result && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-100 animate-fadeIn">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBar); 