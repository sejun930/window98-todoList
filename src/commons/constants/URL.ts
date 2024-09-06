import type { IURLIds } from "../types/url";

// 주소 별 경로 정리
export const URL = (props?: IURLIds): Record<string, string> => {
  const todoListId = props?.todoListId ?? "undefined";

  return {
    HOME: `/` as const, // 홈

    TODOLIST: `/todo-list` as const, // 리스트 홈
    TODOLIST_DETAIL: `/todo-list/${todoListId}` as const, // 리스트 상세
    TODOLIST_DETAIL_EDIT: `/todo-list/${todoListId}/edit` as const, // 리스트 상세 수정

    DELETED: `/deleted` as const, // 삭제 리스트 홈
  };
};
