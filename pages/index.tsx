import React, { useState, useMemo, useCallback, useEffect } from "react";
import Head from 'next/head';
import { Tool, getAllTools } from "../data/categories";
import ToolGrid from "../components/ToolGrid";
import CategoryButtons from "../components/CategoryButtons";
import SearchBar from "../components/SearchBar";
import { startTimeTracking, trackTimeSpent, trackScrollDepth } from "../utils/analytics";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedToolName, setSearchedToolName] = useState<string | null>(null);

  const allTools = useMemo(() => getAllTools(), []);

  // 페이지 로드 시 트래킹 시작
  useEffect(() => {
    startTimeTracking();

    // 스크롤 이벤트 리스너 등록
    const handleScroll = () => {
      requestAnimationFrame(trackScrollDepth);
    };
    window.addEventListener('scroll', handleScroll);

    // 페이지 언마운트 시 체류 시간 전송
    return () => {
      trackTimeSpent('Home');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = useCallback((toolName: string) => {
    setSearchedToolName(toolName);
    // 검색된 도구의 카테고리를 찾아 자동으로 선택
    const tool = allTools.find(t => t.name.toLowerCase() === toolName.toLowerCase());
    if (tool) {
      setSelectedCategory(tool.category);
    }
  }, [allTools]);

  const filteredTools: Tool[] = useMemo(() => {
    if (searchedToolName) {
      // 검색된 도구명과 일치하는 도구만 필터링
      const searchResults = allTools.filter(tool => 
        tool.name.toLowerCase() === searchedToolName.toLowerCase()
      );
      return searchResults;
    } else if (selectedCategory && selectedCategory !== '전체') {
      return allTools.filter(tool => tool.category === selectedCategory);
    } else {
      return allTools;
    }
  }, [searchedToolName, selectedCategory, allTools]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    // 카테고리 변경 시 검색 상태 초기화
    setSearchedToolName(null);
    setSearchQuery("");
  }, []);

  return (
    <>
      <Head>
        <title>AI Tool Finder</title>
        <meta name="description" content="AI 도구를 카테고리별로 검색하고 찾아보세요" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">AI Tool Finder</h1>
          <p className="text-center text-blue-600 font-bold mb-6">
            AI 툴, 한눈에 보고 편하게 결정하세요
          </p>
          <div className="text-center text-red-500 text-sm mb-8">
            <p>현재 베타테스트중입니다.</p>
            <p>플랜과 금액은 실제 서비스와 다릅니다.</p>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
          
          <CategoryButtons
            selected={selectedCategory}
            onSelect={handleCategorySelect}
            disabled={false}
          />

          <ToolGrid 
            tools={filteredTools} 
            showMessage={searchedToolName !== null && filteredTools.length === 0}
            selectedCategory={selectedCategory}
          />
        </div>
      </main>
    </>
  );
} 