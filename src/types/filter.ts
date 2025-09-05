export interface FilterState {
  // 인플루언서 정보 필터
  categories: string[];
  followerMin: string;
  followerMax: string;
  verified: '전체' | '없음' | '있음';
  
  // 콘텐츠 지표 필터
  avgLikeMin: string;
  avgLikeMax: string;
  avgViewMin: string;
  avgViewMax: string;
  erMin: string;
  erMax: string;
  reachMin: string;
  reachMax: string;
}

export interface FilterActions {
  setCategories: (categories: string[]) => void;
  setFollowerRange: (min: string, max: string) => void;
  setVerified: (verified: '전체' | '없음' | '있음') => void;
  setAvgLikeRange: (min: string, max: string) => void;
  setAvgViewRange: (min: string, max: string) => void;
  setErRange: (min: string, max: string) => void;
  setReachRange: (min: string, max: string) => void;
  resetFilters: () => void;
}
