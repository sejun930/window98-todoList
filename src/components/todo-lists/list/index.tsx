"use client";

import type { IFetchTodoInfo } from "@/commons/types/todo-list";
import { fetchAllTodoLists } from "@/server/apis";
import { useQuery } from "@tanstack/react-query";

interface ITodoListsListProps {
  infos: IFetchTodoInfo;
}

// Todo-list 리스트 노출 컴포넌트
export default function TodoListsList({ infos }: ITodoListsListProps) {
  const fetchInfiniteTodoList = async () => {
    const result = await fetchAllTodoLists({ _page: 1 });
    return result;
  };

  const { data } = useQuery({
    queryKey: ["todo-list"],
    queryFn: () => fetchInfiniteTodoList(),
    initialData: infos,
  });
  console.log(data);

  return <section></section>;
}
