import { MutableRefObject } from "react";

export interface IInfiniteScrollProps {
  children: React.ReactNode;
  fetchMore: () => void;
  disable?: boolean;
  isFetching?: boolean;
  targetRef?: MutableRefObject<HTMLUListElement>;
}
