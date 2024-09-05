import type { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import type { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsTodoListsCreateReturn {
  createTodoListMutation: UseMutationResult<
    unknown,
    Error,
    IZodSchemaTodoListsWrite,
    unknown
  >;
}
