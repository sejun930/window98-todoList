import { useServerUtillsTodoListsFetchDeleteTodoLists } from "@/server/utills/todo-lists";

import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import type { IUseDeletedListProps, IUseDeletedListReturn } from "./types";
import { useDeletedInfos } from "@/commons/zustand/store";

export const useDeletedList = ({
  initialPageParam,
}: IUseDeletedListProps): IUseDeletedListReturn => {
  // 삭제된 리스트 데이터 조회
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useServerUtillsTodoListsFetchDeleteTodoLists();
  const { deletedInfos, setDeletedInfos } = useDeletedInfos();

  // 조회된 총 Todo-list 개수
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];

  // 전체 총 Todo-list 개수
  const allData = data?.pages[0]?.items ?? items?.length ?? 0;

  // 데이터 존재 여부 반환
  const hasItems = allData > 0 ?? false;

  // 다음 데이터 조회
  const fetchMore = (): void => {
    if (!hasNextPage) return;
    void fetchNextPage();
  };

  // 각 리스트의 선택 Toggle
  const toggleCheck = (id: string) => () => {
    if (isLoading) return;

    // 선택된 리스트의 선택 여부 반환
    const isSelected = deletedInfos[id];
    // 현재 선택 리스트의 복사본
    const _deletedInfos = { ...deletedInfos };

    _deletedInfos[id] = !isSelected;

    setDeletedInfos(_deletedInfos);
  };

  return {
    items,
    isLoading,
    hasItems,
    fetchMore,
    toggleCheck,
  };
};
