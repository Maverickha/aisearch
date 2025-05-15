import React, { useState } from 'react';
import { fetchGeminiResponse } from '../utils/geminiSearch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSearch = async () => {
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
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="당신의 상황을 입력하세요 (예: 영상 편집하고 싶어요)"
          className="w-full p-4 pr-12 text-gray-900 border border-gray-200 rounded-lg shadow-sm"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? '검색 중...' : 'Gemini 검색'}
        </button>
      </div>
      
      {result && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <p className="text-gray-700 whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 