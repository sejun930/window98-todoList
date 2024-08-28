import { ITodoList } from "@/commons/types/todo-list";
import { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsDeleteReturn {
  deleteTodolistMutation: UseMutationResult<ITodoList, Error, string, unknown>;
}
