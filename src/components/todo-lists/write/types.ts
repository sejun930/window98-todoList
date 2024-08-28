import { ITodoList } from "@/commons/types/todo-list";
import { ZodSchema, z } from "zod";

export type IZodSchemaTodoListsWrite = Pick<ITodoList, "title" | "contents">;

export interface ITodolistsWriteProps {
  isEdit?: boolean; // 수정 모드 여부
  info?: ITodoList;
}

// 등록 & 수정에 필요한 정보 검증
export const zodSchemaTodoListsWrite: ZodSchema<IZodSchemaTodoListsWrite> =
  z.object({
    // 제목 : 문자열이면서, 비어있지 않아야 함
    title: z.string().trim().min(1),
    // 내용 : 문자열이면서, 비어있지 않아야 함
    contents: z.string().trim().min(1),
  });
