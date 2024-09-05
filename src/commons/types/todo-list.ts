// Todo-list에 관련된 공통 타입
export interface ITodoList {
  id: string; // 고유 아이디 값
  title: string; // 제목
  contents: string; // 내용
  checked: boolean; // 체크 여부
  createdAt: string; // 작성된 날짜
  createdAtTime: number; // 작성된 날짜 Time
}

// fetch로 받아온 todo-list 결과
export interface IFetchTodoInfo {
  first: number;
  prev?: number;
  next?: number;
  last: number;
  pages: number;
  items: number;
  data: ITodoList[];
}

// fetch로 받아온 todo-list 결과
export interface IFetchTodoInfiniteQueryInfo {
  pages: IFetchTodoInfo[];
  pageParams: number[];
}
