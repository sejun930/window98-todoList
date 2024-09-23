import type { ITodoList } from "@/commons/types/todo-list";
import type { DehydratedState } from "@tanstack/react-query";

export interface ITodoDetailViewProps {
  dehydratedState: DehydratedState;
  id: string;
  initData: ITodoList;
}

export type ITodoDetailProps = Omit<ITodoDetailViewProps, "dehydratedState">;
