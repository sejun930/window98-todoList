import type { ITodoList } from "@/commons/types/todo-list";

export interface ICommonTodoListsButtonsDeleteProps {
  info: ITodoList;
}

export interface IUseCommonTodoListsButtonsDeleteProps {
  info: ITodoList;
}
export interface IUseCommonTodoListsButtonsDeleteReturn {
  openDeleteConfirm: (info: ITodoList) => () => void;
}
