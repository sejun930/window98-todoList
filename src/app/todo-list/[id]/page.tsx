import { useFetchTodoList } from "@/server/apis/todo-lists/fetch";
import TodoDetailView from "@/components/todo-details/view";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ITodoListStatus, type ITodoList } from "@/commons/types/todo-list";

interface ITodoListDetailPageProps {
  params: { id: string };
}

// 리스트 상세 페이지
export default async function TodoListDetailPage(
  props: ITodoListDetailPageProps,
): Promise<ReactNode> {
  const { fetchTodoList } = useFetchTodoList();
  const queryClient = new QueryClient();

  // 리스트의 id 값 조회
  const id = String(props.params?.id);

  // 해당 리스트의 상세 정보 조회
  await queryClient.prefetchQuery({
    queryKey: ["todo-list", { id }],
    queryFn: async () => {
      return await fetchTodoList({ id });
    },
  });

  // 데이터 직렬화
  const dehydratedState = dehydrate(queryClient);
  const data = dehydratedState.queries[0]?.state.data as ITodoList;

  // 없는 데이터인 경우
  const isEmpty = !data;
  // 삭제된 데이터인 경우
  const isDeleted =
    !!data?.deletedAt ||
    !!data?.deletedAtTime ||
    data?.status === ITodoListStatus.deleted;

  return (
    <TodoDetailView
      dehydratedState={dehydratedState}
      id={id}
      isDisable={isEmpty || isDeleted}
    />
  );
}
