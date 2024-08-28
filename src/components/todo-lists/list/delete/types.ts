import { ITodoList } from "@/commons/types/todo-list";

export interface ITodoListsListDeleteProps {
  info: ITodoList;
}

export interface IUseTodoListsListDeleteProps {
  info: ITodoList;
}
export interface IUseTodoListsListDeleteReturn {
  openDeleteConfirm: (info: ITodoList) => () => void;
}
