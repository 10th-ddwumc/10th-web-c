// src/types/lp.ts

export type SortType = "latest" | "oldest";
export type OrderType = "asc" | "desc";

export type LpTag = {
  id: number;
  name: string;
};

export type LpAuthor = {
  id: number;
  name: string;
};

// Swagger 데이터와 프로젝트 UI를 잇는 핵심 모델
export type Lp = {
  id: number;
  title: string;     // Swagger의 'name' 매핑 예정
  content: string;   // Swagger의 'status' 혹은 설명 매핑 예정
  thumbnail: string; // Swagger의 'photoUrls[0]' 매핑 예정
  status?: string;   // Swagger 전용: 'available', 'pending', 'sold'
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: LpTag[];
  category?: {
    id: number;
    name: string;
  };
};

export type LpListResponse = {
  data: {
    data: Lp[];
    nextCursor: number | null;
    hasNext: boolean;
  };
};

export type LpDetailResponse = {
  data: Lp;
};

// 댓글 관련 타입 (Swagger Petstore 미지원이나 구조 유지를 위해 남겨둠)
export type LpCommentAuthor = {
  id: number;
  name: string;
  avatar?: string;
};

export type LpComment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  author?: LpCommentAuthor;
  user?: LpCommentAuthor;
};

export type LpCommentListResponse = {
  data: {
    data: LpComment[];
    nextCursor: number | null;
    hasNext: boolean;
  };
};

// 생성 및 수정 요청 타입
export type CreateLpRequest = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type UpdateLpRequest = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published?: boolean;
};