import type { ITodoList } from "@/commons/types/todo-list";

export interface IUpdateTodolistCheckedProps {
  id: string;
  checked: boolean;
}
export type IUpdateTodolistCheckedReturn = ITodoList;

export interface IUpdateTodolistProps {
  id: string;
  data: Pick<ITodoList, "title" | "contents">;
}
export type IUpdateTodolistReturn = ITodoList;
