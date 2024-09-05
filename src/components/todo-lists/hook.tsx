import WithForm from "@/commons/hocs/form";
import { useUtillDialog } from "@/commons/utills/dialog";
import CommonsTodoListsWrite from "../commons/todo-lists/write";
import { zodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { useServerUtillsTodoListsFetchTodoLists } from "@/server/utills/todo-lists/fetch";

import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import type { IUseTodoListsListReturn } from "./types";

// 투두 리스트 조회 hook
export const useTodoLists = (): IUseTodoListsListReturn => {
  // dialog 실행 제어
  const { openDialog, closeDialog } = useUtillDialog();

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useServerUtillsTodoListsFetchTodoLists();

  // 다음 페이지의 데이터 호출
  const fetchMore = (): void => {
    if (!hasNextPage) return;
    void fetchNextPage();
  };

  // 전체 Todo-list
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];

  // 등록 & 수정 Dialog open
  const openWriteDialog = (): void => {
    openDialog({
      headerInfo: { title: "리스트 등록", action: closeDialog },
      children: (
        <WithForm zodSchema={zodSchemaTodoListsWrite}>
          <CommonsTodoListsWrite />
        </WithForm>
      ),
    });
  };

  return {
    items,
    fetchMore,
    hasNextPage,
    openWriteDialog,
    isLoading,
  };
};
