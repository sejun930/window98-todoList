import { IuseTodoListsListUpdateReturn } from "./types";

export const useTodoListsListUpdate = (): IuseTodoListsListUpdateReturn => {
  // 수정용 dialog 창 띄우기
  const openUpdateDialog = () => {
    console.log(12312);
  };

  return {
    openUpdateDialog,
  };
};
