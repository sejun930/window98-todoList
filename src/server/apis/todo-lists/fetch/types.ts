import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";

export interface IUseFetchTodoListReturn {
  fetchAllTodoLists: (
    props: IFetchAllTodoListsProps,
  ) => Promise<IFetchTodoInfo>;
  fetchTodoList: (props: IFetchTodoListProps) => Promise<ITodoList>;
}

// 전체 리스트 조회 props
export interface IFetchAllTodoListsProps {
  _page: number;
}

// 상세 리스트 조회 props
export interface IFetchTodoListProps {
  id: string;
}
