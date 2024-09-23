import type { ITodoList } from "@/commons/types/todo-list";
import type { DehydratedState } from "@tanstack/react-query";

export interface ITodoDetailsEditProps {
  dehydratedState: DehydratedState;
  id: string;
  initData: ITodoList;
}

export type ITodoDetailsProps = Omit<ITodoDetailsEditProps, "dehydratedState">;
