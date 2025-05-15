export async function fetchGeminiResponse(prompt: string): Promise<string> {
  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=' +
        process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: { text: prompt },
          temperature: 0.7,
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