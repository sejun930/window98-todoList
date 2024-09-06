import type { DehydratedState } from "@tanstack/react-query";

export interface ITodoDetailProps {
  dehydratedState: DehydratedState;
  id: string;
  isDisable: boolean;
}
export type ITodoDetailViewProps = ITodoDetailProps;
