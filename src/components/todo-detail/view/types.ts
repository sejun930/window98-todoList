import { DehydratedState } from "@tanstack/react-query";

export interface ITodoDetailProps {
  dehydratedState: DehydratedState;
  id: string;
}
export type ITodoDetailViewProps = ITodoDetailProps;
