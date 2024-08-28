import { ITodoList } from "@/commons/types/todo-list";

export interface ITodoListsListProps {
  info: ITodoList;
  uuid: string;
  classNames: string;
}

export interface IUseTodoListsListProps {
  id: number;
  checked: boolean;
}
export interface IUseTodoListsListReturn {
  toggleChecked: () => void;
}
