import DeletedHeader from "@/components/deleted/header";
import DeletedList from "@/components/deleted/list";

import { useFetchTodoList } from "@/server/apis/todo-lists";
import { QueryClient } from "@tanstack/react-query";

import type { ReactNode } from "react";

export default async function DeletedPage(): Promise<ReactNode> {
  const queryClient = new QueryClient();
  const { fetchDeletedTodoList } = useFetchTodoList();

  // 초기 1 페이지의 deleted-todo-list 목록 조회 (1~10 까지의 데이터만 우선 조회)
  await queryClient.prefetchQuery({
    queryKey: ["deleted-todo-lists"],
    queryFn: async () => {
      return await fetchDeletedTodoList({ _page: 1 });
    },
  });

  return (
    <>
      <DeletedHeader />
      <DeletedList initialPageParam={2} />
    </>
  );
}
