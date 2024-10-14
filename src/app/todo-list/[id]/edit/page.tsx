import TodoDetailsEdit from "@/components/todo-details/edit";
import { useFetchTodoList } from "@/server/apis/todo-lists/fetch";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import type { ReactNode } from "react";
import type { ITodoList } from "@/commons/types/todo-list";

interface IParamsProps {
  params: { id: string };
}
interface IGenerateMetadataReturn {
  title: string;
  description: string;
}

// 상세 정보 수정 SEO 처리를 위한 함수
export async function generateMetadata({
  params,
}: IParamsProps): Promise<IGenerateMetadataReturn> {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { fetchTodoList } = useFetchTodoList();
  const id = params?.id ?? "";
  const data = await fetchTodoList({ id });

  return {
    title: `${data?.title} 수정` ?? "Not Found Title",
    description: data?.contents ?? "Not Found Contents",
  };
}

// 리스트 상세 수정 페이지
export default async function TodoListDetailEditPage(
  props: IParamsProps,
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

  // 데이터가 조회되지 않으면 에러 페이지 노출
  if (isEmpty) return notFound();
  return (
    <TodoDetailsEdit
      dehydratedState={dehydratedState}
      id={id}
      initData={data}
    />
  );
}
