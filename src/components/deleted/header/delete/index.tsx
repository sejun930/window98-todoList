import Image from "next/image";
import { ButtonPrimaryM } from "@/commons/components/button";
import { TextBody04 } from "@/commons/components/text";
import { useDeletedInfos } from "@/commons/zustand/store";
import { useUtillsDialogAlert } from "@/commons/utills";
import { useServerUtillsTodoListsDelete } from "@/server/utills/todo-lists";

// 리스트 최종 삭제
export default function DeletedHeaderDelete() {
  const { deletedInfos, setDeletedInfos } = useDeletedInfos();
  const { openDialogAlert, closeDialogAlert } = useUtillsDialogAlert();

  // 복원 완료 후 실행될 callback 함수
  const callback = () => {
    // dialog 종료
    closeDialogAlert();
    // 선택 리스트 초기화
    setDeletedInfos({});
  };

  const { deleteTodoListsMutation } = useServerUtillsTodoListsDelete({
    callback,
  });

  // 현재 선택되어 있는 리스트 조회
  const getCheckList = () => {
    const checkIds = Object.entries(deletedInfos)
      .filter(([_, VALUE]) => {
        if (VALUE) return true;
      })
      .map(([KEY]) => KEY);

    return checkIds ?? [];
  };

  // 리스트 최종 삭제
  const updateListsDeleteConfirm = async () => {
    const ids = getCheckList();
    const hasCheckList = !!ids?.length;

    const text = hasCheckList
      ? `${ids.length}개의 리스트를 최종 삭제하시겠습니까?`
      : "1개 이상의 리스트를 선택해주세요.";

    // 최종 삭제 함수
    const event = () => {
      deleteTodoListsMutation.mutate({ ids });
    };

    openDialogAlert({
      headerInfo: { title: "리스트 최종 삭제" },
      dialogAlertInfo: { text, okEvent: (hasCheckList && event) || undefined },
    });
  };

  return (
    <ButtonPrimaryM onClick={updateListsDeleteConfirm}>
      <Image
        src="/icons/recycle-small.png"
        alt="선택 비우기"
        width={0}
        height={0}
      />
      <TextBody04>선택 비우기</TextBody04>
    </ButtonPrimaryM>
  );
}
