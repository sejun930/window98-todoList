import type { UseMutationResult } from "@tanstack/react-query";

export interface IUseServerUtillsTodoListsDeleteReturn {
  deleteTodoListsMutation: UseMutationResult<
    unknown,
    Error,
    { ids: string[] },
    unknown
  >;
}
