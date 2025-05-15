import { getAllTools, Tool } from '../data/categories';

const GEMINI_API_KEY = 'AIzaSyC1u1ePly2RRt9cIvWYne9Q--whRc2BlkE';

export async function fetchGeminiResponse(userQuery: string): Promise<string> {
  try {
    const allTools = getAllTools();
    const toolsContext = allTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      tags: tool.tags
    }));

    const enhancedPrompt = `
당신은 AI 도구 추천 전문가입니다. 사용자의 요구사항을 분석하여 가장 적합한 AI 도구를 추천해주세요.

현재 제공 가능한 도구 목록:
${JSON.stringify(toolsContext, null, 2)}

사용자 입력: "${userQuery}"

위 도구 목록 중에서만 선택하여 추천해주세요.
다음 형식으로 답변해주세요:

🎯 추천 도구:
[도구명]
- 주요 기능: (핵심 기능 1-2줄)
- 장점: (차별점 1-2개)

💡 선택 이유:
- (사용자 요구사항과 매칭되는 이유)
- (실제 사용 시 얻을 수 있는 이점)

⭐ 활용 팁:
- (효과적인 사용 방법 1-2개)
- (주의할 점 1개)

답변은 300자 이내로 작성해주세요.
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
      throw new Error('응답 데이터가 없습니다.');
    }

    // 추천된 도구명 추출
    const toolNameMatch = output.match(/🎯 추천 도구:\s*\n([^\n]+)/);
    const recommendedToolName = toolNameMatch ? toolNameMatch[1].trim() : null;

    // 추천된 도구가 실제 존재하는지 확인
    if (recommendedToolName) {
      const recommendedTool = allTools.find(
        tool => tool.name.toLowerCase() === recommendedToolName.toLowerCase()
      );

      if (!recommendedTool) {
        return '죄송합니다. 적절한 도구를 찾지 못했습니다. 다른 키워드로 검색해보세요.';
      }
    }

    return output.trim();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return '죄송합니다. 검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
} 