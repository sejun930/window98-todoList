import { fetchAllTodoLists } from "@/server/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import TodolistsWrite from "./write";
import WithForm from "@/commons/hocs/form";
import { zodSchemaTodoListsWrite } from "./write/types";
import { useUtillDialog } from "@/commons/utills/dialog";

// 투두 리스트 조회 hook
export const useTodoLists = () => {
  // dialog 실행 제어
  const { openDialog, closeDialog } = useUtillDialog();

  // 리스트 조회용 함수
  const fetchInfiniteTodoList = async (_page: number) => {
    const result = await fetchAllTodoLists({ _page });
    return result;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["todo-lists"],
    queryFn: ({ pageParam }) => fetchInfiniteTodoList(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지인지 검증
      const isLast = !lastPage?.next ?? false;
      if (isLast) return undefined;

      return allPages?.length + 1;
    },
    initialPageParam: 1,
  });

  // 다음 페이지의 데이터 호출
  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  // 전체 Todo-list
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];

  // 등록 & 수정 Dialog open
  const openWriteDialog = () => {
    openDialog({
      headerInfo: { title: "리스트 등록", action: closeDialog },
      children: (
        <WithForm zodSchema={zodSchemaTodoListsWrite}>
          <TodolistsWrite />
        </WithForm>
      ),
    });
  };

  return {
    items,
    fetchMore,
    hasNextPage,
    openWriteDialog,
  };
};
