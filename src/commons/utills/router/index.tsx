"use client";

import { usePathname } from "next/navigation";
import { URL } from "@/commons/constants/URL";
const _URL = URL();

interface IUseUtillsRouterReturn {
  isTodoListPage: () => boolean;
  isHomePage: () => boolean;
}

// 라우터 (이동 및 주소)에 관련된 공통 로직
export const useUtillsRouter = (): IUseUtillsRouterReturn => {
  const pathname = usePathname();

  // 현재 페이지가 "/todo-list" 페이지인지 검증
  const isTodoListPage = (): boolean => {
    return pathname.includes(_URL.TODOLIST) ?? false;
  };

  // 현재 페이지가 "/" 홈페이지인지 검증
  const isHomePage = (): boolean => {
    return pathname === _URL.HOME;
  };

  return {
    isTodoListPage,
    isHomePage,
  };
};
