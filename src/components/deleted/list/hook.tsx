import { useServerUtillsTodoListsFetchDeleteTodoLists } from "@/server/utills/todo-lists";

import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import type { IUseDeletedListReturn } from "./types";

export const useDeletedList = (): IUseDeletedListReturn => {
  // 삭제된 리스트 데이터 조회
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useServerUtillsTodoListsFetchDeleteTodoLists();
  // 조회된 총 Todo-list 개수
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];

  // 전체 총 Todo-list 개수
  const allData = data?.pages[0]?.items ?? items?.length ?? 0;

  // 데이터 존재 여부 반환
  const hasItems = allData > 0 ?? false;

  // 다음 데이터 조회
  const fetchMore = () => {
    if (!hasNextPage) return;
    void fetchNextPage();
  };

  return {
    items,
    isLoading,
    hasItems,
    fetchMore,
  };
};
