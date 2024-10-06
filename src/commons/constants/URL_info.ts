import type { IURLIds } from "../types/url";
import type { URL } from "./URL";

// 경로에 따른 기능 및 정보를 가지는 객체 데이터 반환
export const URL_INFO = (props?: IURLIds): IURL_INFOReturn => {
  const todoListId = props?.todoListId;

  type URL_Type = ReturnType<typeof URL>;
  // 모든 URL 경로의 value (경로값) 추출
  type ValueOf<T> = T[keyof T];

  // 정적 경로 정보
  const INFOS_STATIC: Record<ValueOf<URL_Type>, IURLInfoData> = {
    "/": {},
    "/todo-list": { useWindow: { title: "Todo-List" } },
    "/deleted": { useWindow: { title: "Recycle Bin" } },
  };

  // 동적 경로 경보
  const INFOS_DYNAMIC: Record<string, IURLInfoData> = {
    [`/todo-list/${todoListId}`]: { useWindow: { title: "Todo-List : 상세" } },
    [`/todo-list/${todoListId}/edit`]: {
      useWindow: { title: "Todo-List : 상세 수정" },
    },
  };

  // 모든 경로 정보
  const INFOS = { ...INFOS_STATIC, ...INFOS_DYNAMIC };

  return {
    INFOS,
  };
};

interface IURLInfoData {
  useWindow?: // 윈도우 창 사용 여부
  {
    title: string; // 윈도우 창 제목
  };
}

interface IURL_INFOReturn {
  INFOS: Record<string, IURLInfoData>;
}
