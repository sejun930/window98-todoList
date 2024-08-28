import { ITodoList } from "@/commons/types/todo-list";
import { useUtillDialogAlert } from "@/commons/utills/dialog-alert";
import { TextBody02 } from "@/commons/components/text";

export const useTodoListsList = () => {
  const { openDialogAlert } = useUtillDialogAlert();

  // 삭제 확인용 dialog 오픈
  const openDeleteConfirm = (info: ITodoList) => () => {
    openDialogAlert({
      headerInfo: { title: "리스트 삭제" },
      dialogAlertInfo: {
        text: (
          <TextBody02>
            <b>{String(info.title)}</b>를 삭제하시겠습니까?
          </TextBody02>
        ),
        okEvent: () => {},
      },
    });
  };

  return {
    openDeleteConfirm,
  };
};
