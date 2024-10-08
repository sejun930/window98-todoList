"use client";

import styles from "./styles.module.css";
import WithForm from "@/commons/hocs/form";

import CommonsTodoListsWrite from "@/components/commons/todo-lists/write";
import { useFormContext } from "react-hook-form";
import { type ReactNode, useEffect } from "react";
import { useUtillsCheck } from "@/commons/utills/check";
import { useRouter } from "next/navigation";
import { useUtillsDialogAlert } from "@/commons/utills/dialog-alert";
import { useServerUtillsTodoListsFetchTodoListDetail } from "@/server/utills/todo-lists/fetch";
import { HydrationBoundary } from "@tanstack/react-query";

import {
  type IZodSchemaTodoListsWrite,
  zodSchemaTodoListsWrite,
} from "@/commons/zod/todo-list.zod";
import type { ITodoDetailsEditProps, ITodoDetailsProps } from "./types";

// 상세 수정 컴포넌트
export default function TodoDetailsEdit(
  props: ITodoDetailsEditProps,
): ReactNode {
  return (
    <HydrationBoundary state={props?.dehydratedState}>
      <WithForm zodSchema={zodSchemaTodoListsWrite}>
        <TodoDetails {...props} />
      </WithForm>
    </HydrationBoundary>
  );
}

const TodoDetails = ({ id, initData }: ITodoDetailsProps): ReactNode => {
  const { setValue } = useFormContext<IZodSchemaTodoListsWrite>();
  const { getIsDifferenceDatas } = useUtillsCheck();
  const { openDialogAlert } = useUtillsDialogAlert();
  const router = useRouter();

  // 상세 데이터 조회
  const { info, isLoading } = useServerUtillsTodoListsFetchTodoListDetail({
    id,
    initData,
  });

  useEffect(() => {
    setValue("title", info.title ?? "");
    setValue("contents", info.contents ?? "");
  }, [info]);

  const onBackEvent = (): void => {
    // 변경된 사항이 있는지 검증
    const isDifference = getIsDifferenceDatas({
      targetIds: ["title", "contents"],
      origin: { title: info.title, contents: info.contents },
    });
    // 변경된 사항이 없다면, 상세 페이지로 이동
    if (!isDifference) {
      router.replace(`/todo-list/${info.id}`);
      return;
    }

    // 변경된 사항이 있다면 이탈 재확인
    openDialogAlert({
      headerInfo: { title: "수정창 종료" },
      dialogAlertInfo: {
        text: "변경된 내용이 있습니다. 저장하지 않고 종료하시겠습니까?",
        okEvent: () => {
          router.replace(`/todo-list/${info.id}`);
        },
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <CommonsTodoListsWrite
        isEdit
        useBackEvent={onBackEvent}
        info={info}
        afterMovePath={`/todo-list/${info.id}`}
        isLoading={isLoading}
      />
    </div>
  );
};
