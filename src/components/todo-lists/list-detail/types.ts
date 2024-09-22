import type { ITodoList } from "@/commons/types/todo-list";

export interface ITodoListsListProps {
  info: ITodoList;
  uuid: string;
  allData: number;
  isLoading: boolean;
  isLast: boolean;
}

export interface IUseTodoListsListProps {
  id: number;
  checked: boolean;
  allData: number;
}
export interface IUseTodoListsListReturn {
  openDeleteConfirm: (info: ITodoList) => () => void;
}
