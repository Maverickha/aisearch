import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { startTimeTracking, trackTimeSpent, trackScrollDepth } from '../utils/analytics';

export const useGlobalAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    // 페이지 로드 시 시간 측정 시작
    startTimeTracking();

    // 스크롤 이벤트 리스너
    const handleScroll = () => {
      requestAnimationFrame(trackScrollDepth);
    };

    // 라우트 변경 시 이벤트
    const handleRouteChange = (url: string) => {
      // 이전 페이지의 체류 시간 기록
      trackTimeSpent(router.pathname);
      // 새 페이지 로드 시간 측정 시작
      startTimeTracking();
    };

    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    router.events.on('routeChangeComplete', handleRouteChange);

    // 컴포넌트 언마운트 시 정리
    return () => {
      trackTimeSpent(router.pathname);
      window.removeEventListener('scroll', handleScroll);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
}; 