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

위 도구 목록 중에서 사용자의 요구사항과 가장 관련성 높은 도구를 선택하여 추천해주세요.
예를 들어, 웹툰이나 그림 관련 요청에는 Midjourney, DALL-E, Stable Diffusion 등의 이미지 생성 도구를,
글쓰기 관련 요청에는 ChatGPT, Claude 등의 텍스트 생성 도구를 추천해주세요.

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
        tool => tool.name.toLowerCase().includes(recommendedToolName.toLowerCase()) ||
               recommendedToolName.toLowerCase().includes(tool.name.toLowerCase())
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