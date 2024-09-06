import type { URL } from "../constants/URL";

// URL의 KEY 값만 추출
export type IURLKey = keyof ReturnType<typeof URL>;

// 동적 이동에 필요한 아이디 값들
export interface IURLIds {
  todoListId?: string;
}
