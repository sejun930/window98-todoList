import type { ITodoList } from "@/commons/types/todo-list";

export interface IUseCreateTodolistReturn {
  createTodolist: (props: ICreateTodolistProps) => Promise<ITodoList>;
}

export interface ICreateTodolistProps {
  data: Pick<ITodoList, "title" | "contents">;
}
export type ICreateTodolistReturn = ITodoList;

export type ICreateTodoList = Omit<ITodoList, "id">;
