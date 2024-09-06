import type { ITodoList } from "@/commons/types/todo-list";
import { useFetchTodoList } from "@/server/apis/todo-lists";
import { useQuery } from "@tanstack/react-query";

// 리스트 상세 조회
export const useServerUtillsTodoListsFetchTodoListDetail = ({
  id,
  initData,
}: IUseServerUtillsTodoListsFetchTodoListDetailProps): IUseServerUtillsTodoListsFetchTodoListDetailReturn => {
  const { fetchTodoList } = useFetchTodoList();

  // 상세 데이터 조회
  const { data, isLoading } = useQuery({
    queryKey: ["todo-list", { id }],
    queryFn: async () => {
      return await fetchTodoList({ id });
    },
    initialData: initData,
  });

  const info: ITodoList = data;

  return {
    info,
    isLoading,
  };
};

interface IUseServerUtillsTodoListsFetchTodoListDetailProps {
  id: string;
  initData: ITodoList;
}

interface IUseServerUtillsTodoListsFetchTodoListDetailReturn {
  info: ITodoList;
  isLoading: boolean;
}
