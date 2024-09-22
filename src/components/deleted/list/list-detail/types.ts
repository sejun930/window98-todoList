import type { ITodoList } from "@/commons/types/todo-list";

export interface IDeletedListListDetailProps {
  info: ITodoList;
  uuid: string;
  isLast: boolean;
  isLoading: boolean;
  isChecked: boolean;
  toggleCheck: () => void;
}
