import axios from "axios";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

import type {
  IUpdateTodolistCheckedProps,
  IUpdateTodolistDeletedAtProps,
  IupdateTodoListsNoneDeletedAtProps,
  IUpdateTodolistProps,
  IUseUpdateTodoListReturn,
} from "./types";
import { ITodoListStatus, type ITodoList } from "@/commons/types/todo-list";
import { useUtillsDate } from "@/commons/utills";

// 리스트 수정 관련 hooks
export const useUpdateTodoList = (): IUseUpdateTodoListReturn => {
  const { getNow } = useUtillsDate();

  // 리스트 체크 정보 변경
  const updateTodolistChecked = async ({
    id,
    checked,
  }: IUpdateTodolistCheckedProps): Promise<ITodoList> => {
    try {
      const result = await axios.patch(
        `http://localhost:5010/todoLists/${id}`,
        {
          checked: !checked,
        },
      );
      return result.data;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }

    return INIT_TODO_LIST;
  };

  // 리스트 수정
  const updateTodolist = async ({
    id,
    data,
  }: IUpdateTodolistProps): Promise<ITodoList> => {
    const now = getNow();

    try {
      const result = await axios.patch(
        `http://localhost:5010/todoLists/${id}`,
        { ...data, updatedAt: now.date, updatedAtTime: now.dateTime },
      );
      return result.data;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
    return INIT_TODO_LIST;
  };

  // 리스트 삭제 정보 수정
  const updateTodolistDeletedAt = async ({
    id,
  }: IUpdateTodolistDeletedAtProps): Promise<ITodoList> => {
    const now = getNow();

    try {
      const result = await axios.patch(
        `http://localhost:5010/todoLists/${id}`,
        {
          deletedAt: now.date,
          deletedAtTime: now.dateTime,
          status: ITodoListStatus.deleted,
        },
      );
      return result.data;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }

    return INIT_TODO_LIST;
  };

  // 삭제된 리스트 복원하기
  const updateTodoListsNoneDeletedAt = async ({
    id,
  }: IupdateTodoListsNoneDeletedAtProps) => {
    try {
      const result = await axios.patch(
        `http://localhost:5010/todoLists/${id}`,
        {
          deletedAt: "", // 삭제일 초기화
          deletedAtTime: 0, // 삭제일자 초기화
          status: ITodoListStatus.active, // 상태 초기로 복원
        },
      );
      return result.data;
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }

    return INIT_TODO_LIST;
  };

  return {
    updateTodolistChecked,
    updateTodolist,
    updateTodolistDeletedAt,
    updateTodoListsNoneDeletedAt,
  };
};
