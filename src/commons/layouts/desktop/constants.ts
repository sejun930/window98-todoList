import type { IDesktopInfoProps } from "@/commons/zustand/types";

import { URL } from "@/commons/constants/URL";
const _URL = URL();

interface IDESKTOP_LISTS {
  name: string; // 파일명
  src: string; // 파일 이미지
  href?: string; // 파일 클릭시 오픈될 페이지
  isBlank?: boolean; // 새창으로 열기 여부
  targetState?: {
    // zustand 의 값에 따라 노출되는 조건 분기
    name: keyof IDesktopInfoProps; // zustand KEY 이름
    src: string; // 해당 조건에 만족시 대체되어 노출될 아이콘 이름
  };
}

// 화면에 노출될 아이콘 및 이름 정보 리스트
export const DESKTOP_LISTS: IDESKTOP_LISTS[] = [
  {
    name: "휴지통",
    src: "recycle-empty",
    href: _URL.DELETED,
    targetState: {
      name: "hasRecycle",
      src: "recycle",
    },
  },
  {
    name: "Internet",
    src: "internet",
    href: "https://mcm-js.site/",
    isBlank: true,
  },
  {
    name: "Github",
    src: "github",
    href: "https://github.com/sejun930/front-assignment",
    isBlank: true,
  },
  {
    name: "Todo-List",
    src: "documents-empty",
    href: _URL.TODOLIST,
    targetState: {
      name: "hasTodoList",
      src: "documents",
    },
  },
];
