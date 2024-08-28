import { fetchAllTodoLists } from "@/server/apis";
import { useQuery } from "@tanstack/react-query";
import { IUseTodoListsListProps } from "./types";
import type { ITodoList } from "@/commons/types/todo-list";

// 투두 리스트 조회 hook
export const useTodoLists = ({ infos }: IUseTodoListsListProps) => {
  // 리스트 조회용 함수
  const fetchInfiniteTodoList = async () => {
    const result = await fetchAllTodoLists({ _page: 1 });
    return result;
  };

  const { data } = useQuery({
    queryKey: ["todo-lists"],
    queryFn: () => fetchInfiniteTodoList(),
    initialData: infos,
  });
  // 전체 Todo-list
  const items: ITodoList[] = data?.data ?? [];

  return {
    items,
    // toggleChecked,
  };
};
