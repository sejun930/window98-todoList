import { ITodoList } from "@/commons/types/todo-list";

export interface ICommonsTodoListsWriteProps {
  isEdit?: boolean; // 수정 모드 여부
  info?: ITodoList;
  useBackEvent?: () => void; // 취소 버튼 노출 및 이벤트 실행
  afterMovePath?: string; // 이벤트 실행 후 이동할 경로
}
