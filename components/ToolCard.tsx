import React, { useState, useEffect, useMemo } from 'react';
import { Tool } from '../data/categories';
import { fallbackLogos } from '../data/logos';
import Image from 'next/image';
import { fetchPricing } from '../utils/pricing';
import { trackToolClick, trackPricingView } from '../utils/analytics';

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

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [logoSrc, setLogoSrc] = useState<string>('/default-logo.png');
  const [hasError, setHasError] = useState<boolean>(false);
  const [loadAttempts, setLoadAttempts] = useState<number>(0);
  const [priceInfo, setPriceInfo] = useState<PricingInfo | null>(null);

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
      if (tool.hasPricing && tool.url) {
        try {
          const data = await fetchPricing(tool.url);
          setPriceInfo(data);
          if (data) {
            trackPricingView(tool.name);
          }
        } catch (error) {
          console.error('가격 정보 로딩 중 오류:', error);
          setPriceInfo({
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
          });
        }
      }
    };

    loadPricing();
  }, [tool.hasPricing, tool.url, tool.name]);

  const handleCardClick = () => {
    trackToolClick(tool.name, tool.category);
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
    <div 
      className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
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
            width={48}
            height={48}
            className="object-contain rounded-lg bg-white"
            onError={handleImgError}
          />
        </div>
        <div className="flex-1 min-h-[100px]">
          <h2 className="text-lg font-semibold mb-2">{tool.name}</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{tool.description}</p>
        </div>
      </div>

      {tool.hasPricing && priceInfo && (
        <div className="mt-6">
          <div className="flex gap-4 justify-between">
            {/* 개인 요금제 */}
            <div className="flex-1 bg-[#E8EBED] rounded-lg shadow-sm p-4 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
              <p className="font-semibold text-sm mb-2">{priceInfo.individual.name}</p>
              <p className="text-sm text-gray-600">{priceInfo.individual.usd}</p>
              <p className="text-blue-600 font-bold text-sm mt-1">{priceInfo.individual.krw}</p>
            </div>

            {/* Team 요금제 */}
            <div className="flex-1 bg-[#E8EBED] rounded-lg shadow-sm p-4 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
              <p className="font-semibold text-sm mb-2">{priceInfo.team.name}</p>
              <p className="text-sm text-gray-600">{priceInfo.team.usd}</p>
              <p className="text-blue-600 font-bold text-sm mt-1">{priceInfo.team.krw}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ToolCard);