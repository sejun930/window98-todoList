import type { IFetchTodoInfo, ITodoList } from "@/commons/types/todo-list";

export interface ITodoListsListProps {
  infos: IFetchTodoInfo;
}

export interface IUseTodoListsListProps {
  infos: IFetchTodoInfo;
}
export interface IUseTodoListsListReturn {
  items: ITodoList[];
  fetchMore: () => void;
  hasNextPage: boolean;
  openWriteDialog: () => void;
}
