import { ITodoList } from "@/commons/types/todo-list";
import { UseMutationResult } from "@tanstack/react-query";
import { IZodSchemaTodoListsWrite } from "../types";

export interface IUseTodolistsWriteUpdateProps {
  info: ITodoList;
}
export interface IUseTodolistsWriteUpdateReturn {
  updateTodoListMutation: UseMutationResult<
    any,
    Error,
    IZodSchemaTodoListsWrite,
    unknown
  >;
}
