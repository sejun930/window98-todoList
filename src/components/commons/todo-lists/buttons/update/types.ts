import type { ITodoList } from "@/commons/types/todo-list";

type ICommonTodoListsButtonsUpdateType = "dialog" | "edit";

export interface ICommonTodoListsButtonsUpdateProps {
  info: ITodoList;
  type: ICommonTodoListsButtonsUpdateType;
}

export interface IuseCommonTodoListsButtonsUpdateReturn {
  openUpdateDialog: (info: ITodoList) => () => void;
}
