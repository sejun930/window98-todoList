import { ITodoList } from "@/commons/types/todo-list";

export interface ITodoListsListUpdateProps {
  info: ITodoList;
}

export interface IuseTodoListsListUpdateReturn {
  openUpdateDialog: (info: ITodoList) => () => void;
}
