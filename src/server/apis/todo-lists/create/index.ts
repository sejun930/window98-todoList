import axios from "axios";
import type {
  ICreateTodoList,
  ICreateTodolistProps,
  ICreateTodolistReturn,
  IUseCreateTodolistReturn,
} from "./types";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";
import { ITodoListStatus } from "@/commons/types/todo-list";
import { useUtillsDate } from "@/commons/utills";

// 리스트 등록 관련 Hooks
export const useCreateTodolist = (): IUseCreateTodolistReturn => {
  const { getNow } = useUtillsDate();

  // 리스트 등록
  const createTodolist = async ({
    data,
  }: ICreateTodolistProps): Promise<ICreateTodolistReturn> => {
    const now = getNow();

    try {
      const _data: ICreateTodoList = {
        ...data,
        checked: false, // 체크 여부
        createdAt: now.date, // 생성일
        createdAtTime: now.dateTime, // 생성일 날짜 데이터
        deletedAt: "", // 삭제일
        deletedAtTime: 0, // 삭제일 날짜 데이터
        status: ITodoListStatus.active, // 리스트 상태 (활성, 삭제 여부)
      };

      const result = await axios.post(`http://localhost:5010/todoLists`, _data);
      return result.data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return INIT_TODO_LIST;
  };

  return {
    createTodolist,
  };
};
