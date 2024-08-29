import { DehydratedState } from "@tanstack/react-query";

export interface ITodoDetailProps {
  dehydratedState: DehydratedState;
  id: string;
  isEmpty: boolean;
}
export type ITodoDetailViewProps = ITodoDetailProps;
