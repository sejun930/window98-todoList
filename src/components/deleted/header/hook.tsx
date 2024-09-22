import {
  useServerUtillsTodoListsFetchDeleteTodoLists,
  useServerUtillsTodoListsUpdate,
} from "@/server/utills/todo-lists";
import { useDeletedInfos } from "@/commons/zustand/store";

import type { IDeletedListReturn, IToggleAllCheckProps } from "./types";
import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import { useUtillsDialogAlert } from "@/commons/utills";

export const useDeletedHeader = (): IDeletedListReturn => {
  const { deletedInfos, setDeletedInfos } = useDeletedInfos();

  // 삭제된 리스트 데이터 조회
  const { data, isLoading } = useServerUtillsTodoListsFetchDeleteTodoLists();
  // 조회된 총 Todo-list 개수
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];

  // 전체 총 Todo-list 개수
  const allData = data?.pages[0]?.items ?? items?.length ?? 0;

  // 모든 리스트가 선택되어 있는지 체크
  const isAllCheck =
    (!isLoading &&
      items?.every((el) => {
        // 해당 리스트가 선택되어 있지 않다면 = 전체 false
        if (!deletedInfos[el?.id]) return false;
        // 모든 리스트가 선택되어 있다면 = 전체 true
        return true;
      })) ??
    false;

  // 전체 리스트 선택 toggle
  const toggleAllCheck = (props?: IToggleAllCheckProps): void => {
    const reset = props?.reset ?? false;
    let _deletedInfos = { ...deletedInfos };

    // 현재 전체 리스트 체크 여부에 따라 전체 선택 및 해제 변환
    items.forEach((el) => (_deletedInfos[el?.id] = !reset && !isAllCheck));

    setDeletedInfos(_deletedInfos);
  };

  return {
    isLoading,
    allData,
    toggleAllCheck,
    isAllCheck,
  };
};
