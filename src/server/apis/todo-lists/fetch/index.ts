import {
  ITodoListStatus,
  type IFetchTodoInfo,
  type ITodoList,
} from "@/commons/types/todo-list";
import axios from "axios";

import type {
  IFetchAllTodoListsProps,
  IFetchDeletedTodoListProps,
  IFetchTodoListProps,
  IUseFetchTodoListReturn,
} from "./types";

// 리스트 조회 관련 hooks
export const useFetchTodoList = (): IUseFetchTodoListReturn => {
  // 전체 목록 조회
  const fetchAllTodoLists = async ({
    _page,
  }: IFetchAllTodoListsProps): Promise<IFetchTodoInfo> => {
    const data = await axios.get(`http://localhost:5010/todoLists`, {
      params: {
        _sort: "-createdAtTime",
        _page,
        deletedAt: "",
        deletedAtTime: 0, // 삭제되지 않았으며
        status: ITodoListStatus.active, // 활성화 되어 있는 경우
      },
    });

    return data.data;
  };

  // 리스트 상세 조회
  const fetchTodoList = async ({
    id,
  }: IFetchTodoListProps): Promise<ITodoList> => {
    const data = await axios.get(`http://localhost:5010/todoLists/${id}`, {
      params: {
        deletedAt: "",
        deletedAtTime: 0, // 삭제되지 않았으며
        status: ITodoListStatus.active, // 활성화 되어 있는 경우
      },
    });

    return data.data;
  };

  // 삭제된 리스트 목록 조회
  const fetchDeletedTodoList = async ({
    _page,
  }: IFetchDeletedTodoListProps) => {
    const data = await axios.get(`http://localhost:5010/todoLists`, {
      params: {
        _sort: "-deletedAtTime",
        _page,
        deletedAt_ne: "",
        deletedAtTime_ne: 0, // 삭제 정보가 있는 경우
        status: ITodoListStatus.deleted, // 삭제된 리스트인 경우
      },
    });

    return data.data;
  };

  return {
    fetchAllTodoLists,
    fetchTodoList,
    fetchDeletedTodoList,
  };
};
