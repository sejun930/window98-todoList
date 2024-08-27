interface IDESKTOP_LISTS {
  name: string; // 파일명
  src: string; // 파일 이미지
  href?: string; // 파일 클릭시 오픈될 페이지
  isBlank?: boolean; // 새창으로 열기 여부
}

// 화면에 노출될 아이콘 및 이름 정보 리스트
export const DESKTOP_LISTS: IDESKTOP_LISTS[] = [
  { name: "휴지통", src: "recycle" },
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
  { name: "Todo-List", src: "documents", href: "/todoList" },
];
