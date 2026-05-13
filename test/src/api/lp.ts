// src/api/lp.ts
import axiosInstance from "./axiosInstance";
import type {
  CreateLpRequest,
  LpCommentListResponse,
  LpDetailResponse,
  LpListResponse,
  OrderType,
  SortType,
  UpdateLpRequest,
  Lp,
} from "../types/lp";

/**
 * [중요] 변환기: Swagger 응답 데이터를 프로젝트의 Lp 타입으로 변경합니다.
 * 터미널 결과에서 보신 photoUrls가 비어있을 경우를 대비해 기본 이미지를 넣습니다.
 */
const transformSwaggerToLp = (sData: any): Lp => ({
  id: sData.id,
  title: sData.name || "이름 없는 항목",
  content: `상태: ${sData.status || "알 수 없음"} / 분류: ${sData.category?.name || "미분류"}`,
  thumbnail: (sData.photoUrls && sData.photoUrls.length > 0) 
    ? sData.photoUrls[0] 
    : "/src/assets/hero.png", // 사진이 없을 때 대체할 이미지 경로
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tags: sData.tags || [],
  status: sData.status,
  category: sData.category,
});

export const getLpList = async ({
  cursor = 0,
  limit = 12,
}: {
  sort?: SortType;
  cursor?: number;
  limit?: number;
}): Promise<LpListResponse> => {
  // Swagger API의 '상태별 조회' 엔드포인트 사용
  const response = await axiosInstance.get("/pet/findByStatus", {
    params: { status: "available" },
  });

  // 받아온 배열을 변환기를 거쳐 가공
  const allData = Array.isArray(response.data) 
    ? response.data.map(transformSwaggerToLp) 
    : [];

  return {
    data: {
      data: allData.slice(cursor, cursor + limit),
      nextCursor: cursor + limit < allData.length ? cursor + limit : null,
      hasNext: cursor + limit < allData.length,
    },
  };
};

export const getLpDetail = async (lpid: string): Promise<LpDetailResponse> => {
  // 터미널에서 확인하신 curl -X 'GET' '.../pet/1' 구조와 동일
  const response = await axiosInstance.get(`/pet/${lpid}`);
  
  return {
    data: transformSwaggerToLp(response.data),
  };
};

export const createLp = async (body: CreateLpRequest) => {
  // Swagger 규격(name, photoUrls)에 맞춰서 데이터 전송
  const response = await axiosInstance.post("/pet", {
    name: body.title,
    photoUrls: [body.thumbnail],
    status: "available"
  });
  return response.data;
};

export const updateLp = async ({
  lpid,
  body,
}: {
  lpid: string;
  body: UpdateLpRequest;
}) => {
  const response = await axiosInstance.put(`/pet`, {
    id: Number(lpid),
    name: body.title,
    photoUrls: body.thumbnail ? [body.thumbnail] : [],
    status: "available"
  });
  return response.data;
};

export const deleteLp = async (lpid: string) => {
  const response = await axiosInstance.delete(`/pet/${lpid}`);
  return response.data;
};

// --- 댓글 및 좋아요 (Swagger Petstore 미지원 기능 - 기본 응답 처리) ---

export const getLpComments = async ({
  lpid,
  order,
  cursor = 0,
  limit = 10,
}: {
  lpid: string;
  order: OrderType;
  cursor?: number;
  limit?: number;
}): Promise<LpCommentListResponse> => {
  // 1. 받아온 매개변수들을 여기서 사용해야 합니다!
  const response = await axiosInstance.get(`/pet/${lpid}/comments`, { 
    params: { 
      order,   // 여기서 사용됨
      cursor,  // 여기서 사용됨
      limit    // 여기서 사용됨
    },
  });

  return response.data;
};

// 댓글 생성 함수 수정
export const createLpComment = async ({
  lpid,
  content,
}: {
  lpid: string;
  content: string;
}) => {
  // 변수를 사용하여 'unused variable' 에러를 방지합니다.
  console.log(`ID: ${lpid} 항목에 댓글 생성 시도: ${content}`);

  // 실제 API가 없으므로 가짜 성공 메시지를 반환하거나, 아래처럼 작성합니다.
  return { 
    success: false, 
    message: "현재 API 서버에서 댓글 기능을 지원하지 않습니다." 
  };
};

// 좋아요 함수 수정
export const likeLp = async (lpid: string) => {
  // 변수를 사용하여 에러를 방지합니다.
  console.log(`ID: ${lpid} 항목 좋아요 요청`);

  return { 
    success: false, 
    message: "현재 API 서버에서 좋아요 기능을 지원하지 않습니다." 
  };
};
// src/api/lp.ts 맨 아래에 추가

/**
 * 댓글 삭제 함수
 * @param lpid - 게시글 ID
 * @param commentId - 삭제할 댓글 ID
 */
export const deleteLpComment = async ({
  lpid,
  commentId,
}: {
  lpid: string;
  commentId: number;
}) => {
  // 변수를 사용하여 에러를 방지하고 흐름을 확인합니다.
  console.log(`ID: ${lpid} 게시글의 ${commentId}번 댓글 삭제를 시도합니다.`);

  // Swagger API는 삭제 기능을 지원하지 않으므로 가짜 응답을 반환합니다.
  return { 
    success: false, 
    message: "현재 API 서버에서 댓글 삭제 기능을 지원하지 않습니다." 
  };
};

/**
 * 댓글 수정 함수 (혹시 몰라 함께 추가해 둡니다)
 */
export const updateLpComment = async ({
  lpid,
  commentId,
  content,
}: {
  lpid: string;
  commentId: number;
  content: string;
}) => {
  console.log(`ID: ${lpid} 게시글의 ${commentId}번 댓글 수정 시도: ${content}`);
  return { success: false };
};