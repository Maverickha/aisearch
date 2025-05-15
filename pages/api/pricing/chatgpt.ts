import { NextApiRequest, NextApiResponse } from 'next';

interface PriceInfo {
  plus: {
    usd: string;
    krw: string;
  };
  team: {
    usd: string;
    krw: string;
  };
  error?: string;
}

// 캐시 저장소
let exchangeRateCache = {
  rate: null as number | null,
  timestamp: 0
};

// 랜덤 가격 생성 함수 (15-30 달러 범위)
const generateRandomPrice = () => {
  return Math.floor(Math.random() * (30 - 15 + 1)) + 15;
};

// 환율 정보 가져오기 (캐싱 포함)
const getExchangeRate = async (): Promise<number> => {
  const now = Date.now();
  const CACHE_DURATION = 3600000; // 1시간 (밀리초)

  // 캐시가 유효한 경우 캐시된 값 반환
  if (exchangeRateCache.rate && (now - exchangeRateCache.timestamp) < CACHE_DURATION) {
    return exchangeRateCache.rate;
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) {
      throw new Error('환율 API 응답 오류');
    }
    const data = await response.json();
    
    // 캐시 업데이트
    exchangeRateCache = {
      rate: data.rates.KRW,
      timestamp: now
    };
    
    return data.rates.KRW;
  } catch (error) {
    console.error('환율 정보 가져오기 실패:', error);
    // 캐시된 값이 있으면 사용, 없으면 기본값 사용
    return exchangeRateCache.rate || 1300; // 기본값으로 1300원 설정
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '허용되지 않는 메소드입니다.' });
  }

  try {
    // 1. 환율 정보 가져오기
    const usdToKrw = await getExchangeRate();

    // 2. 랜덤 가격 생성
    const plusPrice = generateRandomPrice();
    const teamPrice = plusPrice * 2; // Team 가격은 Plus의 2배로 설정

    // 3. USD와 KRW 가격 정보 조합
    const response: PriceInfo = {
      plus: {
        usd: `$${plusPrice.toFixed(2)}`,
        krw: `₩${Math.round(plusPrice * usdToKrw).toLocaleString()}`
      },
      team: {
        usd: `$${teamPrice.toFixed(2)}`,
        krw: `₩${Math.round(teamPrice * usdToKrw).toLocaleString()}`
      }
    };

    // 캐싱 헤더 설정 (1시간)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    res.status(200).json(response);
  } catch (error) {
    console.error('가격 정보를 가져오는 중 오류가 발생했습니다:', error);
    res.status(500).json({ 
      error: '가격 정보를 가져오는 중 오류가 발생했습니다.',
      plus: { usd: '가격 정보 없음', krw: '가격 정보 없음' },
      team: { usd: '가격 정보 없음', krw: '가격 정보 없음' }
    });
  }
} 