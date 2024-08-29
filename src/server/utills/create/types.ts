import { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsCraeteReturn {
  createTodoListMutation: UseMutationResult<
    unknown,
    Error,
    IZodSchemaTodoListsWrite,
    unknown
  >;
}
