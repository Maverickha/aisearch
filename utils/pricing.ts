import axios from 'axios';
import { load } from 'cheerio';

interface PricingInfo {
  individual: {
    name: string;
    usd: string;
    krw: string;
  };
  team: {
    name: string;
    usd: string;
    krw: string;
  };
}

const PRICING_CACHE = new Map<string, { data: PricingInfo; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1시간 (밀리초)

export async function fetchPricing(toolUrl: string): Promise<PricingInfo> {
  // 캐시된 데이터 확인
  const cached = PRICING_CACHE.get(toolUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await axios.get(toolUrl);
    const $ = load(response.data);
    
    // 요금제 정보 추출 로직
    const pricingInfo: PricingInfo = {
      individual: {
        name: getPlanName(toolUrl, 'individual'),
        usd: extractPrice($, 'individual'),
        krw: await convertToKRW(extractPrice($, 'individual'))
      },
      team: {
        name: 'Team',
        usd: extractPrice($, 'team'),
        krw: await convertToKRW(extractPrice($, 'team'))
      }
    };

    // 캐시 업데이트
    PRICING_CACHE.set(toolUrl, {
      data: pricingInfo,
      timestamp: Date.now()
    });

    return pricingInfo;
  } catch (error) {
    console.error('가격 정보 가져오기 실패:', error);
    return {
      individual: {
        name: 'Pro',
        usd: '가격 정보 없음',
        krw: '가격 정보 없음'
      },
      team: {
        name: 'Team',
        usd: '가격 정보 없음',
        krw: '가격 정보 없음'
      }
    };
  }
}

function getPlanName(url: string, type: 'individual' | 'team'): string {
  if (type === 'team') return 'Team';
  
  // URL 기반으로 서비스별 개인 요금제 이름 매핑
  if (url.includes('openai.com')) return 'Plus';
  if (url.includes('perplexity.ai')) return 'Pro';
  if (url.includes('anthropic.com')) return 'Claude Pro';
  // 기본값
  return 'Pro';
}

function extractPrice($: cheerio.Root, type: 'individual' | 'team'): string {
  // 웹사이트별 가격 추출 로직
  // 실제 구현시에는 각 웹사이트의 DOM 구조에 맞게 셀렉터 지정 필요
  const priceElement = $('[data-price-type="' + type + '"]').first();
  return priceElement.length ? priceElement.text().trim() : '가격 정보 없음';
}

async function convertToKRW(usdPrice: string): Promise<string> {
  if (usdPrice === '가격 정보 없음') return '가격 정보 없음';
  
  try {
    const amount = parseFloat(usdPrice.replace(/[^0-9.]/g, ''));
    if (isNaN(amount)) return '가격 정보 없음';

    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const rate = response.data.rates.KRW;
    
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount * rate);
  } catch (error) {
    console.error('환율 변환 실패:', error);
    return '환율 정보 없음';
  }
} 