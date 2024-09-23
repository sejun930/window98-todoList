"use client";

import { type ReactNode, useEffect } from "react";
import styles from "./styles.module.css";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

import { Button } from "@/commons/components/button";
import { TextBody02 } from "@/commons/components/text";
import { useFormContext } from "react-hook-form";
import { useUtillsDialog } from "@/commons/utills/dialog";

import {
  useServerUtillsTodoListsCreate,
  useServerUtillsTodoListsUpdate,
} from "@/server/utills/todo-lists";
import { useRouter } from "next/navigation";
import { useUtillsDialogAlert } from "@/commons/utills";

import type { ICommonsTodoListsWriteProps } from "./types";
import type { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";

// 리스트 등록 & 수정 컴포넌트
export default function CommonsTodoListsWrite({
  isEdit,
  info = { ...INIT_TODO_LIST },
  useBackEvent,
  afterMovePath,
}: ICommonsTodoListsWriteProps): ReactNode {
  const { id } = info;
  const router = useRouter();
  const { openDialogAlert } = useUtillsDialogAlert();

  const { register, formState, handleSubmit, setValue } =
    useFormContext<IZodSchemaTodoListsWrite>();
  // 등록 가능 여부
  const { isValid } = formState;

  // 콜백 함수
  const callback = (): void => {
    // 등록 & 수정창 닫기
    closeDialog();

    // 종료 후 이동할 경로가 설정되어 있다면
    if (afterMovePath) router.replace(afterMovePath);
  };

  // 등록 관련 함수
  const { createTodoListMutation } = useServerUtillsTodoListsCreate({
    callback,
  });
  // 수정 관련 함수
  const { updateTodoListMutation } = useServerUtillsTodoListsUpdate({
    callback,
  });

  useEffect(() => {
    // 수정 모드일 경우 조회한 데이터를 초기 데이터로 삽입
    if (isEdit) {
      setValue("title", info.title);
      setValue("contents", info.contents);
    }
  }, [isEdit]);

  // dialog 종료
  const { closeDialog } = useUtillsDialog();

  // 등록 & 수정 실행
  const writeTodoList = handleSubmit((data) => {
    const { title, contents } = data;
    if (!title || !contents) return;

    try {
      const waitText = `리스트 ${isEdit ? "수정" : "등록"} 중`;
      openDialogAlert({
        onlyWait: true,
        dialogAlertInfo: {
          text: `${waitText} 입니다.`,
        },
        headerInfo: {
          title: waitText,
        },
      });

      if (isEdit) {
        // todo-list 수정
        updateTodoListMutation.mutate({ data, id });
      } else {
        // todo-list 등록
        createTodoListMutation.mutate(data);
      }
    } catch (err) {
      if (err instanceof Error) throw new Error(err?.message);
    }
  });

  // 로딩중 여부
  const isLoading = !info?.title || !info.contents;

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(data) => {
          void writeTodoList(data);
        }}
      >
        <div className={styles.write__wrapper}>
          <input
            placeholder="제목 입력"
            className={styles.title}
            {...register("title")}
            id="title"
            maxLength={20}
            readOnly={isLoading}
          />
          <textarea
            placeholder="내용 입력"
            className={styles.contents}
            {...register("contents")}
            id="contents"
            maxLength={200}
            readOnly={isLoading}
          ></textarea>
        </div>

        <div className={styles.button__wrapper}>
          {useBackEvent && (
            <Button onClick={useBackEvent} theme="dangerous" size="l">
              <TextBody02>취소</TextBody02>
            </Button>
          )}

          <Button
            disable={!isValid}
            active={isValid}
            onClick={writeTodoList}
            theme="primary"
            size="l"
          >
            <TextBody02>{isEdit ? "수정" : "등록"}</TextBody02>
          </Button>
        </div>
      </form>
    </div>
  );
}
