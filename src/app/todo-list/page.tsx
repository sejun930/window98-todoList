import { IFetchTodoInfo } from "@/commons/types/todo-list";
import TodoLists from "@/components/todo-lists";
import { fetchAllTodoLists } from "@/server/apis";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export default async function TodoListPage() {
  const queryClient = new QueryClient();

  // 초기 1 페이지의 todo-list 목록 조회 (1~10 까지의 데이터만 우선 조회)
  await queryClient.prefetchQuery({
    queryKey: ["todo-lists"],
    queryFn: () => fetchAllTodoLists({ _page: 1 }),
  });

  // 데이터와 함께 렌더링
  const dehydratedState = dehydrate(queryClient);
  // 서버 사이드에서 가져온 데이터 추출
  const infos = dehydratedState?.queries?.[0]?.state?.data ?? {};

  console.log(infos);

  return (
    <div>
      <TodoLists infos={infos as IFetchTodoInfo} />
    </div>
  );
}
