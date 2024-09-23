"use client";

import { HydrationBoundary } from "@tanstack/react-query";
import { type ReactNode, useEffect } from "react";
import { useUtillsDialog } from "@/commons/utills/dialog";
import TodoDetailViewDetail from "./detail";
import { useServerUtillsTodoListsFetchTodoListDetail } from "@/server/utills/todo-lists/fetch";

import type { ITodoList } from "@/commons/types/todo-list";
import type { ITodoDetailViewProps, ITodoDetailProps } from "./types";
import { URL } from "@/commons/constants/URL";
import Notice from "@/components/commons/notice";

// 리스트 상세 조회 페이지
export default function TodoDetailView({
  dehydratedState,
  id,
  initData,
}: ITodoDetailViewProps): ReactNode {
  return (
    <HydrationBoundary state={dehydratedState}>
      <TodoDetail id={id} initData={initData} />
    </HydrationBoundary>
  );
}

const TodoDetail = ({ id, initData }: ITodoDetailProps): ReactNode => {
  const { openDialog } = useUtillsDialog();

  // 리스트 상세 조회
  const { info, isLoading } = useServerUtillsTodoListsFetchTodoListDetail({
    id,
    initData,
  });

  useEffect(() => {
    openDialog({
      children: <TodoDetailViewDetail isLoading={isLoading} info={info} />,
      headerInfo: { title: info?.title, action: { href: URL().TODOLIST } },
    });
  }, [info]);

  return <Notice isShow text="리스트 상세 내용 조회 중" />;
};
