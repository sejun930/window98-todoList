import WithForm from "@/commons/hocs/form";
import { useUtillsDialog } from "@/commons/utills/dialog";
import CommonsTodoListsWrite from "../commons/todo-lists/write";
import { zodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { useServerUtillsTodoListsFetchTodoLists } from "@/server/utills/todo-lists/fetch";

import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import type { IUseTodoListsListReturn, IUseTodoListsListProps } from "./types";

// 투두 리스트 조회 hook
export const useTodoLists = (
  props: IUseTodoListsListProps,
): IUseTodoListsListReturn => {
  // dialog 실행 제어
  const { openDialog, closeDialog } = useUtillsDialog();

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useServerUtillsTodoListsFetchTodoLists({ ...props });

  // 다음 페이지의 데이터 호출
  const fetchMore = (): void => {
    if (!hasNextPage) return;
    void fetchNextPage();
  };

  // 조회된 총 Todo-list 개수
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];
  // 전체 총 Todo-list 개수
  const allData = data?.pages[0]?.items ?? items?.length;

  // 등록 & 수정 Dialog open
  const openWriteDialog = (): void => {
    openDialog({
      headerInfo: { title: "Add to List", action: closeDialog },
      children: (
        <WithForm zodSchema={zodSchemaTodoListsWrite}>
          <CommonsTodoListsWrite />
        </WithForm>
      ),
    });
  };

  // 데이터 존재 여부 반환
  const hasItems = allData > 0 ?? false;

  return {
    items,
    fetchMore,
    hasNextPage,
    openWriteDialog,
    isLoading,
    allData,
    hasItems,
  };
};
