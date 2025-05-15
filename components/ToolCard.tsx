import React, { useState, useEffect, useMemo } from 'react';
import { Tool } from '../data/categories';
import { fallbackLogos } from '../data/logos';
import Image from 'next/image';

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

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [logoSrc, setLogoSrc] = useState<string>('/default-logo.png');
  const [hasError, setHasError] = useState<boolean>(false);
  const [loadAttempts, setLoadAttempts] = useState<number>(0);
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);

  const fallbackKey = useMemo(() => {
    const lowerName = tool.name.toLowerCase();
    return Object.keys(fallbackLogos).find(key => lowerName.includes(key));
  }, [tool.name]);

  const getClearbitLogo = (domain: string) => {
    return `https://logo.clearbit.com/${domain}`;
  };

  useEffect(() => {
    const loadLogo = async () => {
      try {
        if (loadAttempts >= 3) {
          setLogoSrc('/default-logo.png');
          return;
        }

        if (tool.logo) {
          setLogoSrc(tool.logo);
          return;
        }

        if (tool.domain) {
          const clearbitUrl = getClearbitLogo(tool.domain);
          const response = await fetch(clearbitUrl, { method: 'HEAD' });
          if (response.ok) {
            setLogoSrc(clearbitUrl);
            return;
          }
        }

        if (fallbackKey) {
          setLogoSrc(fallbackLogos[fallbackKey]);
          return;
        }

        setLogoSrc('/default-logo.png');
      } catch (error) {
        console.error('로고 로딩 중 오류 발생:', error);
        setLoadAttempts(prev => prev + 1);
        
        if (fallbackKey) {
          setLogoSrc(fallbackLogos[fallbackKey]);
        } else {
          setLogoSrc('/default-logo.png');
        }
      }
    };

    loadLogo();
    setHasError(false);
  }, [tool.url, tool.logo, tool.domain, fallbackKey, loadAttempts]);

  useEffect(() => {
    const loadPricing = async () => {
      if (tool.hasPricing) {
        try {
          const response = await fetch('/api/pricing/chatgpt');
          const data = await response.json();
          setPriceInfo(data);
        } catch (error) {
          console.error('가격 정보 로딩 중 오류:', error);
          setPriceInfo({
            plus: { usd: '가격 정보 없음', krw: '가격 정보 없음' },
            team: { usd: '가격 정보 없음', krw: '가격 정보 없음' },
            error: '가격 정보를 가져오는 중 오류가 발생했습니다.'
          });
        }
      }
    };

    loadPricing();
  }, [tool.hasPricing]);

  const handleCardClick = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError && loadAttempts < 3) {
      const img = e.target as HTMLImageElement;
      img.onerror = null;
      setLoadAttempts(prev => prev + 1);

      if (fallbackKey && logoSrc !== fallbackLogos[fallbackKey]) {
        setLogoSrc(fallbackLogos[fallbackKey]);
      } else {
        setLogoSrc('/default-logo.png');
      }
      setHasError(true);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleCardClick();
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <Image
            src={logoSrc}
            alt={`${tool.name} 로고`}
            width={40}
            height={40}
            className="object-contain rounded-lg bg-white"
            onError={handleImgError}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{tool.name}</h2>
          <p className="text-sm text-gray-700 line-clamp-2">{tool.description}</p>
        </div>
      </div>

      {tool.hasPricing && priceInfo && (
        <div className="mt-4">
          <div className="flex gap-3 justify-between">
            {/* Plus 요금제 */}
            <div className="flex-1 bg-[#E8EBED] rounded-lg shadow-sm p-3 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
              <p className="font-semibold text-sm mb-2">Plus</p>
              <p className="text-sm text-gray-600">{priceInfo.plus.usd}</p>
              <p className="text-blue-600 font-bold text-sm mt-1">{priceInfo.plus.krw}</p>
            </div>

            {/* Team 요금제 */}
            <div className="flex-1 bg-[#E8EBED] rounded-lg shadow-sm p-3 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
              <p className="font-semibold text-sm mb-2">Team</p>
              <p className="text-sm text-gray-600">{priceInfo.team.usd}</p>
              <p className="text-blue-600 font-bold text-sm mt-1">{priceInfo.team.krw}</p>
            </div>

            {/* Enterprise 요금제 */}
            <div className="flex-1 bg-[#E8EBED] rounded-lg shadow-sm p-3 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
              <p className="font-semibold text-sm mb-2">Enterprise</p>
              <p className="text-sm text-gray-500">Contact us</p>
              <p className="text-xs text-gray-400 mt-1">맞춤형 견적</p>
            </div>
          </div>

          {priceInfo.error && (
            <p className="text-xs text-red-500 w-full mt-2 text-center">{priceInfo.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(ToolCard);