// Google Analytics 이벤트 트래킹 함수
export const trackEvent = (
  event_name: string,
  params: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event_name, params);
  }
};

// 페이지 조회 시간 측정 시작
export const startTimeTracking = () => {
  if (typeof window !== 'undefined') {
    (window as any).pageLoadTime = Date.now();
  }
};

// 페이지 체류 시간 측정 및 전송
export const trackTimeSpent = (pageName: string) => {
  if (typeof window !== 'undefined' && (window as any).pageLoadTime) {
    const timeSpent = Math.floor((Date.now() - (window as any).pageLoadTime) / 1000);
    trackEvent('page_view_duration', {
      page_name: pageName,
      duration_seconds: timeSpent
    });
  }
};

// 검색 이벤트 트래킹
export const trackSearch = (query: string, resultCount: number) => {
  trackEvent('search', {
    search_term: query,
    result_count: resultCount
  });
};

// 카테고리 선택 트래킹
export const trackCategorySelect = (category: string) => {
  trackEvent('select_content', {
    content_type: 'category',
    content_id: category
  });
};

// 도구 클릭 트래킹
export const trackToolClick = (toolName: string, category: string) => {
  trackEvent('select_item', {
    items: [{
      item_id: toolName,
      item_name: toolName,
      item_category: category
    }]
  });
};

// 스크롤 깊이 트래킹
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    const scrollDepth = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    if (scrollDepth % 25 === 0) {
      trackEvent('scroll_depth', {
        depth_percentage: scrollDepth
      });
    }
  }
};

// 요금제 정보 조회 트래킹
export const trackPricingView = (toolName: string) => {
  trackEvent('view_item', {
    items: [{
      item_id: toolName,
      item_name: toolName
    }]
  });
};

// 탭 변경 트래킹
export const trackTabChange = (fromTab: string, toTab: string) => {
  trackEvent('tab_change', {
    from_tab: fromTab,
    to_tab: toTab
  });
};

// 공유 버튼 클릭 트래킹
export const trackShare = (toolName: string, platform: string) => {
  trackEvent('share', {
    content_type: 'tool',
    item_id: toolName,
    method: platform
  });
};

// 에러 발생 트래킹
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage
  });
};

// 필터 사용 트래킹
export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter', {
    filter_type: filterType,
    filter_value: filterValue
  });
};

// 정렬 변경 트래킹
export const trackSort = (sortType: string) => {
  trackEvent('sort', {
    sort_type: sortType
  });
}; 