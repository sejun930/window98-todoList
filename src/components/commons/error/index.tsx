import { TextBody01, TextTitle01 } from "@/commons/components/text";
import styles from "./styles.module.css";
import { ERROR_TEXT } from "./constanst";
import { useRouter } from "next/navigation";
import { useUtillsError } from "@/commons/utills/error";

import type { IErrorInfoProps } from "@/commons/zustand/types";
import type { ReactNode } from "react";

// 404 또는 서버 이슈 발생시 해당 에러 안내 컴포넌트 노출
export default function Error({
  errorType,
  isShow,
}: IErrorInfoProps): ReactNode {
  const TEXT = ERROR_TEXT[errorType];
  const router = useRouter();

  const { hideError } = useUtillsError();

  const onClick = (): void => {
    switch (errorType) {
      case "404":
        router.replace("/todo-list");
        return;
      default:
        // 에러 화면 숨기기
        hideError();
    }
  };

  if (!isShow) return;
  return (
    <div className={styles.error__wrapper} onClick={onClick}>
      <div className={styles.error__item}>
        <div className={styles.badge}>
          <TextTitle01>Window 98</TextTitle01>
        </div>
        <div className={styles.text__wrapper}>
          <div className={styles.error__notice}>
            <TextBody01>
              죄송합니다. 예상치 못한 에러가 발생했습니다.
            </TextBody01>
            <TextBody01>{TEXT}</TextBody01>
          </div>

          <div className={styles.option}>
            {errorType === "404" && (
              <TextBody01>
                블루 스크린을 클릭하면 홈으로 이동할 수 있습니다.
              </TextBody01>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
