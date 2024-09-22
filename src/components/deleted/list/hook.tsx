import { useServerUtillsTodoListsFetchDeleteTodoLists } from "@/server/utills/todo-lists";

import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import type { IDeletedListReturn } from "./types";

export const useDeletedList = (): IDeletedListReturn => {
  // 삭제된 리스트 데이터 조회
  const { data, isLoading } = useServerUtillsTodoListsFetchDeleteTodoLists();

  // 조회된 총 deleted-list 개수
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];
  // 전체 총 Todo-list 개수
  const allData = data?.pages[0]?.items ?? items?.length;

  return {
    items,
    isLoading,
    allData,
  };
};
