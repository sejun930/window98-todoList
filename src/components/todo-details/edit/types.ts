import type { DehydratedState } from "@tanstack/react-query";

export interface ITodoDetailsEditProps {
  dehydratedState: DehydratedState;
  id: string;
  isEmpty: boolean;
}
