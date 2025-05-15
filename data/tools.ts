export interface Tool {
  name: string;
  description: string;
  recommendedUse: string;
  officialUrl: string;
  sourceUrl: string;
  tags: string[];
  hasPricing: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  tools: Tool[];
}

export const categories: Category[] = [
  {
    id: "writing",
    name: "글쓰기",
    emoji: "✍️",
    tools: [
      {
        name: "ChatGPT",
        description: "OpenAI의 대화형 AI 모델로, 자연어 처리와 대화형 작업에 탁월합니다.",
        recommendedUse: "텍스트 생성, 코드 작성, 질문 답변",
        officialUrl: "https://chat.openai.com",
        sourceUrl: "https://www.barrons.com/articles/chatgpt-user-growth-altman-61c1593a",
        tags: ["다목적 AI", "글쓰기"],
        hasPricing: true
      }
    ]
  },
  {
    id: "design",
    name: "디자인",
    emoji: "🎨",
    tools: [
      {
        name: "Midjourney",
        description: "텍스트 프롬프트를 기반으로 고품질 이미지를 생성하는 AI 도구입니다.",
        recommendedUse: "디자인, 아트워크, 시각적 콘텐츠 제작",
        officialUrl: "https://www.midjourney.com",
        sourceUrl: "https://www.reddit.com/r/AIToolTesting/comments/1ji4ihm",
        tags: ["디자인"]
      }
    ]
  },
  {
    id: "dev",
    name: "개발",
    emoji: "💻",
    tools: [
      {
        name: "GitHub Copilot",
        description: "실시간 코드 보완과 제안을 제공하는 개발자용 AI입니다.",
        recommendedUse: "자동완성, 코드 리뷰 보조, 반복 코드 생략",
        officialUrl: "https://github.com/features/copilot",
        sourceUrl: "https://github.blog/2024-03-15-copilot-now-used-by-1500000-developers/",
        tags: ["개발"]
      }
    ]
  },
  {
    id: "video",
    name: "영상/음성",
    emoji: "📹",
    tools: [
      {
        name: "Runway",
        description: "AI 기반 영상 편집 및 생성 도구로, 텍스트 프롬프트를 통한 영상 생성과 편집이 가능합니다.",
        recommendedUse: "영상 편집, 특수 효과, 텍스트-투-비디오",
        officialUrl: "https://runwayml.com",
        sourceUrl: "https://www.futuretools.io/tools/runway",
        tags: ["영상"]
      }
    ]
  },
  {
    id: "productivity",
    name: "생산성",
    emoji: "📈",
    tools: [
      {
        name: "Notion AI",
        description: "메모, 문서 작성, 요약 등 다양한 업무에 활용 가능한 AI 도우미입니다.",
        recommendedUse: "메모 자동화, 문서 요약, 태스크 정리",
        officialUrl: "https://www.notion.so/product/ai",
        sourceUrl: "https://www.producthunt.com/products/notion-ai",
        tags: ["생산성"]
      }
    ]
  }
]; 