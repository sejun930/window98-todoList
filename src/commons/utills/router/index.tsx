"use client";

import { usePathname } from "next/navigation";

interface IUseUtillsRouterReturn {
  isTodoListPage: () => boolean;
}

// 라우터 (이동 및 주소)에 관련된 공통 로직
export const useUtillsRouter = (): IUseUtillsRouterReturn => {
  const pathname = usePathname();

  // 현재 페이지가 "/todo-list" 페이지인지 검증
  const isTodoListPage = () => {
    return pathname.includes("/todo-list") ?? false;
  };

  return {
    isTodoListPage,
  };
};
