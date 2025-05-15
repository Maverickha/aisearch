import { getAllTools, Tool } from '../data/categories';

const GEMINI_API_KEY = 'AIzaSyC1u1ePly2RRt9cIvWYne9Q--whRc2BlkE';

// 도구별 관련 키워드 매핑
const toolKeywords: Record<string, string[]> = {
  'ChatGPT': ['gpt', '챗gpt', '챗지피티', '대화', '글쓰기', 'openai'],
  'Midjourney': ['그림', '웹툰', '일러스트', '이미지', '디자인', '아트', '그리기'],
  'Leonardo AI': ['그림', '웹툰', '일러스트', '이미지', '디자인', '아트', '그리기', '레오나르도'],
  'DALL-E': ['그림', '이미지', '디자인', '아트', '달리', '달리이'],
  'Stable Diffusion': ['그림', '이미지', '디자인', '아트', '스테이블디퓨전'],
  'Microsoft Copilot': ['엑셀', '워드', '파워포인트', '오피스', '문서', '데이터', '마이크로소프트'],
  'Claude': ['글쓰기', '대화', '문서', '클로드'],
  'Gemini': ['구글', '대화', '글쓰기', '제미나이'],
  'Grammarly': ['영어', '교정', '문법', '그래멀리'],
  'Jasper': ['블로그', '마케팅', '카피라이팅', '자스퍼'],
  'Poe': ['대화', 'AI 모음', '포'],
  'Motion': ['일정', '계획', '시간관리', '모션']
};

export async function fetchGeminiResponse(userQuery: string): Promise<string> {
  try {
    const allTools = getAllTools();
    const toolsContext = allTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      tags: tool.tags,
      keywords: toolKeywords[tool.name] || []
    }));

    const enhancedPrompt = `
당신은 AI 도구 추천 전문가입니다. 사용자의 요구사항을 분석하여 가장 적합한 AI 도구를 추천해주세요.

현재 제공 가능한 도구 목록:
${JSON.stringify(toolsContext, null, 2)}

사용자 입력: "${userQuery}"

위 도구 목록 중에서 사용자의 요구사항과 가장 관련성 높은 도구를 선택하여 추천해주세요.
각 도구의 description, tags, keywords를 참고하여 사용자의 의도와 가장 잘 맞는 도구를 추천해주세요.

예시:
- "웹툰 그리고 싶어" → Midjourney, Leonardo AI (이미지 생성 도구)
- "엑셀 작업" → Microsoft Copilot (오피스 도구)
- "GPT" → ChatGPT (대화형 AI)
- "영어 교정" → Grammarly (영어 교정 도구)

다음 형식으로 답변해주세요:

🎯 추천 도구:
[도구명]
- 주요 기능: (핵심 기능 1-2줄)

답변은 100자 이내로 작성해주세요.
반드시 위 도구 목록에 있는 도구 중에서만 선택하여 추천해주세요.
`;

    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=' +
        GEMINI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: enhancedPrompt
            }]
          }]
        }),
      }
    );

    if (!res.ok) {
      throw new Error('API 요청 실패: ' + res.statusText);
    }

    const data = await res.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return '죄송합니다. 아직 구현중인 기능으로, 오류가 발생할 수 있습니다.';
    }

    // 추천된 도구명 추출
    const toolNameMatch = output.match(/🎯 추천 도구:\s*\n([^\n]+)/);
    const recommendedToolName = toolNameMatch ? toolNameMatch[1].trim() : null;

    // 추천된 도구가 실제 존재하는지 확인
    if (recommendedToolName) {
      const recommendedTool = allTools.find(
        tool => {
          const toolName = tool.name.toLowerCase();
          const searchName = recommendedToolName.toLowerCase();
          
          // 도구명 직접 매칭
          if (toolName.includes(searchName) || searchName.includes(toolName)) {
            return true;
          }
          
          // 키워드 매칭
          const keywords = toolKeywords[tool.name] || [];
          return keywords.some(keyword => 
            userQuery.toLowerCase().includes(keyword.toLowerCase())
          );
        }
      );

      if (!recommendedTool) {
        return '죄송합니다. 아직 구현중인 기능으로, 오류가 발생할 수 있습니다.';
      }
    }

    return output.trim();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return '죄송합니다. 아직 구현중인 기능으로, 오류가 발생할 수 있습니다.';
  }
} 