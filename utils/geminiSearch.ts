export async function fetchGeminiResponse(prompt: string): Promise<string> {
  try {
    const enhancedPrompt = `
사용자가 찾고 있는 AI 도구를 추천해주세요. 다음 조건을 고려해서 답변해주세요:

사용자 입력: "${prompt}"

답변 형식:
1. 추천 도구:
- [도구 이름]: 주요 특징과 장점
- [도구 이름]: 주요 특징과 장점
(2-3개 추천)

2. 추천 이유:
- 사용자의 요구사항과 매칭되는 이유
- 실제 사용 시 얻을 수 있는 이점

3. 사용 팁:
- 효과적인 활용 방법
- 주의할 점

답변은 300자 이내로 간단명료하게 작성해주세요.
`;

    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=' +
        process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: { text: enhancedPrompt },
          temperature: 0.7,
          maxTokens: 500,
          topK: 40,
          topP: 0.95,
        }),
      }
    );

    if (!res.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await res.json();
    return data?.candidates?.[0]?.output || '결과를 불러올 수 없습니다.';
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return '죄송합니다. 검색 중 오류가 발생했습니다.';
  }
} 