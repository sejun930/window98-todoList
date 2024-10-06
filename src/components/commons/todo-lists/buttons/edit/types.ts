import type { ITodoList } from "@/commons/types/todo-list";

type ICommonTodoListsButtonsEditType = "dialog" | "edit";

export interface ICommonTodoListsButtonsEditProps {
  info: ITodoList;
  type: ICommonTodoListsButtonsEditType;
}

export interface IuseCommonTodoListsButtonsEditReturn {
  openEditDialog: (info: ITodoList) => () => void;
}
