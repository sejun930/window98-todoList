import { Button } from "@/commons/components/button";
import { TextBody04 } from "@/commons/components/text";

import { useUtillsDialogAlert } from "@/commons/utills";
import { useDeletedInfos } from "@/commons/zustand/store";
import { useServerUtillsTodoListsUpdate } from "@/server/utills/todo-lists";
import type { ReactNode } from "react";

// 삭제 리스트 복원
export const DeletedHeaderRestoreDeletedAt = (): ReactNode => {
  const { deletedInfos, setDeletedInfos } = useDeletedInfos();
  const { openDialogAlert, closeDialogAlert } = useUtillsDialogAlert();

  // 복원 완료 후 실행될 callback 함수
  const callback = (): void => {
    // dialog 종료
    closeDialogAlert();
    // 선택 리스트 초기화
    setDeletedInfos({});
  };

  const { updateTodoListsRestoreDeletedAtMutation } =
    useServerUtillsTodoListsUpdate({
      callback,
    });

  // 현재 선택되어 있는 리스트 조회
  const getCheckList = (): string[] => {
    const checkIds = Object.entries(deletedInfos)
      .filter(([_, VALUE]) => VALUE)
      .map(([KEY]) => KEY);

    return checkIds ?? [];
  };

  // 삭제된 리스트들 모두 복원
  const updateListsRestoreDeletedAt = (): void => {
    const ids = getCheckList();
    const hasCheckList = !!ids?.length;

    const text = hasCheckList
      ? `${ids.length}개의 삭제 리스트를 복원하시겠습니까?`
      : "1개 이상의 리스트를 선택해주세요.";

    // 복원 함수
    const event = (): void => {
      updateTodoListsRestoreDeletedAtMutation.mutate({ ids });
    };

    openDialogAlert({
      headerInfo: { title: "삭제 리스트 복원" },
      dialogAlertInfo: { text, okEvent: (hasCheckList && event) || undefined },
    });
  };

  return (
    <Button onClick={updateListsRestoreDeletedAt} theme="primary" size="m">
      <TextBody04>선택 복원</TextBody04>
    </Button>
  );
};
