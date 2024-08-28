import { fetchAllTodoLists } from "@/server/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IUseTodoListsListProps } from "./types";
import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";
import { useState } from "react";

// 투두 리스트 조회 hook
export const useTodoLists = ({ infos }: IUseTodoListsListProps) => {
  // 등록, 수정, 삭제 모달 오픈 여부
  const [openDialog, setOpenDialog] = useState(false);

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
    initialData: {
      pages: [infos],
      pageParams: [1],
    },
  });

  // 다음 페이지의 데이터 호출
  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  // 전체 Todo-list
  const items: ITodoList[] =
    data?.pages?.flatMap((el: IFetchTodoInfo) => el.data) ?? [];

  // 모달창 Toggle
  const toggleDialog = (bool: boolean) => () => {
    setOpenDialog(bool);
  };

  return {
    items,
    fetchMore,
    hasNextPage,
    openDialog,
    toggleDialog,
  };
};
