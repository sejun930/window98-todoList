import { URL } from "@/commons/constants/URL";
import { URL_INFO } from "@/commons/constants/URL_info";
import { usePathname, useRouter } from "next/navigation";

import { useUtillDialog, useUtillDialogAlert } from "@/commons/utills";

import type { IUseLayoutsContentsReturn } from "./types";
import { useUtillsParams } from "@/commons/utills/params";

export const useLayoutsContents = (): IUseLayoutsContentsReturn => {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 페이지의 params 값 조회
  const { getAllParamsId } = useUtillsParams();
  const ids = getAllParamsId();

  // 경로별 해당하는 정보 및 기능 객체 조회
  const { INFOS } = URL_INFO(ids);

  // 현재 페이지의 경로 정보값 조회
  const currentInfo = INFOS[pathname];
  // window 창 사용 여부
  const useWindow = !!currentInfo?.useWindow?.title;
  // window 제목
  const windowTitle = currentInfo?.useWindow?.title ?? "";

  const { closeDialog } = useUtillDialog();
  const { closeDialogAlert } = useUtillDialogAlert();

  // 닫기 버튼 클릭시, 이동 경로 분기
  const closeContents = (): void => {
    // "/" (홈) 페이지로 이동
    router.push(URL().HOME);
  };

  // 페이지 최초 진입 시, 모든 dialog 및 dialog-alert 제거
  const resetDialogs = (): void => {
    closeDialog();
    closeDialogAlert();
  };

  return {
    resetDialogs,
    pathname,
    closeContents,
    useWindow,
    windowTitle,
  };
};
