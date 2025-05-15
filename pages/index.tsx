import React, { useState, useMemo } from "react";
import Head from 'next/head';
import { Tool, getAllTools } from "../data/categories";
import ToolGrid from "../components/ToolGrid";
import CategoryButtons from "../components/CategoryButtons";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState("");

  const allTools = useMemo(() => getAllTools(), []);

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

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <CategoryButtons
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            disabled={searchQuery.trim() !== ""}
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