import TodoDetailsEdit from "@/components/todo-details/edit";
import { fetchTodoList } from "@/server/apis/fetch";
import { dehydrate, QueryClient } from "@tanstack/react-query";

interface ITodoListDetailEditPageProps {
  params: { id: string };
}

// 리스트 상세 수정 페이지
export default async function TodoListDetailEditPage(
  props: ITodoListDetailEditPageProps,
) {
  const queryClient = new QueryClient();

  // 리스트의 id 값 조회
  const id = String(props.params?.id);

  // 해당 리스트의 상세 정보 조회
  await queryClient.prefetchQuery({
    queryKey: ["todo-list", { id }],
    queryFn: () => fetchTodoList({ id }),
  });

  // 데이터 직렬화
  const dehydratedState = dehydrate(queryClient);
  // 없는 데이터인 경우
  const isEmpty = !dehydratedState.queries[0]?.state.data;

  if (isEmpty) return <div>존재하지 않는 페이지입니다.</div>;

  return <TodoDetailsEdit dehydratedState={dehydratedState} id={id} />;
}
