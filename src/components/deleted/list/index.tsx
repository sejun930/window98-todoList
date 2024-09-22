"use client";

import { useServerUtillsTodoListsFetchDeleteTodoLists } from "@/server/utills/todo-lists";
import type { ReactNode } from "react";

// 삭제 리스트 노출 컴포넌트
export default function DeletedList(): ReactNode {
  // 삭제된 리스트 데이터 조회
  //   const { data } = useServerUtillsTodoListsFetchDeleteTodoLists();

  return <section>리스트</section>;
}
