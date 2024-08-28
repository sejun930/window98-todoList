import { ITodoList } from "@/commons/types/todo-list";

export interface ITodoListsListProps {
  info: ITodoList;
  uuid: string;
  classNames: string;
  allData: number;
}

export interface IUseTodoListsListProps {
  id: number;
  checked: boolean;
  allData: number;
}
export interface IUseTodoListsListReturn {
  openDeleteConfirm: (info: ITodoList) => () => void;
}
