import { IZodSchemaTodoListsWrite } from "@/components/todo-lists/write/types";
import { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsCraeteReturn {
  createTodoListMutation: UseMutationResult<
    any,
    Error,
    IZodSchemaTodoListsWrite,
    unknown
  >;
}
