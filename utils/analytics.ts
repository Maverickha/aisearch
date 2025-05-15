// Google Analytics 이벤트 트래킹 함수
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// 페이지 조회 시간 측정 시작
export const startTimeTracking = () => {
  if (typeof window !== 'undefined') {
    (window as any).pageLoadTime = Date.now();
  }
};

// 페이지 체류 시간 측정 및 전송
export const trackTimeSpent = (category: string) => {
  if (typeof window !== 'undefined' && (window as any).pageLoadTime) {
    const timeSpent = Math.floor((Date.now() - (window as any).pageLoadTime) / 1000);
    trackEvent(category, 'time_spent', undefined, timeSpent);
  }
};

// 검색 이벤트 트래킹
export const trackSearch = (query: string, resultCount: number) => {
  trackEvent('Search', 'search_triggered', query, resultCount);
};

// 카테고리 선택 트래킹
export const trackCategorySelect = (category: string) => {
  trackEvent('Navigation', 'category_selected', category);
};

// 도구 클릭 트래킹
export const trackToolClick = (toolName: string, category: string) => {
  trackEvent('Engagement', 'tool_selected', `${toolName} (${category})`);
};

// 스크롤 깊이 트래킹
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    const scrollDepth = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    if (scrollDepth % 25 === 0) { // 25%, 50%, 75%, 100% 지점에서 트래킹
      trackEvent('Scroll', 'depth', `${scrollDepth}%`);
    }
  }
};

// 요금제 정보 조회 트래킹
export const trackPricingView = (toolName: string) => {
  trackEvent('Pricing', 'pricing_viewed', toolName);
};

// 탭 변경 트래킹
export const trackTabChange = (fromTab: string, toTab: string) => {
  trackEvent('Navigation', 'tab_changed', `${fromTab} → ${toTab}`);
};

// 공유 버튼 클릭 트래킹
export const trackShare = (toolName: string, platform: string) => {
  trackEvent('Engagement', 'share_clicked', `${toolName} (${platform})`);
};

// 에러 발생 트래킹
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('Error', errorType, errorMessage);
};

// 필터 사용 트래킹
export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('Filter', 'filter_applied', `${filterType}: ${filterValue}`);
};

// 정렬 변경 트래킹
export const trackSort = (sortType: string) => {
  trackEvent('Sort', 'sort_changed', sortType);
}; 