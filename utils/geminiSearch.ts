const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function fetchGeminiResponse(prompt: string): Promise<string> {
  try {
    const enhancedPrompt = `
사용자의 요구사항에 맞는 AI 도구를 추천해드립니다.

사용자 입력: "${prompt}"

다음 형식으로 답변해주세요:

🎯 추천 도구:
[도구명]
- 주요 기능: (핵심 기능 1-2줄)
- 장점: (차별점 1-2개)
- 가격: Plus $XX/월, Team $XX/월

💡 선택 이유:
- (사용자 요구사항과 매칭되는 이유)
- (실제 사용 시 얻을 수 있는 이점)

⭐ 활용 팁:
- (효과적인 사용 방법 1-2개)
- (주의할 점 1개)

답변은 300자 이내로 작성해주세요.
`;

    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro/generateContent?key=' +
        GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: enhancedPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.95,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_DEROGATORY",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_TOXICITY",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!res.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await res.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      throw new Error('응답 데이터가 없습니다.');
    }

    return output
      .replace(/\n\n+/g, '\n\n')
      .trim();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return '죄송합니다. 검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
} 