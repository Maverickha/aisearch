import React, { useState, useMemo, useCallback } from "react";
import Head from 'next/head';
import { Tool, getAllTools } from "../data/categories";
import ToolGrid from "../components/ToolGrid";
import CategoryButtons from "../components/CategoryButtons";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const allTools = useMemo(() => getAllTools(), []);

  const handleSearch = useCallback((query: string) => {
    setIsSearching(true);
    // 검색 실행 시 호출할 코드
    console.log("Gemini 검색 실행:", query);
    setIsSearching(false);
  }, []);

  const filteredTools: Tool[] = useMemo(() => {
    if (searchQuery.trim() !== "") {
      return allTools.filter((tool) =>
        `${tool.name} ${tool.description} ${tool.tags?.join(" ")}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedCategory && selectedCategory !== '전체') {
      return allTools.filter(tool => tool.category === selectedCategory);
    } else {
      return allTools;
    }
  }, [searchQuery, selectedCategory, allTools]);

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
          <p className="text-center text-gray-500 mb-6">
            AI 툴, 한눈에 보고 편하게 결정하세요
          </p>
          <p className="text-center text-gray-400 text-sm mb-8">
            (현재 베타 테스트중입니다. 플랜과 금액은 실제 서비스와 다릅니다.)
          </p>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
          
          <CategoryButtons
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            disabled={isSearching}
          />

          <ToolGrid 
            tools={filteredTools} 
            showMessage={searchQuery.trim() !== "" || selectedCategory !== null}
            selectedCategory={selectedCategory}
          />
        </div>
      </main>
    </>
  );
} 