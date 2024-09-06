import { useDesktopInfo } from "@/commons/zustand/store";
import {
  useServerUtillsTodoListsFetchDeleteTodoLists,
  useServerUtillsTodoListsFetchTodoLists,
} from "@/server/utills/todo-lists";
import Link from "next/link";

import type { IUseLayoutsDesktopReturn, IWithLinkProps } from "./types";
import type { ReactNode } from "react";

export const useLayoutsDesktop = (): IUseLayoutsDesktopReturn => {
  const { setDesktopInfo } = useDesktopInfo();
  const { data, isLoading } = useServerUtillsTodoListsFetchTodoLists();
  const { data: deleteData } = useServerUtillsTodoListsFetchDeleteTodoLists();

  // 리스트가 있는지 체크
  const hasItems = !!data?.pages[0].items ?? false;
  // 삭제 리스트가 있는 체크
  const hasDeleted = !!deleteData?.pages[0].items ?? false;

  // 이동 경로가 있을 경우, Link 태그와 함께 사용
  const WithLink = ({ children, href, isBlank }: IWithLinkProps): ReactNode => {
    if (href)
      return (
        <Link href={href} target={isBlank ? "_blank" : "_self"}>
          {children}
        </Link>
      );

    return children;
  };

  // 리스트 존재 여부에 따른 "Todo-list" 아이콘 분기
  const initTodoListIcon = () => {
    setDesktopInfo({
      hasTodoList: hasItems,
    });
  };

  // 삭제 리스트 존재 여부에 따른 "휴지통" 아이콘 분기
  const initDeleteTodoListIcon = () => {
    setDesktopInfo({
      hasRecycle: hasDeleted,
    });
  };

  return {
    isLoading,
    WithLink,
    hasItems,
    initTodoListIcon,
    hasDeleted,
    initDeleteTodoListIcon,
  };
};
