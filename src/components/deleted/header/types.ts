export interface IToggleAllCheckProps {
  reset?: boolean;
}

export interface IDeletedListReturn {
  isLoading: boolean;
  allData: number;
  toggleAllCheck: (props?: IToggleAllCheckProps) => void;
  isAllCheck: boolean;
  updateNoneDeletedAt: () => Promise<void>;
}
